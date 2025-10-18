'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  preview: string;
  category: 'restaurant' | 'cafe' | 'fast-food' | 'bar' | 'modern' | 'premium';
}

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  setThemeById: (themeId: string) => void;
  availableThemes: Theme[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: Theme = {
  id: 'modern',
  name: 'Модерн',
  description: 'Сучасна тема з синіми та сірими тонами для модерних закладів',
  colors: {
    primary: '#1976d2',
    secondary: '#424242',
    accent: '#ff4081',
    background: '#e3f2fd'
  },
  preview: '🏢',
  category: 'modern'
};

const themes: Theme[] = [
  {
    id: 'classic-restaurant',
    name: 'Класичний ресторан',
    description: 'Елегантна тема з теплими коричневими тонами для класичних ресторанів',
    colors: {
      primary: '#8b4513',
      secondary: '#d2691e',
      accent: '#daa520',
      background: '#f5e6d3'
    },
    preview: '🍽️',
    category: 'restaurant'
  },
  {
    id: 'cozy-cafe',
    name: 'Затишне кафе',
    description: 'Тепла та затишна тема з натуральними кольорами для кафе',
    colors: {
      primary: '#6b4423',
      secondary: '#d4af37',
      accent: '#c9a96e',
      background: '#f4f1eb'
    },
    preview: '☕',
    category: 'cafe'
  },
  {
    id: 'fast-food',
    name: 'Фаст-фуд',
    description: 'Яскрава та енергійна тема з червоними та жовтими акцентами',
    colors: {
      primary: '#ff6b35',
      secondary: '#ffd23f',
      accent: '#ff1744',
      background: '#ffe8e0'
    },
    preview: '🍔',
    category: 'fast-food'
  },
  {
    id: 'sushi-bar',
    name: 'Суши-бар',
    description: 'Мінімалістична тема з зеленими та червоними акцентами',
    colors: {
      primary: '#2c5530',
      secondary: '#ff6b6b',
      accent: '#4ecdc4',
      background: '#e8f5e8'
    },
    preview: '🍣',
    category: 'bar'
  },
  {
    id: 'pizzeria',
    name: 'Піцерія',
    description: 'Італійська тема з червоними, помаранчевими та зеленими кольорами',
    colors: {
      primary: '#d32f2f',
      secondary: '#ff9800',
      accent: '#4caf50',
      background: '#ffebee'
    },
    preview: '🍕',
    category: 'restaurant'
  },
  {
    id: 'modern',
    name: 'Модерн',
    description: 'Сучасна тема з синіми та сірими тонами для модерних закладів',
    colors: {
      primary: '#1976d2',
      secondary: '#424242',
      accent: '#ff4081',
      background: '#e3f2fd'
    },
    preview: '🏢',
    category: 'modern'
  },
  {
    id: 'dark',
    name: 'Темна тема',
    description: 'Стильна темна тема з фіолетовими та блакитними акцентами',
    colors: {
      primary: '#bb86fc',
      secondary: '#03dac6',
      accent: '#cf6679',
      background: '#121212'
    },
    preview: '🌙',
    category: 'modern'
  },
  {
    id: 'spring',
    name: 'Весняна тема',
    description: 'Свіжа та життєрадісна тема з зеленими та жовтими тонами',
    colors: {
      primary: '#4caf50',
      secondary: '#81c784',
      accent: '#ffb74d',
      background: '#e8f5e8'
    },
    preview: '🌸',
    category: 'cafe'
  },
  {
    id: 'premium',
    name: 'Преміум',
    description: 'Розкішна тема з чорними та золотими акцентами для преміум закладів',
    colors: {
      primary: '#1a1a1a',
      secondary: '#c9a96e',
      accent: '#d4af37',
      background: '#f5f5f5'
    },
    preview: '👑',
    category: 'premium'
  }
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Завантаження теми з localStorage при ініціалізації
  useEffect(() => {
    const savedThemeId = localStorage.getItem('qr-menu-theme');
    const savedDarkMode = localStorage.getItem('qr-menu-dark-mode') === 'true';
    
    if (savedThemeId) {
      const theme = themes.find(t => t.id === savedThemeId);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
    
    setIsDarkMode(savedDarkMode);
  }, []);

  // Застосування теми до документа
  useEffect(() => {
    const root = document.documentElement;
    
    // Встановлення data-theme атрибута
    root.setAttribute('data-theme', currentTheme.id);
    
    // Встановлення CSS змінних для кольорів
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Встановлення темного режиму
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    }
  }, [currentTheme, isDarkMode]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('qr-menu-theme', theme.id);
  };

  const setThemeById = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setTheme(theme);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('qr-menu-dark-mode', newDarkMode.toString());
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    setThemeById,
    availableThemes: themes,
    isDarkMode,
    toggleDarkMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Хук для отримання поточного кольору теми
export const useThemeColor = (colorKey: keyof Theme['colors']): string => {
  const { currentTheme } = useTheme();
  return currentTheme.colors[colorKey];
};

// Хук для перевірки чи поточна тема є темною
export const useIsDarkTheme = (): boolean => {
  const { currentTheme } = useTheme();
  return currentTheme.id === 'dark';
};

export default ThemeProvider;
