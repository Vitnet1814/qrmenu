"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [restaurantName, setRestaurantName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
      alert('Будь ласка, введіть назву закладу.');
      return;
    }

    if (session?.user?.id) {
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
            router.push(`/dashboard/${data.restaurantId}`);
          } else {
            alert('Не вдалося створити заклад.');
          }
        } else {
          alert('Помилка при створенні закладу.');
        }
      } catch (error) {
        console.error('Error creating restaurant:', error);
        alert('Сталася помилка при створенні закладу.');
      }
    }
  };

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div>
      <h1>КАБІНЕТ</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <div>
          <h2>Введіть назву вашого закладу</h2>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Назва закладу"
          />
          <button onClick={handleSaveRestaurantName}>Зберегти</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;