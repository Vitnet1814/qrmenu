import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>QR</div>
          <span>QR Menu</span>
        </Link>
        <Link href="/dashboard">
          <button className={styles.dashboardButton}>Кабінет</button>
        </Link>
      </header>
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1>Сучасне QR-меню для вашого бізнесу</h1>
            <p>Зробіть свій сервіс швидшим, зручнішим та сучасним! Створюйте красиві меню, налаштовуйте дизайн та генеруйте QR-коди за лічені хвилини.</p>
            <Link href="/auth/login">
              <button className={styles.primaryButton}>Приєднатися зараз</button>
            </Link>
          </div>
        </section>
        
        <section className={styles.featureSection}>
          <div className={styles.featureContent}>
            <h2>Можливості платформи</h2>
            <p>Все необхідне для створення професійного QR-меню в одному місці</p>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📱</div>
                <h3>Легке керування</h3>
                <p>Інтуїтивно зрозумілий інтерфейс для додавання, редагування та оновлення вашого меню в режимі реального часу</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎨</div>
                <h3>Персоналізація дизайну</h3>
                <p>Оберіть один із готових стилів або налаштуйте власний дизайн, щоб підкреслити унікальність вашого закладу</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3>Миттєва генерація QR-кодів</h3>
                <p>Отримайте готовий QR-код для вашого меню одразу після його створення. Роздрукуйте та розмістіть на столиках</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className={styles.designSection}>
          <div className={styles.designContent}>
            <h2>Красивий дизайн</h2>
            <p>Завантажуйте фотографії страв, вказуйте ціни та описи, розділяйте меню на категорії. Ваші клієнти зможуть легко переглядати меню зі своїх смартфонів.</p>
          </div>
        </section>
        
        <section className={styles.qrCodeSection}>
          <div className={styles.qrCodeContent}>
            <h2>Швидкий старт</h2>
            <p>Зареєструйте свій заклад та відкрийте для себе переваги QR-меню. Почніть вже сьогодні та зробіть свій сервіс більш сучасним!</p>
          </div>
        </section>
        
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Почніть вже сьогодні!</h2>
            <p>Приєднуйтесь до тисяч ресторанів, які вже використовують QR-меню для покращення сервісу</p>
            <Link href="/auth/login">
              <button className={styles.secondaryButton}>Створити аккаунт</button>
            </Link>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 QR Menu. Всі права захищено</p>
      </footer>
    </div>
  );
}