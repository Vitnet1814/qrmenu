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
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut } from 'next-auth/react';



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
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  const navigation: NavItem[] = [
    { name: 'Меню', href: `/dashboard/${restaurantId}/menu`, icon: SquaresPlusIcon },
    { name: 'Дизайн', href: `/dashboard/${restaurantId}/design`, icon: PaintBrushIcon },
    { name: 'QR код', href: `/dashboard/${restaurantId}/qr-code`, icon: QrCodeIcon },
    { name: 'Вийти', onClick: async () => await signOut({ redirect: true, callbackUrl: '/' }), icon: ArrowRightStartOnRectangleIcon },
  ];


  // Функція для прокрутки до початку сторінки
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  // Слухач події scroll для показу/приховування кнопки Scroll to Top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 300); // Показуємо кнопку після прокрутки на 300px
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // Додаємо CSS стилі для адаптивності
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        /* Адаптивний хедер */
        @media (max-width: 640px) {
          .header-content-responsive {
            flex-direction: row !important;
            justify-content: space-between !important;
          }
          
          .header-right-responsive {
            width: auto !important;
          }
        }
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
          
          .header-subtitle-responsive {
            display: block !important;
          }
        }
        
        /* Приховуємо підзаголовок на мобільних пристроях */
        .header-subtitle-responsive {
          display: none;
        }
        
        .preview-button-text-responsive {
          display: none;
        }
        
        .preview-button-text-mobile {
          display: inline;
        }
        
        /* Стилі для мобільної кнопки попереднього перегляду */
        @media (max-width: 639px) {
          .preview-button-responsive {
            padding: 6px 12px !important;
            font-size: 0.75rem !important;
            width: auto !important;
            min-width: auto !important;
          }
          
          .preview-button-responsive .button-icon-mobile {
            width: 16px !important;
            height: 16px !important;
          }
        }
        
        /* Hover ефект для заголовка */
        .header-title-link:hover {
          opacity: 0.7;
        }
        
        /* Шрифти для дизайн-системи */
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-roboto { font-family: 'Roboto', sans-serif; }
        .font-open-sans { font-family: 'Open Sans', sans-serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-nunito { font-family: 'Nunito', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-merriweather { font-family: 'Merriweather', serif; }
        .font-crimson { font-family: 'Crimson Text', serif; }
        .font-libre { font-family: 'Libre Baskerville', serif; }
        .font-source { font-family: 'Source Serif Pro', serif; }
      `;
      document.head.appendChild(styleSheet);

      return () => {
        document.head.removeChild(styleSheet);
      };
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent} className="header-content-responsive">
          <div style={styles.headerLeft}>
            <Link href="/dashboard" style={styles.headerTitleLink} className="header-title-link">
              <h1 style={styles.headerTitle}>
                {restaurantInfo?.name || 'Ресторан'}
              </h1>
           
            <p style={styles.headerSubtitle} className="header-subtitle-responsive">
              Панель управління
            </p> </Link>
          </div>
          <div style={styles.headerRight} className="header-right-responsive">
            <Link
              href={`/menu/${restaurantInfo?.slug}`}
              target="_blank"
              style={styles.previewButton}
              className="preview-button-responsive" >
              <EyeIcon style={styles.buttonIcon} className="button-icon-mobile" />   <span style={styles.buttonText}>Попередній перегляд</span>
              
            </Link>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>{children}</main>

      <nav style={styles.bottomNav}>
        <ul style={styles.navList}>
          {navigation.map((item) => (
            <li key={item.name} style={styles.navItem}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
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

      {/* Scroll to Top кнопка */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          style={styles.scrollToTopButton}
          className="scroll-to-top-button"
          title="Повернутися на початок"
        >
          <ChevronUpIcon style={styles.scrollToTopIcon} />
        </button>
      )}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
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
  themeIcon: {
    width: '20px',
    height: '20px',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    paddingTop: '120px', // Додаємо відступ зверху для хедера
    paddingBottom: '100px', // Додаємо відступ знизу для футера
    width: '100%',
    maxWidth: '600px',
  },
  bottomNav: {
    backgroundColor: '#ffffff', // білий фон з тінню
    borderTop: '1px solid #e5e7eb',
    padding: '10px 0',
    width: '100%',
    maxWidth: '600px',
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
  scrollToTopButton: {
    position: 'fixed',
    bottom: '120px', // Розміщуємо вище навігації
    right: '20px',
    width: '50px',
    height: '50px',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '50%',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    opacity: 0.9,
  },
  scrollToTopIcon: {
    width: '24px',
    height: '24px',
  },
};

export default RestaurantDashboardClientLayout;