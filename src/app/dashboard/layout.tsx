// app/dashboard/layout.tsx
import React, { ReactNode } from 'react';
// Цей layout буде застосовуватися до всіх сторінок всередині /dashboard,
// якщо не перевизначено більш специфічним layout-ом (наприклад, [restaurantId]/layout.tsx)

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      {/* Загальна навігація для всіх кабінетів може бути тут, якщо потрібно */}
      {children}
    </div>
  );
};

export default DashboardLayout;