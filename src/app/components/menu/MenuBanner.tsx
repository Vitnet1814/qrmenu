"use client";

import React, { useState, useEffect } from 'react';

const MenuBanner = () => {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Встановлюємо флаг, що компонент завантажений на клієнті
    setIsClient(true);
    
    // Тут буде логіка для отримання URL банера з сервера при завантаженні компонента
    // Припустимо, що URL зберігається у стані або отримується з пропсів
    if (typeof window !== 'undefined') {
      const storedBannerUrl = localStorage.getItem('restaurantBanner'); // Тимчасова імітація
      if (storedBannerUrl) {
        setBannerUrl(storedBannerUrl);
      }
    }
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Тут буде логіка для завантаження зображення на сервер
      // Після успішного завантаження отримаємо URL
      const imageUrl = URL.createObjectURL(file); // Тимчасова імітація URL
      setBannerUrl(imageUrl);
      if (typeof window !== 'undefined') {
        localStorage.setItem('restaurantBanner', imageUrl); // Тимчасова імітація збереження
      }
      setIsUploading(false);
    }
  };

  const handleRemoveBanner = () => {
    // Тут буде логіка для видалення банера з сервера
    setBannerUrl(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('restaurantBanner'); // Тимчасова імітація видалення
    }
  };

  // Показуємо заглушку під час гідратації
  if (!isClient) {
    return (
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <div style={{ display: 'block', backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '20px', textAlign: 'center' }}>
          Завантаження...
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px', position: 'relative' }}>
      {bannerUrl ? (
        <>
          <img src={bannerUrl} alt="Банер закладу" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '5px' }} />
          <button
            onClick={handleRemoveBanner}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Видалити банер
          </button>
        </>
      ) : (
        <label htmlFor="banner-upload" style={{ display: 'block', backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
          {isUploading ? 'Завантаження...' : 'Завантажити власну картинку закладу'}
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
      )}
    </div>
  );
};

export default MenuBanner;