'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import { ColorPicker } from './ColorPicker';

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

export interface ThemePreviewProps {
  onThemeSelect?: (theme: Theme) => void;
  selectedTheme?: string;
  showCustomization?: boolean;
  onCustomize?: (theme: Theme) => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  onThemeSelect,
  selectedTheme,
  showCustomization = false,
  onCustomize
}) => {
  const [currentTheme, setCurrentTheme] = useState<string>(selectedTheme || 'modern');
  const [customTheme, setCustomTheme] = useState<Theme | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (selectedTheme) {
      setCurrentTheme(selectedTheme);
    }
  }, [selectedTheme]);

  const handleThemeSelect = (theme: Theme) => {
    setCurrentTheme(theme.id);
    onThemeSelect?.(theme);
  };

  const handleCustomize = (theme: Theme) => {
    setCustomTheme(theme);
    setShowColorPicker(true);
    onCustomize?.(theme);
  };

  const handleColorChange = (colors: Theme['colors']) => {
    if (customTheme) {
      const updatedTheme = { ...customTheme, colors };
      setCustomTheme(updatedTheme);
    }
  };

  const applyCustomTheme = () => {
    if (customTheme) {
      setCurrentTheme('custom');
      onThemeSelect?.(customTheme);
      setShowColorPicker(false);
    }
  };

  const getThemeById = (id: string) => {
    return themes.find(theme => theme.id === id) || themes[0];
  };

  const currentThemeData = currentTheme === 'custom' && customTheme 
    ? customTheme 
    : getThemeById(currentTheme);

  return (
    <div className="ds-p-6">
      <div className="ds-mb-8">
        <h2 className="ds-text-3xl ds-font-bold ds-text-gray-900 ds-mb-2">
          Виберіть тему для вашого закладу
        </h2>
        <p className="ds-text-gray-600 ds-text-lg">
          Оберіть готову тему або створіть власну унікальну
        </p>
      </div>

      {/* Поточний попередній перегляд */}
      <div className="ds-mb-8">
        <h3 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
          Поточний вигляд
        </h3>
        <div 
          className="ds-card ds-p-6 ds-rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${currentThemeData.colors.background} 0%, ${currentThemeData.colors.primary}20 100%)`,
            border: `2px solid ${currentThemeData.colors.primary}40`
          }}
        >
          <div className="ds-flex ds-items-center ds-gap-4 ds-mb-4">
            <div 
              className="ds-w-12 ds-h-12 ds-rounded-full ds-flex ds-items-center ds-justify-center ds-text-2xl"
              style={{ backgroundColor: currentThemeData.colors.primary }}
            >
              {currentThemeData.preview}
            </div>
            <div>
              <h4 className="ds-text-lg ds-font-semibold" style={{ color: currentThemeData.colors.primary }}>
                {currentThemeData.name}
              </h4>
              <p className="ds-text-sm ds-text-gray-600">
                {currentThemeData.description}
              </p>
            </div>
          </div>
          
          <div className="ds-grid ds-grid-cols-3 ds-gap-4 ds-mb-4">
            <div 
              className="ds-btn ds-btn-primary ds-text-sm"
              style={{ backgroundColor: currentThemeData.colors.primary }}
            >
              Основна кнопка
            </div>
            <div 
              className="ds-btn ds-btn-secondary ds-text-sm"
              style={{ backgroundColor: currentThemeData.colors.secondary }}
            >
              Другорядна кнопка
            </div>
            <div 
              className="ds-btn ds-btn-accent ds-text-sm"
              style={{ backgroundColor: currentThemeData.colors.accent }}
            >
              Акцентна кнопка
            </div>
          </div>

          <div className="ds-flex ds-gap-2">
            {Object.entries(currentThemeData.colors).map(([key, color]) => (
              <div
                key={key}
                className="ds-w-8 ds-h-8 ds-rounded ds-shadow-sm"
                style={{ backgroundColor: color }}
                title={`${key}: ${color}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Сітка тем */}
      <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3 ds-gap-6 ds-mb-8">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`ds-cursor-pointer ds-transition-all ds-duration-300 ${
              currentTheme === theme.id 
                ? 'ds-ring-2 ds-ring-primary ds-ring-offset-2' 
                : 'ds-hover:shadow-lg ds-hover:scale-105'
            }`}
            onClick={() => handleThemeSelect(theme)}
          >
            <CardHeader>
              <div className="ds-flex ds-items-center ds-gap-3">
                <div 
                  className="ds-w-10 ds-h-10 ds-rounded-full ds-flex ds-items-center ds-justify-center ds-text-xl"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  {theme.preview}
                </div>
                <div>
                  <CardTitle className="ds-text-lg">{theme.name}</CardTitle>
                  <p className="ds-text-sm ds-text-gray-600 ds-mt-1">
                    {theme.category}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="ds-text-sm ds-text-gray-700 ds-mb-4">
                {theme.description}
              </p>
              
              <div className="ds-flex ds-gap-2 ds-mb-4">
                {Object.entries(theme.colors).map(([key, color]) => (
                  <div
                    key={key}
                    className="ds-w-6 ds-h-6 ds-rounded ds-shadow-sm ds-border ds-border-gray-200"
                    style={{ backgroundColor: color }}
                    title={`${key}: ${color}`}
                  />
                ))}
              </div>

              <div className="ds-flex ds-gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="ds-flex-1"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  Застосувати
                </Button>
                {showCustomization && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handleCustomize(theme);
                    }}
                  >
                    Налаштувати
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Кастомізація кольорів */}
      {showColorPicker && customTheme && (
        <div className="ds-fixed ds-inset-0 ds-bg-black ds-bg-opacity-50 ds-flex ds-items-center ds-justify-center ds-z-50">
          <div className="ds-bg-white ds-rounded-xl ds-p-6 ds-max-w-md ds-w-full ds-mx-4">
            <h3 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
              Налаштування кольорів
            </h3>
            
            <ColorPicker
              colors={customTheme.colors}
              onChange={handleColorChange}
            />
            
            <div className="ds-flex ds-gap-3 ds-mt-6">
              <Button
                variant="primary"
                onClick={applyCustomTheme}
                className="ds-flex-1"
              >
                Застосувати
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowColorPicker(false)}
                className="ds-flex-1"
              >
                Скасувати
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePreview;
