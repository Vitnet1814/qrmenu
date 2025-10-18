# Налаштування Google OAuth для QR Menu

## Проблема
Кнопка "Увійти за допомогою Google" не працює через відсутність налаштувань Google OAuth.

## Рішення

### 1. Створіть файл `.env.local` в корені проекту:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/qr-menu-app
```

### 2. Отримайте Google OAuth credentials:

1. **Перейдіть на Google Cloud Console:**
   - Відкрийте https://console.cloud.google.com/
   - Увійдіть у свій Google акаунт

2. **Створіть або оберіть проект:**
   - Натисніть "Select a project" або "New Project"
   - Створіть новий проект з назвою "QR Menu App"

3. **Увімкніть Google+ API:**
   - Перейдіть до "APIs & Services" > "Library"
   - Знайдіть "Google+ API" та увімкніть його

4. **Створіть OAuth 2.0 credentials:**
   - Перейдіть до "APIs & Services" > "Credentials"
   - Натисніть "Create Credentials" > "OAuth client ID"
   - Оберіть "Web application"
   - Додайте назву: "QR Menu App"

5. **Налаштуйте Authorized redirect URIs:**
   - Додайте: `http://localhost:3000/api/auth/callback/google`
   - Для продакшену: `https://yourdomain.com/api/auth/callback/google`

6. **Скопіюйте credentials:**
   - Скопіюйте Client ID та Client Secret
   - Вставте їх у файл `.env.local`

### 3. Згенеруйте NEXTAUTH_SECRET:

```bash
# В терміналі виконайте:
openssl rand -base64 32
```

Або використайте онлайн генератор: https://generate-secret.vercel.app/32

### 4. Перезапустіть сервер розробки:

```bash
npm run dev
```

### 5. Перевірте роботу:

1. Відкрийте http://localhost:3000/auth/login
2. Натисніть "Увійти за допомогою Google"
3. Перевірте консоль браузера на наявність помилок
4. Перевірте консоль сервера на логи NextAuth

## Діагностика

### Перевірте консоль браузера:
- Відкрийте Developer Tools (F12)
- Перейдіть на вкладку Console
- Натисніть кнопку Google авторизації
- Подивіться на логи

### Перевірте консоль сервера:
- Подивіться на логи NextAuth в терміналі
- Перевірте чи є помилки підключення до бази даних

### Типові помилки:

1. **"Google авторизація не налаштована"**
   - Перевірте чи створений файл `.env.local`
   - Перевірте чи правильно вказані GOOGLE_CLIENT_ID та GOOGLE_CLIENT_SECRET

2. **"OAuthError: invalid_client"**
   - Перевірте чи правильно скопійовані Client ID та Client Secret
   - Перевірте чи правильно налаштовані redirect URIs

3. **"Database connection error"**
   - Перевірте чи запущений MongoDB
   - Перевірте чи правильно вказаний MONGODB_URI

## Продакшен

Для продакшену:
1. Оновіть NEXTAUTH_URL на ваш домен
2. Додайте продакшен redirect URI в Google Console
3. Використайте безпечний NEXTAUTH_SECRET
4. Налаштуйте MongoDB Atlas або інший продакшен MongoDB
