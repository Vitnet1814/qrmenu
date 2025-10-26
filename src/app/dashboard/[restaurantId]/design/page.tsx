"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  themes, 
  Theme, 
  LayoutSettings, 
  LayoutSettings as LayoutSettingsComponent, 
  LivePreview
} from '../../../components/DesignSystem';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle } from '../../../components/design-system';
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
    theme: themes[0], // За замовчуванням
    layout: {
      borderRadius: 'medium',
      padding: 'normal',
      shadow: 'normal',
      fontFamily: 'inter'
    }
  });

  const [selectedThemeId, setSelectedThemeId] = useState<string>('default');

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
            theme: themes.find(t => t.id === data.theme.id) || themes[0],
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
    const selectedTheme = themes.find(t => t.id === themeId);
    if (selectedTheme) {
      handleThemeChange(selectedTheme);
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
        {/* Готові теми */}
        <Card className="ds-mb-8">
          <CardHeader>
            <CardTitle>🎨 Готові теми</CardTitle>
            <CardSubtitle>Оберіть тему для вашого меню</CardSubtitle>
          </CardHeader>
          <CardBody>
            <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-3 ds-lg:grid-cols-5 ds-gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelectChange(theme.id)}
                  className={`ds-p-4 ds-rounded-lg ds-border-2 ds-transition-all ds-text-center ${
                    selectedThemeId === theme.id 
                      ? 'ds-border-primary ds-bg-primary ds-bg-opacity-10' 
                      : 'ds-border-gray-200 ds-bg-white hover:ds-border-gray-300'
                  }`}
                >
                  <div className="ds-text-2xl ds-mb-2">{theme.preview}</div>
                  <div className="ds-text-sm ds-font-medium ds-text-gray-900">
                    {theme.name}
                  </div>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Live попередній перегляд */}
        <div className="ds-mb-8">
          <div className="ds-mb-6">
            <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-2">
              Попередній перегляд меню
            </h2>
            <p className="ds-text-gray-600">
              Як виглядатиме ваше меню з поточними налаштуваннями
            </p>
          </div>
          
          <LivePreview
            theme={settings.theme}
            layoutSettings={settings.layout}
            restaurantId={restaurantId}
          />
        </div>

        {/* Основні налаштування */}
        <div className="ds-grid ds-grid-cols-1 ds-gap-8">
          {/* Ліва колонка - Налаштування */}
          <div className="ds-space-y-8">
          </div>

          {/* Права колонка - Налаштування макету та рекомендації */}
          <div className="ds-space-y-8">
            {/* Налаштування макету */}
            <LayoutSettingsComponent
              settings={settings.layout}
              onChange={handleLayoutChange}
            />

            {/* Загальні рекомендації 
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
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSettingsPage;
