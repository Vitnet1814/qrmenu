"use client";

import React, { useState, useEffect } from 'react';

interface MenuBannerProps {
  restaurantId: string;
}

const MenuBanner = ({ restaurantId }: MenuBannerProps) => {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Отримати банер ресторану з сервера
  const fetchBanner = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/restaurants/${restaurantId}/banner`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.banner?.data?.image) {
          setBannerUrl(data.banner.data.image);
        }
      } else if (response.status === 404) {
        // Банер не знайдено - це нормально
        setBannerUrl(null);
      } else {
        throw new Error('Помилка завантаження банера');
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
      setError('Не вдалося завантажити банер');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchBanner();
    }
  }, [restaurantId]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Перевіряємо розмір файлу (максимум 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Файл занадто великий. Максимальний розмір: 10MB');
      return;
    }

    // Перевіряємо тип файлу
    if (!file.type.startsWith('image/')) {
      setError('Будь ласка, виберіть зображення');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Конвертуємо файл в Base64
      const base64 = await convertFileToBase64(file);

      // Відправляємо на сервер для оптимізації та збереження
      const response = await fetch(`/api/restaurants/${restaurantId}/banner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64,
          alt: `Банер ресторану ${restaurantId}`
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.banner?.data?.image) {
          setBannerUrl(data.banner.data.image);
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Помилка завантаження банера');
      }
    } catch (error) {
      console.error('Error uploading banner:', error);
      setError(error instanceof Error ? error.message : 'Помилка завантаження банера');
    } finally {
      setIsUploading(false);
    }
  };

  // Конвертуємо файл в Base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveBanner = async () => {
    try {
      setError(null);
      
      const response = await fetch(`/api/restaurants/${restaurantId}/banner`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBannerUrl(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Помилка видалення банера');
      }
    } catch (error) {
      console.error('Error removing banner:', error);
      setError(error instanceof Error ? error.message : 'Помилка видалення банера');
    }
  };

  // Показуємо заглушку під час завантаження
  if (isLoading) {
    return (
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <div className="banner-loading banner-loading-dark" style={{ display: 'block', backgroundColor: '#f0f0f0', borderRadius: '5px', padding: '20px', textAlign: 'center' }}>
          Завантаження банера...
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px', position: 'relative' }}>
      {error && (
        <div className="banner-error banner-error-dark" style={{ 
          backgroundColor: '#fee', 
          color: '#c33', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      {bannerUrl ? (
        <>
          <img 
            src={bannerUrl} 
            alt="Банер закладу" 
            style={{ 
              width: '100%', 
              maxHeight: '200px', 
              objectFit: 'cover', 
              borderRadius: '5px' 
            }} 
          />
          <button
            onClick={handleRemoveBanner}
            disabled={isUploading}
            className="banner-remove-btn banner-remove-btn-dark"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              opacity: isUploading ? 0.6 : 1,
            }}
          >
            Видалити банер
          </button>
        </>
      ) : (
        <label 
          htmlFor="banner-upload" 
          className="banner-upload-area banner-upload-area-dark"
          style={{ 
            display: 'block', 
            backgroundColor: '#f0f0f0', 
            borderRadius: '5px', 
            padding: '20px', 
            textAlign: 'center', 
            cursor: isUploading ? 'not-allowed' : 'pointer',
            opacity: isUploading ? 0.6 : 1,
          }}
        >
          {isUploading ? 'Оптимізація та збереження...' : 'Завантажити банер закладу'}
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            style={{ display: 'none' }}
          />
        </label>
      )}
    </div>
  );
};

export default MenuBanner;