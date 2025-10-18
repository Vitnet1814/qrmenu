'use client';

import React, { useState } from 'react';
import { Button } from './Button';

export interface ColorPickerProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  onChange: (colors: ColorPickerProps['colors']) => void;
}

const predefinedColors = [
  '#8b4513', '#d2691e', '#daa520', // Класичний ресторан
  '#6b4423', '#d4af37', '#c9a96e', // Затишне кафе
  '#ff6b35', '#ffd23f', '#ff1744', // Фаст-фуд
  '#2c5530', '#ff6b6b', '#4ecdc4', // Суши-бар
  '#d32f2f', '#ff9800', '#4caf50', // Піцерія
  '#1976d2', '#424242', '#ff4081', // Модерн
  '#bb86fc', '#03dac6', '#cf6679', // Темна тема
  '#4caf50', '#81c784', '#ffb74d', // Весняна тема
  '#1a1a1a', '#c9a96e', '#d4af37', // Преміум
  '#2563eb', '#64748b', '#f59e0b', // Базові
  '#10b981', '#ef4444', '#8b5cf6', // Додаткові
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onChange }) => {
  const [localColors, setLocalColors] = useState(colors);
  const [activeColorKey, setActiveColorKey] = useState<keyof typeof colors>('primary');

  const handleColorChange = (colorKey: keyof typeof colors, value: string) => {
    const newColors = { ...localColors, [colorKey]: value };
    setLocalColors(newColors);
    onChange(newColors);
  };

  const handlePresetColorSelect = (color: string) => {
    handleColorChange(activeColorKey, color);
  };

  const colorLabels = {
    primary: 'Основний колір',
    secondary: 'Другорядний колір',
    accent: 'Акцентний колір',
    background: 'Колір фону'
  };

  return (
    <div className="ds-space-y-6">
      {/* Вибір кольору для редагування */}
      <div>
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-3">
          Оберіть колір для редагування:
        </h4>
        <div className="ds-grid ds-grid-cols-2 ds-gap-2">
          {Object.entries(colorLabels).map(([key, label]) => (
            <Button
              key={key}
              variant={activeColorKey === key ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveColorKey(key as keyof typeof colors)}
              className="ds-flex ds-items-center ds-gap-2"
            >
              <div
                className="ds-w-4 ds-h-4 ds-rounded ds-border ds-border-gray-300"
                style={{ backgroundColor: localColors[key as keyof typeof colors] }}
              />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Поточний колір */}
      <div>
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-3">
          Поточний колір ({colorLabels[activeColorKey]}):
        </h4>
        <div className="ds-flex ds-items-center ds-gap-4">
          <div
            className="ds-w-16 ds-h-16 ds-rounded-lg ds-border-2 ds-border-gray-300 ds-shadow-sm"
            style={{ backgroundColor: localColors[activeColorKey] }}
          />
          <div className="ds-flex-1">
            <input
              type="text"
              value={localColors[activeColorKey]}
              onChange={(e) => handleColorChange(activeColorKey, e.target.value)}
              className="ds-form-input ds-text-sm ds-font-mono"
              placeholder="#000000"
            />
            <p className="ds-text-xs ds-text-gray-500 ds-mt-1">
              Введіть HEX код кольору
            </p>
          </div>
        </div>
      </div>

      {/* Color picker input */}
      <div>
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-3">
          Виберіть колір:
        </h4>
        <input
          type="color"
          value={localColors[activeColorKey]}
          onChange={(e) => handleColorChange(activeColorKey, e.target.value)}
          className="ds-w-full ds-h-12 ds-rounded-lg ds-border ds-border-gray-300 ds-cursor-pointer"
        />
      </div>

      {/* Попередньо визначені кольори */}
      <div>
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-3">
          Попередньо визначені кольори:
        </h4>
        <div className="ds-grid ds-grid-cols-6 ds-gap-2">
          {predefinedColors.map((color, index) => (
            <button
              key={index}
              className="ds-w-8 ds-h-8 ds-rounded ds-border ds-border-gray-300 ds-shadow-sm ds-hover:scale-110 ds-transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => handlePresetColorSelect(color)}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Попередній перегляд */}
      <div>
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-3">
          Попередній перегляд:
        </h4>
        <div 
          className="ds-p-4 ds-rounded-lg ds-border ds-border-gray-300"
          style={{ backgroundColor: localColors.background }}
        >
          <div className="ds-flex ds-gap-2 ds-mb-3">
            <div
              className="ds-px-3 ds-py-1 ds-rounded ds-text-sm ds-text-white ds-font-medium"
              style={{ backgroundColor: localColors.primary }}
            >
              Основна кнопка
            </div>
            <div
              className="ds-px-3 ds-py-1 ds-rounded ds-text-sm ds-text-white ds-font-medium"
              style={{ backgroundColor: localColors.secondary }}
            >
              Другорядна кнопка
            </div>
            <div
              className="ds-px-3 ds-py-1 ds-rounded ds-text-sm ds-text-white ds-font-medium"
              style={{ backgroundColor: localColors.accent }}
            >
              Акцентна кнопка
            </div>
          </div>
          
          <div className="ds-flex ds-gap-2">
            {Object.entries(localColors).map(([key, color]) => (
              <div
                key={key}
                className="ds-w-6 ds-h-6 ds-rounded ds-border ds-border-gray-300"
                style={{ backgroundColor: color }}
                title={`${key}: ${color}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Кольорові схеми */}
      <div>
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-3">
          Швидкі схеми:
        </h4>
        <div className="ds-grid ds-grid-cols-2 ds-gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const warmScheme = {
                primary: '#d32f2f',
                secondary: '#ff9800',
                accent: '#4caf50',
                background: '#ffebee'
              };
              setLocalColors(warmScheme);
              onChange(warmScheme);
            }}
            className="ds-flex ds-items-center ds-gap-2"
          >
            <div className="ds-flex ds-gap-1">
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#d32f2f' }} />
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#ff9800' }} />
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#4caf50' }} />
            </div>
            Тепла схема
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const coolScheme = {
                primary: '#1976d2',
                secondary: '#424242',
                accent: '#ff4081',
                background: '#e3f2fd'
              };
              setLocalColors(coolScheme);
              onChange(coolScheme);
            }}
            className="ds-flex ds-items-center ds-gap-2"
          >
            <div className="ds-flex ds-gap-1">
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#1976d2' }} />
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#424242' }} />
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#ff4081' }} />
            </div>
            Холодна схема
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const neutralScheme = {
                primary: '#6b4423',
                secondary: '#d4af37',
                accent: '#c9a96e',
                background: '#f4f1eb'
              };
              setLocalColors(neutralScheme);
              onChange(neutralScheme);
            }}
            className="ds-flex ds-items-center ds-gap-2"
          >
            <div className="ds-flex ds-gap-1">
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#6b4423' }} />
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#d4af37' }} />
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#c9a96e' }} />
            </div>
            Нейтральна схема
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const vibrantScheme = {
                primary: '#ff6b35',
                secondary: '#ffd23f',
                accent: '#ff1744',
                background: '#ffe8e0'
              };
              setLocalColors(vibrantScheme);
              onChange(vibrantScheme);
            }}
            className="ds-flex ds-items-center ds-gap-2"
          >
            <div className="ds-flex ds-gap-1">
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#ff6b35' }} />
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#ffd23f' }} />
              <div className="ds-w-3 ds-h-3 ds-rounded" style={{ backgroundColor: '#ff1744' }} />
            </div>
            Яскрава схема
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
