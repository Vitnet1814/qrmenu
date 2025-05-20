import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/dashboard">
          <button className={styles.dashboardButton}>Кабінет</button>
        </Link>
      </header>
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1>Сучасне QR-меню для вашого бізнесу</h1>
            <p>Зробіть свій сервіс швидшим, зручнішим та сучасним!</p>
            <Link href="/auth/login">
              <button className={styles.primaryButton}>Приєднатися зараз</button>
            </Link>
          </div>
        </section>
        <section className={styles.featureSection}>
          <div className={styles.featureContent}>
            <h2>Легке керування меню</h2>
            <p>Інтуїтивно зрозумілий інтерфейс для додавання, редагування та оновлення вашого меню в режимі реального часу.</p>
            <ul>
              <li>Завантажуйте фотографії страв</li>
              <li>Вказуйте ціни та описи</li>
              <li>Розділяйте меню на категорії</li>
            </ul>
          </div>
        </section>
        <section className={styles.designSection}>
          <div className={styles.designContent}>
            <h2>Персоналізація дизайну</h2>
            <p>Оберіть один із готових стилів або налаштуйте власний дизайн, щоб підкреслити унікальність вашого закладу.</p>
            <p>Завантажуйте фонові зображення та обирайте кольори.</p>
          </div>
        </section>
        <section className={styles.qrCodeSection}>
          <div className={styles.qrCodeContent}>
            <h2>Миттєва генерація QR-кодів</h2>
            <p>Отримайте готовий QR-код для вашого меню одразу після його створення. Роздрукуйте та розмістіть на столиках.</p>
            <p>Клієнти зможуть легко переглядати меню зі своїх смартфонів.</p>
          </div>
        </section>
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Почніть вже сьогодні!</h2>
            <p>Зареєструйте свій заклад та відкрийте для себе переваги QR-меню.</p>
            <Link href="/auth/login">
              <button className={styles.secondaryButton}>Створити аккаунт</button>
            </Link>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 Всі права захищено</p>
      </footer>
    </div>
  );
}