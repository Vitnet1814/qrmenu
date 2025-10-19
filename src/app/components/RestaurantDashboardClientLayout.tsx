// app/components/RestaurantDashboardClientLayout.tsx
'use client';

import React, { ReactNode, CSSProperties, useEffect } from 'react';
import { usePathname} from 'next/navigation';
import {
  SquaresPlusIcon,
  PaintBrushIcon,
  QrCodeIcon,
  ArrowRightStartOnRectangleIcon,
  EyeIcon,
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
  const navigation: NavItem[] = [
    { name: 'Меню', href: `/dashboard/${restaurantId}/menu`, icon: SquaresPlusIcon },
    { name: 'Дизайн', href: `/dashboard/${restaurantId}/design`, icon: PaintBrushIcon },
    { name: 'QR код', href: `/dashboard/${restaurantId}/qr-code`, icon: QrCodeIcon },
    { name: 'Вийти', onClick: async () => await signOut({ redirect: true, callbackUrl: '/' }), icon: ArrowRightStartOnRectangleIcon },
  ];


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
        
        /* Темна тема */
        @media (prefers-color-scheme: dark) {
          .nav-container-dark {
            background-color: #111827 !important;
          }
          
          .nav-bottom-dark {
            background-color: #1f2937 !important;
            border-top-color: #374151 !important;
          }
          
          .nav-link-dark {
            color: #d1d5db !important;
          }
          
          .nav-link-dark:hover {
            background-color: #374151 !important;
            color: #d1d5db !important;
          }
          
          .nav-link-active-dark {
            color: #60a5fa !important;
            background-color: #1e3a8a !important;
          }
          
          .sub-menu-dark {
            background-color: #1f2937 !important;
            border-color: #374151 !important;
          }
          
          .sub-menu-item-dark {
            color: #e5e7eb !important;
          }
          
          .sub-menu-item-dark:hover {
            background-color: #374151 !important;
            color: #60a5fa !important;
          }
          
          /* Виправляємо колір іконок в темній темі */
          .nav-link-dark svg {
            color: inherit !important;
          }
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
      <header style={styles.header}>
        <div style={styles.headerContent} className="header-content-responsive">
          <div style={styles.headerLeft}>
            <Link href="/dashboard" style={styles.headerTitleLink} className="header-title-link">
              <h1 style={styles.headerTitle}>
                {restaurantInfo?.name || 'Ресторан'}
              </h1>
            </Link>
            <p style={styles.headerSubtitle}>
              Панель управління рестораном
            </p>
          </div>
          <div style={styles.headerRight} className="header-right-responsive">
            <Link
              href={`/menu/${restaurantInfo?.slug}`}
              target="_blank"
              style={styles.previewButton}
              className="preview-button-responsive"
            >
              <EyeIcon style={styles.buttonIcon} />
              <span style={styles.buttonText} className="preview-button-text-responsive">Попередній перегляд</span>
              <span style={styles.buttonText} className="preview-button-text-mobile">Попередній перегляд</span>
            </Link>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>{children}</main>

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
    zIndex: 1000,
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