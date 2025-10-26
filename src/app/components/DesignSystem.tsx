'use client';

import React, { useState, useEffect } from 'react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  preview: string;
  category: 'restaurant' | 'cafe' | 'fast-food' | 'bar' | 'modern' | 'premium';
}

export interface LayoutSettings {
  borderRadius: 'minimal' | 'medium' | 'large';
  padding: 'compact' | 'normal' | 'spacious';
  shadow: 'minimal' | 'normal' | 'dramatic';
  fontFamily: 'inter' | 'roboto' | 'opensans' | 'lato' | 'montserrat' | 'poppins' | 'nunito' | 'playfair' | 'merriweather' | 'crimson' | 'libre' | 'source';
}

export interface ColorPickerProps {
  colors: Theme['colors'];
  onChange: (colors: Theme['colors']) => void;
}

export interface LayoutSettingsProps {
  settings: LayoutSettings;
  onChange: (settings: LayoutSettings) => void;
}

export interface LivePreviewProps {
  theme: Theme;
  layoutSettings: LayoutSettings;
  restaurantId?: string;
}

export interface DesignTipsProps {
  theme: Theme;
}

// Готові теми
export const themes: Theme[] = [
  {
    id: 'default',
    name: 'За замовчуванням',
    description: 'Базова тема з нейтральними кольорами для будь-якого типу закладу',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#1e293b'
    },
    preview: '🎨',
    category: 'modern'
  },
  {
    id: 'classic-restaurant',
    name: 'Класичний ресторан',
    description: 'Елегантна тема з теплими коричневими тонами для класичних ресторанів',
    colors: {
      primary: '#8b4513',
      secondary: '#d2691e',
      accent: '#daa520',
      background: '#f5e6d3',
      surface: '#ffffff',
      text: '#2c1810'
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
      background: '#f4f1eb',
      surface: '#ffffff',
      text: '#2c1810'
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
      background: '#ffe8e0',
      surface: '#ffffff',
      text: '#2c1810'
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
      background: '#e8f5e8',
      surface: '#ffffff',
      text: '#1a2e1a'
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
      background: '#ffebee',
      surface: '#ffffff',
      text: '#2c1810'
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
      background: '#e3f2fd',
      surface: '#ffffff',
      text: '#333333'
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
      background: '#121212',
      surface: '#1e1e1e',
      text: '#ffffff'
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
      background: '#e8f5e8',
      surface: '#ffffff',
      text: '#1a2e1a'
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
      background: '#f5f5f5',
      surface: '#ffffff',
      text: '#2c1810'
    },
    preview: '👑',
    category: 'premium'
  }
];

// Компонент ColorPicker
export const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onChange }) => {
  const [localColors, setLocalColors] = useState(colors);
  const [activeColorKey, setActiveColorKey] = useState<keyof Theme['colors']>('primary');

  const handleColorChange = (colorKey: keyof Theme['colors'], value: string) => {
    const newColors = { ...localColors, [colorKey]: value };
    setLocalColors(newColors);
    onChange(newColors);
  };

  const colorLabels = {
    primary: 'Основний колір',
    secondary: 'Другорядний колір',
    accent: 'Акцентний колір',
    background: 'Колір фону',
    surface: 'Колір поверхні',
    text: 'Колір тексту'
  };

  const predefinedColors = [
    '#8b4513', '#d2691e', '#daa520', '#6b4423', '#d4af37', '#c9a96e',
    '#ff6b35', '#ffd23f', '#ff1744', '#2c5530', '#ff6b6b', '#4ecdc4',
    '#d32f2f', '#ff9800', '#4caf50', '#1976d2', '#424242', '#ff4081',
    '#bb86fc', '#03dac6', '#cf6679', '#4caf50', '#81c784', '#ffb74d',
    '#1a1a1a', '#c9a96e', '#d4af37', '#2563eb', '#64748b', '#f59e0b'
  ];

  return (
    <div className="space-y-6">
      {/* Вибір кольору для редагування */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Оберіть колір для редагування:
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(colorLabels).map(([key, label]) => (
            <button
              key={key}
              className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                activeColorKey === key
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
              onClick={() => setActiveColorKey(key as keyof Theme['colors'])}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{ backgroundColor: localColors[key as keyof Theme['colors']] }}
                />
                <span className="text-xs">{label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Поточний колір */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Поточний колір ({colorLabels[activeColorKey]}):
        </h4>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-sm"
            style={{ backgroundColor: localColors[activeColorKey] }}
          />
          <div className="flex-1">
            <input
              type="text"
              value={localColors[activeColorKey]}
              onChange={(e) => handleColorChange(activeColorKey, e.target.value)}
              className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded-md bg-white text-gray-900"
              placeholder="#000000"
            />
            <p className="text-xs text-gray-500 mt-1">
              Введіть HEX код кольору
            </p>
          </div>
        </div>
      </div>

      {/* Color picker input */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Виберіть колір:
        </h4>
        <input
          type="color"
          value={localColors[activeColorKey]}
          onChange={(e) => handleColorChange(activeColorKey, e.target.value)}
          className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
        />
      </div>

      {/* Попередньо визначені кольори */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Попередньо визначені кольори:
        </h4>
        <div className="grid grid-cols-6 gap-2">
          {predefinedColors.map((color, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded border border-gray-300 shadow-sm transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(activeColorKey, color)}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Попередній перегляд */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Попередній перегляд:
        </h4>
        <div 
          className="p-4 rounded-lg border border-gray-300"
          style={{ backgroundColor: localColors.background }}
        >
          <div className="flex gap-2 mb-3">
            <div
              className="px-3 py-1 rounded text-sm text-white font-medium"
              style={{ backgroundColor: localColors.primary }}
            >
              Основна кнопка
            </div>
            <div
              className="px-3 py-1 rounded text-sm text-white font-medium"
              style={{ backgroundColor: localColors.secondary }}
            >
              Другорядна кнопка
            </div>
            <div
              className="px-3 py-1 rounded text-sm text-white font-medium"
              style={{ backgroundColor: localColors.accent }}
            >
              Акцентна кнопка
            </div>
          </div>
          
          <div 
            className="p-3 rounded mb-3"
            style={{ backgroundColor: localColors.surface }}
          >
            <p 
              className="text-sm font-medium mb-1"
              style={{ color: localColors.text }}
            >
              Приклад тексту на поверхні
            </p>
            <p 
              className="text-xs"
              style={{ color: localColors.text }}
            >
              Додатковий опис з використанням кольору тексту
            </p>
          </div>
          
          <div className="flex gap-2">
            {Object.entries(localColors).map(([key, color]) => (
              <div
                key={key}
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: color }}
                title={`${key}: ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент LayoutSettings
export const LayoutSettings: React.FC<LayoutSettingsProps> = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState<LayoutSettings>(settings);

  const handleSettingChange = <K extends keyof LayoutSettings>(
    key: K,
    value: LayoutSettings[K]
  ) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onChange(newSettings);
  };

  const borderRadiusOptions = [
    { value: 'minimal' as const, label: 'Мінімальне' },
    { value: 'medium' as const, label: 'Середнє' },
    { value: 'large' as const, label: 'Велике' }
  ];

  const paddingOptions = [
    { value: 'compact' as const, label: 'Компактні' },
    { value: 'normal' as const, label: 'Звичайні' },
    { value: 'spacious' as const, label: 'Великі' }
  ];

  const shadowOptions = [
    { value: 'minimal' as const, label: 'Мінімальні' },
    { value: 'normal' as const, label: 'Звичайні' },
    { value: 'dramatic' as const, label: 'Драматичні' }
  ];

  const fontOptions = [
    { value: 'inter' as const, label: 'Inter' },
    { value: 'roboto' as const, label: 'Roboto' },
    { value: 'opensans' as const, label: 'Open Sans' },
    { value: 'lato' as const, label: 'Lato' },
    { value: 'montserrat' as const, label: 'Montserrat' },
    { value: 'poppins' as const, label: 'Poppins' },
    { value: 'nunito' as const, label: 'Nunito' },
    { value: 'playfair' as const, label: 'Playfair Display' },
    { value: 'merriweather' as const, label: 'Merriweather' },
    { value: 'crimson' as const, label: 'Crimson Text' },
    { value: 'libre' as const, label: 'Libre Baskerville' },
    { value: 'source' as const, label: 'Source Serif Pro' }
  ];


  return (
    <div className="ds-card ds-card-body ds-space-y-6">
      <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-4">
        Налаштування макету
      </h3>

      {/* Закруглення кутів */}
      <div className="ds-flex ds-items-center ds-justify-between ds-gap-4">
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-flex-shrink-0">
          Закруглення кутів:
        </h4>
        <select
          value={localSettings.borderRadius}
          onChange={(e) => handleSettingChange('borderRadius', e.target.value as LayoutSettings['borderRadius'])}
          className="ds-flex-1 ds-px-4 ds-py-3 ds-border ds-border-gray-300 ds-rounded-lg ds-bg-white ds-text-gray-900 ds-focus:outline-none ds-focus:ring-2 ds-focus:ring-blue-500 ds-focus:border-transparent"
        >
          {borderRadiusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Відступи */}
      <div className="ds-flex ds-items-center ds-justify-between ds-gap-4">
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-flex-shrink-0">
          Відступи:
        </h4>
        <select
          value={localSettings.padding}
          onChange={(e) => handleSettingChange('padding', e.target.value as LayoutSettings['padding'])}
          className="ds-flex-1 ds-px-4 ds-py-3 ds-border ds-border-gray-300 ds-rounded-lg ds-bg-white ds-text-gray-900 ds-focus:outline-none ds-focus:ring-2 ds-focus:ring-blue-500 ds-focus:border-transparent"
        >
          {paddingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Тіні */}
      <div className="ds-flex ds-items-center ds-justify-between ds-gap-4">
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-flex-shrink-0">
          Тіні:
        </h4>
        <select
          value={localSettings.shadow}
          onChange={(e) => handleSettingChange('shadow', e.target.value as LayoutSettings['shadow'])}
          className="ds-flex-1 ds-px-4 ds-py-3 ds-border ds-border-gray-300 ds-rounded-lg ds-bg-white ds-text-gray-900 ds-focus:outline-none ds-focus:ring-2 ds-focus:ring-blue-500 ds-focus:border-transparent"
        >
          {shadowOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Шрифти */}
      <div className="ds-flex ds-items-center ds-justify-between ds-gap-4">
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-flex-shrink-0">
          Шрифти:
        </h4>
        <select
          value={localSettings.fontFamily}
          onChange={(e) => handleSettingChange('fontFamily', e.target.value as LayoutSettings['fontFamily'])}
          className="ds-flex-1 ds-px-4 ds-py-3 ds-border ds-border-gray-300 ds-rounded-lg ds-bg-white ds-text-gray-900 ds-focus:outline-none ds-focus:ring-2 ds-focus:ring-blue-500 ds-focus:border-transparent"
        >
          {fontOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Компонент LivePreview
export const LivePreview: React.FC<LivePreviewProps> = ({ 
  theme, 
  layoutSettings,
  restaurantId
}) => {
  const [restaurantData, setRestaurantData] = useState<{
    name: string, 
    banner?: string,
    description?: string,
    categories?: Array<{name: string, items: Array<{name: string, price: number, description?: string, image?: string}>}>
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Завантаження даних ресторану з оптимізованого API
  useEffect(() => {
    const loadRestaurantData = async () => {
      if (!restaurantId) {
        // Якщо немає restaurantId, використовуємо мок дані
        setRestaurantData({
          name: 'Назва ресторану',
          description: 'Ресторан української кухні',
          banner: undefined,
          categories: [
            {
              name: 'Гарячі страви',
              items: [
                { name: 'Борщ український', price: 120, description: 'Традиційний український борщ зі сметаною та зеленню' },
                { name: 'Вареники з картоплею', price: 95, description: 'Домашні вареники з картоплею та цибулею' }
              ]
            }
          ]
        });
        return;
      }

      setIsLoading(true);
      try {
        // Завантажуємо всі дані одним API запитом
        const response = await fetch(`/api/menu-preview/${restaurantId}`);
        
        if (!response.ok) {
          throw new Error('Помилка завантаження даних ресторану');
        }

        const data = await response.json();
        
        // Форматуємо дані для компонента
        setRestaurantData({
          name: data.restaurant?.name || 'Назва ресторану',
          description: 'Ресторан української кухні',
          banner: data.banner?.image,
          categories: data.categories?.length > 0 ? data.categories.map((cat: any) => ({
            name: cat.name,
            items: cat.items?.map((item: any) => ({
              name: item.name,
              price: item.price,
              description: item.description,
              image: item.image
            })) || []
          })) : [
            {
              name: 'Гарячі страви',
              items: [
                { name: 'Борщ український', price: 120, description: 'Традиційний український борщ зі сметаною та зеленню' },
                { name: 'Вареники з картоплею', price: 95, description: 'Домашні вареники з картоплею та цибулею' }
              ]
            }
          ]
        });
      } catch (error) {
        console.error('Помилка завантаження даних ресторану:', error);
        // Fallback до мок даних при помилці
        setRestaurantData({
          name: 'Назва ресторану',
          description: 'Ресторан української кухні',
          banner: undefined,
          categories: [
            {
              name: 'Гарячі страви',
              items: [
                { name: 'Борщ український', price: 120, description: 'Традиційний український борщ зі сметаною та зеленню' },
                { name: 'Вареники з картоплею', price: 95, description: 'Домашні вареники з картоплею та цибулею' }
              ]
            }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurantData();
  }, [restaurantId]);

  const getBorderRadiusClass = (value: LayoutSettings['borderRadius']) => {
    switch (value) {
      case 'minimal': return 'ds-rounded-sm';
      case 'medium': return 'ds-rounded-md';
      case 'large': return 'ds-rounded-lg';
      default: return 'ds-rounded-md';
    }
  };

  const getPaddingClass = (value: LayoutSettings['padding']) => {
    switch (value) {
      case 'compact': return 'ds-p-2';
      case 'normal': return 'ds-p-4';
      case 'spacious': return 'ds-p-6';
      default: return 'ds-p-4';
    }
  };

  const getShadowClass = (value: LayoutSettings['shadow']) => {
    switch (value) {
      case 'minimal': return 'ds-shadow-sm';
      case 'normal': return 'ds-shadow-md';
      case 'dramatic': return 'ds-shadow-lg';
      default: return 'ds-shadow-md';
    }
  };

  const getFontFamilyClass = (value: LayoutSettings['fontFamily']) => {
    switch (value) {
      case 'inter': return 'font-inter';
      case 'roboto': return 'font-roboto';
      case 'opensans': return 'font-open-sans';
      case 'lato': return 'font-lato';
      case 'montserrat': return 'font-montserrat';
      case 'poppins': return 'font-poppins';
      case 'nunito': return 'font-nunito';
      case 'playfair': return 'font-playfair';
      case 'merriweather': return 'font-merriweather';
      case 'crimson': return 'font-crimson';
      case 'libre': return 'font-libre';
      case 'source': return 'font-source';
      default: return 'font-inter';
    }
  };

  const borderRadiusClass = getBorderRadiusClass(layoutSettings.borderRadius);
  const paddingClass = getPaddingClass(layoutSettings.padding);
  const shadowClass = getShadowClass(layoutSettings.shadow);
  const fontFamilyClass = getFontFamilyClass(layoutSettings.fontFamily);

  if (isLoading) {
    return (
      <div className={`ds-card ds-card-body ${fontFamilyClass}`}>
        <div className="ds-flex ds-items-center ds-justify-center ds-py-12">
          <div className="ds-text-center">
            <div className="ds-animate-spin ds-rounded-full ds-h-8 ds-w-8 ds-border-b-2 ds-border-primary ds-mx-auto ds-mb-4"></div>
            <p className="ds-text-gray-600">Завантаження даних ресторану...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ds-card ds-flex ds-justify-center ds-items-start ds-py-8 ${fontFamilyClass}`}>
      {/* Контейнер з емуляцією телефону */}
      <div 
        className="ds-relative phone-container"
        style={{
          width: '350px',
          height: '700px',
          minWidth: '350px',
          maxWidth: '100%'
        }}
      >
        {/* Зображення frame поверх всього */}
        <img 
          src="/phone-frame.png" 
          alt="Phone frame" 
          className="ds-absolute ds-top-0 ds-left-0 ds-w-full ds-h-full ds-pointer-events-none ds-z-10"
          draggable={false}
          style={{ objectFit: 'contain' }}
        />
        
        {/* Контент всередині екрану телефону */}
        <div 
          className="ds-absolute ds-flex ds-flex-col phone-content"
          style={{
            top: '50px',    // підгонка під розташування екрану в frame
            left: '20px',
            width: '310px',
            height: '600px',
            zIndex: 1
          }}
        >
          {/* Скролований контент */}
          <div 
            className="ds-flex-1 ds-overflow-y-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            } as React.CSSProperties}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
              @media (max-width: 420px) {
                :global(.phone-container) {
                  width: 280px !important;
                  height: 560px !important;
                  min-width: 280px !important;
                }
                :global(.phone-content) {
                  top: 40px !important;
                  left: 16px !important;
                  width: 248px !important;
                  height: 480px !important;
                }
                :global(.phone-content h1) {
                  font-size: 1rem !important;
                }
                :global(.phone-content h3) {
                  font-size: 0.875rem !important;
                }
                :global(.phone-content h4) {
                  font-size: 0.75rem !important;
                }
                :global(.phone-content p) {
                  font-size: 0.625rem !important;
                }
                :global(.phone-content .ds-text-sm) {
                  font-size: 0.625rem !important;
                }
                :global(.phone-content .ds-text-base) {
                  font-size: 0.75rem !important;
                }
                :global(.phone-content .ds-text-lg) {
                  font-size: 0.875rem !important;
                }
                :global(.phone-content .ds-text-xl) {
                  font-size: 1rem !important;
                }
              }
              @media (max-width: 360px) {
                :global(.phone-container) {
                  width: 240px !important;
                  height: 480px !important;
                  min-width: 240px !important;
                }
                :global(.phone-content) {
                  top: 34px !important;
                  left: 14px !important;
                  width: 212px !important;
                  height: 410px !important;
                }
                :global(.phone-content h1) {
                  font-size: 0.875rem !important;
                }
                :global(.phone-content h3) {
                  font-size: 0.75rem !important;
                }
                :global(.phone-content h4) {
                  font-size: 0.625rem !important;
                }
                :global(.phone-content p) {
                  font-size: 0.5rem !important;
                }
                :global(.phone-content .ds-text-sm) {
                  font-size: 0.5rem !important;
                }
                :global(.phone-content .ds-text-base) {
                  font-size: 0.625rem !important;
                }
                :global(.phone-content .ds-text-lg) {
                  font-size: 0.75rem !important;
                }
                :global(.phone-content .ds-text-xl) {
                  font-size: 0.875rem !important;
                }
              }
            `}</style>
            <div 
              className={`ds-w-full ds-min-h-full ${shadowClass}`}
              style={{ backgroundColor: theme.colors.background }}
            >
          {/* Банер ресторану */}
          {restaurantData?.banner && (
            <div 
              className="ds-w-full ds-h-48 ds-bg-cover ds-bg-center"
              style={{backgroundImage: `url(${restaurantData.banner})`}}
            />
          )}
          
        {/* Назва ресторану */}
        <div 
          className={`ds-text-center ds-py-6 ds-px-4`}
          style={{ 
            background: restaurantData?.banner 
              ? theme.colors.surface
              : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            color: restaurantData?.banner ? theme.colors.text : '#ffffff'
          }}
        >
            <h1 className="ds-text-xl ds-font-bold ds-mb-1">
              {restaurantData?.name || 'Назва ресторану'}
            </h1>
          </div>

          {/* Категорії */}
          <div className={`${paddingClass}`} style={{ backgroundColor: theme.colors.background }}>
            {restaurantData?.categories && restaurantData.categories.length > 0 && (
              <div 
                className="ds-flex ds-gap-2 ds-mb-4 ds-overflow-x-auto" 
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitScrollbar: 'none'
                } as React.CSSProperties}
              >
                
                {restaurantData.categories.map((category, index) => (
                  <div 
                    key={category.name}
                    className={`ds-px-4 ds-py-2 ds-text-sm ds-font-medium ds-whitespace-nowrap ${borderRadiusClass} ${shadowClass}`}
                    style={{ 
                      backgroundColor: index === 0 ? theme.colors.primary : theme.colors.surface,
                      color: index === 0 ? '#ffffff' : theme.colors.text,
                      border: index === 0 ? 'none' : `1px solid ${theme.colors.primary}20`
                    }}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}

            {/* Страви */}
            <div className="ds-space-y-4">
              {restaurantData?.categories && restaurantData.categories.length > 0 ? (
                restaurantData.categories.map((category, categoryIndex) => (
                  <div key={category.name} className="ds-space-y-3">
                    {/* Назва категорії */}
                    <h3 
                      className="ds-text-lg ds-font-semibold ds-text-center"
                      style={{ color: theme.colors.text }}
                    >
                      {category.name}
                    </h3>
                    
                    {/* Страви категорії */}
                    {category.items && category.items.length > 0 ? (
                      category.items.map((item, itemIndex) => (
                      <div 
                        key={`${category.name}-${item.name}`}
                        className={`${borderRadiusClass} ${shadowClass} ds-overflow-hidden`}
                        style={{ 
                          backgroundColor: theme.colors.surface,
                          border: `1px solid ${theme.colors.primary}10` 
                        }}
                      >
                        {/* Фото страви на всю ширину */}
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="ds-w-full ds-h-32 ds-object-cover"
                          />
                        )}
                        
                        {/* Інформація про страву */}
                        <div className={paddingClass}>
                          <div className="ds-flex ds-justify-between ds-items-start ds-mb-2">
                            <h4 
                              className="ds-text-base ds-font-semibold ds-flex-1"
                              style={{ color: theme.colors.text }}
                            >
                              {item.name}
                            </h4>
                            <div 
                              className="ds-text-lg ds-font-bold ds-ml-2"
                              style={{ color: theme.colors.primary }}
                            >
                              {item.price}₴
                            </div>
                          </div>
                          {item.description && (
                            <p 
                              className="ds-text-sm"
                              style={{ color: theme.colors.text, opacity: 0.7 }}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      ))
                    ) : (
                      <div 
                        className={`${borderRadiusClass} ${paddingClass}`}
                        style={{ 
                          backgroundColor: theme.colors.background,
                          border: `1px solid ${theme.colors.primary}10` 
                        }}
                      >
                        <p 
                          className="ds-text-sm ds-text-center"
                          style={{ color: theme.colors.text, opacity: 0.6 }}
                        >
                          Немає страв в цій категорії
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                // Fallback мок дані
                <div className="ds-space-y-3">
                  <h3 
                    className="ds-text-lg ds-font-semibold ds-text-center"
                    style={{ color: theme.colors.text }}
                  >
                    Гарячі страви
                  </h3>
                  <div 
                    className={`${borderRadiusClass} ${paddingClass} ${shadowClass}`}
                    style={{ 
                      backgroundColor: theme.colors.surface,
                      border: `1px solid ${theme.colors.primary}10` 
                    }}
                  >
                    <div className="ds-flex ds-justify-between ds-items-start ds-mb-2">
                      <div className="ds-flex-1">
                        <h4 
                          className="ds-text-base ds-font-semibold ds-mb-1"
                          style={{ color: theme.colors.text }}
                        >
                          Борщ український
                        </h4>
                        <p 
                          className="ds-text-sm ds-mb-2"
                          style={{ color: theme.colors.text, opacity: 0.7 }}
                        >
                          Традиційний український борщ зі сметаною та зеленню
                        </p>
                      </div>
                      <div 
                        className="ds-text-lg ds-font-bold ds-ml-2"
                        style={{ color: theme.colors.primary }}
                      >
                        120₴
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Футер */}
          <div 
            className="ds-flex-shrink-0 ds-text-center ds-py-3 ds-px-4"
            style={{ 
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              borderTop: `1px solid ${theme.colors.primary}20`
            }}
          >
            {/* <p className="ds-text-xs ds-opacity-70">
              Скануйте QR-код для перегляду повного меню
            </p> */}
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент DesignTips
export const DesignTips: React.FC<DesignTipsProps> = ({ theme }) => {
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const getTips = () => {
    const tips = [];

    // Поради по кольорах
    const primaryLuminance = getLuminance(theme.colors.primary);
    const textLuminance = getLuminance(theme.colors.text);
    const backgroundLuminance = getLuminance(theme.colors.background);

    if (Math.abs(primaryLuminance - backgroundLuminance) < 0.3) {
      tips.push({
        id: 'contrast-primary',
        title: 'Низький контраст',
        description: 'Основний колір та фон мають низький контраст. Рекомендуємо використовувати більш контрастні кольори для кращої читабельності.',
        level: 'warning'
      });
    }

    if (Math.abs(textLuminance - backgroundLuminance) < 0.2) {
      tips.push({
        id: 'contrast-text',
        title: 'Проблема з читабельністю',
        description: 'Колір тексту та фону мають занадто низький контраст. Це може ускладнити читання меню.',
        level: 'warning'
      });
    }

    // Позитивні поради
    if (Math.abs(primaryLuminance - backgroundLuminance) > 0.5) {
      tips.push({
        id: 'good-contrast',
        title: 'Відмінний контраст',
        description: 'Основний колір та фон мають відмінний контраст. Це забезпечує чудову читабельність меню.',
        level: 'success'
      });
    }

    return tips;
  };

  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const tips = getTips();

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Поради для кращого дизайну
        </h3>
        <p className="text-sm text-gray-600">
          Рекомендації для покращення вигляду вашого меню
        </p>
      </div>

      {tips.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-sm text-gray-600">
            Відмінно! Ваш дизайн виглядає чудово без додаткових рекомендацій.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${getLevelColor(tip.level)} ${
                activeTip === tip.id ? 'shadow-md scale-105' : ''
              }`}
              onClick={() => setActiveTip(activeTip === tip.id ? null : tip.id)}
            >
              <div className="flex items-start gap-3">
                <div className="text-lg flex-shrink-0">
                  {tip.level === 'success' ? '✨' : tip.level === 'warning' ? '⚠️' : 'ℹ️'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold">{tip.title}</h4>
                  </div>
                  <p className="text-sm opacity-90">
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Загальні рекомендації */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Загальні рекомендації:
        </h4>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-blue-500">💡</span>
            <div>
              <p className="text-xs font-medium text-gray-900">Тестування</p>
              <p className="text-xs text-gray-600">Перевірте меню на різних пристроях</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">📱</span>
            <div>
              <p className="text-xs font-medium text-gray-900">Мобільність</p>
              <p className="text-xs text-gray-600">Оптимізуйте для мобільних екранів</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-500">⚡</span>
            <div>
              <p className="text-xs font-medium text-gray-900">Швидкість</p>
              <p className="text-xs text-gray-600">Зберігайте зображення оптимізованими</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-500">🎯</span>
            <div>
              <p className="text-xs font-medium text-gray-900">Цільова аудиторія</p>
              <p className="text-xs text-gray-600">Враховуйте стиль вашого закладу</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
