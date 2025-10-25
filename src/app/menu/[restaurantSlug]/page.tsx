"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LoadingSpinner, ErrorState } from '../../components/ui/LoadingStates';

interface MenuItem {
  _id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  order: number;
}

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  order: number;
  items: MenuItem[];
}

interface DesignSettings {
  theme: {
    id: string;
    name: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
  };
  layout: {
    borderRadius: string;
    padding: string;
    shadow: string;
    fontFamily: string;
  };
}

interface Restaurant {
  _id: string;
  name: string;
  slug: string;
  viewsCount: number;
}

interface Banner {
  image?: string;
  title?: string;
  subtitle?: string;
}

interface MenuData {
  restaurant: Restaurant;
  categories: Category[];
  designSettings: DesignSettings;
  banner: Banner | null;
}

const PublicMenuPage = () => {
  const params = useParams<{ restaurantSlug: string }>();
  const restaurantSlug = params?.restaurantSlug;

  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      if (!restaurantSlug) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/menu/${restaurantSlug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Ресторан не знайдено');
          }
          throw new Error('Помилка завантаження меню');
        }

        const data = await response.json();
        setMenuData(data);
        
        // Встановлюємо першу категорію як активну
        if (data.categories.length > 0) {
          setActiveCategory(data.categories[0]._id);
        }
      } catch (error) {
        console.error('Помилка завантаження меню:', error);
        setError(error instanceof Error ? error.message : 'Сталася помилка');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, [restaurantSlug]);

  // Застосовуємо дизайн-систему
  useEffect(() => {
    if (menuData?.designSettings) {
      const { theme } = menuData.designSettings;
      const root = document.documentElement;
      
      root.style.setProperty('--color-primary', theme.colors.primary);
      root.style.setProperty('--color-secondary', theme.colors.secondary);
      root.style.setProperty('--color-accent', theme.colors.accent);
      root.style.setProperty('--color-background', theme.colors.background);
      root.style.setProperty('--color-text', theme.colors.text);
    }
  }, [menuData]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          text="Завантаження меню..." 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ErrorState 
          title="Помилка завантаження"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Меню не знайдено</h1>
          <p className="text-gray-600">Спробуйте перевірити посилання</p>
        </div>
      </div>
    );
  }

  const activeCategoryData = menuData.categories.find(cat => cat._id === activeCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: menuData.designSettings.theme.colors.background }}>
      {/* Header з фоновим зображенням */}
      <header className="relative overflow-hidden">
        {/* Фонове зображення */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: menuData.banner?.image 
              ? `url(${menuData.banner.image})` 
              : `linear-gradient(135deg, ${menuData.designSettings.theme.colors.primary} 0%, ${menuData.designSettings.theme.colors.secondary} 100%)`,
            filter: 'blur(2px) brightness(0.7)'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        {/* Контент шапки */}
        <div className="relative z-10">
          {/* Навігаційні іконки */}
          <div className="flex justify-between items-center p-4">
            <button className="text-white hover:text-gray-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <button className="text-white hover:text-gray-200 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          
          {/* Назва ресторану */}
          <div className="text-center py-8 px-4">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg"
              style={{ fontFamily: menuData.designSettings.layout.fontFamily }}
            >
              {menuData.restaurant.name}
            </h1>
            <p className="text-white text-opacity-90 text-lg">
              Переглядів: {menuData.restaurant.viewsCount}
            </p>
          </div>
        </div>
      </header>


      {/* Горизонтальна навігація категорій */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Стрілка вгору/вниз */}
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            
            {/* Категорії */}
            <div className="flex-1 flex justify-center space-x-1 mx-4">
              {menuData.categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setActiveCategory(category._id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${
                    activeCategory === category._id
                      ? 'text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: activeCategory === category._id 
                      ? menuData.designSettings.theme.colors.primary 
                      : undefined
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Пустий простір для балансу */}
            <div className="w-5"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Menu Items */}
        {activeCategoryData && (
          <div className="space-y-8">
            {activeCategoryData.items.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Немає страв у цій категорії
                </h3>
                <p className="text-gray-600 text-lg">
                  Спробуйте обрати іншу категорію
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {activeCategoryData.items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{ borderRadius: menuData.designSettings.layout.borderRadius }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Зображення страви */}
                      {item.image && (
                        <div className="md:w-1/3 h-64 md:h-auto">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Контент страви */}
                      <div className={`flex-1 p-8 ${!item.image ? 'md:p-12' : ''}`}>
                        <div className="space-y-4">
                          {/* Назва страви */}
                          <h3 
                            className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight"
                            style={{ fontFamily: menuData.designSettings.layout.fontFamily }}
                          >
                            {item.name}
                          </h3>
                          
                          {/* Опис страви */}
                          {item.description && (
                            <p className="text-gray-600 text-lg leading-relaxed">
                              {item.description}
                            </p>
                          )}
                          
                          {/* Ціна та об'єм */}
                          <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center space-x-4">
                              <span 
                                className="text-3xl font-bold"
                                style={{ color: menuData.designSettings.theme.colors.primary }}
                              >
                                {formatPrice(item.price)}
                              </span>
                              {/* Додаємо інформацію про об'єм/вагу якщо є */}
                              <span className="text-gray-500 text-lg font-medium">
                                250 мл
                              </span>
                            </div>
                            
                            {/* Іконка додавання в кошик */}
                            <button 
                              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                              style={{ 
                                backgroundColor: menuData.designSettings.theme.colors.primary + '20',
                                color: menuData.designSettings.theme.colors.primary
                              }}
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20">
        <div 
          className="py-12 px-4"
          style={{ backgroundColor: menuData.designSettings.theme.colors.background }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <div 
              className="text-lg font-medium mb-2"
              style={{ color: menuData.designSettings.theme.colors.text }}
            >
              © 2025 QR Menu
            </div>
            <p 
              className="text-sm opacity-75"
              style={{ color: menuData.designSettings.theme.colors.text }}
            >
              Створено з ❤️ для {menuData.restaurant.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicMenuPage;