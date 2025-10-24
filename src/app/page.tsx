import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="ds-gradient-bg ds-gradient-overlay homepage-light-theme">
      <header className="ds-gradient-header ds-px-4 ds-md:px-5 ds-py-4 ds-md:py-6">
        <div className="container ds-flex ds-items-center ds-justify-between">
          <Link href="/" className="ds-flex ds-items-center ds-gap-2 ds-md:gap-3 text-white ds-text-xl ds-md:text-2xl font-bold">
            <div className="ds-auth-logo-icon">QR</div>
            <span>QR Menu</span>
          </Link>
          <Link href="/dashboard">
            <button className="ds-gradient-button-secondary ds-px-4 ds-md:px-6 ds-py-2 ds-md:py-3 text-white border-2 border-white/30 rounded-xl font-semibold transition-all hover:bg-white/30 hover:border-white/50 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm ds-text-sm ds-md:text-base">
              Вхід
            </button>
          </Link>
        </div>
      </header>
      
      <main className="ds-gradient-main flex-grow" >
        <section className="ds-gradient-section-white ds-py-12 ds-md:py-16">
          <div className="ds-gradient-content">
            <div className="ds-flex ds-flex-col ds-gap-8 ds-md:gap-12">
              {/* Основний контент */}
              <div className="ds-flex ds-flex-col ds-md:flex-row ds-items-center ds-gap-8 ds-md:gap-12">
                {/* Текстова частина */}
                <div className="ds-flex-1 ds-text-center ds-md:text-left">
                  <h1 className="ds-gradient-title-white animate-fade-up ds-text-3xl ds-md:text-4xl ds-lg:text-5xl">QR-меню для вашого закладу за 5 хвилин. Безкоштовно</h1>
                  <p className="ds-gradient-subtitle-white animate-fade-up ds-mt-4 ds-text-lg ds-md:text-xl">Створіть сучасне меню, отримайте QR-код і дозвольте клієнтам переглядати ваші страви зі свого телефону</p>
                </div>
                
                {/* Картинка */}
                <div className="ds-flex-shrink-0 ds-w-full ds-md:w-auto">
                  <div className="ds-w-full ds-max-w-[600px] ds-mx-auto ds-md:mx-0 ds-aspect-[2/1] ds-bg-gray-200 ds-rounded-lg ds-flex ds-items-center ds-justify-center ds-border-2 ds-border-dashed ds-border-gray-400 animate-fade-up">
                    <div className="ds-text-center ds-text-gray-500">
                      <img 
                        src="https://optim.tildacdn.com/tild6264-6239-4437-a535-303232656266/-/format/webp/Two_columns_in_a_row.png.webp"
                        alt="QR Menu Mockup" 
                        className="ds-w-full ds-h-full ds-object-contain ds-rounded-lg animate-fade-up" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Кнопка внизу посередині */}
              <div className="ds-flex ds-justify-center ds-items-center">
                <Link href="/auth/login">
                  <button className="ds-gradient-button ds-text-lg ds-px-8 ds-py-4">Спробувати безкоштовно</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="ds-gradient-section ds-py-12 ds-md:py-16">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title ds-text-2xl ds-md:text-3xl ds-lg:text-4xl">Як це працює</h2>
            <p className="ds-gradient-subtitle ds-mt-4 ds-text-lg ds-md:text-xl">Всего 3 прості кроки до сучасного меню</p>
            <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-3 ds-gap-6 ds-mt-8 ds-md:mt-10">
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>🔐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Зареєструйтесь</h3>
                <p className="text-gray-600">Швидко через Google за 30 секунд</p>
              </div>
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>📝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Додайте меню</h3>
                <p className="text-gray-600">Простий конструктор</p>
              </div>
              <div className="ds-card ds-p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 ds-gradient-button rounded-2xl ds-flex ds-items-center ds-justify-center font-bold text-white mx-auto mb-5" style={{fontSize: '3rem', padding: '0px'}}>🖨️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Завантажте QR-код</h3>
                <p className="text-gray-600">Роздрукуйте та розмістіть на столах</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="ds-gradient-section-white ds-py-12 ds-md:py-16">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title-white ds-text-2xl ds-md:text-3xl ds-lg:text-4xl">Чому обирають нас</h2>
            <p className="ds-gradient-subtitle-white ds-mt-4 ds-text-lg ds-md:text-xl">Переваги, які роблять наш сервіс найкращим вибором</p>
            
            <div className="ds-grid ds-grid-cols-1 ds-md:grid-cols-2 ds-gap-6 ds-md:gap-8 ds-mt-8 ds-md:mt-10">
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
        
        <section className="ds-gradient-section-white ds-py-12 ds-md:py-16">
          <div className="ds-gradient-content">
            <h2 className="ds-gradient-title-white ds-text-2xl ds-md:text-3xl ds-lg:text-4xl">Почніть зараз безкоштовно</h2>
            <p className="ds-gradient-subtitle-white ds-mt-4 ds-text-lg ds-md:text-xl">Приєднуйтесь до тисяч ресторанів, які вже використовують QR-меню</p>
            <div className="ds-text-center ds-mt-8 ds-md:mt-10">
              <Link href="/auth/login">
                <button className="ds-gradient-button ds-text-lg ds-px-8 ds-py-4">Створити моє меню</button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="ds-gradient-footer ds-px-4 ds-md:px-5 ds-py-4 ds-md:py-6">
        <p className="ds-text-sm ds-md:text-base">&copy; 2025 QR Menu. Всі права захищено</p>
      </footer>
    </div>
  );
}