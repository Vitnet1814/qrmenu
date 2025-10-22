import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="ds-gradient-bg ds-gradient-overlay homepage-light-theme">
      <header className="ds-gradient-header px-5 py-6">
        <div className="container ds-flex ds-items-center ds-justify-between">
          <Link href="/" className="ds-flex ds-items-center ds-gap-3 text-white text-2xl font-bold">
            <div className="ds-auth-logo-icon">QR</div>
            <span>QR Menu</span>
          </Link>
          <Link href="/dashboard">
            <button className="ds-gradient-button-secondary px-6 py-3 text-white border-2 border-white/30 rounded-xl font-semibold transition-all hover:bg-white/30 hover:border-white/50 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm">
              Кабінет
            </button>
          </Link>
        </div>
      </header>
      
      <main className="ds-gradient-main flex-grow">
        <section className="ds-gradient-section">
          <div className="ds-gradient-content">
            <h1 className="ds-gradient-title animate-fade-up">Сучасне QR-меню для вашого бізнесу</h1>
            <p className="ds-gradient-subtitle animate-fade-up">Зробіть свій сервіс швидшим, зручнішим та сучасним! Створюйте красиві меню, налаштовуйте дизайн та генеруйте QR-коди за лічені хвилини.</p>
            <div className="text-center">
              <Link href="/auth/login">
                <button className="ds-gradient-button">Приєднатися зараз</button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="ds-gradient-section">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title">Можливості платформи</h2>
            <p className="ds-gradient-subtitle">Все необхідне для створення професійного QR-меню в одному місці</p>
            <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-1 ds-gap-6 mt-10">
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>📱</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Легке керування</h3>
                <p className="text-gray-600">Інтуїтивно зрозумілий інтерфейс для додавання, редагування та оновлення вашого меню в режимі реального часу</p>
              </div>
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', 'padding': '0px'}}>🎨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Персоналізація дизайну</h3>
                <p className="text-gray-600">Оберіть один із готових стилів або налаштуйте власний дизайн, щоб підкреслити унікальність вашого закладу</p>
              </div>
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Миттєва генерація QR-кодів</h3>
                <p className="text-gray-600">Отримайте готовий QR-код для вашого меню одразу після його створення. Роздрукуйте та розмістіть на столиках</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="ds-gradient-section">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title">Красивий дизайн</h2>
            <p className="ds-gradient-subtitle">Завантажуйте фотографії страв, вказуйте ціни та описи, розділяйте меню на категорії. Ваші клієнти зможуть легко переглядати меню зі своїх смартфонів.</p>
          </div>
        </section>
        
        <section className="ds-gradient-section">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title">Швидкий старт</h2>
            <p className="ds-gradient-subtitle">Зареєструйте свій заклад та відкрийте для себе переваги QR-меню. Почніть вже сьогодні та зробіть свій сервіс більш сучасним!</p>
          </div>
        </section>
        
        <section className="ds-gradient-section">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title">Почніть вже сьогодні!</h2>
            <p className="ds-gradient-subtitle">Приєднуйтесь до тисяч ресторанів, які вже використовують QR-меню для покращення сервісу</p>
            <div className="text-center">
              <Link href="/auth/login">
                <button className="ds-gradient-button-secondary">Створити аккаунт</button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="ds-gradient-footer">
        <p>&copy; 2025 QR Menu. Всі права захищено</p>
      </footer>
    </div>
  );
}