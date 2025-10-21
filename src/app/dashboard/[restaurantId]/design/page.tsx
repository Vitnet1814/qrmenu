"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  themes, 
  Theme, 
  LayoutSettings, 
  ColorPicker, 
  LayoutSettings as LayoutSettingsComponent, 
  LivePreview, 
  DesignTips 
} from '../../../components/DesignSystem';
import { LoadingSpinner, ErrorState } from '../../../components/ui/LoadingStates';
import { 
  PaintBrushIcon, 
  EyeIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

interface Params {
  restaurantId: string;
  [key: string]: string | string[];
}

interface DesignSettings {
  theme: Theme;
  layout: LayoutSettings;
  restaurantName: string;
}

const DesignSettingsPage = () => {
  const params = useParams<Params>();
  const restaurantId = params?.restaurantId;

  const [settings, setSettings] = useState<DesignSettings>({
    theme: themes[5], // Модерн за замовчуванням
    layout: {
      borderRadius: 'medium',
      padding: 'normal',
      shadow: 'normal'
    },
    restaurantName: 'Назва ресторану'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasChanges, setHasChanges] = useState(false);
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
            layout: data.layout,
            restaurantName: data.restaurantName || 'Назва ресторану'
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

  // Відстеження змін
  useEffect(() => {
    if (!isLoading) {
      setHasChanges(true);
    }
  }, [settings, isLoading]);

  const handleThemeChange = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const handleColorChange = (colors: Theme['colors']) => {
    setSettings(prev => ({
      ...prev,
      theme: { ...prev.theme, colors }
    }));
  };

  const handleLayoutChange = (layout: LayoutSettings) => {
    setSettings(prev => ({ ...prev, layout }));
  };

  const handleRestaurantNameChange = (name: string) => {
    setSettings(prev => ({ ...prev, restaurantName: name }));
  };

  const handleSave = async () => {
    if (!restaurantId) return;
    
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const response = await fetch(`/api/restaurants/${restaurantId}/design-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: {
            id: settings.theme.id,
            name: settings.theme.name,
            colors: settings.theme.colors
          },
          layout: settings.layout,
          restaurantName: settings.restaurantName
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        setHasChanges(false);
        
        // Скидання статусу через 3 секунди
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Помилка збереження:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreviewInNewTab = () => {
    const previewData = {
      theme: settings.theme,
      layout: settings.layout,
      restaurantName: settings.restaurantName
    };
    
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Попередній перегляд меню - ${settings.restaurantName}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            .rounded-sm { border-radius: 2px; }
            .rounded-md { border-radius: 8px; }
            .rounded-lg { border-radius: 16px; }
            .p-2 { padding: 8px; }
            .p-4 { padding: 16px; }
            .p-6 { padding: 24px; }
            .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
            .shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
            .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
          </style>
        </head>
        <body>
          <div style="max-width: 400px; margin: 0 auto; background: ${settings.theme.colors.background}; min-height: 100vh;">
            <!-- Заголовок ресторану -->
            <div style="text-align: center; padding: 24px 16px; background: linear-gradient(135deg, ${settings.theme.colors.primary} 0%, ${settings.theme.colors.secondary} 100%); color: white;">
              <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 4px;">${settings.restaurantName}</h1>
              <p style="font-size: 14px; opacity: 0.9;">Ресторан української кухні</p>
            </div>

            <!-- Категорії -->
            <div style="padding: 16px; background: ${settings.theme.colors.background};">
              <div style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto;">
                <div style="padding: 8px 16px; font-size: 14px; font-weight: 500; white-space: nowrap; background: ${settings.theme.colors.primary}; color: white; border-radius: ${settings.layout.borderRadius === 'minimal' ? '2px' : settings.layout.borderRadius === 'medium' ? '8px' : '16px'};">
                  Гарячі страви
                </div>
                <div style="padding: 8px 16px; font-size: 14px; font-weight: 500; white-space: nowrap; background: ${settings.theme.colors.surface}; color: ${settings.theme.colors.text}; border: 1px solid ${settings.theme.colors.primary}20; border-radius: ${settings.layout.borderRadius === 'minimal' ? '2px' : settings.layout.borderRadius === 'medium' ? '8px' : '16px'};">
                  Салати
                </div>
              </div>

              <!-- Страви -->
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="background: white; border-radius: ${settings.layout.borderRadius === 'minimal' ? '2px' : settings.layout.borderRadius === 'medium' ? '8px' : '16px'}; padding: ${settings.layout.padding === 'compact' ? '8px' : settings.layout.padding === 'normal' ? '16px' : '24px'}; box-shadow: ${settings.layout.shadow === 'minimal' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : settings.layout.shadow === 'normal' ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : '0 10px 15px -3px rgb(0 0 0 / 0.1)'}; border: 1px solid ${settings.theme.colors.primary}10;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div style="flex: 1;">
                      <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 4px; color: ${settings.theme.colors.text};">Борщ український</h3>
                      <p style="font-size: 14px; margin-bottom: 8px; color: ${settings.theme.colors.text}; opacity: 0.7;">Традиційний український борщ зі сметаною та зеленню</p>
                    </div>
                    <div style="font-size: 18px; font-weight: bold; margin-left: 8px; color: ${settings.theme.colors.primary};">120₴</div>
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <div style="padding: 4px 12px; font-size: 12px; font-weight: 500; background: ${settings.theme.colors.accent}; color: white; border-radius: ${settings.layout.borderRadius === 'minimal' ? '2px' : settings.layout.borderRadius === 'medium' ? '8px' : '16px'};">
                      Гаряче
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);
      previewWindow.document.close();
    }
  };

  if (!restaurantId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          text="Завантаження налаштувань дизайну..." 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок з кнопками */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="ds-text-3xl ds-font-bold ds-text-gray-900 dark:ds-text-gray-100">
                Налаштування дизайну
              </h1>
              <p className="ds-text-gray-600 dark:ds-text-gray-400 mt-1">
                Персоналізуйте вигляд QR-меню для ресторану #{restaurantId}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreviewInNewTab}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <EyeIcon className="w-4 h-4" />
                Попередній перегляд
              </button>
              
              <button
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-32"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Збереження...
                  </>
                ) : saveStatus === 'success' ? (
                  <>
                    <CheckCircleIcon className="w-4 h-4" />
                    Збережено!
                  </>
                ) : saveStatus === 'error' ? (
                  <>
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    Помилка
                  </>
                ) : (
                  <>
                    <PaintBrushIcon className="w-4 h-4" />
                    Зберегти
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Готові теми */}
        <div className="mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100 mb-6">
            Готові теми
          </h2>
          <div className="ds-grid ds-grid-cols-2 ds-sm:grid-cols-3 ds-md:grid-cols-4 ds-lg:grid-cols-6 ds-gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`ds-card ds-card-body ds-cursor-pointer ds-transition-all ds-duration-300 ds-hover:shadow-lg ds-hover:scale-105 dark:bg-gray-800 dark:border-gray-700 ${
                  settings.theme.id === theme.id 
                    ? 'ds-ring-2 ds-ring-blue-500 ds-ring-offset-2 ds-border-blue-500' 
                    : 'ds-border-gray-200 ds-hover:border-gray-300'
                }`}
                onClick={() => handleThemeChange(theme)}
              >
                <div className="ds-flex ds-items-center ds-gap-2 ds-mb-3">
                  <div 
                    className="ds-w-8 ds-h-8 ds-rounded-full ds-flex ds-items-center ds-justify-center ds-text-lg"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    {theme.preview}
                  </div>
                  <div>
                    <h3 className="ds-text-sm ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100">{theme.name}</h3>
                    <p className="ds-text-xs ds-text-gray-500 dark:ds-text-gray-400 ds-capitalize">
                      {theme.category}
                    </p>
                  </div>
                </div>
                <p className="ds-text-xs ds-text-gray-600 dark:ds-text-gray-400 ds-mb-3 ds-line-clamp-2">
                  {theme.description}
                </p>
                
                <div className="ds-flex ds-gap-1 ds-mb-3">
                  {Object.entries(theme.colors).map(([key, color]) => (
                    <div
                      key={key}
                      className="ds-w-4 ds-h-4 ds-rounded ds-shadow-sm ds-border ds-border-gray-200 dark:ds-border-gray-600"
                      style={{ backgroundColor: color }}
                      title={`${key}: ${color}`}
                    />
                  ))}
                </div>

                <button
                  className={`ds-w-full ds-px-3 ds-py-1 ds-text-xs ds-font-medium ds-rounded-md ds-transition-colors ${
                    settings.theme.id === theme.id
                      ? 'ds-bg-blue-500 ds-text-white'
                      : 'ds-bg-gray-100 dark:ds-bg-gray-700 ds-text-gray-700 dark:ds-text-gray-300 ds-hover:bg-gray-200 dark:ds-hover:bg-gray-600'
                  }`}
                >
                  {settings.theme.id === theme.id ? 'Обрано' : 'Обрати'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Основні налаштування */}
        <div className="ds-grid ds-grid-cols-1 ds-lg:grid-cols-2 ds-gap-8">
          {/* Ліва колонка - Налаштування */}
          <div className="ds-space-y-8">
            {/* Назва ресторану */}
            <div className="ds-card ds-card-body dark:bg-gray-800 dark:border-gray-700">
              <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100 ds-mb-4">Назва ресторану</h3>
              <input
                type="text"
                value={settings.restaurantName}
                onChange={(e) => handleRestaurantNameChange(e.target.value)}
                className="ds-w-full ds-px-3 ds-py-2 ds-border ds-border-gray-300 dark:ds-border-gray-600 ds-rounded-md ds-focus:outline-none ds-focus:ring-2 ds-focus:ring-blue-500 ds-focus:border-transparent ds-bg-white dark:ds-bg-gray-700 ds-text-gray-900 dark:ds-text-gray-100"
                placeholder="Введіть назву вашого закладу"
              />
            </div>

            {/* Кастомізація кольорів */}
            <div className="ds-card ds-card-body dark:bg-gray-800 dark:border-gray-700">
              <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100 ds-mb-4">Кастомізація кольорів</h3>
              <ColorPicker
                colors={settings.theme.colors}
                onChange={handleColorChange}
              />
            </div>

            {/* Налаштування макету */}
            <div className="ds-card ds-card-body dark:bg-gray-800 dark:border-gray-700">
              <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 dark:ds-text-gray-100 ds-mb-4">Налаштування макету</h3>
              <LayoutSettingsComponent
                settings={settings.layout}
                onChange={handleLayoutChange}
              />
            </div>
          </div>

          {/* Права колонка - Попередній перегляд та поради */}
          <div className="ds-space-y-8">
            {/* Live попередній перегляд */}
            <LivePreview
              theme={settings.theme}
              layoutSettings={settings.layout}
              restaurantName={settings.restaurantName}
            />

            {/* Поради */}
            <DesignTips
              theme={settings.theme}
              layoutSettings={settings.layout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSettingsPage;
