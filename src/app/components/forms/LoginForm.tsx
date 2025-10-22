"use client";

import React from 'react';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="ds-gradient-bg ds-gradient-overlay min-h-screen ds-flex ds-items-center ds-justify-center p-5">
      <div className="ds-auth-card">
        <div className="ds-auth-header">
          <div className="ds-auth-logo">
            <div className="ds-auth-logo-icon">QR</div>
            <span>QR Menu</span>
          </div>
          <h1 className="ds-auth-title">Ласкаво просимо!</h1>
          <p className="ds-auth-subtitle">
            Увійдіть у свій акаунт, щоб продовжити роботу з QR-меню
          </p>
        </div>

        <div className="ds-auth-content">
          {/* Кнопка для Google OAuth */}
          <button 
            onClick={handleGoogleSignIn}
            className="ds-auth-google-btn"
            type="button"
          >
            <div className="ds-auth-google-icon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            Увійти за допомогою Google
          </button>

          <div className="ds-auth-divider">
            <span></span>
          </div>

          <div className="ds-auth-info">
            <h3>Чому Google?</h3>
            <ul>
              <li>🔒 Безпечна авторизація</li>
              <li>⚡ Швидкий вхід без реєстрації</li>
              <li>📱 Синхронізація на всіх пристроях</li>
            </ul>
          </div>
        </div>

        <div className="ds-auth-footer">
          <p>
            Продовжуючи, ви погоджуєтесь з{' '}
            <a href="#" className="ds-auth-link">умовами використання</a>
            {' '}та{' '}
            <a href="#" className="ds-auth-link">політикою конфіденційності</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;