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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {menuData.restaurant.name}
            </h1>
            <p className="text-gray-600">
              Переглядів: {menuData.restaurant.viewsCount}
            </p>
          </div>
        </div>
      </header>

      {/* Banner */}
      {menuData.banner && (
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              {menuData.banner.title && (
                <h2 className="text-4xl font-bold mb-4">{menuData.banner.title}</h2>
              )}
              {menuData.banner.subtitle && (
                <p className="text-xl opacity-90">{menuData.banner.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {menuData.categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveCategory(category._id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category._id
                    ? 'text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
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
        </div>

        {/* Menu Items */}
        {activeCategoryData && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {activeCategoryData.name}
              </h2>
              {activeCategoryData.description && (
                <p className="text-gray-600">{activeCategoryData.description}</p>
              )}
            </div>

            {activeCategoryData.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Немає страв у цій категорії
                </h3>
                <p className="text-gray-600">
                  Спробуйте обрати іншу категорію
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCategoryData.items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    {item.image && (
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-xl font-bold"
                          style={{ color: menuData.designSettings.theme.colors.primary }}
                        >
                          {formatPrice(item.price)}
                        </span>
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
      <footer className="bg-gray-100 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 QR Menu. Створено з ❤️ для {menuData.restaurant.name}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicMenuPage;