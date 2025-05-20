import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from '../app/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QR Menu Сервіс',
  description: 'Сучасне QR-меню для вашого бізнесу',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}