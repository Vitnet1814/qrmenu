// app/auth/layout.tsx
import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <header>
        {/* Можна додати логотип або заголовок для сторінок аутентифікації */}
        <h1>QR Menu Сервіс</h1>
      </header>
      <main style={{ padding: '20px' }}>
        {children}
      </main>
      <footer>
        {/* Можна додати посилання на політику конфіденційності тощо */}
        <p>&copy; 2025 Всі права захищено</p>
      </footer>
    </div>
  );
};

export default AuthLayout;