// app/menu/[restaurantSlug]/page.tsx
"use client";
import React from 'react';
import { useParams } from 'next/navigation';

const PublicMenuPage = () => {
  const params = useParams<{ restaurantSlug: string }>();
  const restaurantSlug = params?.restaurantSlug;


  return (
    <div>
      <h1>Меню закладу: {restaurantSlug}</h1>
      {/* Тут буде відображення меню для клієнтів */}
    </div>
  );
};

export default PublicMenuPage;