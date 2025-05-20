"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const PublicMenuPage = () => {
  const params = useParams<{ restaurantId: string }>();
  const restaurantId = params?.restaurantId;
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantName = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/restaurants/id/${restaurantId}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurantName(data.name);
        } else if (response.status === 404) {
          setError('Заклад не знайдено');
        } else {
          setError('Помилка завантаження назви закладу');
        }
      } catch (error) {
        console.error('Error fetching restaurant name:', error);
        setError('Сталася помилка');
      } finally {
        setIsLoading(false);
      }
    };

    if (restaurantId) {
      fetchRestaurantName();
    }
  }, [restaurantId]);

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>Помилка: {error}</div>;
  }

  return (
    <div>
      <h1>Меню закладу: {restaurantName || 'Завантаження...'}</h1>
      {/* Тут буде відображення меню для клієнтів */}
    </div>
  );
};

export default PublicMenuPage;

