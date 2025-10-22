"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [restaurantName, setRestaurantName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      const fetchRestaurant = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/restaurants/user/${session?.user?.id}`);
          if (response.ok) {
            const data = await response.json();
            if (data?.restaurantId) {
              router.push(`/dashboard/${data.restaurantId}`);
            } else {
              setIsLoading(false); // Користувач не має закладу, показуємо форму
            }
          } else {
            console.error('Failed to fetch restaurant data');
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Error fetching restaurant data:', error);
          setIsLoading(false);
        }
      };

      fetchRestaurant();
    } else if (status === 'unauthenticated') {
      router.push('/auth/login'); // Перенаправити на сторінку логіну, якщо не авторизований
    }
  }, [status, session?.user?.id, router]);

  const handleSaveRestaurantName = async () => {
    if (!restaurantName.trim()) {
      setError('Будь ласка, введіть назву закладу.');
      return;
    }

    if (session?.user?.id) {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);
      
      try {
        const response = await fetch('/api/restaurants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: restaurantName, userId: session.user.id }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.restaurantId) {
            setSuccess('Заклад успішно створено! Перенаправляємо...');
            setTimeout(() => {
              router.push(`/dashboard/${data.restaurantId}`);
            }, 1500);
          } else {
            setError('Не вдалося створити заклад.');
          }
        } else {
          const errorData = await response.json();
          if (response.status === 409) {
            // Користувач вже має заклад
            setError(errorData.error || 'У вас вже є заклад. Один користувач може мати тільки один заклад.');
            // Перенаправляємо на існуючий заклад
            if (errorData.existingRestaurantId) {
              setTimeout(() => {
                router.push(`/dashboard/${errorData.existingRestaurantId}`);
              }, 2000);
            }
          } else {
            setError(errorData.error || 'Помилка при створенні закладу.');
          }
        }
      } catch (error) {
        console.error('Error creating restaurant:', error);
        setError('Сталася помилка при створенні закладу.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="ds-gradient-bg ds-gradient-overlay dashboard-light-theme min-h-screen ds-flex ds-items-center ds-justify-center">
        <div className="ds-card ds-p-8 ds-text-center">
          <div className="animate-spin ds-w-8 ds-h-8 ds-border-4 ds-border-primary ds-border-t-transparent ds-rounded-full ds-mx-auto ds-mb-4"></div>
          <div className="ds-text-lg ds-text-gray-600">Завантаження...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-gradient-bg ds-gradient-overlay dashboard-light-theme min-h-screen">
      <header className="ds-gradient-header ds-p-6">
        <div className="container ds-flex ds-items-center ds-justify-between">
          <div className="ds-flex ds-items-center ds-gap-3">
            <div className="ds-auth-logo-icon">QR</div>
            <span className="ds-text-2xl ds-font-bold ds-text-white">QR Menu</span>
          </div>
          <div className="ds-flex ds-items-center ds-gap-4">
            <div className="ds-flex ds-items-center ds-gap-3">
              <div className="ds-w-8 ds-h-8 ds-bg-success ds-bg-opacity-20 ds-rounded-full ds-flex ds-items-center ds-justify-center ds-text-white ds-font-bold">
                {session?.user?.name?.charAt(0) || 'U'}
              </div>
              <span className="ds-text-white ds-font-medium">{session?.user?.name || 'Користувач'}</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="ds-gradient-main ds-p-6">
        <div className="container ds-max-w-2xl">
          <div className="ds-card ds-p-8 ds-text-center ds-mb-8">
            <h1 className="ds-text-4xl ds-text-gray-600 ds-font-bold ds-mb-4">Ласкаво просимо!</h1>
            <p className="ds-text-lg ds-text-gray-600">
              Створіть заклад та почніть використовувати QR-меню
            </p>
          </div>
          
          <div className="ds-card ds-p-8">
            <h2 className="ds-text-2xl ds-font-bold ds-text-gray-900 ds-mb-6">Створення закладу</h2>
            
            {error && (
              <div className="ds-alert ds-alert-error ds-mb-6">
                {error}
              </div>
            )}
            
            {success && (
              <div className="ds-alert ds-alert-success ds-mb-6">
                {success}
              </div>
            )}
            
            <div className="ds-form-group ds-mb-6">
              <label htmlFor="restaurantName" className="ds-form-label">
                Назва закладу
              </label>
              <input
                type="text"
                id="restaurantName"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Введіть назву вашого закладу"
                className="ds-form-input"
                disabled={isSubmitting}
              />
            </div>
            
            <button 
              onClick={handleSaveRestaurantName}
              disabled={isSubmitting}
              className="ds-btn ds-btn-primary ds-w-full ds-flex ds-items-center ds-justify-center ds-gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin ds-w-5 ds-h-5 ds-border-2 ds-border-white ds-border-t-transparent ds-rounded-full"></div>
                  Створення...
                </>
              ) : (
                'Створити заклад'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;