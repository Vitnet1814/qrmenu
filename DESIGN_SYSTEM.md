# QR Menu Design System

Професійна дизайн-система для ресторанів та кафе з сучасними практиками дизайну.

## 🎨 Особливості

- **9 готових тем** для різних типів закладів
- **CSS змінні** для кольорів, типографіки, відступів
- **Компоненти** кнопок, карток, форм, модальних вікон
- **Responsive grid** система
- **Утилітарні класи** для flexbox, grid, responsive
- **Анімації** та hover ефекти
- **Accessibility** підтримка
- **Мобільна адаптація**

## 🚀 Готові теми

### 1. Класичний ресторан 🍽️
Елегантна тема з теплими коричневими тонами для класичних ресторанів.

### 2. Затишне кафе ☕
Тепла та затишна тема з натуральними кольорами для кафе.

### 3. Фаст-фуд 🍔
Яскрава та енергійна тема з червоними та жовтими акцентами.

### 4. Суши-бар 🍣
Мінімалістична тема з зеленими та червоними акцентами.

### 5. Піцерія 🍕
Італійська тема з червоними, помаранчевими та зеленими кольорами.

### 6. Модерн 🏢
Сучасна тема з синіми та сірими тонами для модерних закладів.

### 7. Темна тема 🌙
Стильна темна тема з фіолетовими та блакитними акцентами.

### 8. Весняна тема 🌸
Свіжа та життєрадісна тема з зеленими та жовтими тонами.

### 9. Преміум 👑
Розкішна тема з чорними та золотими акцентами для преміум закладів.

## 📁 Структура файлів

```
src/app/
├── styles/
│   ├── design-system.css    # Основні стилі дизайн-системи
│   └── themes.css          # Стилі тем
├── components/
│   └── design-system/
│       ├── Button.tsx       # Компонент кнопки
│       ├── Card.tsx        # Компонент картки
│       ├── ThemePreview.tsx # Компонент попереднього перегляду тем
│       ├── ColorPicker.tsx  # Компонент вибору кольорів
│       ├── ThemeProvider.tsx # Провайдер тем
│       ├── DesignSystemDemo.tsx # Демонстрація дизайн-системи
│       └── index.ts        # Експорт компонентів
└── design-system/
    └── page.tsx            # Сторінка демонстрації
```

## 🎯 Використання

### Підключення дизайн-системи

```tsx
import { ThemeProvider, Button, Card } from '@/app/components/design-system';

function App() {
  return (
    <ThemeProvider>
      <div>
        <Button variant="primary">Кнопка</Button>
        <Card>
          <CardBody>Контент картки</CardBody>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

### Використання тем

```tsx
import { useTheme } from '@/app/components/design-system';

function MyComponent() {
  const { currentTheme, setThemeById } = useTheme();
  
  return (
    <div>
      <h1>Поточна тема: {currentTheme.name}</h1>
      <button onClick={() => setThemeById('fast-food')}>
        Перемкнути на фаст-фуд тему
      </button>
    </div>
  );
}
```

### CSS класи

```html
<!-- Кнопки -->
<button class="ds-btn ds-btn-primary">Основна кнопка</button>
<button class="ds-btn ds-btn-secondary">Другорядна кнопка</button>
<button class="ds-btn ds-btn-outline">Контурна кнопка</button>

<!-- Картки -->
<div class="ds-card">
  <div class="ds-card-header">
    <h3 class="ds-card-title">Заголовок</h3>
  </div>
  <div class="ds-card-body">
    <p class="ds-card-text">Контент картки</p>
  </div>
</div>

<!-- Форми -->
<div class="ds-form-group">
  <label class="ds-form-label">Поле вводу</label>
  <input type="text" class="ds-form-input" placeholder="Введіть текст">
</div>

<!-- Flexbox утиліти -->
<div class="ds-flex ds-items-center ds-justify-between ds-gap-4">
  <div>Елемент 1</div>
  <div>Елемент 2</div>
</div>

<!-- Grid утиліти -->
<div class="ds-grid ds-grid-cols-3 ds-gap-6">
  <div>Колонка 1</div>
  <div>Колонка 2</div>
  <div>Колонка 3</div>
</div>
```

## 🎨 CSS змінні

### Кольори
```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

### Типографіка
```css
:root {
  --font-family-primary: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### Відступи
```css
:root {
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
}
```

### Тіні
```css
:root {
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

### Градієнти
```css
:root {
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
```

## 📱 Responsive дизайн

### Breakpoints
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Responsive класи
```html
<!-- Grid -->
<div class="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-lg:grid-cols-3">
  <div>Колонка 1</div>
  <div>Колонка 2</div>
  <div>Колонка 3</div>
</div>

<!-- Flexbox -->
<div class="ds-flex ds-flex-col ds-md:flex-row ds-items-center ds-gap-4">
  <div>Елемент 1</div>
  <div>Елемент 2</div>
</div>

<!-- Текст -->
<h1 class="ds-text-lg ds-md:text-xl ds-lg:text-2xl">Заголовок</h1>
```

## ♿ Accessibility

### Focus стилі
```css
.ds-focus\:ring:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Screen reader утиліти
```html
<span class="ds-sr-only">Прихований текст для screen reader</span>
```

## 🎭 Анімації

### Hover ефекти
```html
<div class="ds-hover-scale">Масштабується при hover</div>
<div class="ds-hover-lift">Піднімається при hover</div>
<div class="ds-hover-shadow">Тінь при hover</div>
```

### Переходи
```html
<div class="ds-transition">Плавний перехід</div>
<div class="ds-transition-fast">Швидкий перехід</div>
<div class="ds-transition-slow">Повільний перехід</div>
```

## 🛠️ Кастомізація

### Створення власної теми
```tsx
import { ThemeProvider } from '@/app/components/design-system';

const customTheme = {
  id: 'custom',
  name: 'Моя тема',
  colors: {
    primary: '#ff6b35',
    secondary: '#ffd23f',
    accent: '#ff1744',
    background: '#ffe8e0'
  }
};

function App() {
  return (
    <ThemeProvider>
      {/* Ваш контент */}
    </ThemeProvider>
  );
}
```

### CSS змінні для кастомізації
```css
[data-theme="custom"] {
  --color-primary: #ff6b35;
  --color-secondary: #ffd23f;
  --color-accent: #ff1744;
  --color-background: #ffe8e0;
}
```

## 📖 Приклади використання

### Меню ресторану
```tsx
import { Card, CardHeader, CardBody, CardTitle, Button } from '@/app/components/design-system';

function MenuItem({ item }) {
  return (
    <Card className="ds-hover-lift">
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="ds-text-gray-600 ds-mb-4">{item.description}</p>
        <div className="ds-flex ds-items-center ds-justify-between">
          <span className="ds-text-lg ds-font-semibold ds-text-primary">
            {item.price}₴
          </span>
          <Button variant="primary" size="sm">
            Додати в кошик
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
```

### Форма замовлення
```tsx
function OrderForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Оформити замовлення</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-6">
          <div className="ds-form-group">
            <label className="ds-form-label">Ім'я</label>
            <input type="text" className="ds-form-input" />
          </div>
          <div className="ds-form-group">
            <label className="ds-form-label">Телефон</label>
            <input type="tel" className="ds-form-input" />
          </div>
        </div>
        <div className="ds-flex ds-gap-3 ds-mt-6">
          <Button variant="primary" className="ds-flex-1">
            Підтвердити замовлення
          </Button>
          <Button variant="outline">
            Скасувати
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
```

## 🚀 Демонстрація

Відвідайте сторінку `/design-system` для інтерактивної демонстрації всіх можливостей дизайн-системи.

## 📝 Ліцензія

MIT License - використовуйте вільно для ваших проектів.

## 🤝 Внесок

Вітаємо внески! Будь ласка, створюйте issues та pull requests для покращення дизайн-системи.

---

**Створено з ❤️ для ресторанів та кафе**
