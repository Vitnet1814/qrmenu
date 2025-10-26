"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { 
  themes, 
  Theme, 
  LayoutSettings, 
  LayoutSettings as LayoutSettingsComponent, 
  LivePreview
} from '../../../components/DesignSystem';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle } from '../../../components/design-system';
import { LoadingSpinner, ErrorState } from '../../../components/ui/LoadingStates';
import { useToast } from '../../../contexts/ToastContext';

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
  const router = useRouter();
  const restaurantId = params?.restaurantId;
  const { showToast } = useToast();

  const [settings, setSettings] = useState<DesignSettings>({
    theme: themes[0], // За замовчуванням
    layout: {
      borderRadius: 'medium',
      padding: 'normal',
      shadow: false,
      fontFamily: 'inter'
    }
  });

  const [initialSettings, setInitialSettings] = useState<DesignSettings | null>(null);
  const [selectedThemeId, setSelectedThemeId] = useState<string>('default');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Завантаження налаштувань з API
  useEffect(() => {
    const loadSettings = async () => {
      if (!restaurantId) return;
      
      try {
        const response = await fetch(`/api/restaurants/${restaurantId}/design-settings`);
        if (response.ok) {
          const data = await response.json();
          const loadedSettings = {
            theme: themes.find(t => t.id === data.theme.id) || themes[0],
            layout: data.layout
          };
          setSettings(loadedSettings);
          setInitialSettings(JSON.parse(JSON.stringify(loadedSettings))); // Глибока копія
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
    if (initialSettings) {
      const hasChanges = JSON.stringify(settings) !== JSON.stringify(initialSettings);
      setHasUnsavedChanges(hasChanges);
    }
  }, [settings, initialSettings]);

  // Попередження при закритті вкладки
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleThemeChange = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const handleThemeSelectChange = (themeId: string) => {
    setSelectedThemeId(themeId);
    const selectedTheme = themes.find(t => t.id === themeId);
    if (selectedTheme) {
      handleThemeChange(selectedTheme);
    }
  };

  // Збереження налаштувань
  const handleSave = async () => {
    if (!restaurantId) return;
    
    setIsSaving(true);
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
          layout: settings.layout
        }),
      });

      if (response.ok) {
        setInitialSettings(JSON.parse(JSON.stringify(settings)));
        setHasUnsavedChanges(false);
        showToast({ type: 'success', title: 'Налаштування успішно збережено' });
      } else {
        throw new Error('Помилка збереження');
      }
    } catch (error) {
      console.error('Помилка збереження:', error);
      showToast({ type: 'error', title: 'Помилка збереження налаштувань' });
    } finally {
      setIsSaving(false);
    }
  };

  // Скасування змін
  const handleCancel = () => {
    if (initialSettings) {
      setSettings(JSON.parse(JSON.stringify(initialSettings)));
      setHasUnsavedChanges(false);
      showToast({ type: 'info', title: 'Зміни скасовано' });
    }
  };

  // Зберегти перед навігацією
  const handleSaveAndNavigate = async () => {
    await handleSave();
    setShowUnsavedModal(false);
  };

  // Продовжити без збереження
  const handleDiscardAndNavigate = () => {
    setShowUnsavedModal(false);
    setHasUnsavedChanges(false);
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
              onChange={(layout: LayoutSettings) => setSettings(prev => ({ ...prev, layout }))}
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

      {/* SaveBar - панель збереження/скасування*/}
      {hasUnsavedChanges && (
        <div className="ds-fixed ds-bottom-0 ds-left-0 ds-right-0 ds-flex ds-justify-center ds-z-50 save-bar-container">
          <div className="ds-bg-white ds-shadow-lg ds-rounded-lg ds-px-4 ds-py-4 ds-flex ds-items-center ds-justify-between save-bar-content" style={{ borderTop: '1px solid var(--color-gray-200)' }}>
            <div className="ds-flex ds-items-center ds-gap-3">
              <div className="ds-rounded-full animate-pulse" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#f97316' }}></div>
              <span className="ds-text-sm ds-font-medium" style={{ color: 'var(--color-gray-700)' }}>
                У вас є зміни
              </span>
            </div>
            <div className="ds-flex ds-items-center ds-gap-3">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="ds-px-4 ds-py-2 ds-text-sm ds-font-medium ds-bg-white ds-rounded-lg ds-transition-all"
                style={{
                  color: 'var(--color-gray-700)',
                  border: '1px solid var(--color-gray-300)',
                  opacity: isSaving ? 0.5 : 1,
                  cursor: isSaving ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => !isSaving && (e.currentTarget.style.backgroundColor = 'var(--color-gray-50)')}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-white)'}
              >
                Скасувати
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="ds-px-4 ds-py-2 ds-text-sm ds-font-medium ds-text-white ds-rounded-lg ds-transition-all"
                style={{
                  backgroundColor: '#2563eb',
                  opacity: isSaving ? 0.5 : 1,
                  cursor: isSaving ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => !isSaving && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                {isSaving ? 'Збереження...' : 'Зберегти'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка попередження про незбережені дані */}
      {showUnsavedModal && (
        <div className="ds-fixed ds-inset-0 ds-z-50 ds-flex ds-items-center ds-justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="ds-bg-white ds-rounded-lg ds-shadow-xl ds-max-w-md ds-w-full ds-mx-4">
            <div className="ds-p-6">
              <h3 className="ds-text-lg ds-font-semibold ds-mb-2" style={{ color: 'var(--color-gray-900)' }}>
                Незбережені зміни
              </h3>
              <p className="ds-text-sm ds-mb-6" style={{ color: 'var(--color-gray-600)' }}>
                У вас є незбережені зміни. Що ви хочете зробити?
              </p>
              <div className="ds-flex ds-gap-3">
                <button
                  onClick={handleSaveAndNavigate}
                  disabled={isSaving}
                  className="ds-flex-1 ds-px-4 ds-py-2 ds-text-sm ds-font-medium ds-text-white ds-rounded-lg ds-transition-all"
                  style={{
                    backgroundColor: '#2563eb',
                    opacity: isSaving ? 0.5 : 1,
                    cursor: isSaving ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => !isSaving && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Зберегти
                </button>
                <button
                  onClick={handleDiscardAndNavigate}
                  disabled={isSaving}
                  className="ds-flex-1 ds-px-4 ds-py-2 ds-text-sm ds-font-medium ds-rounded-lg ds-transition-all"
                  style={{
                    color: 'var(--color-gray-700)',
                    backgroundColor: 'var(--color-gray-100)',
                    opacity: isSaving ? 0.5 : 1,
                    cursor: isSaving ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => !isSaving && (e.currentTarget.style.backgroundColor = 'var(--color-gray-200)')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-100)'}
                >
                  Не зберігати
                </button>
                <button
                  onClick={() => setShowUnsavedModal(false)}
                  disabled={isSaving}
                  className="ds-flex-1 ds-px-4 ds-py-2 ds-text-sm ds-font-medium ds-bg-white ds-rounded-lg ds-transition-all"
                  style={{
                    color: 'var(--color-gray-700)',
                    border: '1px solid var(--color-gray-300)',
                    opacity: isSaving ? 0.5 : 1,
                    cursor: isSaving ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => !isSaving && (e.currentTarget.style.backgroundColor = 'var(--color-gray-50)')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-white)'}
                >
                  Скасувати
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignSettingsPage;
