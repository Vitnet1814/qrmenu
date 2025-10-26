'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, CardSubtitle, CardText } from '../components/design-system';

export default function TestPageStyles() {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [activeSection, setActiveSection] = useState('overview');
  const [showAnimations, setShowAnimations] = useState(true);
  const [customColors, setCustomColors] = useState({
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const themes = [
    { id: 'default', name: 'За замовчуванням', emoji: '🎨' },
    { id: 'classic-restaurant', name: 'Класичний ресторан', emoji: '🍽️' },
    { id: 'cozy-cafe', name: 'Затишне кафе', emoji: '☕' },
    { id: 'fast-food', name: 'Фаст-фуд', emoji: '🍔' },
    { id: 'sushi-bar', name: 'Суші-бар', emoji: '🍣' },
    { id: 'pizzeria', name: 'Піцерія', emoji: '🍕' },
    { id: 'modern', name: 'Модерн', emoji: '🏢' },
    { id: 'dark', name: 'Темна тема', emoji: '🌙' },
    { id: 'spring', name: 'Весняна', emoji: '🌸' },
    { id: 'premium', name: 'Преміум', emoji: '👑' }
  ];

  const sections = [
    { id: 'overview', name: 'Огляд', icon: '📊' },
    { id: 'colors', name: 'Кольори', icon: '🎨' },
    { id: 'typography', name: 'Типографіка', icon: '📝' },
    { id: 'components', name: 'Компоненти', icon: '🧩' },
    { id: 'layouts', name: 'Макети', icon: '📐' },
    { id: 'animations', name: 'Анімації', icon: '✨' },
    { id: 'examples', name: 'Приклади', icon: '🍽️' },
    { id: 'documentation', name: 'Документація', icon: '📚' },
    { id: 'search', name: 'Пошук', icon: '🔍' },
    { id: 'customize', name: 'Налаштування', icon: '⚙️' }
  ];

  // Демонстраційні дані меню
  const menuData = {
    restaurant: {
      name: 'Ресторан "Українська Кухня"',
      description: 'Автентична українська кухня',
      banner: '/image_public/054004c7-6aff-45fb-b36a-541972cccff4_resized.jpg'
    },
    categories: [
      {
        id: 1,
        name: 'Гарячі страви',
        items: [
          { id: 1, name: 'Борщ український', price: 120, description: 'Традиційний український борщ зі сметаною та зеленню', image: '🍲' },
          { id: 2, name: 'Вареники з картоплею', price: 95, description: 'Домашні вареники з картоплею та цибулею', image: '🥟' },
          { id: 3, name: 'Котлети по-київськи', price: 180, description: 'Класичні котлети з маслом та зеленню', image: '🍖' }
        ]
      },
      {
        id: 2,
        name: 'Салати',
        items: [
          { id: 4, name: 'Олів\'є', price: 85, description: 'Класичний салат Олів\'є з домашньою сметаною', image: '🥗' },
          { id: 5, name: 'Грецький салат', price: 110, description: 'Свіжий салат з фетою та оливками', image: '🥙' }
        ]
      },
      {
        id: 3,
        name: 'Напої',
        items: [
          { id: 6, name: 'Узвар', price: 45, description: 'Традиційний український компот', image: '🥤' },
          { id: 7, name: 'Квас', price: 35, description: 'Домашній хлібний квас', image: '🍺' }
        ]
      }
    ]
  };

  // Функції для роботи з кольорами
  const updateCustomColor = (colorKey: string, value: string) => {
    setCustomColors(prev => ({ ...prev, [colorKey]: value }));
  };

  // Детальна документація CSS класів
  const cssDocumentation = {
    spacing: {
      title: 'Spacing (Відступи)',
      description: 'CSS змінні та класи для відступів',
      variables: [
        { name: '--spacing-0', value: '0', pixels: '0px', description: 'Без відступу' },
        { name: '--spacing-1', value: '0.25rem', pixels: '4px', description: 'Мінімальний відступ' },
        { name: '--spacing-2', value: '0.5rem', pixels: '8px', description: 'Малий відступ' },
        { name: '--spacing-3', value: '0.75rem', pixels: '12px', description: 'Середній відступ' },
        { name: '--spacing-4', value: '1rem', pixels: '16px', description: 'Базовий відступ' },
        { name: '--spacing-5', value: '1.25rem', pixels: '20px', description: 'Великий відступ' },
        { name: '--spacing-6', value: '1.5rem', pixels: '24px', description: 'Дуже великий відступ' },
        { name: '--spacing-8', value: '2rem', pixels: '32px', description: 'Величезний відступ' },
        { name: '--spacing-10', value: '2.5rem', pixels: '40px', description: 'Максимальний відступ' },
        { name: '--spacing-12', value: '3rem', pixels: '48px', description: 'Екстра відступ' },
        { name: '--spacing-16', value: '4rem', pixels: '64px', description: 'Мега відступ' },
        { name: '--spacing-20', value: '5rem', pixels: '80px', description: 'Гіга відступ' },
        { name: '--spacing-24', value: '6rem', pixels: '96px', description: 'Тера відступ' },
        { name: '--spacing-32', value: '8rem', pixels: '128px', description: 'Пета відступ' }
      ],
      classes: [
        { class: '.ds-p-0', css: 'padding: var(--spacing-0);', pixels: '0px', description: 'Без padding' },
        { class: '.ds-p-1', css: 'padding: var(--spacing-1);', pixels: '4px', description: 'Мінімальний padding' },
        { class: '.ds-p-2', css: 'padding: var(--spacing-2);', pixels: '8px', description: 'Малий padding' },
        { class: '.ds-p-3', css: 'padding: var(--spacing-3);', pixels: '12px', description: 'Середній padding' },
        { class: '.ds-p-4', css: 'padding: var(--spacing-4);', pixels: '16px', description: 'Базовий padding' },
        { class: '.ds-p-6', css: 'padding: var(--spacing-6);', pixels: '24px', description: 'Великий padding' },
        { class: '.ds-p-8', css: 'padding: var(--spacing-8);', pixels: '32px', description: 'Дуже великий padding' },
        { class: '.ds-px-0', css: 'padding-left: var(--spacing-0); padding-right: var(--spacing-0);', pixels: '0px', description: 'Без горизонтального padding' },
        { class: '.ds-px-1', css: 'padding-left: var(--spacing-1); padding-right: var(--spacing-1);', pixels: '4px', description: 'Мінімальний горизонтальний padding' },
        { class: '.ds-px-2', css: 'padding-left: var(--spacing-2); padding-right: var(--spacing-2);', pixels: '8px', description: 'Малий горизонтальний padding' },
        { class: '.ds-px-3', css: 'padding-left: var(--spacing-3); padding-right: var(--spacing-3);', pixels: '12px', description: 'Середній горизонтальний padding' },
        { class: '.ds-px-4', css: 'padding-left: var(--spacing-4); padding-right: var(--spacing-4);', pixels: '16px', description: 'Базовий горизонтальний padding' },
        { class: '.ds-px-6', css: 'padding-left: var(--spacing-6); padding-right: var(--spacing-6);', pixels: '24px', description: 'Великий горизонтальний padding' },
        { class: '.ds-px-8', css: 'padding-left: var(--spacing-8); padding-right: var(--spacing-8);', pixels: '32px', description: 'Дуже великий горизонтальний padding' },
        { class: '.ds-py-0', css: 'padding-top: var(--spacing-0); padding-bottom: var(--spacing-0);', pixels: '0px', description: 'Без вертикального padding' },
        { class: '.ds-py-1', css: 'padding-top: var(--spacing-1); padding-bottom: var(--spacing-1);', pixels: '4px', description: 'Мінімальний вертикальний padding' },
        { class: '.ds-py-2', css: 'padding-top: var(--spacing-2); padding-bottom: var(--spacing-2);', pixels: '8px', description: 'Малий вертикальний padding' },
        { class: '.ds-py-3', css: 'padding-top: var(--spacing-3); padding-bottom: var(--spacing-3);', pixels: '12px', description: 'Середній вертикальний padding' },
        { class: '.ds-py-4', css: 'padding-top: var(--spacing-4); padding-bottom: var(--spacing-4);', pixels: '16px', description: 'Базовий вертикальний padding' },
        { class: '.ds-py-6', css: 'padding-top: var(--spacing-6); padding-bottom: var(--spacing-6);', pixels: '24px', description: 'Великий вертикальний padding' },
        { class: '.ds-py-8', css: 'padding-top: var(--spacing-8); padding-bottom: var(--spacing-8);', pixels: '32px', description: 'Дуже великий вертикальний padding' }
      ]
    },
    colors: {
      title: 'Colors (Кольори)',
      description: 'CSS змінні та класи для кольорів',
      variables: [
        { name: '--color-primary', value: '#2563eb', description: 'Основний колір' },
        { name: '--color-primary-hover', value: '#1d4ed8', description: 'Основний колір при наведенні' },
        { name: '--color-primary-light', value: '#dbeafe', description: 'Світлий основний колір' },
        { name: '--color-primary-dark', value: '#1e40af', description: 'Темний основний колір' },
        { name: '--color-secondary', value: '#64748b', description: 'Другорядний колір' },
        { name: '--color-secondary-hover', value: '#475569', description: 'Другорядний колір при наведенні' },
        { name: '--color-secondary-light', value: '#f1f5f9', description: 'Світлий другорядний колір' },
        { name: '--color-secondary-dark', value: '#334155', description: 'Темний другорядний колір' },
        { name: '--color-accent', value: '#f59e0b', description: 'Акцентний колір' },
        { name: '--color-accent-hover', value: '#d97706', description: 'Акцентний колір при наведенні' },
        { name: '--color-accent-light', value: '#fef3c7', description: 'Світлий акцентний колір' },
        { name: '--color-accent-dark', value: '#b45309', description: 'Темний акцентний колір' },
        { name: '--color-success', value: '#10b981', description: 'Колір успіху' },
        { name: '--color-success-hover', value: '#059669', description: 'Колір успіху при наведенні' },
        { name: '--color-success-light', value: '#d1fae5', description: 'Світлий колір успіху' },
        { name: '--color-warning', value: '#f59e0b', description: 'Колір попередження' },
        { name: '--color-warning-hover', value: '#d97706', description: 'Колір попередження при наведенні' },
        { name: '--color-warning-light', value: '#fef3c7', description: 'Світлий колір попередження' },
        { name: '--color-error', value: '#ef4444', description: 'Колір помилки' },
        { name: '--color-error-hover', value: '#dc2626', description: 'Колір помилки при наведенні' },
        { name: '--color-error-light', value: '#fee2e2', description: 'Світлий колір помилки' },
        { name: '--color-info', value: '#3b82f6', description: 'Колір інформації' },
        { name: '--color-info-hover', value: '#2563eb', description: 'Колір інформації при наведенні' },
        { name: '--color-info-light', value: '#dbeafe', description: 'Світлий колір інформації' }
      ],
      classes: [
        { class: '.ds-text-primary', css: 'color: var(--color-primary);', description: 'Основний колір тексту' },
        { class: '.ds-text-secondary', css: 'color: var(--color-secondary);', description: 'Другорядний колір тексту' },
        { class: '.ds-text-accent', css: 'color: var(--color-accent);', description: 'Акцентний колір тексту' },
        { class: '.ds-text-success', css: 'color: var(--color-success);', description: 'Колір тексту успіху' },
        { class: '.ds-text-warning', css: 'color: var(--color-warning);', description: 'Колір тексту попередження' },
        { class: '.ds-text-error', css: 'color: var(--color-error);', description: 'Колір тексту помилки' },
        { class: '.ds-text-white', css: 'color: var(--color-white);', description: 'Білий колір тексту' },
        { class: '.ds-bg-primary', css: 'background-color: var(--color-primary);', description: 'Основний колір фону' },
        { class: '.ds-bg-secondary', css: 'background-color: var(--color-secondary);', description: 'Другорядний колір фону' },
        { class: '.ds-bg-accent', css: 'background-color: var(--color-accent);', description: 'Акцентний колір фону' },
        { class: '.ds-bg-success', css: 'background-color: var(--color-success);', description: 'Колір фону успіху' },
        { class: '.ds-bg-warning', css: 'background-color: var(--color-warning);', description: 'Колір фону попередження' },
        { class: '.ds-bg-error', css: 'background-color: var(--color-error);', description: 'Колір фону помилки' },
        { class: '.ds-bg-white', css: 'background-color: var(--color-white);', description: 'Білий колір фону' }
      ]
    },
    typography: {
      title: 'Typography (Типографіка)',
      description: 'CSS змінні та класи для типографіки',
      variables: [
        { name: '--font-size-xs', value: '0.75rem', pixels: '12px', description: 'Дуже малий розмір шрифту' },
        { name: '--font-size-sm', value: '0.875rem', pixels: '14px', description: 'Малий розмір шрифту' },
        { name: '--font-size-base', value: '1rem', pixels: '16px', description: 'Базовий розмір шрифту' },
        { name: '--font-size-lg', value: '1.125rem', pixels: '18px', description: 'Великий розмір шрифту' },
        { name: '--font-size-xl', value: '1.25rem', pixels: '20px', description: 'Дуже великий розмір шрифту' },
        { name: '--font-size-2xl', value: '1.5rem', pixels: '24px', description: 'Екстра великий розмір шрифту' },
        { name: '--font-size-3xl', value: '1.875rem', pixels: '30px', description: 'Мега великий розмір шрифту' },
        { name: '--font-size-4xl', value: '2.25rem', pixels: '36px', description: 'Гіга великий розмір шрифту' },
        { name: '--font-size-5xl', value: '3rem', pixels: '48px', description: 'Тера великий розмір шрифту' },
        { name: '--font-size-6xl', value: '3.75rem', pixels: '60px', description: 'Пета великий розмір шрифту' },
        { name: '--font-weight-light', value: '300', description: 'Легка вага шрифту' },
        { name: '--font-weight-normal', value: '400', description: 'Нормальна вага шрифту' },
        { name: '--font-weight-medium', value: '500', description: 'Середня вага шрифту' },
        { name: '--font-weight-semibold', value: '600', description: 'Напівжирна вага шрифту' },
        { name: '--font-weight-bold', value: '700', description: 'Жирна вага шрифту' },
        { name: '--font-weight-extrabold', value: '800', description: 'Дуже жирна вага шрифту' }
      ],
      classes: [
        { class: '.ds-text-xs', css: 'font-size: var(--font-size-xs);', pixels: '12px', description: 'Дуже малий текст' },
        { class: '.ds-text-sm', css: 'font-size: var(--font-size-sm);', pixels: '14px', description: 'Малий текст' },
        { class: '.ds-text-base', css: 'font-size: var(--font-size-base);', pixels: '16px', description: 'Базовий текст' },
        { class: '.ds-text-lg', css: 'font-size: var(--font-size-lg);', pixels: '18px', description: 'Великий текст' },
        { class: '.ds-text-xl', css: 'font-size: var(--font-size-xl);', pixels: '20px', description: 'Дуже великий текст' },
        { class: '.ds-text-2xl', css: 'font-size: var(--font-size-2xl);', pixels: '24px', description: 'Екстра великий текст' },
        { class: '.ds-text-3xl', css: 'font-size: var(--font-size-3xl);', pixels: '30px', description: 'Мега великий текст' },
        { class: '.ds-text-4xl', css: 'font-size: var(--font-size-4xl);', pixels: '36px', description: 'Гіга великий текст' },
        { class: '.ds-text-5xl', css: 'font-size: var(--font-size-5xl);', pixels: '48px', description: 'Тера великий текст' },
        { class: '.ds-font-light', css: 'font-weight: var(--font-weight-light);', description: 'Легкий шрифт' },
        { class: '.ds-font-normal', css: 'font-weight: var(--font-weight-normal);', description: 'Нормальний шрифт' },
        { class: '.ds-font-medium', css: 'font-weight: var(--font-weight-medium);', description: 'Середній шрифт' },
        { class: '.ds-font-semibold', css: 'font-weight: var(--font-weight-semibold);', description: 'Напівжирний шрифт' },
        { class: '.ds-font-bold', css: 'font-weight: var(--font-weight-bold);', description: 'Жирний шрифт' },
        { class: '.ds-text-left', css: 'text-align: left;', description: 'Вирівнювання тексту ліворуч' },
        { class: '.ds-text-center', css: 'text-align: center;', description: 'Вирівнювання тексту по центру' },
        { class: '.ds-text-right', css: 'text-align: right;', description: 'Вирівнювання тексту праворуч' }
      ]
    },
    shadows: {
      title: 'Shadows (Тіні)',
      description: 'CSS змінні та класи для тіней',
      variables: [
        { name: '--shadow-xs', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', description: 'Дуже мала тінь' },
        { name: '--shadow-sm', value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', description: 'Мала тінь' },
        { name: '--shadow-md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', description: 'Середня тінь' },
        { name: '--shadow-lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', description: 'Велика тінь' },
        { name: '--shadow-xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', description: 'Дуже велика тінь' },
        { name: '--shadow-2xl', value: '0 25px 50px -12px rgb(0 0 0 / 0.25)', description: 'Екстра велика тінь' },
        { name: '--shadow-inner', value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', description: 'Внутрішня тінь' }
      ],
      classes: [
        { class: '.ds-shadow-xs', css: 'box-shadow: var(--shadow-xs);', description: 'Дуже мала тінь' },
        { class: '.ds-shadow-sm', css: 'box-shadow: var(--shadow-sm);', description: 'Мала тінь' },
        { class: '.ds-shadow-md', css: 'box-shadow: var(--shadow-md);', description: 'Середня тінь' },
        { class: '.ds-shadow-lg', css: 'box-shadow: var(--shadow-lg);', description: 'Велика тінь' },
        { class: '.ds-shadow-xl', css: 'box-shadow: var(--shadow-xl);', description: 'Дуже велика тінь' },
        { class: '.ds-shadow-2xl', css: 'box-shadow: var(--shadow-2xl);', description: 'Екстра велика тінь' }
      ]
    },
    borderRadius: {
      title: 'Border Radius (Радіуси закруглення)',
      description: 'CSS змінні та класи для радіусів закруглення',
      variables: [
        { name: '--radius-none', value: '0', pixels: '0px', description: 'Без закруглення' },
        { name: '--radius-sm', value: '0.125rem', pixels: '2px', description: 'Малий радіус' },
        { name: '--radius-md', value: '0.375rem', pixels: '6px', description: 'Середній радіус' },
        { name: '--radius-lg', value: '0.5rem', pixels: '8px', description: 'Великий радіус' },
        { name: '--radius-xl', value: '0.75rem', pixels: '12px', description: 'Дуже великий радіус' },
        { name: '--radius-2xl', value: '1rem', pixels: '16px', description: 'Екстра великий радіус' },
        { name: '--radius-3xl', value: '1.5rem', pixels: '24px', description: 'Мега великий радіус' },
        { name: '--radius-full', value: '9999px', description: 'Повне закруглення (круг)' }
      ],
      classes: [
        { class: '.ds-rounded-none', css: 'border-radius: var(--radius-none);', pixels: '0px', description: 'Без закруглення' },
        { class: '.ds-rounded-sm', css: 'border-radius: var(--radius-sm);', pixels: '2px', description: 'Малий радіус' },
        { class: '.ds-rounded-md', css: 'border-radius: var(--radius-md);', pixels: '6px', description: 'Середній радіус' },
        { class: '.ds-rounded-lg', css: 'border-radius: var(--radius-lg);', pixels: '8px', description: 'Великий радіус' },
        { class: '.ds-rounded-xl', css: 'border-radius: var(--radius-xl);', pixels: '12px', description: 'Дуже великий радіус' },
        { class: '.ds-rounded-2xl', css: 'border-radius: var(--radius-2xl);', pixels: '16px', description: 'Екстра великий радіус' },
        { class: '.ds-rounded-3xl', css: 'border-radius: var(--radius-3xl);', pixels: '24px', description: 'Мега великий радіус' },
        { class: '.ds-rounded-full', css: 'border-radius: var(--radius-full);', description: 'Повне закруглення' }
      ]
    }
  };

  // Пошук по CSS класах
  const searchResults = () => {
    if (!searchQuery.trim()) return [];
    
    const allClasses = Object.values(cssDocumentation).flatMap(section => 
      section.classes?.map(cls => ({
        ...cls,
        category: section.title,
        description: section.description
      })) || []
    );
    
    return allClasses.filter(cls => 
      cls.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.css.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Компонент для демонстрації меню
  const MenuExample = ({ themeId }: { themeId: string }) => (
    <div className="ds-max-w-sm ds-mx-auto ds-bg-white ds-rounded-xl ds-overflow-hidden ds-shadow-lg">
      {/* Заголовок ресторану */}
      <div 
        className="ds-text-center ds-py-6 ds-px-4 ds-relative ds-overflow-hidden"
        style={{ 
          background: menuData.restaurant.banner 
            ? `url(${menuData.restaurant.banner}) center/cover`
            : `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
          color: '#ffffff'
        }}
      >
        {menuData.restaurant.banner && (
          <div className="ds-absolute ds-inset-0 ds-bg-black ds-bg-opacity-40" />
        )}
        <div className="ds-relative ds-z-10">
          <h1 className="ds-text-xl ds-font-bold ds-mb-1">
            {menuData.restaurant.name}
          </h1>
          <p className="ds-text-sm ds-opacity-90">{menuData.restaurant.description}</p>
        </div>
      </div>

      {/* Категорії та страви */}
      <div className="ds-p-4" style={{ backgroundColor: 'var(--color-gray-50)' }}>
        {menuData.categories.map((category) => (
          <div key={category.id} className="ds-mb-6">
            <h2 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-3 ds-border-b ds-border-gray-200 ds-pb-1">
              {category.name}
            </h2>
            <div className="ds-space-y-3">
              {category.items.map((item) => (
                <div key={item.id} className="ds-bg-white ds-rounded-lg ds-p-4 ds-shadow-sm ds-border ds-border-gray-100">
                  <div className="ds-flex ds-justify-between ds-items-start ds-mb-2">
                    <div className="ds-flex-1">
                      <div className="ds-flex ds-items-center ds-gap-2 ds-mb-1">
                        <span className="ds-text-2xl">{item.image}</span>
                        <h3 className="ds-text-base ds-font-semibold ds-text-gray-900">
                          {item.name}
                        </h3>
                      </div>
                      <p className="ds-text-sm ds-text-gray-600 ds-mb-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="ds-text-lg ds-font-bold ds-text-primary ds-ml-2">
                      {item.price}₴
                    </div>
                  </div>
                  <div className="ds-flex ds-gap-2">
                    <span className="ds-badge ds-badge-primary ds-text-xs">Популярне</span>
                    <span className="ds-badge ds-badge-secondary ds-text-xs">Гаряче</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Футер */}
      <div className="ds-text-center ds-py-3 ds-px-4 ds-bg-gray-100 ds-border-t ds-border-gray-200">
        <p className="ds-text-xs ds-text-gray-600">
          Скануйте QR-код для перегляду повного меню
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" data-theme={selectedTheme}>
      <div className="max-w-screen-xl mx-auto p-4" style={{ maxWidth: '1200px' }}>
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎨 Тестова сторінка стилів QR Menu
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Повна демонстрація всіх можливостей дизайн-системи
          </p>
          
          {/* Навігація по секціях */}
          <div className="ds-flex ds-flex-wrap ds-justify-center ds-gap-2 ds-mb-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`ds-btn ds-btn-sm ${
                  activeSection === section.id 
                    ? 'ds-btn-primary' 
                    : 'ds-btn-outline'
                }`}
              >
                <span className="ds-mr-2">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Перемикач тем */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🎨 Перемикач тем</CardTitle>
            <CardSubtitle>Оберіть тему для перегляду всіх стилів</CardSubtitle>
          </CardHeader>
          <CardBody>
            <div className="ds-flex ds-flex-wrap ds-gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`ds-btn ds-btn-sm ds-flex ds-items-center ds-gap-2 ${
                    selectedTheme === theme.id 
                      ? 'ds-btn-primary' 
                      : 'ds-btn-outline'
                  }`}
                >
                  <span>{theme.emoji}</span>
                  {theme.name}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Умовний рендеринг секцій */}
        {activeSection === 'overview' && (
          <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3 ds-gap-6 ds-mb-8">
            <Card>
              <CardHeader>
                <CardTitle>🎨 Кольори</CardTitle>
                <CardSubtitle>Повна палітра кольорів</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-grid ds-grid-cols-2 ds-gap-2">
                  <div className="ds-bg-primary ds-p-3 ds-rounded ds-text-white ds-text-center ds-text-sm">
                    Primary
                  </div>
                  <div className="ds-bg-secondary ds-p-3 ds-rounded ds-text-white ds-text-center ds-text-sm">
                    Secondary
                  </div>
                  <div className="ds-bg-accent ds-p-3 ds-rounded ds-text-white ds-text-center ds-text-sm">
                    Accent
                  </div>
                  <div className="ds-bg-success ds-p-3 ds-rounded ds-text-white ds-text-center ds-text-sm">
                    Success
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🧩 Компоненти</CardTitle>
                <CardSubtitle>Готові компоненти</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-space-y-2">
                  <Button size="sm" variant="primary">Кнопка</Button>
                  <div className="ds-badge ds-badge-primary">Бейдж</div>
                  <div className="ds-progress">
                    <div className="ds-progress-bar" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📱 Приклади меню</CardTitle>
                <CardSubtitle>Реальні приклади</CardSubtitle>
              </CardHeader>
              <CardBody>
                <MenuExample themeId={selectedTheme} />
              </CardBody>
            </Card>
          </div>
        )}

        {activeSection === 'colors' && (
          <div className="ds-space-y-8">
            {/* Кольорова палітра */}
            <Card>
              <CardHeader>
                <CardTitle>🎨 Кольорова палітра</CardTitle>
                <CardSubtitle>Основні кольори дизайн-системи</CardSubtitle>
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>

            {/* Градієнти */}
            <Card>
              <CardHeader>
                <CardTitle>🌈 Градієнти</CardTitle>
                <CardSubtitle>Готові градієнтні фони</CardSubtitle>
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>

            {/* Налаштування кольорів */}
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Налаштування кольорів</CardTitle>
                <CardSubtitle>Змініть кольори в реальному часі</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-3 ds-gap-4">
                  {Object.entries(customColors).map(([key, value]) => (
                    <div key={key} className="ds-space-y-2">
                      <label className="ds-text-sm ds-font-medium ds-text-gray-700 ds-capitalize">
                        {key}
                      </label>
                      <div className="ds-flex ds-items-center ds-gap-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => updateCustomColor(key, e.target.value)}
                          className="ds-w-8 ds-h-8 ds-rounded ds-border ds-border-gray-300 ds-cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateCustomColor(key, e.target.value)}
                          className="ds-flex-1 ds-px-2 ds-py-1 ds-text-xs ds-border ds-border-gray-300 ds-rounded ds-font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {activeSection === 'typography' && (
          <div className="ds-space-y-8">
            {/* Типографіка */}
            <Card>
              <CardHeader>
                <CardTitle>📝 Типографіка</CardTitle>
                <CardSubtitle>Всі варіанти тексту та заголовків</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-space-y-6">
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
              </CardBody>
            </Card>

            {/* Демонстрація шрифтів */}
            <Card>
              <CardHeader>
                <CardTitle>🔤 Сімейства шрифтів</CardTitle>
                <CardSubtitle>Всі доступні шрифти для меню</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-space-y-6">
                  <div className="font-inter">
                    <h3 className="ds-text-xl ds-text-gray-900 ds-mb-2 ds-font-normal">Inter</h3>
                    <p className="ds-text-lg ds-text-gray-700 ds-mb-2">QR menu for your restaurant in 5 minutes. Free. Create a modern menu, get a QR code and let customers view your dishes from their phone</p>
                    <p className="ds-text-lg ds-text-gray-700 ds-mb-1">QR-меню для її закладу за 5 хвилин. Безкоштовно
Створіть сучасне меню, є QR-код і дозвольте клієнтам переглядати ваші страви зі свого телефону</p>
                    <div className="ds-text-xs ds-text-gray-500 ds-mt-1">Сімейство: Sans-serif</div>
                  </div>

                  <div className="font-playfair">
                    <h3 className="ds-text-xl ds-text-gray-900 ds-mb-2 ds-font-normal">Playfair Display</h3>
                    <p className="ds-text-lg ds-text-gray-700 ds-mb-2">QR menu for your restaurant in 5 minutes. Free. Create a modern menu, get a QR code and let customers view your dishes from their phone</p>
                    <p className="ds-text-lg ds-text-gray-700 ds-mb-1">QR-меню для її закладу за 5 хвилин. Безкоштовно
Створіть сучасне меню, є QR-код і дозвольте клієнтам переглядати ваші страви зі свого телефону</p>
                    <div className="ds-text-xs ds-text-gray-500 ds-mt-1">Сімейство: Serif</div>
                  </div>

                  <div className="font-inconsolata">
                    <h3 className="ds-text-xl ds-text-gray-900 ds-mb-2 ds-font-normal">Inconsolata</h3>
                    <p className="ds-text-lg ds-text-gray-700 ds-mb-2">QR menu for your restaurant in 5 minutes. Free. Create a modern menu, get a QR code and let customers view your dishes from their phone</p>
                    <p className="ds-text-lg ds-text-gray-700 ds-mb-1">QR-меню для її закладу за 5 хвилин. Безкоштовно
Створіть сучасне меню, є QR-код і дозвольте клієнтам переглядати ваші страви зі свого телефону</p>
                    <div className="ds-text-xs ds-text-gray-500 ds-mt-1">Сімейство: Monospace</div>
                  </div>


                  <div className="font-times">
                    <h3 className="ds-text-xl ds-text-gray-900 ds-mb-2 ds-font-normal">Times New Roman</h3>
                    <p className="ds-text-lg ds-text-gray-700 ds-mb-2">QR menu for your restaurant in 5 minutes. Free. Create a modern menu, get a QR code and let customers view your dishes from their phone</p>
                    <p className="ds-text-lg ds-text-gray-700 ds-mb-1">QR-меню для її закладу за 5 хвилин. Безкоштовно
Створіть сучасне меню, є QR-код і дозвольте клієнтам переглядати ваші страви зі свого телефону</p>
                    <div className="ds-text-xs ds-text-gray-500 ds-mt-1">Сімейство: Serif (System Font)</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {activeSection === 'components' && (
          <div className="ds-space-y-8">
            {/* Кнопки */}
            <Card>
              <CardHeader>
                <CardTitle>🔘 Кнопки</CardTitle>
                <CardSubtitle>Всі варіанти кнопок</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-space-y-6">
                  <div>
                    <h3 className="ds-text-lg ds-font-medium ds-mb-3">Основні варіанти</h3>
                    <div className="ds-flex ds-flex-wrap ds-gap-3">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="accent">Accent</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="ds-text-lg ds-font-medium ds-mb-3">Статусні кнопки</h3>
                    <div className="ds-flex ds-flex-wrap ds-gap-3">
                      <Button variant="success">Success</Button>
                      <Button variant="warning">Warning</Button>
                      <Button variant="error">Error</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="ds-text-lg ds-font-medium ds-mb-3">Розміри</h3>
                    <div className="ds-flex ds-flex-wrap ds-gap-3 ds-items-center">
                      <Button size="sm" variant="primary">Small</Button>
                      <Button size="md" variant="primary">Normal</Button>
                      <Button size="lg" variant="primary">Large</Button>
                      <Button size="xl" variant="primary">Extra Large</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="ds-text-lg ds-font-medium ds-mb-3">Стани</h3>
                    <div className="ds-flex ds-flex-wrap ds-gap-3">
                      <Button variant="primary" loading>Loading</Button>
                      <Button variant="primary" disabled>Disabled</Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Картки */}
            <Card>
              <CardHeader>
                <CardTitle>📄 Картки</CardTitle>
                <CardSubtitle>Різні варіанти карток</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3 ds-gap-4">
                  <Card shadow="sm">
                    <CardHeader>
                      <CardTitle>Проста картка</CardTitle>
                      <CardSubtitle>Підзаголовок картки</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        Це приклад простого тексту в картці з базовим стилем.
                      </CardText>
                    </CardBody>
                  </Card>
                  
                  <Card shadow="lg">
                    <CardHeader>
                      <CardTitle>Картка з тінню</CardTitle>
                      <CardSubtitle>З великою тінню</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        Картка з додатковою тінню для більшого акценту.
                      </CardText>
                    </CardBody>
                  </Card>

                  <Card shadow="xl">
                    <CardHeader>
                      <CardTitle>Картка з футером</CardTitle>
                      <CardSubtitle>Повна структура</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        Картка з повною структурою включаючи футер.
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      <Button size="sm" variant="primary">Дія</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardBody>
            </Card>

            {/* Форми */}
            <Card>
              <CardHeader>
                <CardTitle>📝 Форми</CardTitle>
                <CardSubtitle>Елементи форм</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-6">
                  <div>
                    <div className="ds-form-group">
                      <label className="ds-form-label">Ім'я</label>
                      <input 
                        type="text" 
                        className="ds-form-input" 
                        placeholder="Введіть ваше ім'я"
                      />
                    </div>
                    <div className="ds-form-group">
                      <label className="ds-form-label">Email</label>
                      <input 
                        type="email" 
                        className="ds-form-input" 
                        placeholder="example@email.com"
                      />
                    </div>
                    <div className="ds-form-group">
                      <label className="ds-form-label">Повідомлення</label>
                      <textarea 
                        className="ds-form-textarea" 
                        placeholder="Введіть ваше повідомлення"
                      ></textarea>
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
                    </div>
                    <div className="ds-form-group">
                      <label className="ds-form-label">Відключене поле</label>
                      <input 
                        type="text" 
                        className="ds-form-input" 
                        disabled 
                        value="Це поле відключене"
                      />
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
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Алерти */}
            <Card>
              <CardHeader>
                <CardTitle>🚨 Алерти</CardTitle>
                <CardSubtitle>Повідомлення та сповіщення</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-space-y-4">
                  <div className="ds-alert ds-alert-success">
                    <strong>Успіх!</strong> Операція виконана успішно.
                  </div>
                  <div className="ds-alert ds-alert-warning">
                    <strong>Увага!</strong> Будь ласка, перевірте дані.
                  </div>
                  <div className="ds-alert ds-alert-error">
                    <strong>Помилка!</strong> Щось пішло не так.
                  </div>
                  <div className="ds-alert ds-alert-info">
                    <strong>Інформація!</strong> Корисна інформація для вас.
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Бейджі */}
            <Card>
              <CardHeader>
                <CardTitle>🏷️ Бейджі</CardTitle>
                <CardSubtitle>Мітки та індикатори</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-flex ds-flex-wrap ds-gap-3">
                  <span className="ds-badge ds-badge-primary">Primary</span>
                  <span className="ds-badge ds-badge-success">Success</span>
                  <span className="ds-badge ds-badge-warning">Warning</span>
                  <span className="ds-badge ds-badge-error">Error</span>
                </div>
              </CardBody>
            </Card>

            {/* Прогрес бари */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Прогрес бари</CardTitle>
                <CardSubtitle>Індикатори прогресу</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-space-y-4">
                  <div>
                    <div className="ds-text-sm ds-text-gray-600 ds-mb-2">Базовий прогрес (75%)</div>
                    <div className="ds-progress">
                      <div className="ds-progress-bar" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="ds-text-sm ds-text-gray-600 ds-mb-2">Успішний прогрес (60%)</div>
                    <div className="ds-progress">
                      <div className="ds-progress-bar ds-progress-bar-success" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="ds-text-sm ds-text-gray-600 ds-mb-2">Попередження (40%)</div>
                    <div className="ds-progress">
                      <div className="ds-progress-bar ds-progress-bar-warning" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="ds-text-sm ds-text-gray-600 ds-mb-2">Помилка (20%)</div>
                    <div className="ds-progress">
                      <div className="ds-progress-bar ds-progress-bar-error" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Спиннери */}
            <Card>
              <CardHeader>
                <CardTitle>⏳ Спиннери</CardTitle>
                <CardSubtitle>Індикатори завантаження</CardSubtitle>
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>
          </div>
        )}

        {activeSection === 'layouts' && (
          <div className="ds-space-y-8">
            {/* Тіні */}
            <Card>
              <CardHeader>
                <CardTitle>🌫️ Тіні</CardTitle>
                <CardSubtitle>Різні рівні тіней</CardSubtitle>
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>

            {/* Радіуси */}
            <Card>
              <CardHeader>
                <CardTitle>🔄 Радіуси закруглення</CardTitle>
                <CardSubtitle>Різні рівні закруглення</CardSubtitle>
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>

            {/* Утилітарні класи */}
            <Card>
              <CardHeader>
                <CardTitle>🔧 Утилітарні класи</CardTitle>
                <CardSubtitle>Flexbox, Grid та Spacing</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-space-y-6">
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
              </CardBody>
            </Card>
          </div>
        )}

        {activeSection === 'animations' && (
          <div className="ds-space-y-8">
            {/* Анімації та ефекти */}
            <Card>
              <CardHeader>
                <CardTitle>✨ Анімації та ефекти</CardTitle>
                <CardSubtitle>Hover ефекти та переходи</CardSubtitle>
              </CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>

            {/* Перемикач анімацій */}
            <Card>
              <CardHeader>
                <CardTitle>🎛️ Налаштування анімацій</CardTitle>
                <CardSubtitle>Увімкніть або вимкніть анімації</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-flex ds-items-center ds-gap-4">
                  <label className="ds-flex ds-items-center ds-gap-2 ds-cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showAnimations}
                      onChange={(e) => setShowAnimations(e.target.checked)}
                      className="ds-w-4 ds-h-4 ds-text-primary ds-bg-gray-100 ds-border-gray-300 ds-rounded ds-focus:ring-primary ds-focus:ring-2"
                    />
                    <span className="ds-text-sm ds-font-medium ds-text-gray-700">
                      Показувати анімації
                    </span>
                  </label>
                </div>
                <div className="ds-mt-4 ds-p-4 ds-bg-gray-50 ds-rounded-lg">
                  <p className="ds-text-sm ds-text-gray-600">
                    {showAnimations 
                      ? '✨ Анімації увімкнені - всі hover ефекти та переходи активні'
                      : '⏸️ Анімації вимкнені - статичний режим для кращої продуктивності'
                    }
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {activeSection === 'examples' && (
          <div className="ds-space-y-8">
            {/* Приклади меню */}
            <Card>
              <CardHeader>
                <CardTitle>🍽️ Приклади меню</CardTitle>
                <CardSubtitle>Реальні приклади використання дизайн-системи</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-grid ds-grid-cols-1 ds-lg:grid-cols-2 ds-gap-6">
                  <div>
                    <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-4">
                      Мобільний вигляд
                    </h3>
                    <MenuExample themeId={selectedTheme} />
                  </div>
                  <div>
                    <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-4">
                      Десктопний вигляд
                    </h3>
                    <div className="ds-bg-white ds-rounded-lg ds-p-6 ds-shadow-lg">
                      <div className="ds-text-center ds-mb-6">
                        <h1 className="ds-text-2xl ds-font-bold ds-text-gray-900 ds-mb-2">
                          {menuData.restaurant.name}
                        </h1>
                        <p className="ds-text-gray-600">{menuData.restaurant.description}</p>
                      </div>
                      <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-4">
                        {menuData.categories.map((category) => (
                          <div key={category.id} className="ds-bg-gray-50 ds-rounded-lg ds-p-4">
                            <h2 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-3">
                              {category.name}
                            </h2>
                            <div className="ds-space-y-2">
                              {category.items.map((item) => (
                                <div key={item.id} className="ds-flex ds-justify-between ds-items-center ds-bg-white ds-p-3 ds-rounded ds-shadow-sm">
                                  <div className="ds-flex ds-items-center ds-gap-2">
                                    <span className="ds-text-xl">{item.image}</span>
                                    <div>
                                      <h3 className="ds-text-sm ds-font-semibold ds-text-gray-900">{item.name}</h3>
                                      <p className="ds-text-xs ds-text-gray-600">{item.description}</p>
                                    </div>
                                  </div>
                                  <div className="ds-text-sm ds-font-bold ds-text-primary">
                                    {item.price}₴
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Спеціальні компоненти */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 Спеціальні компоненти</CardTitle>
                <CardSubtitle>Компоненти для меню ресторанів</CardSubtitle>
              </CardHeader>
              <CardBody>
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
                          <p className="ds-menu-item-price">250₴</p>
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
              </CardBody>
            </Card>

            {/* Градієнтний фон */}
            <Card>
              <CardHeader>
                <CardTitle>🌈 Градієнтний фон</CardTitle>
                <CardSubtitle>Спеціальні градієнтні стилі</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-gradient-bg ds-gradient-overlay ds-rounded-lg ds-p-8">
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
              </CardBody>
            </Card>
          </div>
        )}

        {activeSection === 'documentation' && (
          <div className="ds-space-y-8">
            {/* Детальна документація CSS класів */}
            {Object.entries(cssDocumentation).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardSubtitle>{section.description}</CardSubtitle>
                </CardHeader>
                <CardBody>
                  <div className="ds-space-y-6">
                    {/* CSS змінні */}
                    {section.variables && (
                      <div>
                        <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-4">
                          CSS змінні
                        </h3>
                        <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3 ds-gap-4">
                          {section.variables.map((variable, index) => (
                            <div key={index} className="ds-bg-gray-50 ds-p-4 ds-rounded-lg ds-border ds-border-gray-200">
                              <div className="ds-flex ds-items-center ds-gap-2 ds-mb-2">
                                <code className="ds-bg-white ds-px-2 ds-py-1 ds-rounded ds-text-sm ds-font-mono ds-text-primary">
                                  {variable.name}
                                </code>
                              </div>
                              <div className="ds-text-sm ds-text-gray-600 ds-mb-1">
                                <strong>Значення:</strong> {variable.value}
                                {'pixels' in variable && variable.pixels && (
                                  <span className="ds-text-gray-500"> ({variable.pixels})</span>
                                )}
                              </div>
                              <div className="ds-text-xs ds-text-gray-500">
                                {variable.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CSS класи */}
                    {section.classes && (
                      <div>
                        <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-4">
                          CSS класи
                        </h3>
                        <div className="ds-space-y-3">
                          {section.classes.map((cls, index) => (
                            <div key={index} className="ds-bg-white ds-p-4 ds-rounded-lg ds-border ds-border-gray-200 ds-shadow-sm">
                              <div className="ds-flex ds-items-center ds-gap-3 ds-mb-2">
                                <code className="ds-bg-primary ds-text-white ds-px-3 ds-py-1 ds-rounded ds-text-sm ds-font-mono">
                                  {cls.class}
                                </code>
                                {'pixels' in cls && cls.pixels && (
                                  <span className="ds-bg-gray-100 ds-px-2 ds-py-1 ds-rounded ds-text-xs ds-text-gray-600">
                                    {cls.pixels}
                                  </span>
                                )}
                              </div>
                              <div className="ds-text-sm ds-text-gray-700 ds-mb-2">
                                <strong>CSS:</strong> <code className="ds-bg-gray-100 ds-px-2 ds-py-1 ds-rounded ds-text-xs">{cls.css}</code>
                              </div>
                              <div className="ds-text-sm ds-text-gray-600">
                                {cls.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {activeSection === 'search' && (
          <div className="ds-space-y-8">
            {/* Пошук по CSS класах */}
            <Card>
              <CardHeader>
                <CardTitle>🔍 Пошук по CSS класах</CardTitle>
                <CardSubtitle>Знайдіть будь-який CSS клас або змінну</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-space-y-4">
                  <div className="ds-form-group">
                    <label className="ds-form-label">Пошуковий запит</label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Введіть назву класу, опис або CSS властивість..."
                      className="ds-form-input ds-text-lg"
                    />
                    <div className="ds-form-help">
                      Приклад: "padding", "primary", "shadow", "rounded"
                    </div>
                  </div>

                  {searchQuery.trim() && (
                    <div>
                      <h3 className="ds-text-lg ds-font-semibold ds-text-gray-900 ds-mb-4">
                        Результати пошуку ({searchResults().length})
                      </h3>
                      {searchResults().length > 0 ? (
                        <div className="ds-space-y-3">
                          {searchResults().map((result, index) => (
                            <div key={index} className="ds-bg-white ds-p-4 ds-rounded-lg ds-border ds-border-gray-200 ds-shadow-sm">
                              <div className="ds-flex ds-items-center ds-gap-3 ds-mb-2">
                                <code className="ds-bg-primary ds-text-white ds-px-3 ds-py-1 ds-rounded ds-text-sm ds-font-mono">
                                  {result.class}
                                </code>
                                <span className="ds-badge ds-badge-secondary ds-text-xs">
                                  {result.category}
                                </span>
                                {'pixels' in result && result.pixels && (
                                  <span className="ds-bg-gray-100 ds-px-2 ds-py-1 ds-rounded ds-text-xs ds-text-gray-600">
                                    {result.pixels}
                                  </span>
                                )}
                              </div>
                              <div className="ds-text-sm ds-text-gray-700 ds-mb-2">
                                <strong>CSS:</strong> <code className="ds-bg-gray-100 ds-px-2 ds-py-1 ds-rounded ds-text-xs">{result.css}</code>
                              </div>
                              <div className="ds-text-sm ds-text-gray-600">
                                {result.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="ds-text-center ds-py-8 ds-text-gray-500">
                          <div className="ds-text-4xl ds-mb-4">🔍</div>
                          <p>Нічого не знайдено. Спробуйте інший пошуковий запит.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!searchQuery.trim() && (
                    <div className="ds-text-center ds-py-8 ds-text-gray-500">
                      <div className="ds-text-4xl ds-mb-4">🔍</div>
                      <p>Введіть пошуковий запит, щоб знайти CSS класи та змінні</p>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {activeSection === 'customize' && (
          <div className="ds-space-y-8">
            {/* Налаштування кольорів */}
            <Card>
              <CardHeader>
                <CardTitle>🎨 Налаштування кольорів</CardTitle>
                <CardSubtitle>Змініть кольори дизайн-системи</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-3 ds-gap-6">
                  {Object.entries(customColors).map(([key, value]) => (
                    <div key={key} className="ds-space-y-3">
                      <label className="ds-text-sm ds-font-medium ds-text-gray-700 ds-capitalize">
                        {key}
                      </label>
                      <div className="ds-flex ds-items-center ds-gap-3">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => updateCustomColor(key, e.target.value)}
                          className="ds-w-12 ds-h-12 ds-rounded ds-border ds-border-gray-300 ds-cursor-pointer"
                        />
                        <div className="ds-flex-1">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateCustomColor(key, e.target.value)}
                            className="ds-w-full ds-px-3 ds-py-2 ds-text-sm ds-border ds-border-gray-300 ds-rounded ds-font-mono ds-bg-white ds-text-gray-900"
                            placeholder="#000000"
                          />
                          <p className="ds-text-xs ds-text-gray-500 ds-mt-1">
                            HEX код кольору
                          </p>
                        </div>
                      </div>
                      <div 
                        className="ds-p-3 ds-rounded ds-text-center ds-text-white ds-font-medium"
                        style={{ backgroundColor: value }}
                      >
                        Приклад
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Налаштування тем */}
            <Card>
              <CardHeader>
                <CardTitle>🌙 Налаштування тем</CardTitle>
                <CardSubtitle>Оберіть тему для вашого меню</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-3 ds-lg:grid-cols-5 ds-gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`ds-p-4 ds-rounded-lg ds-border-2 ds-transition-all ds-text-center ${
                        selectedTheme === theme.id 
                          ? 'ds-border-primary ds-bg-primary ds-bg-opacity-10' 
                          : 'ds-border-gray-200 ds-bg-white hover:ds-border-gray-300'
                      }`}
                    >
                      <div className="ds-text-2xl ds-mb-2">{theme.emoji}</div>
                      <div className="ds-text-sm ds-font-medium ds-text-gray-900">
                        {theme.name}
                      </div>
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Налаштування анімацій */}
            <Card>
              <CardHeader>
                <CardTitle>✨ Налаштування анімацій</CardTitle>
                <CardSubtitle>Керуйте анімаціями та ефектами</CardSubtitle>
              </CardHeader>
              <CardBody>
                <div className="ds-space-y-4">
                  <div className="ds-flex ds-items-center ds-justify-between ds-p-4 ds-bg-gray-50 ds-rounded-lg">
                    <div>
                      <h3 className="ds-text-sm ds-font-medium ds-text-gray-900">Показувати анімації</h3>
                      <p className="ds-text-xs ds-text-gray-600">Увімкнути hover ефекти та переходи</p>
                    </div>
                    <label className="ds-relative ds-inline-flex ds-items-center ds-cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showAnimations}
                        onChange={(e) => setShowAnimations(e.target.checked)}
                        className="ds-sr-only ds-peer"
                      />
                      <div className="ds-w-11 ds-h-6 ds-bg-gray-200 ds-peer-focus:outline-none ds-peer-focus:ring-4 ds-peer-focus:ring-primary ds-peer-focus:ring-opacity-20 ds-rounded-full ds-peer ds-peer-checked:after:translate-x-full ds-peer-checked:after:border-white ds-after:content-[''] ds-after:absolute ds-after:top-[2px] ds-after:left-[2px] ds-after:bg-white ds-after:border-gray-300 ds-after:border ds-after:rounded-full ds-after:h-5 ds-after:w-5 ds-after:transition-all ds-peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="ds-p-4 ds-bg-gray-50 ds-rounded-lg">
                    <h3 className="ds-text-sm ds-font-medium ds-text-gray-900 ds-mb-2">
                      Тест анімацій
                    </h3>
                    <div className="ds-flex ds-gap-3">
                      <div className={`ds-bg-primary ds-p-3 ds-rounded ds-text-white ds-text-center ds-cursor-pointer ${
                        showAnimations ? 'ds-hover-scale ds-transition' : ''
                      }`}>
                        Hover Scale
                      </div>
                      <div className={`ds-bg-secondary ds-p-3 ds-rounded ds-text-white ds-text-center ds-cursor-pointer ${
                        showAnimations ? 'ds-hover-lift ds-transition' : ''
                      }`}>
                        Hover Lift
                      </div>
                      <div className={`ds-bg-accent ds-p-3 ds-rounded ds-text-white ds-text-center ds-cursor-pointer ${
                        showAnimations ? 'ds-hover-shadow ds-transition' : ''
                      }`}>
                        Hover Shadow
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Підсумок */}
        <Card className="ds-bg-gradient-primary ds-text-white">
          <CardHeader>
            <CardTitle className="ds-text-white">📊 Підсумок</CardTitle>
            <CardSubtitle className="ds-text-white ds-opacity-90">
              Повна демонстрація дизайн-системи QR Menu
            </CardSubtitle>
          </CardHeader>
          <CardBody>
            <div className="ds-grid ds-grid-cols-2 ds-md:grid-cols-4 ds-gap-6 ds-text-center">
              <div>
                <div className="ds-text-4xl ds-font-bold ds-mb-2">10</div>
                <div className="ds-text-sm ds-opacity-90">Тем</div>
              </div>
              <div>
                <div className="ds-text-4xl ds-font-bold ds-mb-2">50+</div>
                <div className="ds-text-sm ds-opacity-90">Компонентів</div>
              </div>
              <div>
                <div className="ds-text-4xl ds-font-bold ds-mb-2">200+</div>
                <div className="ds-text-sm ds-opacity-90">Утиліт</div>
              </div>
              <div>
                <div className="ds-text-4xl ds-font-bold ds-mb-2">∞</div>
                <div className="ds-text-sm ds-opacity-90">Можливостей</div>
              </div>
            </div>
            <div className="ds-mt-6 ds-text-center">
              <p className="ds-text-lg ds-mb-4">
                Ця сторінка демонструє всі доступні стилі та компоненти вашої дизайн-системи QR Menu.
              </p>
              <div className="ds-flex ds-flex-wrap ds-justify-center ds-gap-3">
                <Button variant="outline" className="ds-bg-white ds-text-primary ds-border-white hover:ds-bg-gray-100">
                  Документація
                </Button>
                <Button variant="outline" className="ds-bg-white ds-text-primary ds-border-white hover:ds-bg-gray-100">
                  GitHub
                </Button>
                <Button variant="outline" className="ds-bg-white ds-text-primary ds-border-white hover:ds-bg-gray-100">
                  Підтримка
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}