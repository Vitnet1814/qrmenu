import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from '../app/components/AuthProvider';
import { ToastProvider } from '../app/contexts/ToastContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QR Menu Сервіс',
  description: 'Сучасне QR-меню для вашого бізнесу',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <div className="app-container">
          <div className="app-content">
            <AuthProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}