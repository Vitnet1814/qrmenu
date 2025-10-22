'use client';

import React, { useState } from 'react';

export default function TestPageStyles() {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const themes = [
    { id: 'default', name: 'За замовчуванням' },
    { id: 'classic-restaurant', name: 'Класичний ресторан' },
    { id: 'cozy-cafe', name: 'Затишне кафе' },
    { id: 'fast-food', name: 'Фаст-фуд' },
    { id: 'sushi-bar', name: 'Суші-бар' },
    { id: 'pizzeria', name: 'Піцерія' },
    { id: 'modern', name: 'Модерн' },
    { id: 'dark', name: 'Темна тема' },
    { id: 'spring', name: 'Весняна' },
    { id: 'premium', name: 'Преміум' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4" data-theme={selectedTheme}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Тестова сторінка стилів QR Menu
          </h1>
          <p className="text-lg text-gray-600">
            Демонстрація всіх доступних стилів та тем дизайн-системи
          </p>
        </div>

        {/* Перемикач тем */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Перемикач тем
          </h2>
          <div className="ds-flex ds-flex-wrap ds-gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`ds-btn ds-btn-sm ${
                  selectedTheme === theme.id 
                    ? 'ds-btn-primary' 
                    : 'ds-btn-outline'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        {/* Кольори */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Кольорова палітра
          </h2>
          <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-4 ds-gap-4">
            <div className="ds-bg-primary ds-p-4 ds-rounded-lg ds-text-white ds-text-center">
              <div className="ds-font-semibold">Primary</div>
              <div className="ds-text-xs ds-opacity-75">ds-bg-primary</div>
            </div>
            <div className="ds-bg-secondary ds-p-4 ds-rounded-lg ds-text-white ds-text-center">
              <div className="ds-font-semibold">Secondary</div>
              <div className="ds-text-xs ds-opacity-75">ds-bg-secondary</div>
            </div>
            <div className="ds-bg-accent ds-p-4 ds-rounded-lg ds-text-white ds-text-center">
              <div className="ds-font-semibold">Accent</div>
              <div className="ds-text-xs ds-opacity-75">ds-bg-accent</div>
            </div>
            <div className="ds-bg-success ds-p-4 ds-rounded-lg ds-text-white ds-text-center">
              <div className="ds-font-semibold">Success</div>
              <div className="ds-text-xs ds-opacity-75">ds-bg-success</div>
            </div>
            <div className="ds-bg-warning ds-p-4 ds-rounded-lg ds-text-white ds-text-center">
              <div className="ds-font-semibold">Warning</div>
              <div className="ds-text-xs ds-opacity-75">ds-bg-warning</div>
            </div>
            <div className="ds-bg-error ds-p-4 ds-rounded-lg ds-text-white ds-text-center">
              <div className="ds-font-semibold">Error</div>
              <div className="ds-text-xs ds-opacity-75">ds-bg-error</div>
            </div>
            <div className="ds-bg-gray-100 ds-p-4 ds-rounded-lg ds-text-gray-900 ds-text-center">
              <div className="ds-font-semibold">Gray 100</div>
              <div className="ds-text-xs ds-opacity-75">ds-bg-gray-100</div>
            </div>
            <div className="ds-bg-gray-200 ds-p-4 ds-rounded-lg ds-text-gray-900 ds-text-center">
              <div className="ds-font-semibold">Gray 200</div>
              <div className="ds-text-xs ds-opacity-75">ds-bg-gray-200</div>
            </div>
          </div>
        </div>

        {/* Градієнти */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Градієнти
          </h2>
          <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-4">
            <div className="ds-bg-gradient-primary ds-p-6 ds-rounded-lg ds-text-white ds-text-center">
              <h3 className="ds-text-lg ds-font-semibold">Primary Gradient</h3>
              <div className="ds-text-xs ds-opacity-75">ds-bg-gradient-primary</div>
            </div>
            <div className="ds-bg-gradient-secondary ds-p-6 ds-rounded-lg ds-text-white ds-text-center">
              <h3 className="ds-text-lg ds-font-semibold">Secondary Gradient</h3>
              <div className="ds-text-xs ds-opacity-75">ds-bg-gradient-secondary</div>
            </div>
            <div className="ds-bg-gradient-accent ds-p-6 ds-rounded-lg ds-text-white ds-text-center">
              <h3 className="ds-text-lg ds-font-semibold">Accent Gradient</h3>
              <div className="ds-text-xs ds-opacity-75">ds-bg-gradient-accent</div>
            </div>
            <div className="ds-bg-gradient-warm ds-p-6 ds-rounded-lg ds-text-white ds-text-center">
              <h3 className="ds-text-lg ds-font-semibold">Warm Gradient</h3>
              <div className="ds-text-xs ds-opacity-75">ds-bg-gradient-warm</div>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Кнопки
          </h2>
          <div className="ds-space-y-4">
            <div>
              <h3 className="ds-text-lg ds-font-medium ds-mb-2">Основні варіанти</h3>
              <div className="ds-flex ds-flex-wrap ds-gap-3">
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-primary">Primary</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-primary</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-secondary">Secondary</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-secondary</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-accent">Accent</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-accent</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-outline">Outline</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-outline</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-ghost">Ghost</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-ghost</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="ds-text-lg ds-font-medium ds-mb-2">Статусні кнопки</h3>
              <div className="ds-flex ds-flex-wrap ds-gap-3">
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-success">Success</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-success</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-warning">Warning</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-warning</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-error">Error</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-error</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-gradient-primary">Gradient</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-gradient-primary</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="ds-text-lg ds-font-medium ds-mb-2">Розміри</h3>
              <div className="ds-flex ds-flex-wrap ds-gap-3">
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-sm ds-btn-primary">Small</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-sm</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-primary">Normal</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-lg ds-btn-primary">Large</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-lg</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-btn ds-btn-xl ds-btn-primary">Extra Large</button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-btn ds-btn-xl</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Типографіка */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Типографіка
          </h2>
          <div className="ds-space-y-4">
            <div>
              <h1 className="ds-text-5xl ds-font-bold ds-text-gray-900">Heading 1</h1>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-5xl ds-font-bold ds-text-gray-900</div>
            </div>
            <div>
              <h2 className="ds-text-4xl ds-font-bold ds-text-gray-900">Heading 2</h2>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-4xl ds-font-bold ds-text-gray-900</div>
            </div>
            <div>
              <h3 className="ds-text-3xl ds-font-semibold ds-text-gray-900">Heading 3</h3>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-3xl ds-font-semibold ds-text-gray-900</div>
            </div>
            <div>
              <h4 className="ds-text-2xl ds-font-semibold ds-text-gray-900">Heading 4</h4>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-2xl ds-font-semibold ds-text-gray-900</div>
            </div>
            <div>
              <h5 className="ds-text-xl ds-font-medium ds-text-gray-900">Heading 5</h5>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-xl ds-font-medium ds-text-gray-900</div>
            </div>
            <div>
              <h6 className="ds-text-lg ds-font-medium ds-text-gray-900">Heading 6</h6>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-lg ds-font-medium ds-text-gray-900</div>
            </div>
            <div>
              <p className="ds-text-base ds-text-gray-700">
                Базовий текст - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-base ds-text-gray-700</div>
            </div>
            <div>
              <p className="ds-text-sm ds-text-gray-600">
                Малий текст - Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-sm ds-text-gray-600</div>
            </div>
            <div>
              <p className="ds-text-xs ds-text-gray-500">
                Дуже малий текст - Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-xs ds-text-gray-500</div>
            </div>
            <div>
              <div className="ds-text-gradient-primary ds-text-2xl ds-font-bold">
                Градієнтний текст
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-text-gradient-primary ds-text-2xl ds-font-bold</div>
            </div>
          </div>
        </div>

        {/* Картки */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Картки
          </h2>
          <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3 ds-gap-4">
            <div>
              <div className="ds-card">
                <div className="ds-card-header">
                  <h3 className="ds-card-title">Проста картка</h3>
                  <p className="ds-card-subtitle">Підзаголовок картки</p>
                </div>
                <div className="ds-card-body">
                  <p className="ds-card-text">
                    Це приклад простого тексту в картці з базовим стилем.
                  </p>
                </div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-2 ds-text-center">
                ds-card, ds-card-header, ds-card-body
              </div>
            </div>
            
            <div>
              <div className="ds-card ds-shadow-lg">
                <div className="ds-card-header">
                  <h3 className="ds-card-title">Картка з тінню</h3>
                  <p className="ds-card-subtitle">З великою тінню</p>
                </div>
                <div className="ds-card-body">
                  <p className="ds-card-text">
                    Картка з додатковою тінню для більшого акценту.
                  </p>
                </div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-2 ds-text-center">
                ds-card ds-shadow-lg
              </div>
            </div>

            <div>
              <div className="ds-card ds-shadow-xl">
                <div className="ds-card-header">
                  <h3 className="ds-card-title">Картка з футером</h3>
                  <p className="ds-card-subtitle">Повна структура</p>
                </div>
                <div className="ds-card-body">
                  <p className="ds-card-text">
                    Картка з повною структурою включаючи футер.
                  </p>
                </div>
                <div className="ds-card-footer">
                  <button className="ds-btn ds-btn-sm ds-btn-primary">Дія</button>
                </div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-2 ds-text-center">
                ds-card ds-shadow-xl, ds-card-footer
              </div>
            </div>
          </div>
        </div>

        {/* Форми */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Форми
          </h2>
          <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-6">
            <div>
              <div className="ds-form-group">
                <label className="ds-form-label">Ім'я</label>
                <input 
                  type="text" 
                  className="ds-form-input" 
                  placeholder="Введіть ваше ім'я"
                />
                <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-form-label, ds-form-input</div>
              </div>
              <div className="ds-form-group">
                <label className="ds-form-label">Email</label>
                <input 
                  type="email" 
                  className="ds-form-input" 
                  placeholder="example@email.com"
                />
                <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-form-group, ds-form-input</div>
              </div>
              <div className="ds-form-group">
                <label className="ds-form-label">Повідомлення</label>
                <textarea 
                  className="ds-form-textarea" 
                  placeholder="Введіть ваше повідомлення"
                ></textarea>
                <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-form-textarea</div>
              </div>
            </div>
            <div>
              <div className="ds-form-group">
                <label className="ds-form-label">Категорія</label>
                <select className="ds-form-select">
                  <option>Виберіть категорію</option>
                  <option>Ресторан</option>
                  <option>Кафе</option>
                  <option>Фаст-фуд</option>
                </select>
                <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-form-select</div>
              </div>
              <div className="ds-form-group">
                <label className="ds-form-label">Відключене поле</label>
                <input 
                  type="text" 
                  className="ds-form-input" 
                  disabled 
                  value="Це поле відключене"
                />
                <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-form-input (disabled)</div>
              </div>
              <div className="ds-form-group">
                <label className="ds-form-label">Поле з помилкою</label>
                <input 
                  type="text" 
                  className="ds-form-input" 
                  style={{ borderColor: 'var(--color-error)' }}
                  value="Неправильне значення"
                />
                <div className="ds-form-error">Це поле містить помилку</div>
                <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-form-error</div>
              </div>
            </div>
          </div>
        </div>

        {/* Алерти */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Алерти
          </h2>
          <div className="ds-space-y-4">
            <div>
              <div className="ds-alert ds-alert-success">
                <strong>Успіх!</strong> Операція виконана успішно.
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-alert ds-alert-success</div>
            </div>
            <div>
              <div className="ds-alert ds-alert-warning">
                <strong>Увага!</strong> Будь ласка, перевірте дані.
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-alert ds-alert-warning</div>
            </div>
            <div>
              <div className="ds-alert ds-alert-error">
                <strong>Помилка!</strong> Щось пішло не так.
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-alert ds-alert-error</div>
            </div>
            <div>
              <div className="ds-alert ds-alert-info">
                <strong>Інформація!</strong> Корисна інформація для вас.
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-alert ds-alert-info</div>
            </div>
          </div>
        </div>

        {/* Бейджі */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Бейджі
          </h2>
          <div className="ds-flex ds-flex-wrap ds-gap-3">
            <div className="ds-text-center">
              <span className="ds-badge ds-badge-primary">Primary</span>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-badge ds-badge-primary</div>
            </div>
            <div className="ds-text-center">
              <span className="ds-badge ds-badge-success">Success</span>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-badge ds-badge-success</div>
            </div>
            <div className="ds-text-center">
              <span className="ds-badge ds-badge-warning">Warning</span>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-badge ds-badge-warning</div>
            </div>
            <div className="ds-text-center">
              <span className="ds-badge ds-badge-error">Error</span>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-badge ds-badge-error</div>
            </div>
          </div>
        </div>

        {/* Прогрес бари */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Прогрес бари
          </h2>
          <div className="ds-space-y-4">
            <div>
              <div className="ds-text-sm ds-text-gray-600 ds-mb-2">Базовий прогрес (75%)</div>
              <div className="ds-progress">
                <div className="ds-progress-bar" style={{ width: '75%' }}></div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-progress, ds-progress-bar</div>
            </div>
            <div>
              <div className="ds-text-sm ds-text-gray-600 ds-mb-2">Успішний прогрес (60%)</div>
              <div className="ds-progress">
                <div className="ds-progress-bar ds-progress-bar-success" style={{ width: '60%' }}></div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-progress-bar-success</div>
            </div>
            <div>
              <div className="ds-text-sm ds-text-gray-600 ds-mb-2">Попередження (40%)</div>
              <div className="ds-progress">
                <div className="ds-progress-bar ds-progress-bar-warning" style={{ width: '40%' }}></div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-progress-bar-warning</div>
            </div>
            <div>
              <div className="ds-text-sm ds-text-gray-600 ds-mb-2">Помилка (20%)</div>
              <div className="ds-progress">
                <div className="ds-progress-bar ds-progress-bar-error" style={{ width: '20%' }}></div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-progress-bar-error</div>
            </div>
          </div>
        </div>

        {/* Спиннери */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Спиннери
          </h2>
          <div className="ds-flex ds-items-center ds-gap-4">
            <div className="ds-text-center">
              <div className="ds-spinner"></div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-spinner</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-spinner ds-spinner-lg"></div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-spinner ds-spinner-lg</div>
            </div>
            <span className="ds-text-gray-600">Завантаження...</span>
          </div>
        </div>

        {/* Тіні */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Тіні
          </h2>
          <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-4 ds-gap-4">
            <div className="ds-text-center">
              <div className="ds-bg-white ds-p-4 ds-rounded-lg ds-shadow-xs ds-text-center">
                <div className="ds-text-sm ds-font-medium">XS Shadow</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-shadow-xs</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-white ds-p-4 ds-rounded-lg ds-shadow-sm ds-text-center">
                <div className="ds-text-sm ds-font-medium">SM Shadow</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-shadow-sm</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-white ds-p-4 ds-rounded-lg ds-shadow-md ds-text-center">
                <div className="ds-text-sm ds-font-medium">MD Shadow</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-shadow-md</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-white ds-p-4 ds-rounded-lg ds-shadow-lg ds-text-center">
                <div className="ds-text-sm ds-font-medium">LG Shadow</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-shadow-lg</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-white ds-p-4 ds-rounded-lg ds-shadow-xl ds-text-center">
                <div className="ds-text-sm ds-font-medium">XL Shadow</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-shadow-xl</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-white ds-p-4 ds-rounded-lg ds-shadow-2xl ds-text-center">
                <div className="ds-text-sm ds-font-medium">2XL Shadow</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-shadow-2xl</div>
            </div>
          </div>
        </div>

        {/* Радіуси */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Радіуси закруглення
          </h2>
          <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-4 ds-gap-4">
            <div className="ds-text-center">
              <div className="ds-bg-primary ds-p-4 ds-rounded-none ds-text-white ds-text-center">
                <div className="ds-text-sm">None</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-rounded-none</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-primary ds-p-4 ds-rounded-sm ds-text-white ds-text-center">
                <div className="ds-text-sm">Small</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-rounded-sm</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-primary ds-p-4 ds-rounded-md ds-text-white ds-text-center">
                <div className="ds-text-sm">Medium</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-rounded-md</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-primary ds-p-4 ds-rounded-lg ds-text-white ds-text-center">
                <div className="ds-text-sm">Large</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-rounded-lg</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-primary ds-p-4 ds-rounded-xl ds-text-white ds-text-center">
                <div className="ds-text-sm">XL</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-rounded-xl</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-primary ds-p-4 ds-rounded-2xl ds-text-white ds-text-center">
                <div className="ds-text-sm">2XL</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-rounded-2xl</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-primary ds-p-4 ds-rounded-full ds-text-white ds-text-center">
                <div className="ds-text-sm">Full</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-rounded-full</div>
            </div>
          </div>
        </div>

        {/* Анімації */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Анімації та ефекти
          </h2>
          <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-4 ds-gap-4">
            <div className="ds-text-center">
              <div className="ds-bg-primary ds-p-4 ds-rounded-lg ds-text-white ds-text-center ds-hover-scale ds-cursor-pointer">
                <div className="ds-text-sm">Hover Scale</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-hover-scale</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-secondary ds-p-4 ds-rounded-lg ds-text-white ds-text-center ds-hover-lift ds-cursor-pointer">
                <div className="ds-text-sm">Hover Lift</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-hover-lift</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-accent ds-p-4 ds-rounded-lg ds-text-white ds-text-center ds-hover-shadow ds-cursor-pointer">
                <div className="ds-text-sm">Hover Shadow</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-hover-shadow</div>
            </div>
            <div className="ds-text-center">
              <div className="ds-bg-success ds-p-4 ds-rounded-lg ds-text-white ds-text-center ds-transition ds-cursor-pointer">
                <div className="ds-text-sm">Transition</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-transition</div>
            </div>
          </div>
        </div>

        {/* Утилітарні класи */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Утилітарні класи
          </h2>
          <div className="ds-space-y-4">
            <div>
              <h3 className="ds-text-lg ds-font-medium ds-mb-2">Flexbox</h3>
              <div className="ds-flex ds-justify-between ds-items-center ds-bg-gray-100 ds-p-4 ds-rounded">
                <div className="ds-bg-primary ds-p-2 ds-rounded ds-text-white">Item 1</div>
                <div className="ds-bg-secondary ds-p-2 ds-rounded ds-text-white">Item 2</div>
                <div className="ds-bg-accent ds-p-2 ds-rounded ds-text-white">Item 3</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-flex ds-justify-between ds-items-center</div>
            </div>
            <div>
              <h3 className="ds-text-lg ds-font-medium ds-mb-2">Grid</h3>
              <div className="ds-grid ds-grid-cols-3 ds-gap-4 ds-bg-gray-100 ds-p-4 ds-rounded">
                <div className="ds-bg-primary ds-p-2 ds-rounded ds-text-white ds-text-center">1</div>
                <div className="ds-bg-secondary ds-p-2 ds-rounded ds-text-white ds-text-center">2</div>
                <div className="ds-bg-accent ds-p-2 ds-rounded ds-text-white ds-text-center">3</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-grid ds-grid-cols-3 ds-gap-4</div>
            </div>
            <div>
              <h3 className="ds-text-lg ds-font-medium ds-mb-2">Spacing</h3>
              <div className="ds-bg-gray-100 ds-p-4 ds-rounded">
                <div className="ds-bg-primary ds-p-2 ds-rounded ds-text-white ds-mb-2">Margin Bottom</div>
                <div className="ds-bg-secondary ds-p-2 ds-rounded ds-text-white ds-mt-4">Margin Top</div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-mb-2, ds-mt-4</div>
            </div>
          </div>
        </div>

        {/* Спеціальні компоненти */}
        <div className="ds-card p-6 mb-8">
          <h2 className="ds-text-xl ds-font-semibold ds-text-gray-900 ds-mb-4">
            Спеціальні компоненти
          </h2>
          <div className="ds-space-y-6">
            {/* Кнопки управління */}
            <div>
              <h3 className="ds-text-lg ds-font-medium ds-mb-2">Кнопки управління</h3>
              <div className="ds-flex ds-gap-2">
                <div className="ds-text-center">
                  <button className="ds-control-btn">
                    <svg className="ds-control-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                    </svg>
                  </button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-control-btn</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-control-btn ds-control-btn-edit">
                    <svg className="ds-control-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-control-btn-edit</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-control-btn ds-control-btn-delete">
                    <svg className="ds-control-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-control-btn-delete</div>
                </div>
                <div className="ds-text-center">
                  <button className="ds-control-btn ds-control-btn-move">
                    <svg className="ds-control-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </button>
                  <div className="ds-text-xs ds-text-gray-500 ds-mt-1">ds-control-btn-move</div>
                </div>
              </div>
            </div>

            {/* Картка меню */}
            <div>
              <h3 className="ds-text-lg ds-font-medium ds-mb-2">Картка меню</h3>
              <div className="ds-menu-item-card">
                <div className="ds-menu-item-content">
                  <div className="ds-menu-item-image">
                    <div className="ds-menu-item-img ds-bg-gray-200 ds-flex ds-items-center ds-justify-center">
                      🍕
                    </div>
                  </div>
                  <div className="ds-menu-item-details">
                    <h4 className="ds-menu-item-name">Маргарита</h4>
                    <p className="ds-menu-item-price">250</p>
                  </div>
                  <div className="ds-menu-item-controls">
                    <button className="ds-control-btn ds-control-btn-edit">
                      <svg className="ds-control-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                      </svg>
                    </button>
                    <button className="ds-control-btn ds-control-btn-delete">
                      <svg className="ds-control-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-2">ds-menu-item-card, ds-menu-item-content, ds-menu-item-name, ds-menu-item-price</div>
            </div>

            {/* Картка категорії */}
            <div>
              <h3 className="ds-text-lg ds-font-medium ds-mb-2">Картка категорії</h3>
              <div className="ds-category-item">
                <div className="ds-category-card">
                  <h4 className="ds-category-name">Піца</h4>
                  <div className="ds-category-controls">
                    <button className="ds-control-btn ds-control-btn-edit">
                      <svg className="ds-control-icon ds-control-icon-sm" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                      </svg>
                    </button>
                    <button className="ds-control-btn ds-control-btn-delete">
                      <svg className="ds-control-icon ds-control-icon-sm" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ds-text-xs ds-text-gray-500 ds-mt-2">ds-category-item, ds-category-card, ds-category-name</div>
            </div>
          </div>
        </div>

        {/* Градієнтний фон */}
        <div className="ds-gradient-bg ds-gradient-overlay ds-rounded-lg ds-p-8 ds-mb-8">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title">Градієнтний фон</h2>
            <p className="ds-gradient-subtitle">
              Приклад використання градієнтного фону з оверлеєм та спеціальними стилями
            </p>
            <div className="ds-flex ds-gap-4 ds-justify-center">
              <button className="ds-gradient-button">Основна кнопка</button>
              <button className="ds-gradient-button-secondary">Другорядна кнопка</button>
            </div>
          </div>
          <div className="ds-text-xs ds-text-white ds-opacity-75 ds-mt-4 ds-text-center">
            ds-gradient-bg, ds-gradient-overlay, ds-gradient-title, ds-gradient-button
          </div>
        </div>

        {/* Підсумок */}
        <div className="ds-card p-6 ds-bg-gradient-primary ds-text-white">
          <h2 className="ds-text-2xl ds-font-bold ds-mb-4">Підсумок</h2>
          <p className="ds-text-lg ds-mb-4">
            Ця сторінка демонструє всі доступні стилі та компоненти вашої дизайн-системи QR Menu.
          </p>
          <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-4 ds-gap-4 ds-text-center">
            <div>
              <div className="ds-text-3xl ds-font-bold">9</div>
              <div className="ds-text-sm">Тем</div>
            </div>
            <div>
              <div className="ds-text-3xl ds-font-bold">50+</div>
              <div className="ds-text-sm">Компонентів</div>
            </div>
            <div>
              <div className="ds-text-3xl ds-font-bold">200+</div>
              <div className="ds-text-sm">Утиліт</div>
            </div>
            <div>
              <div className="ds-text-3xl ds-font-bold">∞</div>
              <div className="ds-text-sm">Можливостей</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
