// pages/api/auth/[...nextauth].ts
import NextAuth, { Account, Profile, Session, User, SessionStrategy, AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDatabase } from '../../../src/app/lib/database';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = { // Використовуємо безпосередньо тип AuthOptions
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
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

          // Спочатку шукаємо по googleId (найбільш точний ідентифікатор для Google OAuth)
          let existingUser = await usersCollection.findOne({ googleId: account.providerAccountId });

          // Якщо не знайдено по googleId, шукаємо по email (для міграції старих користувачів)
          if (!existingUser) {
            existingUser = await usersCollection.findOne({ email: profile.email });
            
            // Якщо знайдено по email, оновлюємо googleId щоб уникнути дублікатів
            if (existingUser) {
              await usersCollection.updateOne(
                { _id: existingUser._id },
                { $set: { googleId: account.providerAccountId } }
              );
            }
          }

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
      
      // Дозволити всі інші провайдери (якщо будуть додані)
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