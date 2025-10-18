'use client';

import React from 'react';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { ThemePreview } from './ThemePreview';
import { Button } from './Button';
import { Card, CardHeader, CardBody, CardTitle, CardText } from './Card';

const DesignSystemDemo: React.FC = () => {
  const { currentTheme, setThemeById, availableThemes, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="ds-min-h-screen ds-bg-gray-50 ds-p-6">
      <div className="ds-max-w-7xl ds-mx-auto">
        {/* Заголовок */}
        <div className="ds-text-center ds-mb-12">
          <h1 className="ds-text-5xl ds-font-bold ds-text-gradient-primary ds-mb-4">
            QR Menu Design System
          </h1>
          <p className="ds-text-xl ds-text-gray-600 ds-mb-8">
            Професійна дизайн-система для ресторанів та кафе
          </p>
          
          {/* Перемикач тем */}
          <div className="ds-flex ds-items-center ds-justify-center ds-gap-4 ds-mb-8">
            <Button
              variant="outline"
              onClick={toggleDarkMode}
              className="ds-flex ds-items-center ds-gap-2"
            >
              {isDarkMode ? '☀️' : '🌙'} {isDarkMode ? 'Світла тема' : 'Темна тема'}
            </Button>
            
            <div className="ds-text-sm ds-text-gray-600">
              Поточна тема: <span className="ds-font-semibold">{currentTheme.name}</span>
            </div>
          </div>
        </div>

        {/* Швидкий вибір тем */}
        <div className="ds-mb-12">
          <h2 className="ds-text-2xl ds-font-semibold ds-text-gray-900 ds-mb-6">
            Швидкий вибір теми
          </h2>
          <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-3 ds-lg:grid-cols-5 ds-gap-4">
            {availableThemes.map((theme) => (
              <Card
                key={theme.id}
                className={`ds-cursor-pointer ds-transition-all ${
                  currentTheme.id === theme.id 
                    ? 'ds-ring-2 ds-ring-primary ds-ring-offset-2' 
                    : 'ds-hover:shadow-lg ds-hover:scale-105'
                }`}
                onClick={() => setThemeById(theme.id)}
              >
                <CardBody className="ds-text-center ds-p-4">
                  <div 
                    className="ds-w-12 ds-h-12 ds-rounded-full ds-flex ds-items-center ds-justify-center ds-text-2xl ds-mx-auto ds-mb-3"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    {theme.preview}
                  </div>
                  <h3 className="ds-text-sm ds-font-medium ds-text-gray-900 ds-mb-1">
                    {theme.name}
                  </h3>
                  <p className="ds-text-xs ds-text-gray-600">
                    {theme.category}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Демонстрація компонентів */}
        <div className="ds-mb-12">
          <h2 className="ds-text-2xl ds-font-semibold ds-text-gray-900 ds-mb-6">
            Компоненти дизайн-системи
          </h2>
          
          {/* Кнопки */}
          <Card className="ds-mb-8">
            <CardHeader>
              <CardTitle>Кнопки</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-4 ds-gap-4 ds-mb-6">
                <Button variant="primary">Основна</Button>
                <Button variant="secondary">Другорядна</Button>
                <Button variant="accent">Акцентна</Button>
                <Button variant="outline">Контурна</Button>
                <Button variant="ghost">Прозора</Button>
                <Button variant="success">Успіх</Button>
                <Button variant="warning">Попередження</Button>
                <Button variant="error">Помилка</Button>
              </div>
              
              <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-4 ds-gap-4">
                <Button variant="primary" size="sm">Мала</Button>
                <Button variant="primary" size="md">Середня</Button>
                <Button variant="primary" size="lg">Велика</Button>
                <Button variant="primary" size="xl">Дуже велика</Button>
              </div>
            </CardBody>
          </Card>

          {/* Картки */}
          <Card className="ds-mb-8">
            <CardHeader>
              <CardTitle>Картки</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3 ds-gap-6">
                <Card shadow="sm">
                  <CardHeader>
                    <CardTitle>Проста картка</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <CardText>
                      Це приклад простої картки з базовим дизайном.
                    </CardText>
                  </CardBody>
                </Card>
                
                <Card shadow="md">
                  <CardHeader>
                    <CardTitle>Картка з тінню</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <CardText>
                      Картка з середньою тінню для більшого акценту.
                    </CardText>
                  </CardBody>
                </Card>
                
                <Card shadow="lg">
                  <CardHeader>
                    <CardTitle>Картка з великою тінню</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <CardText>
                      Картка з великою тінню для драматичного ефекту.
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>

          {/* Форми */}
          <Card className="ds-mb-8">
            <CardHeader>
              <CardTitle>Форми</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-6">
                <div>
                  <label className="ds-form-label">Ім&apos;я</label>
                  <input type="text" className="ds-form-input" placeholder="Введіть ваше ім&apos;я" />
                </div>
                
                <div>
                  <label className="ds-form-label">Email</label>
                  <input type="email" className="ds-form-input" placeholder="your@email.com" />
                </div>
                
                <div className="ds-md:col-span-2">
                  <label className="ds-form-label">Повідомлення</label>
                  <textarea className="ds-form-textarea" placeholder="Введіть ваше повідомлення"></textarea>
                </div>
                
                <div>
                  <label className="ds-form-label">Категорія</label>
                  <select className="ds-form-select">
                    <option>Ресторан</option>
                    <option>Кафе</option>
                    <option>Фаст-фуд</option>
                    <option>Бар</option>
                  </select>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Алерти */}
          <Card className="ds-mb-8">
            <CardHeader>
              <CardTitle>Алерти</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="ds-space-y-4">
                <div className="ds-alert ds-alert-success">
                  <strong>Успіх!</strong> Операція виконана успішно.
                </div>
                
                <div className="ds-alert ds-alert-warning">
                  <strong>Попередження!</strong> Будь ласка, перевірте введені дані.
                </div>
                
                <div className="ds-alert ds-alert-error">
                  <strong>Помилка!</strong> Щось пішло не так.
                </div>
                
                <div className="ds-alert ds-alert-info">
                  <strong>Інформація!</strong> Це важлива інформація для вас.
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Бейджі */}
          <Card className="ds-mb-8">
            <CardHeader>
              <CardTitle>Бейджі</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="ds-flex ds-flex-wrap ds-gap-3">
                <span className="ds-badge ds-badge-primary">Основний</span>
                <span className="ds-badge ds-badge-success">Успіх</span>
                <span className="ds-badge ds-badge-warning">Попередження</span>
                <span className="ds-badge ds-badge-error">Помилка</span>
              </div>
            </CardBody>
          </Card>

          {/* Прогрес бари */}
          <Card className="ds-mb-8">
            <CardHeader>
              <CardTitle>Прогрес бари</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="ds-space-y-4">
                <div>
                  <div className="ds-progress">
                    <div className="ds-progress-bar" style={{ width: '75%' }}></div>
                  </div>
                  <p className="ds-text-sm ds-text-gray-600 ds-mt-1">75% завершено</p>
                </div>
                
                <div>
                  <div className="ds-progress">
                    <div className="ds-progress-bar ds-progress-bar-success" style={{ width: '50%' }}></div>
                  </div>
                  <p className="ds-text-sm ds-text-gray-600 ds-mt-1">50% успішно</p>
                </div>
                
                <div>
                  <div className="ds-progress">
                    <div className="ds-progress-bar ds-progress-bar-warning" style={{ width: '25%' }}></div>
                  </div>
                  <p className="ds-text-sm ds-text-gray-600 ds-mt-1">25% попередження</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Повний редактор тем */}
        <div className="ds-mb-12">
          <h2 className="ds-text-2xl ds-font-semibold ds-text-gray-900 ds-mb-6">
            Редактор тем
          </h2>
          <ThemePreview 
            onThemeSelect={(theme) => setThemeById(theme.id)}
            selectedTheme={currentTheme.id}
            showCustomization={true}
          />
        </div>

        {/* Інформація про дизайн-систему */}
        <Card>
          <CardHeader>
            <CardTitle>Про дизайн-систему</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3 ds-gap-6">
              <div>
                <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-2">
                  🎨 Кольори
                </h3>
                <p className="ds-text-gray-600">
                  Повна палітра кольорів з градієнтами та готовими схемами для різних типів закладів.
                </p>
              </div>
              
              <div>
                <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-2">
                  📝 Типографіка
                </h3>
                <p className="ds-text-gray-600">
                  Inter шрифт з різними розмірами та вагами для оптимальної читабельності.
                </p>
              </div>
              
              <div>
                <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-2">
                  🎭 Анімації
                </h3>
                <p className="ds-text-gray-600">
                  Плавні переходи та hover ефекти для сучасного користувацького досвіду.
                </p>
              </div>
              
              <div>
                <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-2">
                  📱 Responsive
                </h3>
                <p className="ds-text-gray-600">
                  Адаптація під всі пристрої з мобільною оптимізацією.
                </p>
              </div>
              
              <div>
                <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-2">
                  ♿ Accessibility
                </h3>
                <p className="ds-text-gray-600">
                  Focus стилі та контрастність для доступності всім користувачам.
                </p>
              </div>
              
              <div>
                <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-2">
                  🏪 Готові теми
                </h3>
                <p className="ds-text-gray-600">
                  9 готових тем для різних типів закладів з можливістю кастомізації.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const DesignSystemPage: React.FC = () => {
  return (
    <ThemeProvider>
      <DesignSystemDemo />
    </ThemeProvider>
  );
};

export default DesignSystemPage;
