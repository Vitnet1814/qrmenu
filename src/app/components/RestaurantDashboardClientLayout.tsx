// app/components/RestaurantDashboardClientLayout.tsx
'use client';

import React, { ReactNode, CSSProperties, useEffect } from 'react';
import { usePathname} from 'next/navigation';
import {
  SquaresPlusIcon,
  PaintBrushIcon,
  QrCodeIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut } from 'next-auth/react'; // Імпортуємо signOut



interface RestaurantDashboardClientLayoutProps {
  children: ReactNode;
  restaurantId: string;
}

interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  onClick?: () => void;
}

const RestaurantDashboardClientLayout = ({ children, restaurantId }: RestaurantDashboardClientLayoutProps) => {
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
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
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