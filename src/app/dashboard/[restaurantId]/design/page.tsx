"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  themes, 
  Theme, 
  LayoutSettings, 
  ColorPicker, 
  LayoutSettings as LayoutSettingsComponent, 
  LivePreview
} from '../../../components/DesignSystem';
import { LoadingSpinner, ErrorState } from '../../../components/ui/LoadingStates';

interface Params {
  restaurantId: string;
  [key: string]: string | string[];
}

interface DesignSettings {
  theme: Theme;
  layout: LayoutSettings;
}

const DesignSettingsPage = () => {
  const params = useParams<Params>();
  const restaurantId = params?.restaurantId;

  const [settings, setSettings] = useState<DesignSettings>({
    theme: themes[5], // Модерн за замовчуванням
    layout: {
      borderRadius: 'medium',
      padding: 'normal',
      shadow: 'normal',
      fontFamily: 'inter'
    }
  });

  const [selectedThemeId, setSelectedThemeId] = useState<string>('modern');
  const [showCustomTheme, setShowCustomTheme] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Завантаження налаштувань з API
  useEffect(() => {
    const loadSettings = async () => {
      if (!restaurantId) return;
      
      try {
        const response = await fetch(`/api/restaurants/${restaurantId}/design-settings`);
        if (response.ok) {
          const data = await response.json();
          setSettings({
            theme: themes.find(t => t.id === data.theme.id) || themes[5],
            layout: data.layout
          });
        }
      } catch (error) {
        console.error('Помилка завантаження налаштувань:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [restaurantId]);


  const handleThemeChange = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
    // Автозбереження при виборі теми
    saveSettings({ ...settings, theme });
  };

  const handleThemeSelectChange = (themeId: string) => {
    setSelectedThemeId(themeId);
    if (themeId === 'custom') {
      setShowCustomTheme(true);
    } else {
      setShowCustomTheme(false);
      const selectedTheme = themes.find(t => t.id === themeId);
      if (selectedTheme) {
        handleThemeChange(selectedTheme);
      }
    }
  };

  const saveSettings = async (newSettings: DesignSettings) => {
    if (!restaurantId) return;
    
    try {
      const response = await fetch(`/api/restaurants/${restaurantId}/design-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: {
            id: newSettings.theme.id,
            name: newSettings.theme.name,
            colors: newSettings.theme.colors
          },
          layout: newSettings.layout
        }),
      });

      if (response.ok) {
        console.log('Налаштування збережено');
      }
    } catch (error) {
      console.error('Помилка збереження:', error);
    }
  };

  const handleColorChange = (colors: Theme['colors']) => {
    const newSettings = {
      ...settings,
      theme: { ...settings.theme, colors }
    };
    setSettings(newSettings);
    // Автозбереження при зміні кольорів
    saveSettings(newSettings);
  };

  const handleLayoutChange = (layout: LayoutSettings) => {
    const newSettings = { ...settings, layout };
    setSettings(newSettings);
    // Автозбереження при зміні макету
    saveSettings(newSettings);
  };


  if (!restaurantId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorState 
          title="Помилка"
          message="ID ресторану не знайдено"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          text="Завантаження налаштувань дизайну..." 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="ds-mb-8">
          <h1 className="ds-text-3xl ds-font-bold ds-text-gray-900 ds-mb-6">
            Налаштування дизайну
          </h1>
        </div>
        {/* Селект тем */}
        <div className="ds-mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Готові теми
          </h2>
          <select
            value={selectedThemeId}
            onChange={(e) => handleThemeSelectChange(e.target.value)}
            className="ds-w-full ds-px-4 ds-py-3 ds-border ds-border-gray-300 ds-rounded-lg ds-bg-white ds-text-gray-900 ds-focus:outline-none ds-focus:ring-2 ds-focus:ring-blue-500 ds-focus:border-transparent"
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
            <option value="custom">Своя тема - &quot;Зроби сам&quot;</option>
          </select>
        </div>

        {/* Кастомізація кольорів (тільки для своєї теми) */}
        {showCustomTheme && (
          <div className="ds-mb-8">
            <ColorPicker
              colors={settings.theme.colors}
              onChange={handleColorChange}
            />
          </div>
        )}

        {/* Основні налаштування */}
        <div className="ds-grid ds-grid-cols-1 ds-gap-8">
          {/* Ліва колонка - Налаштування */}
          <div className="ds-space-y-8">

            {/* Налаштування макету */}
            <LayoutSettingsComponent
              settings={settings.layout}
              onChange={handleLayoutChange}
            />
          </div>

          {/* Права колонка - Попередній перегляд */}
          <div className="ds-space-y-8">
            {/* Заголовок попереднього перегляду */}
            <div>
              <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-2">
                Попередній перегляд меню
              </h2>
              <p className="ds-text-gray-600 ds-mb-6">
                Як виглядатиме ваше меню з поточними налаштуваннями
              </p>
            </div>
            
            {/* Live попередній перегляд */}
            <LivePreview
              theme={settings.theme}
              layoutSettings={settings.layout}
            />

            {/* Загальні рекомендації */}
            <div className="ds-card ds-card-body">
              <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-4">
                Загальні рекомендації
              </h3>
              <div className="ds-space-y-3 ds-text-sm ds-text-gray-600">
                <p>• Використовуйте контрастні кольори для кращої читабельності</p>
                <p>• Обмежте кількість кольорів до 3-4 основних</p>
                <p>• Перевірте вигляд меню на мобільних пристроях</p>
                <p>• Зберігайте консистентність у дизайні</p>
                <p>• Використовуйте якісні зображення страв</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSettingsPage;
