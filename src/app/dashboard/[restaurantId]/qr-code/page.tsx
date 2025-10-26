"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { 
  PrinterIcon,
  Cog6ToothIcon,
  EyeIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { LoadingSpinner, ErrorState } from '../../../components/ui/LoadingStates';
import { useToast } from '../../../contexts/ToastContext';

interface Params {
  restaurantId: string;
  [key: string]: string | string[];
}

interface RestaurantInfo {
  name: string;
  slug: string;
}

interface QRSettings {
  size: 'small' | 'medium' | 'large';
  color: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  includeLogo: boolean;
  logoSize: number;
}

const QRCodePage = () => {
  const params = useParams<Params>();
  const restaurantId = params?.restaurantId;

  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(null);
  const [qrSettings, setQrSettings] = useState<QRSettings>({
    size: 'medium',
    color: '#000000',
    backgroundColor: '#ffffff',
    errorCorrectionLevel: 'M',
    includeLogo: false,
    logoSize: 30
  });
  const [initialSettings, setInitialSettings] = useState<QRSettings | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!restaurantId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Завантажуємо інформацію про ресторан та налаштування QR паралельно
        const [restaurantResponse, qrSettingsResponse] = await Promise.all([
          fetch(`/api/restaurants/id/${restaurantId}`),
          fetch(`/api/restaurants/${restaurantId}/qr-settings`)
        ]);

        if (!restaurantResponse.ok) {
          throw new Error('Помилка завантаження інформації про ресторан');
        }

        const restaurantData = await restaurantResponse.json();
        setRestaurantInfo(restaurantData);

        // Завантажуємо налаштування QR, якщо вони існують
        if (qrSettingsResponse.ok) {
          const qrData = await qrSettingsResponse.json();
          setQrSettings(qrData);
          setInitialSettings(JSON.parse(JSON.stringify(qrData))); // Глибока копія
        } else {
          // Якщо налаштувань немає, зберігаємо початкові налаштування
          setInitialSettings(JSON.parse(JSON.stringify(qrSettings)));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Сталася помилка');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

  // Відстеження змін
  useEffect(() => {
    if (initialSettings) {
      const hasChanges = JSON.stringify(qrSettings) !== JSON.stringify(initialSettings);
      setHasUnsavedChanges(hasChanges);
    }
  }, [qrSettings, initialSettings]);

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

  const handleSettingsChange = (newSettings: Partial<QRSettings>) => {
    const updatedSettings = { ...qrSettings, ...newSettings };
    setQrSettings(updatedSettings);
  };

  // Збереження налаштувань
  const handleSave = async () => {
    if (!restaurantId) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`/api/restaurants/${restaurantId}/qr-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(qrSettings),
      });

      if (response.ok) {
        setInitialSettings(JSON.parse(JSON.stringify(qrSettings)));
        setHasUnsavedChanges(false);
        showSuccess('Збережено', 'Налаштування QR-коду успішно збережено');
      } else {
        throw new Error('Не вдалося зберегти налаштування');
      }
    } catch (error) {
      console.error('Error saving QR settings:', error);
      showError('Помилка збереження', 'Не вдалося зберегти налаштування');
    } finally {
      setIsSaving(false);
    }
  };

  // Скасування змін
  const handleCancel = () => {
    if (initialSettings) {
      setQrSettings(JSON.parse(JSON.stringify(initialSettings)));
      setHasUnsavedChanges(false);
      showSuccess('Скасовано', 'Зміни скасовано');
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

  const getQRSize = () => {
    switch (qrSettings.size) {
      case 'small': return 128;
      case 'medium': return 256;
      case 'large': return 512;
      default: return 256;
    }
  };

  const getMenuUrl = () => {
    if (!restaurantInfo?.slug) return '';
    return `${window.location.origin}/menu/${restaurantInfo.slug}`;
  };

  const downloadQRCode = (format: 'png' | 'svg') => {
    if (!restaurantInfo) return;

    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `qr-menu-${restaurantInfo.slug}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } else {
      // Для SVG потрібно інший підхід
      const svgElement = document.getElementById('qr-code-svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const link = document.createElement('a');
        link.download = `qr-menu-${restaurantInfo.slug}.svg`;
        link.href = svgUrl;
        link.click();
        URL.revokeObjectURL(svgUrl);
      }
    }

    showSuccess('QR-код завантажено', 'QR-код було успішно завантажено');
  };

  const printQRCode = () => {
    window.print();
    showSuccess('Друк розпочато', 'QR-код відправлено на друк');
  };

  if (isLoading) {
    return (
      <div className="ds-min-h-screen ds-bg-gray-50 ds-flex ds-items-center ds-justify-center">
        <LoadingSpinner 
          size="lg" 
          text="Завантаження налаштувань QR-коду..." 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ds-min-h-screen ds-bg-gray-50 ds-flex ds-items-center ds-justify-center ds-p-4">
        <ErrorState 
          title="Помилка завантаження"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!restaurantInfo) {
    return (
      <div className="ds-min-h-screen ds-bg-gray-50 ds-flex ds-items-center ds-justify-center">
        <div className="ds-text-center">
          <h1 className="ds-text-2xl ds-font-bold ds-text-gray-900 ds-mb-4">Ресторан не знайдено</h1>
          <p className="ds-text-gray-600">Спробуйте перевірити посилання</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-min-h-screen ds-bg-gray-50">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-4 ds-py-8">
        {/* Заголовок */}
        <div className="ds-mb-8">
          <h1 className="ds-text-3xl ds-font-bold ds-text-gray-900 ds-mb-2">
            QR-код для меню
          </h1>
          <p className="ds-text-gray-600">
            Налаштуйте та завантажте QR-код для вашого ресторану "{restaurantInfo.name}"
          </p>
        </div>

        <div className="ds-grid ds-grid-cols-1 ds-lg:grid-cols-2 ds-gap-8">
          {/* Налаштування */}
          <div className="ds-space-y-6">
            <div className="ds-bg-white ds-rounded-lg ds-shadow-md ds-p-6">
              <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4 ds-flex ds-items-center">
                <Cog6ToothIcon className="ds-w-5 ds-h-5 ds-mr-2" />
                Налаштування QR-коду
              </h2>

              <div className="ds-space-y-4">
                {/* Розмір */}
                <div>
                  <label className="ds-block ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-2">
                    Розмір QR-коду
                  </label>
                  <select
                    value={qrSettings.size}
                    onChange={(e) => handleSettingsChange({ size: e.target.value as QRSettings['size'] })}
                    className="ds-w-full ds-px-3 ds-py-2 ds-border ds-border-gray-300 ds-rounded-md ds-focus:outline-none ds-focus:ring-2 ds-focus:ring-blue-500"
                  >
                    <option value="small">Маленький (128px)</option>
                    <option value="medium">Середній (256px)</option>
                    <option value="large">Великий (512px)</option>
                  </select>
                </div>

                {/* Колір */}
                <div>
                  <label className="ds-block ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-2">
                    Колір QR-коду
                  </label>
                  <input
                    type="color"
                    value={qrSettings.color}
                    onChange={(e) => handleSettingsChange({ color: e.target.value })}
                    className="ds-w-full ds-h-10 ds-border ds-border-gray-300 ds-rounded-md"
                  />
                </div>

                {/* Фон */}
                <div>
                  <label className="ds-block ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-2">
                    Колір фону
                  </label>
                  <input
                    type="color"
                    value={qrSettings.backgroundColor}
                    onChange={(e) => handleSettingsChange({ backgroundColor: e.target.value })}
                    className="ds-w-full ds-h-10 ds-border ds-border-gray-300 ds-rounded-md"
                  />
                </div>

                {/* Рівень корекції помилок */}
                <div>
                  <label className="ds-block ds-text-sm ds-font-medium ds-text-gray-700 ds-mb-2">
                    Рівень корекції помилок
                  </label>
                  <select
                    value={qrSettings.errorCorrectionLevel}
                    onChange={(e) => handleSettingsChange({ errorCorrectionLevel: e.target.value as QRSettings['errorCorrectionLevel'] })}
                    className="ds-w-full ds-px-3 ds-py-2 ds-border ds-border-gray-300 ds-rounded-md ds-focus:outline-none ds-focus:ring-2 ds-focus:ring-blue-500"
                  >
                    <option value="L">Низький (~7%)</option>
                    <option value="M">Середній (~15%)</option>
                    <option value="Q">Високий (~25%)</option>
                    <option value="H">Максимальний (~30%)</option>
                  </select>
                </div>

                {/* Логотип */}
                <div>
                  <label className="ds-flex ds-items-center">
                    <input
                      type="checkbox"
                      checked={qrSettings.includeLogo}
                      onChange={(e) => handleSettingsChange({ includeLogo: e.target.checked })}
                      className="ds-mr-2"
                    />
                    <span className="ds-text-sm ds-font-medium ds-text-gray-700">
                      Включити логотип в центр QR-коду
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Інструкції */}
            <div className="ds-bg-blue-50 ds-rounded-lg ds-p-6">
              <h3 className="ds-text-lg ds-font-semibold ds-text-blue-900 ds-mb-3">
                Як використовувати QR-код
              </h3>
              <ul className="ds-space-y-2 ds-text-sm ds-text-blue-800">
                <li>• Завантажте QR-код у форматі PNG або SVG</li>
                <li>• Роздрукуйте QR-код на якісному папері</li>
                <li>• Розмістіть QR-код на кожному столі</li>
                <li>• Клієнти відсканують код камерою телефону</li>
                <li>• Вони автоматично потраплять на ваше меню</li>
              </ul>
            </div>
          </div>

          {/* Попередній перегляд та дії */}
          <div className="ds-space-y-6">
            {/* Попередній перегляд */}
            <div className="ds-bg-white ds-rounded-lg ds-shadow-md ds-p-6">
              <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4 ds-flex ds-items-center">
                <EyeIcon className="ds-w-5 ds-h-5 ds-mr-2" />
                Попередній перегляд
              </h2>

              <div className="ds-flex ds-justify-center ds-mb-4">
                <div className="ds-p-4 ds-bg-white ds-border-2 ds-border-gray-200 ds-rounded-lg">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={getMenuUrl()}
                    size={getQRSize()}
                    fgColor={qrSettings.color}
                    bgColor={qrSettings.backgroundColor}
                    level={qrSettings.errorCorrectionLevel}
                  />
                </div>
              </div>

              <div className="ds-text-center ds-text-sm ds-text-gray-600">
                <p>Посилання: <code className="ds-bg-gray-100 ds-px-2 ds-py-1 ds-rounded">{getMenuUrl()}</code></p>
              </div>
            </div>

            {/* Дії */}
            <div className="ds-bg-white ds-rounded-lg ds-shadow-md ds-p-6">
              <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
                Завантажити QR-код
              </h2>

              <div className="ds-grid ds-grid-cols-2 ds-gap-4">
                <button
                  onClick={() => downloadQRCode('png')}
                  className="ds-flex ds-items-center ds-justify-center ds-px-4 ds-py-3 ds-bg-blue-600 ds-text-white ds-rounded-lg ds-hover:bg-blue-700 ds-transition-colors"
                >
                  <DocumentArrowDownIcon className="ds-w-5 ds-h-5 ds-mr-2" />
                  PNG
                </button>
                <button
                  onClick={() => downloadQRCode('svg')}
                  className="ds-flex ds-items-center ds-justify-center ds-px-4 ds-py-3 ds-bg-green-600 ds-text-white ds-rounded-lg ds-hover:bg-green-700 ds-transition-colors"
                >
                  <DocumentArrowDownIcon className="ds-w-5 ds-h-5 ds-mr-2" />
                  SVG
                </button>
              </div>

              <button
                onClick={printQRCode}
                className="ds-w-full ds-mt-4 ds-flex ds-items-center ds-justify-center ds-px-4 ds-py-3 ds-bg-secondary ds-text-white ds-rounded-lg ds-hover:bg-gray-700 ds-transition-colors"
              >
                <PrinterIcon className="ds-w-5 ds-h-5 ds-mr-2" />
                Друкувати QR-код
              </button>

              {isSaving && (
                <div className="ds-mt-4 ds-text-center ds-text-sm ds-text-gray-500">
                  Збереження налаштувань...
                </div>
              )}
            </div>

            {/* Готовий шаблон для друку */}
            <div className="ds-bg-white ds-rounded-lg ds-shadow-md ds-p-6 print:hidden">
              <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-3">
                Готовий шаблон для друку
              </h3>
              <p className="ds-text-sm ds-text-gray-600 ds-mb-4">
                Натисніть Ctrl+P (Cmd+P на Mac) для друку готового шаблону з QR-кодом
              </p>
              <div className="ds-border-2 ds-border-dashed ds-border-gray-300 ds-rounded-lg ds-p-8 ds-text-center">
                <div className="ds-mb-4">
                  <QRCodeSVG
                    value={getMenuUrl()}
                    size={200}
                    fgColor={qrSettings.color}
                    bgColor={qrSettings.backgroundColor}
                    level={qrSettings.errorCorrectionLevel}
                  />
                </div>
                <h4 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-2">
                  {restaurantInfo.name}
                </h4>
                <p className="ds-text-sm ds-text-gray-600">
                  Відскануйте QR-код для перегляду меню
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SaveBar - панель збереження/скасування */}
      {hasUnsavedChanges && (
        <div className="ds-fixed ds-bottom-0 ds-left-0 ds-right-0 ds-flex ds-justify-center ds-z-50 save-bar-container">
          <div className="ds-bg-white ds-shadow-lg ds-rounded-lg ds-px-4 ds-py-4 ds-flex ds-items-center ds-justify-between save-bar-content" style={{ borderTop: '1px solid var(--color-gray-200)' }}>
            <div className="ds-flex ds-items-center ds-gap-3">
              <div className="ds-rounded-full animate-pulse" style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#f97316' }}></div>
              <span className="ds-text-sm ds-font-medium" style={{ color: 'var(--color-gray-700)' }}>
                У вас є незбережені зміни
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

export default QRCodePage;