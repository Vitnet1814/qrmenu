# 🎨 Посібник з стилів QR Menu

## Огляд архітектури стилів

QR Menu використовує повністю централізовану дизайн-систему з відсутністю дублювання коду. Всі стилі організовані в єдину систему з використанням CSS змінних та глобальних утилітарних класів.

### Ключові переваги:
- ✅ **Єдина точка правди** для всіх стилів
- ✅ **Відсутність дублювання** - видалено ~2500 рядків повторюваного CSS
- ✅ **Легше підтримувати** - зміни в одному місці
- ✅ **Швидша розробка** - готові утилітарні класи
- ✅ **Менший bundle size** - без дублювання
- ✅ **9 готових тем** для різних типів закладів
- ✅ **Повна підтримка темної теми**

## Файлова структура

```
/src/app/
  ├── globals.css           # Головний файл, підключає всі стилі
  └── styles/
      ├── design-system.css # Основна дизайн-система, змінні, компоненти
      ├── themes.css        # 9 готових тем для різних типів закладів
      ├── animations.css     # Всі анімації та переходи
      └── dark-theme.css     # Темна тема
```

## CSS Змінні

### Кольори
```css
:root {
  /* Основні кольори */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-light: #dbeafe;
  --color-primary-dark: #1e40af;
  
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  
  /* Статусні кольори */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Нейтральні кольори */
  --color-white: #ffffff;
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  --color-gray-200: #e2e8f0;
  --color-gray-300: #cbd5e1;
  --color-gray-400: #94a3b8;
  --color-gray-500: #64748b;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1e293b;
  --color-gray-900: #0f172a;
  --color-black: #000000;
}
```

### Типографіка
```css
:root {
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  
  /* Розміри шрифтів */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 3.75rem;   /* 60px */
  
  /* Вага шрифтів */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
}
```

### Відступи
```css
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-5: 1.25rem;  /* 20px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-10: 2.5rem;  /* 40px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
  --spacing-20: 5rem;    /* 80px */
  --spacing-24: 6rem;    /* 96px */
  --spacing-32: 8rem;    /* 128px */
}
```

### Тіні та ефекти
```css
:root {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### Градієнти
```css
:root {
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --gradient-warm: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  --gradient-cool: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  --gradient-dark: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}
```

## Компоненти дизайн-системи

### Кнопки
```html
<!-- Базові кнопки -->
<button class="ds-btn ds-btn-primary">Основна кнопка</button>
<button class="ds-btn ds-btn-secondary">Другорядна кнопка</button>
<button class="ds-btn ds-btn-accent">Акцентна кнопка</button>

<!-- Стилі кнопок -->
<button class="ds-btn ds-btn-outline">Контурна кнопка</button>
<button class="ds-btn ds-btn-ghost">Прозора кнопка</button>

<!-- Статусні кнопки -->
<button class="ds-btn ds-btn-success">Успіх</button>
<button class="ds-btn ds-btn-warning">Попередження</button>
<button class="ds-btn ds-btn-error">Помилка</button>

<!-- Розміри кнопок -->
<button class="ds-btn ds-btn-sm">Мала кнопка</button>
<button class="ds-btn ds-btn-lg">Велика кнопка</button>
<button class="ds-btn ds-btn-xl">Дуже велика кнопка</button>

<!-- Градієнтні кнопки -->
<button class="ds-btn ds-btn-gradient-primary">Градієнтна кнопка</button>
<button class="ds-btn ds-btn-gradient-accent">Акцентний градієнт</button>
```

### Картки
```html
<!-- Базова картка -->
<div class="ds-card">
  <div class="ds-card-header">
    <h3 class="ds-card-title">Заголовок</h3>
    <p class="ds-card-subtitle">Підзаголовок</p>
  </div>
  <div class="ds-card-body">
    <p class="ds-card-text">Контент картки</p>
  </div>
  <div class="ds-card-footer">
    <button class="ds-btn ds-btn-primary">Дія</button>
  </div>
</div>

<!-- Спеціалізовані картки -->
<div class="ds-menu-item-card">
  <div class="ds-menu-item-content">
    <div class="ds-menu-item-image">
      <img class="ds-menu-item-img" src="..." alt="...">
    </div>
    <div class="ds-menu-item-details">
      <h3 class="ds-menu-item-name">Назва страви</h3>
      <div class="ds-menu-item-price">120</div>
    </div>
    <div class="ds-menu-item-controls">
      <button class="ds-control-btn ds-control-btn-edit">Редагувати</button>
    </div>
  </div>
</div>

<div class="ds-category-card">
  <h3 class="ds-category-name">Категорія</h3>
</div>

<div class="ds-auth-card">
  <div class="ds-auth-header">
    <h1 class="ds-auth-title">Авторизація</h1>
  </div>
  <div class="ds-auth-content">
    <button class="ds-auth-google-btn">Увійти з Google</button>
  </div>
</div>
```

### Форми
```html
<div class="ds-form-group">
  <label class="ds-form-label">Назва ресторану</label>
  <input type="text" class="ds-form-input" placeholder="Введіть назву">
  <p class="ds-form-help">Це буде відображатися в QR меню</p>
</div>

<div class="ds-form-group">
  <label class="ds-form-label">Опис</label>
  <textarea class="ds-form-textarea" placeholder="Опишіть ваш заклад"></textarea>
</div>

<div class="ds-form-group">
  <label class="ds-form-label">Категорія</label>
  <select class="ds-form-select">
    <option>Ресторан</option>
    <option>Кафе</option>
    <option>Піцерія</option>
  </select>
</div>
```

### Кнопки управління
```html
<!-- Кнопки управління для меню -->
<button class="ds-control-btn ds-control-btn-edit">
  <PencilIcon class="ds-control-icon" />
</button>

<button class="ds-control-btn ds-control-btn-delete">
  <TrashIcon class="ds-control-icon" />
</button>

<button class="ds-control-btn ds-control-btn-move">
  <ArrowUpIcon class="ds-control-icon" />
</button>

<!-- Розміри іконок -->
<Icon class="ds-control-icon" />      <!-- 16px -->
<Icon class="ds-control-icon-sm" />   <!-- 14px -->
<Icon class="ds-control-icon-xs" />   <!-- 12px -->
```

## Утилітарні класи

### Layout

#### Flexbox
```html
<div class="ds-flex ds-items-center ds-justify-between ds-gap-4">
  <div>Елемент 1</div>
  <div>Елемент 2</div>
</div>

<!-- Напрямки -->
<div class="ds-flex ds-flex-col">Вертикальний</div>
<div class="ds-flex ds-flex-row">Горизонтальний</div>

<!-- Вирівнювання -->
<div class="ds-items-start">Початок</div>
<div class="ds-items-center">Центр</div>
<div class="ds-items-end">Кінець</div>

<!-- Розподіл -->
<div class="ds-justify-start">Початок</div>
<div class="ds-justify-center">Центр</div>
<div class="ds-justify-between">Між</div>
<div class="ds-justify-around">Навколо</div>

<!-- Flex властивості -->
<div class="ds-flex-1">Розтягується</div>
<div class="ds-flex-auto">Автоматично</div>
<div class="ds-flex-none">Не змінюється</div>
```

#### Grid
```html
<div class="ds-grid ds-grid-cols-3 ds-gap-6">
  <div>Колонка 1</div>
  <div>Колонка 2</div>
  <div>Колонка 3</div>
</div>

<!-- Кількість колонок -->
<div class="ds-grid-cols-1">1 колонка</div>
<div class="ds-grid-cols-2">2 колонки</div>
<div class="ds-grid-cols-3">3 колонки</div>
<div class="ds-grid-cols-4">4 колонки</div>
<div class="ds-grid-cols-6">6 колонок</div>
<div class="ds-grid-cols-12">12 колонок</div>

<!-- Об'єднання колонок -->
<div class="ds-col-span-1">1 колонка</div>
<div class="ds-col-span-2">2 колонки</div>
<div class="ds-col-span-3">3 колонки</div>
<div class="ds-col-span-4">4 колонки</div>
<div class="ds-col-span-6">6 колонок</div>
<div class="ds-col-span-12">12 колонок</div>
```

### Spacing

#### Padding
```html
<div class="ds-p-4">Всі сторони</div>
<div class="ds-px-6">Горизонтально</div>
<div class="ds-py-8">Вертикально</div>

<!-- Розміри -->
<div class="ds-p-0">0</div>
<div class="ds-p-1">4px</div>
<div class="ds-p-2">8px</div>
<div class="ds-p-3">12px</div>
<div class="ds-p-4">16px</div>
<div class="ds-p-6">24px</div>
<div class="ds-p-8">32px</div>
```

#### Margin
```html
<div class="ds-m-4">Всі сторони</div>
<div class="ds-mx-auto">Центрування</div>
<div class="ds-mb-6">Знизу</div>
<div class="ds-mt-8">Зверху</div>

<!-- Розміри -->
<div class="ds-m-0">0</div>
<div class="ds-m-1">4px</div>
<div class="ds-m-2">8px</div>
<div class="ds-m-3">12px</div>
<div class="ds-m-4">16px</div>
<div class="ds-m-6">24px</div>
<div class="ds-m-8">32px</div>
```

### Типографіка

#### Розміри шрифтів
```html
<p class="ds-text-xs">Дуже малий текст (12px)</p>
<p class="ds-text-sm">Малий текст (14px)</p>
<p class="ds-text-base">Базовий текст (16px)</p>
<p class="ds-text-lg">Великий текст (18px)</p>
<p class="ds-text-xl">Дуже великий текст (20px)</p>
<p class="ds-text-2xl">Заголовок 2 (24px)</p>
<p class="ds-text-3xl">Заголовок 1 (30px)</p>
<p class="ds-text-4xl">Великий заголовок (36px)</p>
<p class="ds-text-5xl">Дуже великий заголовок (48px)</p>
```

#### Вага шрифтів
```html
<p class="ds-font-light">Легкий (300)</p>
<p class="ds-font-normal">Нормальний (400)</p>
<p class="ds-font-medium">Середній (500)</p>
<p class="ds-font-semibold">Напівжирний (600)</p>
<p class="ds-font-bold">Жирний (700)</p>
```

#### Вирівнювання тексту
```html
<p class="ds-text-left">Ліворуч</p>
<p class="ds-text-center">По центру</p>
<p class="ds-text-right">Праворуч</p>
```

### Кольори

#### Текст
```html
<p class="ds-text-primary">Первинний</p>
<p class="ds-text-secondary">Вторинний</p>
<p class="ds-text-accent">Акцентний</p>
<p class="ds-text-success">Успіх</p>
<p class="ds-text-warning">Попередження</p>
<p class="ds-text-error">Помилка</p>
<p class="ds-text-white">Білий</p>
<p class="ds-text-gray-500">Сірий</p>
<p class="ds-text-gray-600">Темно-сірий</p>
<p class="ds-text-gray-700">Дуже темно-сірий</p>
<p class="ds-text-gray-900">Чорний</p>
```

#### Фон
```html
<div class="ds-bg-primary">Первинний фон</div>
<div class="ds-bg-secondary">Вторинний фон</div>
<div class="ds-bg-accent">Акцентний фон</div>
<div class="ds-bg-success">Фон успіху</div>
<div class="ds-bg-warning">Фон попередження</div>
<div class="ds-bg-error">Фон помилки</div>
<div class="ds-bg-white">Білий фон</div>
<div class="ds-bg-gray-50">Світло-сірий фон</div>
<div class="ds-bg-gray-100">Сірий фон</div>
<div class="ds-bg-gray-200">Темно-сірий фон</div>
```

### Ефекти

#### Тіні
```html
<div class="ds-shadow-xs">Дуже мала тінь</div>
<div class="ds-shadow-sm">Мала тінь</div>
<div class="ds-shadow-md">Середня тінь</div>
<div class="ds-shadow-lg">Велика тінь</div>
<div class="ds-shadow-xl">Дуже велика тінь</div>
<div class="ds-shadow-2xl">Найбільша тінь</div>
```

#### Радіуси закруглення
```html
<div class="ds-rounded-none">Без закруглення</div>
<div class="ds-rounded-sm">Мале закруглення (2px)</div>
<div class="ds-rounded-md">Середнє закруглення (6px)</div>
<div class="ds-rounded-lg">Велике закруглення (8px)</div>
<div class="ds-rounded-xl">Дуже велике закруглення (12px)</div>
<div class="ds-rounded-2xl">Найбільше закруглення (16px)</div>
<div class="ds-rounded-3xl">Кругле закруглення (24px)</div>
<div class="ds-rounded-full">Повне закруглення</div>
```

#### Переходи та анімації
```html
<div class="ds-transition">Базовий перехід</div>
<div class="ds-transition-fast">Швидкий перехід</div>
<div class="ds-transition-slow">Повільний перехід</div>
<div class="ds-duration-300">Тривалість 300ms</div>
```

## Анімації

### Базові анімації
```html
<div class="animate-fade-in">Плавна поява</div>
<div class="animate-slide-in">Зсув збоку</div>
<div class="animate-pulse">Пульсація</div>
<div class="animate-spin">Обертання</div>
<div class="animate-fade-up">Поява знизу вгору</div>
<div class="animate-slide-left">Зсув зліва</div>
<div class="animate-float">Плаваюча анімація</div>
```

### Hover ефекти
```html
<div class="hover-lift">Підйом при наведенні</div>
<div class="hover-scale">Збільшення при наведенні</div>
<div class="hover-rotate">Поворот при наведенні</div>
```

### Спеціальні ефекти
```html
<div class="loading">Ефект завантаження</div>
<div class="modal-backdrop">Фон модального вікна</div>
```

## Градієнти

### Фонові градієнти
```html
<div class="ds-gradient-bg">Основний фіолетовий градієнт</div>
<div class="ds-gradient-bg ds-gradient-overlay">З декоративними оверлеями</div>
```

### Градієнтні кнопки
```html
<button class="ds-gradient-button">Основна градієнтна кнопка</button>
<button class="ds-gradient-button-secondary">Вторинна градієнтна кнопка</button>
```

### Текстові градієнти
```html
<h1 class="text-gradient">Градієнтний текст</h1>
<h1 class="text-gradient-primary">Первинний градієнт</h1>
<h1 class="text-gradient-secondary">Вторинний градієнт</h1>
<h1 class="text-gradient-accent">Акцентний градієнт</h1>
```

### Картки з градієнтами
```html
<div class="card-gradient">Базова градієнтна картка</div>
<div class="card-gradient-primary">Первинна градієнтна картка</div>
<div class="card-gradient-secondary">Вторинна градієнтна картка</div>
```

## Теми

Проект підтримує 9 готових тем для різних типів закладів:

### 1. Classic Restaurant - Класичний ресторан
```html
<body data-theme="classic-restaurant">
```
- Коричневі відтінки (#8b4513, #daa520)
- Шрифт: Playfair Display
- Підходить для: класичні ресторани, винні бари

### 2. Cozy Cafe - Затишне кафе
```html
<body data-theme="cozy-cafe">
```
- Теплі кавові тони (#6b4423, #c9a96e)
- Шрифт: Crimson Text
- Підходить для: кафе, кондитерські

### 3. Fast Food - Фаст-фуд
```html
<body data-theme="fast-food">
```
- Яскраві помаранчеві/червоні (#ff6b35, #ff1744)
- Шрифт: Oswald
- Підходить для: фаст-фуд, бургерні

### 4. Sushi Bar - Суші-бар
```html
<body data-theme="sushi-bar">
```
- Зелені/червоні акценти (#2c5530, #ff6b6b)
- Шрифт: Noto Sans JP
- Підходить для: суші-бари, азійські ресторани

### 5. Pizzeria - Піцерія
```html
<body data-theme="pizzeria">
```
- Червоні/помаранчеві/зелені (#d32f2f, #ff9800, #4caf50)
- Шрифт: Roboto Slab
- Підходить для: піцерії, італійські ресторани

### 6. Modern - Модерн
```html
<body data-theme="modern">
```
- Сині/рожеві акценти (#1976d2, #ff4081)
- Шрифт: Roboto
- Підходить для: сучасні ресторани, коктейль-бари

### 7. Dark - Темна тема
```html
<body data-theme="dark">
```
- Фіолетові/бірюзові (#bb86fc, #03dac6)
- Шрифт: Inter
- Підходить для: нічні клуби, преміум заклади

### 8. Spring - Весняна тема
```html
<body data-theme="spring">
```
- Зелені відтінки (#4caf50, #ffb74d)
- Шрифт: Dancing Script
- Підходить для: весняні меню, органічні кафе

### 9. Premium - Преміум
```html
<body data-theme="premium">
```
- Чорний/золотий (#1a1a1a, #c9a96e, #d4af37)
- Шрифт: Playfair Display
- Підходить для: преміум ресторани, мішлен

## Responsive дизайн

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Responsive класи
```html
<!-- Grid -->
<div class="ds-grid ds-grid-cols-1 ds-sm:grid-cols-2 ds-md:grid-cols-3 ds-lg:grid-cols-4">
  <div>Колонка 1</div>
  <div>Колонка 2</div>
  <div>Колонка 3</div>
  <div>Колонка 4</div>
</div>

<!-- Flexbox -->
<div class="ds-flex ds-flex-col ds-sm:flex-row ds-items-center ds-gap-4">
  <div>Елемент 1</div>
  <div>Елемент 2</div>
</div>

<!-- Типографіка -->
<h1 class="ds-text-lg ds-sm:text-xl ds-md:text-2xl ds-lg:text-3xl">
  Адаптивний заголовок
</h1>

<!-- Відступи -->
<div class="ds-p-4 ds-sm:px-6 ds-md:px-8 ds-lg:px-12">
  Адаптивні відступи
</div>
```

## Accessibility

### Скрін-рідери
```html
<span class="ds-sr-only">Прихований текст для скрін-рідерів</span>
```

### Фокус
```html
<button class="ds-focus:ring">Кнопка з кільцем фокусу</button>
<input class="ds-focus:ring-inset">Поле з внутрішнім кільцем фокусу</input>
```

### Зменшення анімацій
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Dark Mode

Темна тема автоматично адаптує всі компоненти:

### Автоматичне перемикання
```css
@media (prefers-color-scheme: dark) {
  /* Автоматичні стилі для темної теми */
}
```

### Ручне перемикання
```html
<body data-theme="dark">
  <!-- Контент -->
</body>
```

### Адаптовані компоненти
- Кольори фону та тексту
- Тіні та межі
- Стан hover та focus
- Всі компоненти форм
- Картки та кнопки

## Best Practices

### 1. Використовуйте CSS змінні
```css
/* ✅ Правильно */
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-4);
}

/* ❌ Неправильно */
.my-component {
  color: #2563eb;
  padding: 16px;
}
```

### 2. Комбінуйте утилітарні класи
```html
<!-- ✅ Правильно -->
<div class="ds-card ds-p-6 ds-shadow-lg ds-rounded-xl">
  <h2 class="ds-text-2xl ds-font-bold ds-text-gray-900">Заголовок</h2>
</div>

<!-- ❌ Неправильно -->
<div class="custom-card">
  <h2 class="custom-title">Заголовок</h2>
</div>
```

### 3. Дотримуйтесь spacing scale
```html
<!-- ✅ Правильно -->
<div class="ds-p-4 ds-mb-6 ds-gap-8">

<!-- ❌ Неправильно -->
<div class="ds-p-5 ds-mb-7 ds-gap-9">
```

### 4. Використовуйте семантичні класи
```html
<!-- ✅ Правильно -->
<button class="ds-btn ds-btn-primary">Зберегти</button>
<button class="ds-btn ds-btn-error">Видалити</button>

<!-- ❌ Неправильно -->
<button class="ds-btn blue-button">Зберегти</button>
<button class="ds-btn red-button">Видалити</button>
```

### 5. Тестуйте responsive
```html
<!-- ✅ Правильно -->
<div class="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3">

<!-- ❌ Неправильно -->
<div class="ds-grid ds-grid-cols-3">
```

### 6. Перевіряйте accessibility
```html
<!-- ✅ Правильно -->
<button class="ds-btn ds-btn-primary ds-focus:ring" aria-label="Зберегти зміни">
  <SaveIcon class="ds-w-5 ds-h-5" />
</button>

<!-- ❌ Неправильно -->
<button class="ds-btn ds-btn-primary">
  <SaveIcon />
</button>
```

## Приклади використання

### Картка меню
```html
<div class="ds-menu-item-card ds-p-4 ds-shadow-md ds-rounded-lg ds-transition ds-hover-lift">
  <div class="ds-menu-item-content">
    <div class="ds-menu-item-image">
      <img class="ds-menu-item-img ds-w-16 ds-h-16 ds-rounded-lg" src="pizza.jpg" alt="Піца Маргарита">
    </div>
    <div class="ds-menu-item-details">
      <h3 class="ds-menu-item-name ds-text-lg ds-font-semibold ds-text-gray-900">Піца Маргарита</h3>
      <div class="ds-menu-item-price ds-text-xl ds-text-success ds-font-bold">180 ₴</div>
    </div>
    <div class="ds-menu-item-controls">
      <button class="ds-control-btn ds-control-btn-edit" title="Редагувати">
        <PencilIcon class="ds-control-icon" />
      </button>
      <button class="ds-control-btn ds-control-btn-delete" title="Видалити">
        <TrashIcon class="ds-control-icon" />
      </button>
    </div>
  </div>
</div>
```

### Кнопка з іконкою
```html
<button class="ds-btn ds-btn-primary ds-flex ds-items-center ds-gap-2">
  <PlusIcon class="ds-w-5 ds-h-5" />
  Додати страву
</button>
```

### Форма реєстрації
```html
<div class="ds-auth-card">
  <div class="ds-auth-header">
    <div class="ds-auth-logo">
      <div class="ds-auth-logo-icon">QR</div>
      <span>QR Menu</span>
    </div>
    <h1 class="ds-auth-title">Створити акаунт</h1>
    <p class="ds-auth-subtitle">Зареєструйте свій ресторан</p>
  </div>
  
  <div class="ds-auth-content">
    <div class="ds-form-group">
      <label class="ds-form-label">Назва ресторану</label>
      <input type="text" class="ds-form-input" placeholder="Введіть назву">
      <p class="ds-form-help">Це буде відображатися в QR меню</p>
    </div>
    
    <div class="ds-form-group">
      <label class="ds-form-label">Тип закладу</label>
      <select class="ds-form-select">
        <option>Ресторан</option>
        <option>Кафе</option>
        <option>Піцерія</option>
        <option>Фаст-фуд</option>
      </select>
    </div>
    
    <button class="ds-auth-google-btn">
      <GoogleIcon class="ds-auth-google-icon" />
      Продовжити з Google
    </button>
  </div>
</div>
```

### Адаптивна сітка категорій
```html
<div class="ds-grid ds-grid-cols-1 ds-sm:grid-cols-2 ds-md:grid-cols-3 ds-lg:grid-cols-4 ds-gap-6">
  <div class="ds-category-card">
    <h3 class="ds-category-name">Гарячі страви</h3>
  </div>
  <div class="ds-category-card">
    <h3 class="ds-category-name">Салати</h3>
  </div>
  <div class="ds-category-card">
    <h3 class="ds-category-name">Напої</h3>
  </div>
  <div class="ds-category-card">
    <h3 class="ds-category-name">Десерти</h3>
  </div>
</div>
```

### Статистичні картки
```html
<div class="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-4 ds-gap-6">
  <div class="ds-card ds-p-6 ds-text-center">
    <div class="ds-text-3xl ds-font-bold ds-text-primary ds-mb-2">127</div>
    <div class="ds-text-gray-600">Всього страв</div>
  </div>
  <div class="ds-card ds-p-6 ds-text-center">
    <div class="ds-text-3xl ds-font-bold ds-text-success ds-mb-2">23</div>
    <div class="ds-text-gray-600">Категорій</div>
  </div>
  <div class="ds-card ds-p-6 ds-text-center">
    <div class="ds-text-3xl ds-font-bold ds-text-warning ds-mb-2">1,247</div>
    <div class="ds-text-gray-600">Переглядів</div>
  </div>
  <div class="ds-card ds-p-6 ds-text-center">
    <div class="ds-text-3xl ds-font-bold ds-text-accent ds-mb-2">89%</div>
    <div class="ds-text-gray-600">Задоволеність</div>
  </div>
</div>
```

## Підтримка та розширення

### Додавання нових стилів

При додаванні нових стилів дотримуйтесь цих правил:

1. **Перевірте існуючі класи** - можливо, подібний клас вже існує
2. **Використовуйте CSS змінні** - не hardcode значення
3. **Додайте документацію** - оновіть цей файл
4. **Дотримуйтесь naming convention** - використовуйте префікс `.ds-*`
5. **Тестуйте responsive** - перевірте на різних розмірах екрану
6. **Перевірте accessibility** - додайте підтримку клавіатури та скрін-рідерів

### Приклад додавання нового компонента

```css
/* В design-system.css */
.ds-new-component {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.ds-new-component:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.ds-new-component-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-2);
}

.ds-new-component-content {
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
}
```

```html
<!-- Використання -->
<div class="ds-new-component">
  <h3 class="ds-new-component-title">Заголовок</h3>
  <p class="ds-new-component-content">Контент компонента</p>
</div>
```

### Оновлення тем

Для додавання нової теми:

1. Додайте CSS змінні в `themes.css`
2. Вкажіть унікальний шрифт
3. Додайте спеціальні стилі для компонентів
4. Протестуйте на всіх сторінках
5. Оновіть документацію

```css
/* В themes.css */
[data-theme="new-theme"] {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --font-family-heading: 'Your Font', sans-serif;
}

[data-theme="new-theme"] .ds-card {
  /* Спеціальні стилі для карток */
}
```

## Висновок

Ця дизайн-система забезпечує:

- **Консистентність** - всі компоненти виглядають однаково
- **Масштабованість** - легко додавати нові компоненти
- **Підтримка** - зміни в одному місці впливають на весь проект
- **Продуктивність** - швидша розробка з готовими класами
- **Гнучкість** - 9 тем та повна кастомізація
- **Accessibility** - підтримка скрін-рідерів та клавіатури
- **Responsive** - адаптивний дизайн для всіх пристроїв

Використовуйте цей посібник як довідник при розробці нових компонентів та функцій.

Загальний padding (всі сторони):
.ds-p-0  { padding: var(--spacing-0); }   /* 0px */
.ds-p-1  { padding: var(--spacing-1); }   /* 4px */
.ds-p-2  { padding: var(--spacing-2); }   /* 8px */
.ds-p-3  { padding: var(--spacing-3); }   /* 12px */
.ds-p-4  { padding: var(--spacing-4); }   /* 16px */
.ds-p-6  { padding: var(--spacing-6); }   /* 24px */
.ds-p-8  { padding: var(--spacing-8); }   /* 32px */

Padding по горизонталі (ліво-право):
.ds-px-0  { padding-left: var(--spacing-0); padding-right: var(--spacing-0); }
.ds-px-1  { padding-left: var(--spacing-1); padding-right: var(--spacing-1); }
.ds-px-2  { padding-left: var(--spacing-2); padding-right: var(--spacing-2); }
.ds-px-3  { padding-left: var(--spacing-3); padding-right: var(--spacing-3); }
.ds-px-4  { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
.ds-px-6  { padding-left: var(--spacing-6); padding-right: var(--spacing-6); }
.ds-px-8  { padding-left: var(--spacing-8); padding-right: var(--spacing-8); }

Padding по вертикалі (верх-низ):
.ds-py-0  { padding-top: var(--spacing-0); padding-bottom: var(--spacing-0); }
.ds-py-1  { padding-top: var(--spacing-1); padding-bottom: var(--spacing-1); }
.ds-py-2  { padding-top: var(--spacing-2); padding-bottom: var(--spacing-2); }
.ds-py-3  { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }
.ds-py-4  { padding-top: var(--spacing-4); padding-bottom: var(--spacing-4); }
.ds-py-6  { padding-top: var(--spacing-6); padding-bottom: var(--spacing-6); }
.ds-py-8  { padding-top: var(--spacing-8); padding-bottom: var(--spacing-8); }

Загальний margin (всі сторони):
.ds-m-0  { margin: var(--spacing-0); }    /* 0px */
.ds-m-1  { margin: var(--spacing-1); }    /* 4px */
.ds-m-2  { margin: var(--spacing-2); }    /* 8px */
.ds-m-3  { margin: var(--spacing-3); }    /* 12px */
.ds-m-4  { margin: var(--spacing-4); }    /* 16px */
.ds-m-6  { margin: var(--spacing-6); }    /* 24px */
.ds-m-8  { margin: var(--spacing-8); }    /* 32px */
Спеціальні margin класи:
.ds-mx-auto { margin-left: auto; margin-right: auto; }  /* Центрування */
Margin зверху (top):
.ds-mt-1  { margin-top: var(--spacing-1); }   /* 4px */
.ds-mt-2  { margin-top: var(--spacing-2); }   /* 8px */
.ds-mt-4  { margin-top: var(--spacing-4); }   /* 16px */
Margin знизу (bottom):
.ds-mb-3  { margin-bottom: var(--spacing-3); }   /* 12px */
.ds-mb-4  { margin-bottom: var(--spacing-4); }   /* 16px */
.ds-mb-6  { margin-bottom: var(--spacing-6); }   /* 24px */
.ds-mb-8  { margin-bottom: var(--spacing-8); }   /* 32px */
GAP класи (відстань між елементами):
.ds-gap-1  { gap: var(--spacing-1); }   /* 4px */
.ds-gap-2  { gap: var(--spacing-2); }   /* 8px */
.ds-gap-3  { gap: var(--spacing-3); }   /* 12px */
.ds-gap-4  { gap: var(--spacing-4); }   /* 16px */
.ds-gap-6  { gap: var(--spacing-6); }   /* 24px */
.ds-gap-8  { gap: var(--spacing-8); }   /* 32px */

SPACE класи (відстань між дочірніми елементами):
.ds-space-y-8 > * + * { margin-top: var(--spacing-8); }   /* 32px між елементами по вертикалі */
