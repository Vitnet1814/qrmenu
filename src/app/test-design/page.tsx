'use client';

import React from 'react';
import { ThemeProvider, Button, Card, CardBody, CardTitle } from '@/app/components/design-system';

export default function TestPage() {
  return (
    <ThemeProvider>
      <div className="ds-p-8 ds-bg-gray-50 ds-min-h-screen">
        <div className="ds-container ds-mx-auto">
          <h1 className="ds-text-4xl ds-font-bold ds-text-center ds-mb-8 ds-text-gradient-primary">
            Тест дизайн-системи
          </h1>
          
          <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3 ds-gap-6 ds-mb-8">
            <Card>
              <CardBody>
                <CardTitle>Тестова картка</CardTitle>
                <p className="ds-text-gray-600 ds-mt-2">
                  Це тестова картка для перевірки роботи дизайн-системи.
                </p>
                <Button variant="primary" className="ds-mt-4">
                  Тестова кнопка
                </Button>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <CardTitle>Друга картка</CardTitle>
                <p className="ds-text-gray-600 ds-mt-2">
                  Ще одна картка для демонстрації.
                </p>
                <Button variant="secondary" className="ds-mt-4">
                  Другорядна кнопка
                </Button>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <CardTitle>Третя картка</CardTitle>
                <p className="ds-text-gray-600 ds-mt-2">
                  Остання тестова картка.
                </p>
                <Button variant="accent" className="ds-mt-4">
                  Акцентна кнопка
                </Button>
              </CardBody>
            </Card>
          </div>
          
          <div className="ds-text-center">
            <p className="ds-text-lg ds-text-gray-600">
              Якщо ви бачите цю сторінку з правильними стилями, дизайн-система працює! 🎉
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
