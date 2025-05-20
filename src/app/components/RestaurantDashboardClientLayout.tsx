// app/components/RestaurantDashboardClientLayout.tsx
'use client';

import React, { ReactNode, useState, CSSProperties, useEffect } from 'react';
import { usePathname} from 'next/navigation';
import {
  SquaresPlusIcon,
  PaintBrushIcon,
  QrCodeIcon,
  EllipsisHorizontalIcon, // Можемо використовувати цю іконку для "Ще"
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut } from 'next-auth/react'; // Імпортуємо signOut



interface RestaurantDashboardClientLayoutProps {
  children: ReactNode;
  restaurantId: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  hasSubMenu?: boolean;
  subMenu?: { name: string; onClick?: () => void; href?: string }[]; // onClick для дій
}

const RestaurantDashboardClientLayout = ({ children, restaurantId }: RestaurantDashboardClientLayoutProps) => {
  const pathname = usePathname();
  const [restaurantSlug, setRestaurantSlug] = useState<string | null>(null);
  // const [isLoadingSlug, setIsLoadingSlug] = useState(true);
  // const router = useRouter();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
useEffect(() => {
      const fetchRestaurantSlug = async () => {
        // setIsLoadingSlug(true);
        try {
          const response = await fetch(`/api/restaurants/id/${restaurantId}`);
          if (response.ok) {
            const data = await response.json();
            setRestaurantSlug(data?.slug || null);
          } else {
            console.error('Failed to fetch restaurant slug');
          }
        } catch (error) {
          console.error('Error fetching restaurant slug:', error);
        } finally {
          // setIsLoadingSlug(false);
        }
      };
  
      if (restaurantId) {
        fetchRestaurantSlug();
      }
    }, [restaurantId]);
  const navigation: NavItem[] = [
    { name: 'Меню', href: `/dashboard/${restaurantId}/menu`, icon: SquaresPlusIcon },
    { name: 'Дизайн', href: `/dashboard/${restaurantId}/design`, icon: PaintBrushIcon },
    { name: 'QR код', href: `/dashboard/${restaurantId}/qr-code`, icon: QrCodeIcon },
    {
      name: 'Ще',
      href: '#',
      icon: EllipsisHorizontalIcon,
      hasSubMenu: true,
      subMenu: [
        { name: 'Переглянути меню', href: `/menu/${restaurantSlug}` },
        { name: 'Вийти', onClick: async () => await signOut({ redirect: true, callbackUrl: '/' }) }, // Додаємо onClick для виходу
      ],
    },
  ];

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div style={styles.container}>
      <main style={styles.mainContent}>{children}</main>

      <nav style={styles.bottomNav}>
        <ul style={styles.navList}>
          {navigation.map((item) => (
            <li key={item.name} style={styles.navItem}>
              {item.hasSubMenu && item.subMenu ? (
                <div style={styles.subMenuContainer}>
                 <button
                    onClick={toggleSubMenu}
                    style={pathname === '#' ? { ...styles.navLink, color: 'red' } : styles.navLink} // Adjust styles based on condition
                  >
                    <item.icon style={styles.navIcon} />
                    <span style={styles.navText}>{item.name}</span>
                  </button>

                  {isSubMenuOpen && (
                    <div style={styles.subMenu}>
                      {item.subMenu.map((subItem) => (
                        <React.Fragment key={subItem.name}>
                          {subItem.onClick ? (
                            <button onClick={subItem.onClick} style={styles.subMenuItem}>
                              {subItem.name}
                            </button>
                          ) : (
                            <Link href={subItem.href!} style={styles.subMenuItem}>
                              {subItem.name}
                            </Link>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                      href={item.href}
                      style={pathname === item.href ? { ...styles.navLink, color: 'blue' } : styles.navLink} // Apply conditional styles
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
    backgroundColor: 'white',
    alignItems: 'center',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    maxWidth: '600px',
    width: '100%',
  },
  bottomNav: {
    backgroundColor: '#f8f8f8',
    borderTop: '1px solid #e0e0e0',
    padding: '10px 0',
    maxWidth: '600px',
    width: '100%',
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
    position: 'relative', // Для абсолютно позиціонованого підменю
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    // You can add other static styles here
  },
  // other styles...

  navIcon: {
    width: '24px',
    height: '24px',
    marginBottom: '5px',
    color: 'inherit',
  },
  navText: {
    fontSize: '0.8rem',
  },
  subMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subMenu: {
    position: 'absolute',
    bottom: '60px', // Розміщуємо над нижньою навігацією
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    padding: '10px',
  },
  subMenuItem: {
    display: 'block',
    padding: '8px 15px',
    textDecoration: 'none',
    color: '#333',
    fontSize: '0.9rem',
    // '&:hover': {
    //   backgroundColor: '#f0f0f0',
    // },
    border: 'none',
    background: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    width: '100%',
  },
};

export default RestaurantDashboardClientLayout;