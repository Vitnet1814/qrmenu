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

  // Функції для отримання класів налаштувань макету
  const getBorderRadiusClass = (value: string) => {
    switch (value) {
      case 'minimal': return 'ds-rounded-sm';
      case 'medium': return 'ds-rounded-lg';
      case 'extra-large': return 'ds-rounded-2xl';
      default: return 'ds-rounded-lg';
    }
  };

  const getPaddingClass = (value: string) => {
    switch (value) {
      case 'compact': return 'ds-p-2';
      case 'normal': return 'ds-p-4';
      case 'spacious': return 'ds-p-6';
      default: return 'ds-p-4';
    }
  };

  const getShadowClass = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? 'ds-shadow-lg' : 'ds-shadow-sm';
    }
    // Якщо value це string, конвертуємо
    const booleanValue = value === 'true' || value === 'dramatic';
    return booleanValue ? 'ds-shadow-lg' : 'ds-shadow-sm';
  };

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
      <div className="ds-min-h-screen ds-bg-gray-50 ds-flex ds-items-center ds-justify-center">
        <LoadingSpinner 
          size="lg" 
          text="Завантаження меню..." 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ds-min-h-screen ds-bg-gray-50 ds-flex ds-items-center ds-justify-center ds-p-4">
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
      <div className="ds-min-h-screen ds-bg-gray-50 ds-flex ds-items-center ds-justify-center">
        <div className="ds-text-center">
          <h1 className="ds-text-2xl ds-font-bold ds-text-gray-900 ds-mb-4">Меню не знайдено</h1>
          <p className="ds-text-gray-600">Спробуйте перевірити посилання</p>
        </div>
      </div>
    );
  }

  const activeCategoryData = menuData.categories.find(cat => cat._id === activeCategory);

  return (
    <div className="ds-min-h-screen" style={{ backgroundColor: menuData.designSettings.theme.colors.background }}>
      {/* Header з фоновим зображенням */}
      <header className="ds-relative ds-overflow-hidden">
        {/* Фонове зображення */}
        <div 
          className="ds-absolute ds-inset-0 ds-bg-cover ds-bg-center ds-bg-no-repeat"
          style={{
            backgroundImage: menuData.banner?.image 
              ? `url(${menuData.banner.image})` 
              : `linear-gradient(135deg, ${menuData.designSettings.theme.colors.primary} 0%, ${menuData.designSettings.theme.colors.secondary} 100%)`,
            filter: 'blur(2px) brightness(0.7)'
          }}
        />
        
        {/* Overlay */}
        <div className="ds-absolute ds-inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
        
        {/* Контент шапки */}
        <div className="ds-relative ds-z-10">
          {/* Навігаційні іконки */}
          <div className="ds-flex ds-justify-between ds-items-center ds-p-4">
            <button className="ds-text-white ds-hover:text-gray-200 ds-transition-colors">
              <svg className="ds-w-6 ds-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <button className="ds-text-white ds-hover:text-gray-200 ds-transition-colors">
              <svg className="ds-w-6 ds-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          
          {/* Назва ресторану */}
          <div className="ds-text-center ds-py-8 ds-px-4">
            <h1 
              className="ds-text-4xl ds-font-bold ds-mb-2 ds-text-white"
              style={{ 
                fontFamily: menuData.designSettings.layout.fontFamily,
                textShadow: '0 4px 6px rgba(0, 0, 0, 0.25)'
              }}
            >
              {menuData.restaurant.name}
            </h1>
            <p className="ds-text-white ds-text-lg" style={{ opacity: 0.9 }}>
              Переглядів: {menuData.restaurant.viewsCount}
            </p>
          </div>
        </div>
      </header>


      {/* Горизонтальна навігація категорій */}
      <div className="ds-bg-white ds-shadow-sm ds-border-b ds-sticky ds-top-0 ds-z-20">
        <div className="ds-max-w-7xl ds-mx-auto ds-px-4">
          <div className="ds-flex ds-items-center ds-justify-between ds-py-3">
            {/* Стрілка вгору/вниз */}
            <button className="ds-text-gray-600 ds-hover:text-gray-800 ds-transition-colors">
              <svg className="ds-w-5 ds-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            
            {/* Категорії */}
            <div className="ds-flex-1 ds-flex ds-justify-center ds-gap-1 ds-mx-4">
              {menuData.categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setActiveCategory(category._id)}
                  className={`ds-px-4 ds-py-2 ds-rounded-full ds-font-medium ds-transition-all ds-text-sm ${
                    activeCategory === category._id
                      ? 'ds-text-white ds-shadow-md'
                      : 'ds-text-gray-600 ds-hover:text-gray-800 ds-hover:bg-gray-100'
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
            <div className="ds-w-5"></div>
          </div>
        </div>
      </div>

      <div className="ds-max-w-7xl ds-mx-auto ds-px-4 ds-py-8">

        {/* Menu Items */}
        {activeCategoryData && (
          <div className="ds-space-y-8">
            {activeCategoryData.items.length === 0 ? (
              <div className="ds-text-center ds-py-16">
                <div className="ds-text-8xl ds-mb-6">🍽️</div>
                <h3 className="ds-text-2xl ds-font-bold ds-text-gray-900 ds-mb-3">
                  Немає страв у цій категорії
                </h3>
                <p className="ds-text-gray-600 ds-text-lg">
                  Спробуйте обрати іншу категорію
                </p>
              </div>
            ) : (
              <div className="ds-space-y-8">
                {activeCategoryData.items.map((item) => {
                  const borderRadiusClass = getBorderRadiusClass(menuData.designSettings.layout.borderRadius);
                  const shadowClass = getShadowClass(menuData.designSettings.layout.shadow);
                  
                  return (
                  <div
                    key={item._id}
                    className={`ds-bg-white ds-overflow-hidden ds-hover:shadow-xl ds-transition-all ds-hover:scale-[1.02] ${borderRadiusClass} ${shadowClass}`}
                  >
                    <div className="ds-flex ds-flex-col ds-md:flex-row">
                      {/* Зображення страви */}
                      {item.image && (
                        <div className="ds-md:w-1\/3 ds-h-64 ds-md:h-auto">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="ds-w-full ds-h-full ds-object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Контент страви */}
                      <div className={`ds-flex-1 ds-p-8 ${!item.image ? 'ds-md:p-12' : ''}`}>
                        <div className={`ds-space-y-4 ${getPaddingClass(menuData.designSettings.layout.padding)}`}>
                          {/* Назва страви */}
                          <h3 
                            className="ds-text-2xl ds-font-bold ds-text-gray-900 ds-leading-tight"
                            style={{ fontFamily: menuData.designSettings.layout.fontFamily }}
                          >
                            {item.name}
                          </h3>
                          
                          {/* Опис страви */}
                          {item.description && (
                            <p className="ds-text-gray-600 ds-text-lg ds-leading-relaxed">
                              {item.description}
                            </p>
                          )}
                          
                          {/* Ціна та об'єм */}
                          <div className="ds-flex ds-items-center ds-justify-between ds-pt-4">
                            <div className="ds-flex ds-items-center ds-gap-4">
                              <span 
                                className="ds-text-3xl ds-font-bold"
                                style={{ color: menuData.designSettings.theme.colors.primary }}
                              >
                                {formatPrice(item.price)}
                              </span>
                              {/* Додаємо інформацію про об'єм/вагу якщо є */}
                              <span className="ds-text-gray-500 ds-text-lg ds-font-medium">
                                250 мл
                              </span>
                            </div>
                            
                            {/* Іконка додавання в кошик */}
                            <button 
                              className="ds-p-3 ds-rounded-full ds-hover:bg-gray-100 ds-transition-colors"
                              style={{ 
                                backgroundColor: menuData.designSettings.theme.colors.primary + '20',
                                color: menuData.designSettings.theme.colors.primary
                              }}
                            >
                              <svg className="ds-w-6 ds-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="ds-mt-20">
        <div 
          className="ds-py-12 ds-px-4"
          style={{ backgroundColor: menuData.designSettings.theme.colors.background }}
        >
          <div className="ds-max-w-7xl ds-mx-auto ds-text-center">
            <div 
              className="ds-text-lg ds-font-medium ds-mb-2"
              style={{ color: menuData.designSettings.theme.colors.text }}
            >
              © 2025 QR Menu
            </div>
            <p 
              className="ds-text-sm"
              style={{ color: menuData.designSettings.theme.colors.text, opacity: 0.75 }}
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