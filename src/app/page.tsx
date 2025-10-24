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
              Вхід
            </button>
          </Link>
        </div>
      </header>
      
      <main className="ds-gradient-main flex-grow" >
        <section className="ds-gradient-section-white" style={{height: '600px'}}>
          <div className="ds-gradient-content" style={{height: '100%'}}>
            <div className="ds-flex ds-flex-col" style={{height: '100%'}}>
              {/* Основний контент */}
              <div className="ds-flex ds-items-center ds-gap-8 ds-flex-wrap ds-flex-1">
                {/* Текстова частина */}
                <div className="ds-flex-1 min-w-0">
                  <h1 className="ds-gradient-title-white animate-fade-up">QR-меню для вашого закладу за 5 хвилин. Безкоштовно</h1>
                  <p className="ds-gradient-subtitle-white animate-fade-up">Створіть сучасне меню, отримайте QR-код і дозвольте клієнтам переглядати ваші страви зі свого телефону</p>
                </div>
                
                {/* Картинка */}
                <div className="flex-shrink-0">
                  <div className="w-[600px] h-[300px] bg-gray-200 rounded-lg ds-flex ds-items-center ds-justify-center border-2 border-dashed border-gray-400 animate-fade-up">
                    <div className="text-center text-gray-500">
                      <div className="text-6xl mb-4">
                      <img 
                      src="https://optim.tildacdn.com/tild6264-6239-4437-a535-303232656266/-/format/webp/Two_columns_in_a_row.png.webp"
                      width={600}
                      height={300}
                      alt="QR Menu Mockup" 
                      className="w-[600px] h-[300px] rounded-lg animate-fade-up" />
                      </div>
                      {/* <p className="text-lg font-semibold">Мокап телефону</p>
                      <p className="text-sm">600x300px</p> 
                      src="https://optim.tildacdn.com/tild6264-6239-4437-a535-303232656266/-/format/webp/Two_columns_in_a_row.png.webp"
                      */}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Кнопка внизу посередині */}
              <div className="ds-flex ds-justify-center ds-items-end pb-8">
                <Link href="/auth/login">
                  <button className="ds-gradient-button">Спробувати безкоштовно</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="ds-gradient-section">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title">Як це працює</h2>
            <p className="ds-gradient-subtitle">Всего 3 прості кроки до сучасного меню</p>
            <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-3 ds-gap-6 mt-10">
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>🔐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Зареєструйтесь</h3>
                <p className="text-gray-600">Швидко через Google за 30 секунд</p>
              </div>
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>📝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Додайте меню</h3>
                <p className="text-gray-600">Простий конструктор з перетягуванням</p>
              </div>
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>🖨️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Завантажте QR-код</h3>
                <p className="text-gray-600">Роздрукуйте та розмістіть на столах</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="ds-gradient-section-white">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title-white">Чому обирають нас</h2>
            <p className="ds-gradient-subtitle-white">Переваги, які роблять наш сервіс найкращим вибором</p>
            
            <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-8 mt-10">
              {/* Безкоштовність */}
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <span className="text-green-600 font-bold">Безкоштовно</span>
                </h3>
                <p className="text-gray-600">Повний функціонал без прихованих платежів</p>
              </div>
              
              {/* Немає завантажень */}
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Миттєвий доступ</h3>
                <p className="text-gray-600">Клієнти сканують код камерою — все працює одразу</p>
              </div>
              
              {/* Персоналізація */}
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>🎨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Красивий дизайн</h3>
                <p className="text-gray-600">Готові теми та персоналізація під ваш бренд</p>
              </div>
              
              {/* Оновлення */}
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>🔄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Оновлення онлайн</h3>
                <p className="text-gray-600">Змінюйте меню — зміни відбуваються миттєво</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="ds-gradient-section-white">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title-white">Почніть зараз безкоштовно</h2>
            <p className="ds-gradient-subtitle-white">Приєднуйтесь до тисяч ресторанів, які вже використовують QR-меню</p>
            <div className="text-center">
              <Link href="/auth/login">
                <button className="ds-gradient-button text-lg px-8 py-4">Створити моє меню</button>
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