"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

const DashboardPage = () => {
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
          setError('Помилка при створенні закладу.');
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
      <div className={styles.container}>
        <div className={styles.loadingCard}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingText}>Завантаження...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>QR</div>
            <span>QR Menu</span>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {session?.user?.name?.charAt(0) || 'U'}
            </div>
            <span>{session?.user?.name || 'Користувач'}</span>
          </div>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.welcomeCard}>
            <h1 className={styles.welcomeTitle}>Ласкаво просимо!</h1>
            <p className={styles.welcomeSubtitle}>
              Створіть заклад та почніть використовувати QR-меню
            </p>
          </div>
          
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Створення закладу</h2>
            
            {error && (
              <div className={styles.errorAlert}>
                {error}
              </div>
            )}
            
            {success && (
              <div className={styles.successAlert}>
                {success}
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label htmlFor="restaurantName" className={styles.formLabel}>
                Назва закладу
              </label>
              <input
                type="text"
                id="restaurantName"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Введіть назву вашого закладу"
                className={styles.formInput}
                disabled={isSubmitting}
              />
            </div>
            
            <button 
              onClick={handleSaveRestaurantName}
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.loadingSpinner}></span>
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