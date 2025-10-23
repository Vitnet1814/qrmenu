// pages/api/auth/[...nextauth].ts
import NextAuth, { Account, Profile, Session, User, SessionStrategy, AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDatabase } from '../../../src/app/lib/database';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = { // Використовуємо безпосередньо тип AuthOptions
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }

        const { db } = await connectDatabase();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email });

        if (!user || !user.password) {
          return null; // Користувача не знайдено або пароль не встановлено
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          return { id: user._id.toString(), email: user.email, name: user.name } as User; // Явне приведення типу
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy, // Явне приведення типу до SessionStrategy
  },
  debug: false, // Вимкнено debug режим
  callbacks: {
    async signIn({ account, profile, user }: { account: Account | null; profile?: Profile | undefined; user: User }) {
      if (account?.provider === 'google') {
        if (!profile?.email) {
          return false; // Відхилити вхід, якщо немає email у профілі
        }

        try {
          const { db } = await connectDatabase();
          const usersCollection = db.collection('users');

          const existingUser = await usersCollection.findOne({ email: profile.email });

          if (!existingUser) {
            // Автоматична реєстрація нового користувача Google
            const result = await usersCollection.insertOne({
              email: profile.email,
              name: profile.name,
              googleId: account.providerAccountId,
              createdAt: new Date(),
            });
            user.id = result.insertedId.toString(); // Оновлюємо ID користувача для подальших колбеків
          } else {
            user.id = existingUser._id.toString(); // Встановлюємо ID існуючого користувача
          }
          return true;
        } catch (error) {
          console.error('Database error in signIn callback:', error);
          return false;
        }
      }
      // Для CredentialsProvider (логін через email/пароль) дозвіл вже визначено в authorize
      return true;
    },
    async jwt({ token, user }: { token: JWT; user?: User | undefined }) {
      // Додаємо ID користувача до JWT
      if (user?.id) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Додаємо ID користувача з JWT до сесії
      if (token?.userId) {
        session.user = session.user || {};
        session.user.id = token.userId as string;
      }
      return session;
    },
  },

};

export default NextAuth(authOptions);