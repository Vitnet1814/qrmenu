'use client';

import React, { useState } from 'react';

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
  restaurantName: string;
}

export interface DesignTipsProps {
  theme: Theme;
  layoutSettings: LayoutSettings;
}

// Готові теми
export const themes: Theme[] = [
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
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Оберіть колір для редагування:
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(colorLabels).map(([key, label]) => (
            <button
              key={key}
              className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                activeColorKey === key
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
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
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
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
              className="w-full px-3 py-2 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
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
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Попередньо визначені кольори:
        </h4>
        <div className="grid grid-cols-6 gap-2">
          {predefinedColors.map((color, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded border border-gray-300 shadow-sm hover:scale-110 transition-transform"
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
    { value: 'minimal' as const, label: 'Мінімальне', description: '2px' },
    { value: 'medium' as const, label: 'Середнє', description: '8px' },
    { value: 'large' as const, label: 'Велике', description: '16px' }
  ];

  const paddingOptions = [
    { value: 'compact' as const, label: 'Компактні', description: '8px' },
    { value: 'normal' as const, label: 'Звичайні', description: '16px' },
    { value: 'spacious' as const, label: 'Великі', description: '24px' }
  ];

  const shadowOptions = [
    { value: 'minimal' as const, label: 'Мінімальні', description: 'Легка тінь' },
    { value: 'normal' as const, label: 'Звичайні', description: 'Помірна тінь' },
    { value: 'dramatic' as const, label: 'Драматичні', description: 'Сильна тінь' }
  ];

  const getBorderRadiusClass = (value: LayoutSettings['borderRadius']) => {
    switch (value) {
      case 'minimal': return 'rounded-sm';
      case 'medium': return 'rounded-md';
      case 'large': return 'rounded-lg';
      default: return 'rounded-md';
    }
  };

  const getPaddingClass = (value: LayoutSettings['padding']) => {
    switch (value) {
      case 'compact': return 'p-2';
      case 'normal': return 'p-4';
      case 'spacious': return 'p-6';
      default: return 'p-4';
    }
  };

  const getShadowClass = (value: LayoutSettings['shadow']) => {
    switch (value) {
      case 'minimal': return 'shadow-sm';
      case 'normal': return 'shadow-md';
      case 'dramatic': return 'shadow-lg';
      default: return 'shadow-md';
    }
  };

  return (
    <div className="space-y-6">
      {/* Закруглення кутів */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Закруглення кутів:
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {borderRadiusOptions.map((option) => (
            <button
              key={option.value}
              className={`flex flex-col items-center gap-1 h-auto py-3 px-2 rounded-md border transition-colors ${
                localSettings.borderRadius === option.value
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleSettingChange('borderRadius', option.value)}
            >
              <div 
                className={`w-8 h-8 bg-gray-200 border border-gray-300 ${getBorderRadiusClass(option.value)}`}
              />
              <span className="text-xs font-medium">{option.label}</span>
              <span className="text-xs opacity-70">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Відступи */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Відступи:
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {paddingOptions.map((option) => (
            <button
              key={option.value}
              className={`flex flex-col items-center gap-1 h-auto py-3 px-2 rounded-md border transition-colors ${
                localSettings.padding === option.value
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleSettingChange('padding', option.value)}
            >
              <div 
                className={`w-8 h-8 bg-gray-200 border border-gray-300 relative ${getPaddingClass(option.value)}`}
              >
                <div className="absolute inset-1 bg-white border border-gray-400 rounded-sm" />
              </div>
              <span className="text-xs font-medium">{option.label}</span>
              <span className="text-xs opacity-70">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Тіні */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Тіні:
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {shadowOptions.map((option) => (
            <button
              key={option.value}
              className={`flex flex-col items-center gap-1 h-auto py-3 px-2 rounded-md border transition-colors ${
                localSettings.shadow === option.value
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleSettingChange('shadow', option.value)}
            >
              <div 
                className={`w-8 h-8 bg-white border border-gray-300 ${getShadowClass(option.value)}`}
              />
              <span className="text-xs font-medium">{option.label}</span>
              <span className="text-xs opacity-70">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Попередній перегляд */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Попередній перегляд:
        </h4>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div 
            className={`bg-white border border-gray-200 mb-3 ${getBorderRadiusClass(localSettings.borderRadius)} ${getPaddingClass(localSettings.padding)} ${getShadowClass(localSettings.shadow)}`}
          >
            <h5 className="text-sm font-semibold text-gray-900 mb-2">
              Приклад картки меню
            </h5>
            <p className="text-xs text-gray-600 mb-2">
              Опис страви з використанням поточних налаштувань макету
            </p>
            <div className="flex gap-2">
              <div className={`px-3 py-1 bg-blue-500 text-white text-xs font-medium ${getBorderRadiusClass(localSettings.borderRadius)}`}>
                Кнопка
              </div>
              <div className={`px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium ${getBorderRadiusClass(localSettings.borderRadius)}`}>
                Другорядна
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Закруглення: {borderRadiusOptions.find(o => o.value === localSettings.borderRadius)?.description}</p>
            <p>• Відступи: {paddingOptions.find(o => o.value === localSettings.padding)?.description}</p>
            <p>• Тіні: {shadowOptions.find(o => o.value === localSettings.shadow)?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент LivePreview
export const LivePreview: React.FC<LivePreviewProps> = ({ 
  theme, 
  layoutSettings, 
  restaurantName = 'Назва ресторану' 
}) => {
  const getBorderRadiusClass = (value: LayoutSettings['borderRadius']) => {
    switch (value) {
      case 'minimal': return 'rounded-sm';
      case 'medium': return 'rounded-md';
      case 'large': return 'rounded-lg';
      default: return 'rounded-md';
    }
  };

  const getPaddingClass = (value: LayoutSettings['padding']) => {
    switch (value) {
      case 'compact': return 'p-2';
      case 'normal': return 'p-4';
      case 'spacious': return 'p-6';
      default: return 'p-4';
    }
  };

  const getShadowClass = (value: LayoutSettings['shadow']) => {
    switch (value) {
      case 'minimal': return 'shadow-sm';
      case 'normal': return 'shadow-md';
      case 'dramatic': return 'shadow-lg';
      default: return 'shadow-md';
    }
  };

  const borderRadiusClass = getBorderRadiusClass(layoutSettings.borderRadius);
  const paddingClass = getPaddingClass(layoutSettings.padding);
  const shadowClass = getShadowClass(layoutSettings.shadow);

  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Попередній перегляд меню
        </h3>
        <p className="text-sm text-gray-600">
          Як виглядатиме ваше меню з поточними налаштуваннями
        </p>
      </div>

      {/* Мобільний попередній перегляд */}
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Заголовок ресторану */}
        <div 
          className={`text-center py-6 px-4 ${shadowClass}`}
          style={{ 
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            color: theme.colors.text === '#ffffff' ? '#ffffff' : '#ffffff'
          }}
        >
          <h1 className="text-xl font-bold mb-1">{restaurantName}</h1>
          <p className="text-sm opacity-90">Ресторан української кухні</p>
        </div>

        {/* Категорії */}
        <div className="p-4" style={{ backgroundColor: theme.colors.background }}>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <div 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${borderRadiusClass} ${shadowClass}`}
              style={{ 
                backgroundColor: theme.colors.primary,
                color: '#ffffff'
              }}
            >
              Гарячі страви
            </div>
            <div 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${borderRadiusClass} ${shadowClass}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.primary}20`
              }}
            >
              Салати
            </div>
            <div 
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${borderRadiusClass} ${shadowClass}`}
              style={{ 
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.primary}20`
              }}
            >
              Напої
            </div>
          </div>

          {/* Страви */}
          <div className="space-y-3">
            {/* Страва 1 */}
            <div 
              className={`bg-white ${borderRadiusClass} ${paddingClass} ${shadowClass}`}
              style={{ border: `1px solid ${theme.colors.primary}10` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 
                    className="text-base font-semibold mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    Борщ український
                  </h3>
                  <p 
                    className="text-sm mb-2"
                    style={{ color: theme.colors.text, opacity: 0.7 }}
                  >
                    Традиційний український борщ зі сметаною та зеленню
                  </p>
                </div>
                <div 
                  className="text-lg font-bold ml-2"
                  style={{ color: theme.colors.primary }}
                >
                  120₴
                </div>
              </div>
              <div className="flex gap-2">
                <div 
                  className={`px-3 py-1 text-xs font-medium ${borderRadiusClass}`}
                  style={{ 
                    backgroundColor: theme.colors.accent,
                    color: '#ffffff'
                  }}
                >
                  Гаряче
                </div>
                <div 
                  className={`px-3 py-1 text-xs font-medium ${borderRadiusClass}`}
                  style={{ 
                    backgroundColor: theme.colors.secondary,
                    color: '#ffffff'
                  }}
                >
                  Вегетаріанське
                </div>
              </div>
            </div>

            {/* Страва 2 */}
            <div 
              className={`bg-white ${borderRadiusClass} ${paddingClass} ${shadowClass}`}
              style={{ border: `1px solid ${theme.colors.primary}10` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 
                    className="text-base font-semibold mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    Вареники з картоплею
                  </h3>
                  <p 
                    className="text-sm mb-2"
                    style={{ color: theme.colors.text, opacity: 0.7 }}
                  >
                    Домашні вареники з картоплею та цибулею
                  </p>
                </div>
                <div 
                  className="text-lg font-bold ml-2"
                  style={{ color: theme.colors.primary }}
                >
                  95₴
                </div>
              </div>
              <div className="flex gap-2">
                <div 
                  className={`px-3 py-1 text-xs font-medium ${borderRadiusClass}`}
                  style={{ 
                    backgroundColor: theme.colors.accent,
                    color: '#ffffff'
                  }}
                >
                  Популярне
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div 
          className="text-center py-3 px-4"
          style={{ 
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            borderTop: `1px solid ${theme.colors.primary}20`
          }}
        >
          <p className="text-xs opacity-70">
            Скануйте QR-код для перегляду повного меню
          </p>
        </div>
      </div>

      {/* Кольорова палітра */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Поточна кольорова палітра:
        </h4>
        <div className="grid grid-cols-6 gap-2">
          {Object.entries(theme.colors).map(([key, color]) => (
            <div key={key} className="text-center">
              <div
                className="w-8 h-8 rounded border border-gray-300 mb-1 mx-auto"
                style={{ backgroundColor: color }}
                title={`${key}: ${color}`}
              />
              <p className="text-xs text-gray-600 capitalize">{key}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Компонент DesignTips
export const DesignTips: React.FC<DesignTipsProps> = ({ theme, layoutSettings }) => {
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
                activeTip === tip.id ? 'shadow-md scale-105' : 'hover:shadow-sm'
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
