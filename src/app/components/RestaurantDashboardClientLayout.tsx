// app/components/RestaurantDashboardClientLayout.tsx
'use client';

import React, { ReactNode, CSSProperties, useEffect, useState } from 'react';
import { usePathname} from 'next/navigation';
import {
  SquaresPlusIcon,
  PaintBrushIcon,
  QrCodeIcon,
  ArrowRightStartOnRectangleIcon,
  EyeIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut } from 'next-auth/react'; // Імпортуємо signOut



interface RestaurantInfo {
  name: string;
  slug: string;
}

interface RestaurantDashboardClientLayoutProps {
  children: ReactNode;
  restaurantId: string;
  restaurantInfo?: RestaurantInfo;
}

interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  onClick?: () => void;
}

const RestaurantDashboardClientLayout = ({ children, restaurantId, restaurantInfo }: RestaurantDashboardClientLayoutProps) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const navigation: NavItem[] = [
    { name: 'Меню', href: `/dashboard/${restaurantId}/menu`, icon: SquaresPlusIcon },
    { name: 'Дизайн', href: `/dashboard/${restaurantId}/design`, icon: PaintBrushIcon },
    { name: 'QR код', href: `/dashboard/${restaurantId}/qr-code`, icon: QrCodeIcon },
    { name: 'Вийти', onClick: async () => await signOut({ redirect: true, callbackUrl: '/' }), icon: ArrowRightStartOnRectangleIcon },
  ];

  // Функція для зміни теми
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Зберігаємо вибір теми в localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Застосовуємо тему до документа
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Відправити кастомну подію для синхронізації з іншими сторінками
    window.dispatchEvent(new CustomEvent('themeChanged'));
  };

  // Завантажуємо збережену тему при завантаженні компонента
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    } else {
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


  // Додаємо CSS стилі для темної теми
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        /* Адаптивний хедер */
        @media (min-width: 640px) {
          .header-content-responsive {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          
          .header-right-responsive {
            width: auto !important;
          }
          
          .preview-button-responsive {
            width: auto !important;
          }
          
          .preview-button-text-responsive {
            display: inline !important;
          }
          
          .preview-button-text-mobile {
            display: none !important;
          }
        }
        
        .preview-button-text-responsive {
          display: none;
        }
        
        .preview-button-text-mobile {
          display: inline;
        }
        
        /* Hover ефект для заголовка */
        .header-title-link:hover {
          opacity: 0.7;
        }
        
        /* Стилі для перемикача теми */
        .theme-toggle-button:hover {
          background-color: #f3f4f6 !important;
          border-color: #9ca3af !important;
        }
        
        .theme-toggle-button:active {
          transform: scale(0.95);
        }
        
        /* Темна тема */
        .dark .nav-container-dark {
          background-color: #111827 !important;
        }
        
        .dark .nav-bottom-dark {
          background-color: #1f2937 !important;
          border-top-color: #374151 !important;
        }
        
        .dark .nav-link-dark {
          color: #d1d5db !important;
        }
        
        .dark .nav-link-dark:hover {
          background-color: #374151 !important;
          color: #d1d5db !important;
        }
        
        .dark .nav-link-active-dark {
          color: #60a5fa !important;
          background-color: #1e3a8a !important;
        }
        
        .dark .sub-menu-dark {
          background-color: #1f2937 !important;
          border-color: #374151 !important;
        }
        
        .dark .sub-menu-item-dark {
          color: #e5e7eb !important;
        }
        
        .dark .sub-menu-item-dark:hover {
          background-color: #374151 !important;
          color: #60a5fa !important;
        }
        
        /* Виправляємо колір іконок в темній темі */
        .dark .nav-link-dark svg {
          color: inherit !important;
        }
        
        /* Стилі для перемикача теми в темній темі */
        .dark .theme-toggle-button {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #d1d5db !important;
        }
        
        .dark .theme-toggle-button:hover {
          background-color: #4b5563 !important;
          border-color: #6b7280 !important;
        }
        
        /* Стилі для хедера в темній темі */
        .dark .header-dark {
          background-color: #1f2937 !important;
          border-bottom-color: #374151 !important;
        }
        
        .dark .header-title-dark {
          color: #f9fafb !important;
        }
        
        .dark .header-subtitle-dark {
          color: #9ca3af !important;
        }
        
        .dark .preview-button-dark {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #d1d5db !important;
        }
        
        .dark .preview-button-dark:hover {
          background-color: #4b5563 !important;
          border-color: #6b7280 !important;
        }
        
        /* Додаткові стилі для хедера в темній темі */
        .dark header {
          background-color: #1f2937 !important;
          border-bottom-color: #374151 !important;
        }
        
        .dark header h1 {
          color: #f9fafb !important;
        }
        
        .dark header p {
          color: #9ca3af !important;
        }
        
        .dark header a {
          color: #d1d5db !important;
        }
        
        /* Більш специфічні стилі для хедера */
        .dark .nav-container-dark header {
          background-color: #1f2937 !important;
          border-bottom-color: #374151 !important;
        }
        
        .dark .nav-container-dark header h1 {
          color: #f9fafb !important;
        }
        
        .dark .nav-container-dark header p {
          color: #9ca3af !important;
        }
        
        .dark .nav-container-dark header a {
          color: #d1d5db !important;
        }
        
        .dark .nav-container-dark header button {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: #d1d5db !important;
        }
        
        .dark .nav-container-dark header button:hover {
          background-color: #4b5563 !important;
          border-color: #6b7280 !important;
        }
        
        /* Стилі для іконок у кнопках хедера */
        .dark .nav-container-dark header button svg {
          color: #d1d5db !important;
          fill: #d1d5db !important;
          stroke: #d1d5db !important;
        }
        
        .dark .nav-container-dark header a svg {
          color: #d1d5db !important;
          fill: #d1d5db !important;
          stroke: #d1d5db !important;
        }
        
        /* Стилі для основного контенту в темній темі */
        .dark .main-content-dark {
          background-color: #111827 !important;
        }
        
        /* Стилі для сторінки меню в темній темі */
        .dark .menu-page-container {
          background-color: #111827 !important;
          color: #f9fafb !important;
        }
        
        /* Стилі для MenuBanner в темній темі */
        .dark .banner-loading-dark {
          background-color: #374151 !important;
          color: #d1d5db !important;
        }
        
        .dark .banner-error-dark {
          background-color: #7f1d1d !important;
          color: #fecaca !important;
        }
        
        .dark .banner-remove-btn-dark {
          background-color: rgba(31, 41, 55, 0.9) !important;
          color: #d1d5db !important;
          border: 1px solid #4b5563 !important;
        }
        
        .dark .banner-remove-btn-dark:hover {
          background-color: rgba(55, 65, 81, 0.9) !important;
        }
        
        .dark .banner-upload-area-dark {
          background-color: #374151 !important;
          color: #d1d5db !important;
          border: 2px dashed #4b5563 !important;
        }
        
        .dark .banner-upload-area-dark:hover {
          background-color: #4b5563 !important;
          border-color: #6b7280 !important;
        }
        
        /* Стилі для CategoryList в темній темі */
        .dark .category-list-container-dark {
          background-color: #111827 !important;
        }
        
        .dark .category-list-title-dark {
          color: #f9fafb !important;
        }
        
        .dark .category-list-subtitle-dark {
          color: #9ca3af !important;
        }
        
        .dark .category-list-add-button-dark {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3) !important;
        }
        
        .dark .category-list-add-button-dark:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%) !important;
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4) !important;
        }
        
        .dark .category-list-categories-container-dark {
          background-color: transparent !important;
        }
        
        .dark .category-list-scroll-container-dark {
          scrollbar-color: rgba(75, 85, 99, 0.3) transparent !important;
        }
        
        .dark .category-list-scroll-container-dark::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.1) !important;
        }
        
        .dark .category-list-scroll-container-dark::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.3) !important;
        }
        
        .dark .category-list-scroll-container-dark::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.5) !important;
        }
        
        .dark .category-list-menu-container-dark {
          background-color: transparent !important;
        }
        
        /* Стилі для CategoryItem в темній темі */
        .dark .category-item-card-dark {
          background: rgba(31, 41, 55, 0.9) !important;
          border-color: rgba(75, 85, 99, 0.8) !important;
          color: #f9fafb !important;
        }
        
        .dark .category-item-card-dark:hover {
          background: rgba(55, 65, 81, 0.9) !important;
          border-color: rgba(59, 130, 246, 0.3) !important;
        }
        
        .dark .category-item-card-dark.active {
          background: rgba(59, 130, 246, 0.2) !important;
          border-color: rgba(59, 130, 246, 0.4) !important;
        }
        
        .dark .category-item-name-dark {
          color: #f9fafb !important;
        }
        
        .dark .category-item-control-dark {
          background: rgba(55, 65, 81, 0.9) !important;
          border-color: rgba(75, 85, 99, 0.8) !important;
          color: #d1d5db !important;
        }
        
        .dark .category-item-control-dark:hover {
          background: rgba(75, 85, 99, 0.9) !important;
          border-color: rgba(59, 130, 246, 0.3) !important;
        }
        
        .dark .category-item-control-dark.editButton {
          background: rgba(16, 185, 129, 0.4) !important;
          border-color: rgba(16, 185, 129, 0.6) !important;
        }
        
        .dark .category-item-control-dark.editButton:hover {
          background: rgba(16, 185, 129, 0.6) !important;
          border-color: rgba(16, 185, 129, 0.8) !important;
        }
        
        .dark .category-item-control-dark.deleteButton {
          background: rgba(239, 68, 68, 0.4) !important;
          border-color: rgba(239, 68, 68, 0.6) !important;
        }
        
        .dark .category-item-control-dark.deleteButton:hover {
          background: rgba(239, 68, 68, 0.6) !important;
          border-color: rgba(239, 68, 68, 0.8) !important;
        }
        
        .dark .category-item-control-dark.moveButton {
          background: rgba(59, 130, 246, 0.3) !important;
          border-color: rgba(59, 130, 246, 0.4) !important;
        }
        
        .dark .category-item-control-dark.moveButton:hover {
          background: rgba(59, 130, 246, 0.4) !important;
          border-color: rgba(59, 130, 246, 0.6) !important;
        }
        
        /* Інвертування іконок для CategoryItem в темній темі */
        .dark .category-item-control-dark .icon,
        .dark .category-item-control-dark .moveIcon,
        .dark .category-item-control-dark svg {
          color: #d1d5db !important;
          fill: #d1d5db !important;
          stroke: #d1d5db !important;
        }
        
        /* Альтернативний спосіб через CSS фільтри 
        .dark .category-item-control-dark svg {
          filter: brightness(0) invert(1) !important;
        }*/
        
        /* Стилі для MenuItem в темній темі */
        .dark .menu-item-dark {
          background: rgba(31, 41, 55, 0.95) !important;
          border-color: rgba(75, 85, 99, 0.8) !important;
        }
        
        .dark .menu-item-dark:hover {
          background: rgba(55, 65, 81, 0.95) !important;
          border-color: rgba(59, 130, 246, 0.3) !important;
        }
        
        .dark .menu-item-name-dark {
          color: #f9fafb !important;
        }
        
        .dark .menu-item-price-dark {
          color: #10b981 !important;
        }
        
        .dark .menu-item-control-dark {
          background: rgba(55, 65, 81, 0.9) !important;
          border-color: rgba(75, 85, 99, 0.8) !important;
          color: #d1d5db !important;
        }
        
        .dark .menu-item-control-dark:hover {
          background: rgba(75, 85, 99, 0.9) !important;
          border-color: rgba(59, 130, 246, 0.3) !important;
        }
        
        .dark .menu-item-control-dark.editButton {
          background: rgba(16, 185, 129, 0.4) !important;
          border-color: rgba(16, 185, 129, 0.6) !important;
        }
        
        .dark .menu-item-control-dark.editButton:hover {
          background: rgba(16, 185, 129, 0.6) !important;
          border-color: rgba(16, 185, 129, 0.8) !important;
        }
        
        .dark .menu-item-control-dark.deleteButton {
          background: rgba(239, 68, 68, 0.4) !important;
          border-color: rgba(239, 68, 68, 0.6) !important;
        }
        
        .dark .menu-item-control-dark.deleteButton:hover {
          background: rgba(239, 68, 68, 0.6) !important;
          border-color: rgba(239, 68, 68, 0.8) !important;
        }
        
        .dark .menu-item-control-dark.moveUpButton,
        .dark .menu-item-control-dark.moveDownButton {
          background: rgba(59, 130, 246, 0.3) !important;
          border-color: rgba(59, 130, 246, 0.4) !important;
        }
        
        .dark .menu-item-control-dark.moveUpButton:hover,
        .dark .menu-item-control-dark.moveDownButton:hover {
          background: rgba(59, 130, 246, 0.4) !important;
          border-color: rgba(59, 130, 246, 0.6) !important;
        }
        
        /* Інвертування іконок для MenuItem в темній темі */
        .dark .menu-item-control-dark .icon,
        .dark .menu-item-control-dark svg {
          color: #d1d5db !important;
          fill:rgb(9, 54, 122) !important;
          stroke: #d1d5db !important;
        }
        
        /* Альтернативний спосіб через CSS фільтри 
        .dark .menu-item-control-dark svg {
          filter: brightness(0) invert(1) !important;
        }*/
        
        /* Стилі для MenuList в темній темі */
        .dark .menu-list-container-dark {
          background: #1f2937 !important;
          border-color: #374151 !important;
        }
        
        .dark .menu-list-header-dark {
          border-bottom-color: #374151 !important;
        }
        
        .dark .menu-list-title-dark {
          color: #f9fafb !important;
        }
        
        .dark .menu-list-add-button-dark {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%) !important;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3) !important;
        }
        
        .dark .menu-list-add-button-dark:hover {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4) !important;
        }
        
        .dark .menu-list-select-category-dark {
          background: #374151 !important;
          border-color: #4b5563 !important;
          color: #d1d5db !important;
        }
        
        .dark .menu-list-empty-state-dark {
          color: #9ca3af !important;
        }
        
        .dark .menu-list-empty-title-dark {
          color: #d1d5db !important;
        }
        
        .dark .menu-list-empty-description-dark {
          color: #9ca3af !important;
        }
        
        .dark .menu-list-grid-dark {
          background: transparent !important;
        }
      `;
      document.head.appendChild(styleSheet);

      return () => {
        document.head.removeChild(styleSheet);
      };
    }
  }, []);

  return (
    <div style={styles.container} className="nav-container-dark">
      {/* Header */}
      <header style={styles.header} className="header-dark">
        <div style={styles.headerContent} className="header-content-responsive">
          <div style={styles.headerLeft}>
            <Link href="/dashboard" style={styles.headerTitleLink} className="header-title-link">
              <h1 style={styles.headerTitle} className="header-title-dark">
                {restaurantInfo?.name || 'Ресторан'}
              </h1>
            </Link>
            <p style={styles.headerSubtitle} className="header-subtitle-dark">
              Панель управління рестораном
            </p>
          </div>
          <div style={styles.headerRight} className="header-right-responsive">
            <button
              onClick={toggleTheme}
              style={styles.themeToggle}
              className="theme-toggle-button"
              title={isDarkMode ? 'Перемкнути на світлу тему' : 'Перемкнути на темну тему'}
            >
              {isDarkMode ? (
                <SunIcon style={styles.themeIcon} />
              ) : (
                <MoonIcon style={styles.themeIcon} />
              )}
            </button>
            <Link
              href={`/menu/${restaurantInfo?.slug}`}
              target="_blank"
              style={styles.previewButton}
              className="preview-button-responsive preview-button-dark"
            >
              <EyeIcon style={styles.buttonIcon} />
              <span style={styles.buttonText} className="preview-button-text-responsive">Попередній перегляд</span>
              <span style={styles.buttonText} className="preview-button-text-mobile">Попередній перегляд</span>
            </Link>
          </div>
        </div>
      </header>

      <main style={styles.mainContent} className="main-content-dark">{children}</main>

      <nav style={styles.bottomNav} className="nav-bottom-dark">
        <ul style={styles.navList}>
          {navigation.map((item) => (
            <li key={item.name} style={styles.navItem}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="nav-link-dark"
                  style={{
                    ...styles.navLink,
                    backgroundColor: 'transparent',
                    border: 'none',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                    e.currentTarget.style.color = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#6b7280';
                  }}
                >
                  <item.icon style={styles.navIcon} />
                  <span style={styles.navText}>{item.name}</span>
                </button>
              ) : (
                <Link
                  href={item.href!}
                  className={`nav-link-dark ${pathname === item.href ? 'nav-link-active-dark' : ''}`}
                  style={pathname === item.href ? { ...styles.navLink, color: '#60a5fa', backgroundColor: '#1e3a8a' } : styles.navLink}
                >
                  <item.icon style={styles.navIcon} />
                  <span style={styles.navText}>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8fafc', // bg-gray-50
    alignItems: 'center',
    position: 'relative',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px 20px',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitleLink: {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  headerTitle: {
    fontSize: '1.875rem', // text-3xl
    fontWeight: '700',
    color: '#111827',
    margin: 0,
    lineHeight: '1.2',
  },
  headerSubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: '4px 0 0 0',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  previewButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    color: '#374151',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    width: '100%',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  buttonIcon: {
    width: '20px',
    height: '20px',
  },
  buttonText: {
    fontSize: '0.875rem',
  },
  themeToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginRight: '12px',
  },
  themeIcon: {
    width: '20px',
    height: '20px',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    paddingTop: '120px', // Додаємо відступ зверху для хедера
    paddingBottom: '100px', // Додаємо відступ знизу для футера
    maxWidth: '600px',
    width: '100%',
  },
  bottomNav: {
    backgroundColor: '#ffffff', // білий фон з тінню
    borderTop: '1px solid #e5e7eb',
    padding: '10px 0',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 -1px 3px 0 rgba(0, 0, 0, 0.1)', // тінь
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 900,
  },
  navList: {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    textAlign: 'center',
    position: 'relative',
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#6b7280',
    padding: '8px',
    borderRadius: '12px', // красиві закруглення
    transition: 'all 0.3s ease', // плавні переходи
    cursor: 'pointer',
  },
  navIcon: {
    width: '24px',
    height: '24px',
    marginBottom: '5px',
    color: 'inherit',
  },
  navText: {
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  subMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subMenu: {
    position: 'absolute',
    bottom: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffffff', // білий фон
    border: '1px solid #e5e7eb',
    borderRadius: '12px', // красиві закруглення
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', // тінь
    zIndex: 10,
    padding: '8px',
    minWidth: '160px',
  },
  subMenuItem: {
    display: 'block',
    padding: '8px 12px',
    textDecoration: 'none',
    color: '#374151',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
    borderRadius: '6px', // красиві закруглення
    transition: 'all 0.2s ease', // плавні переходи
  },
};

export default RestaurantDashboardClientLayout;