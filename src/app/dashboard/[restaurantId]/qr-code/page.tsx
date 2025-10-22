"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCodeIcon, 
  DownloadIcon, 
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSettingsChange = async (newSettings: Partial<QRSettings>) => {
    const updatedSettings = { ...qrSettings, ...newSettings };
    setQrSettings(updatedSettings);

    // Автозбереження налаштувань
    try {
      setIsSaving(true);
      const response = await fetch(`/api/restaurants/${restaurantId}/qr-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettings),
      });

      if (!response.ok) {
        throw new Error('Не вдалося зберегти налаштування');
      }
    } catch (error) {
      console.error('Error saving QR settings:', error);
      showError('Помилка збереження', 'Не вдалося зберегти налаштування QR-коду');
    } finally {
      setIsSaving(false);
    }
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          text="Завантаження налаштувань QR-коду..." 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ресторан не знайдено</h1>
          <p className="text-gray-600">Спробуйте перевірити посилання</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            QR-код для меню
          </h1>
          <p className="text-gray-600">
            Налаштуйте та завантажте QR-код для вашого ресторану "{restaurantInfo.name}"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Налаштування */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Cog6ToothIcon className="w-5 h-5 mr-2" />
                Налаштування QR-коду
              </h2>

              <div className="space-y-4">
                {/* Розмір */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Розмір QR-коду
                  </label>
                  <select
                    value={qrSettings.size}
                    onChange={(e) => handleSettingsChange({ size: e.target.value as QRSettings['size'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Маленький (128px)</option>
                    <option value="medium">Середній (256px)</option>
                    <option value="large">Великий (512px)</option>
                  </select>
                </div>

                {/* Колір */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Колір QR-коду
                  </label>
                  <input
                    type="color"
                    value={qrSettings.color}
                    onChange={(e) => handleSettingsChange({ color: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Фон */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Колір фону
                  </label>
                  <input
                    type="color"
                    value={qrSettings.backgroundColor}
                    onChange={(e) => handleSettingsChange({ backgroundColor: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Рівень корекції помилок */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Рівень корекції помилок
                  </label>
                  <select
                    value={qrSettings.errorCorrectionLevel}
                    onChange={(e) => handleSettingsChange({ errorCorrectionLevel: e.target.value as QRSettings['errorCorrectionLevel'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="L">Низький (~7%)</option>
                    <option value="M">Середній (~15%)</option>
                    <option value="Q">Високий (~25%)</option>
                    <option value="H">Максимальний (~30%)</option>
                  </select>
                </div>

                {/* Логотип */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={qrSettings.includeLogo}
                      onChange={(e) => handleSettingsChange({ includeLogo: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Включити логотип в центр QR-коду
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Інструкції */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Як використовувати QR-код
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Завантажте QR-код у форматі PNG або SVG</li>
                <li>• Роздрукуйте QR-код на якісному папері</li>
                <li>• Розмістіть QR-код на кожному столі</li>
                <li>• Клієнти відсканують код камерою телефону</li>
                <li>• Вони автоматично потраплять на ваше меню</li>
              </ul>
            </div>
          </div>

          {/* Попередній перегляд та дії */}
          <div className="space-y-6">
            {/* Попередній перегляд */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <EyeIcon className="w-5 h-5 mr-2" />
                Попередній перегляд
              </h2>

              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
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

              <div className="text-center text-sm text-gray-600">
                <p>Посилання: <code className="bg-gray-100 px-2 py-1 rounded">{getMenuUrl()}</code></p>
              </div>
            </div>

            {/* Дії */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Завантажити QR-код
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => downloadQRCode('png')}
                  className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                  PNG
                </button>
                <button
                  onClick={() => downloadQRCode('svg')}
                  className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                  SVG
                </button>
              </div>

              <button
                onClick={printQRCode}
                className="w-full mt-4 flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <PrinterIcon className="w-5 h-5 mr-2" />
                Друкувати QR-код
              </button>

              {isSaving && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  Збереження налаштувань...
                </div>
              )}
            </div>

            {/* Готовий шаблон для друку */}
            <div className="bg-white rounded-lg shadow-md p-6 print:hidden">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Готовий шаблон для друку
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Натисніть Ctrl+P (Cmd+P на Mac) для друку готового шаблону з QR-кодом
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="mb-4">
                  <QRCodeSVG
                    value={getMenuUrl()}
                    size={200}
                    fgColor={qrSettings.color}
                    bgColor={qrSettings.backgroundColor}
                    level={qrSettings.errorCorrectionLevel}
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {restaurantInfo.name}
                </h4>
                <p className="text-sm text-gray-600">
                  Відскануйте QR-код для перегляду меню
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;