"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Squares2X2Icon,
  PaintBrushIcon,
  QrCodeIcon,
  EyeIcon,
  ClockIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

// Іконки для перемикання теми
const SunIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

const MoonIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
import { LoadingSpinner, ErrorState } from '../../components/ui/LoadingStates';
import { StatCard, QuickActionCard, ActivityItem } from '../../components/ui/Cards';

interface RestaurantStats {
  categoriesCount: number;
  menuItemsCount: number;
  viewsCount: number;
  lastUpdated: string;
  createdAt: string;
  recentActivity: {
    lastCategoryAdded: string | null;
    lastMenuItemAdded: string | null;
  };
}

interface RestaurantInfo {
  name: string;
  slug: string;
}

const RestaurantDashboardPage = () => {
  const params = useParams<{ restaurantId: string }>();
  const restaurantId = params?.restaurantId;
  
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(null);
  const [stats, setStats] = useState<RestaurantStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Завантажити тему з localStorage та синхронізувати з глобальною темою
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Слухач для змін теми з інших сторінок
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('theme');
      const isDark = currentTheme === 'dark';
      setIsDarkMode(isDark);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Додати слухач подій
    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('themeChanged', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Відправити кастомну подію для синхронізації з іншими сторінками
    window.dispatchEvent(new CustomEvent('themeChanged'));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!restaurantId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Завантажуємо інформацію про ресторан та статистику паралельно
        const [restaurantResponse, statsResponse] = await Promise.all([
          fetch(`/api/restaurants/id/${restaurantId}`),
          fetch(`/api/restaurants/stats/${restaurantId}`)
        ]);

        if (!restaurantResponse.ok || !statsResponse.ok) {
          throw new Error('Помилка завантаження даних');
        }

        const [restaurantData, statsData] = await Promise.all([
          restaurantResponse.json(),
          statsResponse.json()
        ]);

        setRestaurantInfo(restaurantData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Сталася помилка');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} хв тому`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} год тому`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} дн тому`;
    }
  };

  const quickActions = [
    {
      title: 'Управління меню',
      description: 'Додавати та редагувати страви',
      icon: Squares2X2Icon,
      href: `/dashboard/${restaurantId}/menu`,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      title: 'Налаштування дизайну',
      description: 'Персоналізувати вигляд меню',
      icon: PaintBrushIcon,
      href: `/dashboard/${restaurantId}/design`,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      title: 'Генерація QR-коду',
      description: 'Створити QR-код для меню',
      icon: QrCodeIcon,
      href: `/dashboard/${restaurantId}/qr-code`,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      title: 'Попередній перегляд',
      description: 'Подивитися як виглядає меню',
      icon: EyeIcon,
      href: `/menu/${restaurantInfo?.slug}`,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      external: true,
    },
  ];

  const statsCards = [
    {
      title: 'Страви в меню',
      value: stats?.menuItemsCount || 0,
      icon: DocumentTextIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Загальна кількість страв',
    },
    {
      title: 'Категорії',
      value: stats?.categoriesCount || 0,
      icon: Squares2X2Icon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Кількість категорій меню',
    },
    {
      title: 'Перегляди',
      value: stats?.viewsCount || 0,
      icon: EyeIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Кількість переглядів меню',
    },
    {
      title: 'Останнє оновлення',
      value: stats?.lastUpdated ? getTimeAgo(stats.lastUpdated) : 'Невідомо',
      icon: ClockIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Коли меню оновлювалося',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          text="Завантаження даних ресторану..." 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <ErrorState 
          title="Помилка завантаження"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Статистичні картки */}
        <div className="mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100 mb-6">Статистика</h2>
          <div className="ds-grid ds-grid-cols-1 ds-sm:grid-cols-2  ds-gap-6">
            {statsCards.map((card, index) => (
              <StatCard
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
                bgColor={card.bgColor}
                description={card.description}
              />
            ))}
          </div>
        </div>

        {/* Швидкі дії */}
        <div className="mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100 mb-6">Швидкі дії</h2>
          <div className="ds-grid ds-grid-cols-1 ds-sm:grid-cols-2  ds-gap-6">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                href={action.href}
                color={action.color}
                hoverColor={action.hoverColor}
                external={action.external}
              />
            ))}
          </div>
        </div>

        {/* Остання активність */}
        {stats && (stats.recentActivity.lastCategoryAdded || stats.recentActivity.lastMenuItemAdded) && (
          <div className="mb-8">
            <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100 mb-6">Остання активність</h2>
            <div className="ds-card ds-card-body dark:bg-gray-800 dark:border-gray-700">
              <div className="space-y-4">
                {stats.recentActivity.lastMenuItemAdded && (
                  <ActivityItem
                    type="menu-item"
                    title="Додано нову страву"
                    timeAgo={getTimeAgo(stats.recentActivity.lastMenuItemAdded)}
                  />
                )}
                {stats.recentActivity.lastCategoryAdded && (
                  <ActivityItem
                    type="category"
                    title="Додано нову категорію"
                    timeAgo={getTimeAgo(stats.recentActivity.lastCategoryAdded)}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Інформація про ресторан */}
        <div className="ds-card ds-card-body dark:bg-gray-800 dark:border-gray-700">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100 mb-4">Інформація про ресторан</h2>
          <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-6">
            <div>
              <p className="ds-text-sm ds-text-gray-600 dark:ds-text-gray-400">Дата створення</p>
              <p className="ds-text-lg ds-font-medium ds-text-gray-900 dark:ds-text-gray-100">
                {stats?.createdAt ? formatDate(stats.createdAt) : 'Невідомо'}
              </p>
            </div>
            <div>
              <p className="ds-text-sm ds-text-gray-600 dark:ds-text-gray-400">Останнє оновлення</p>
              <p className="ds-text-lg ds-font-medium ds-text-gray-900 dark:ds-text-gray-100">
                {stats?.lastUpdated ? formatDate(stats.lastUpdated) : 'Невідомо'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardPage;

