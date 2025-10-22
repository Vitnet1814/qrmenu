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
    <div className="ds-card ds-card-body ds-space-y-6">
      {/* Заголовок */}
      <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-4">
        Своя тема
      </h3>

      {/* Вибір кольору для редагування */}
      <div>
        <h4 className="ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-3">
          Оберіть колір для редагування:
        </h4>
        <div className="ds-grid ds-grid-cols-3 ds-gap-2">
          {Object.entries(colorLabels).map(([key, label]) => (
            <Button
              key={key}
              variant={activeColorKey === key ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveColorKey(key as keyof typeof colors)}
              className="ds-flex ds-items-center ds-gap-2 ds-text-xs"
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

      {/* Поточний колір та вибір кольору в одному ряду */}
      <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-4">
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
                className="ds-form-input ds-text-sm ds-font-mono ds-w-full"
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
            className="ds-w-full ds-h-16 ds-rounded-lg ds-border ds-border-gray-300 ds-cursor-pointer"
          />
        </div>
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
              className="ds-w-8 ds-h-8 ds-rounded ds-border ds-border-gray-300 ds-shadow-sm ds-transition-transform ds-hover:scale-110"
              style={{ backgroundColor: color }}
              onClick={() => handlePresetColorSelect(color)}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
