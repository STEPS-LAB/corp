# STEPS LAB - Next.js Website

Сучасний веб-сайт, побудований на Next.js 14 з App Router, Tailwind CSS та TypeScript.

## Технології

- **Next.js 14** - React фреймворк з App Router
- **TypeScript** - Типізація коду
- **Tailwind CSS** - Utility-first CSS фреймворк
- **React 18** - UI бібліотека

## Структура проекту

```
src/
├── app/                    # App Router сторінки
│   ├── layout.tsx         # Головний layout
│   ├── page.tsx           # Головна сторінка
│   ├── globals.css        # Глобальні стилі
│   ├── services/          # Сторінки послуг
│   ├── cases/             # Сторінки кейсів
│   ├── approach/          # Сторінка підходу
│   ├── about/             # Сторінка про нас
│   └── contact/           # Сторінка контактів
├── components/            # React компоненти
│   ├── Header.tsx        # Хедер з навігацією
│   ├── Footer.tsx        # Футер
│   ├── Modal.tsx         # Модальне вікно
│   ├── Preloader.tsx    # Прелоадер
│   └── ...               # Інші компоненти
└── hooks/                # React hooks
    └── useModal.tsx      # Hook для модальних вікон
```

## Встановлення

1. Встановіть залежності:
```bash
npm install
```

2. Запустіть dev сервер:
```bash
npm run dev
```

3. Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

## Скрипти

- `npm run dev` - Запуск dev сервера
- `npm run build` - Збірка для production
- `npm run start` - Запуск production сервера
- `npm run lint` - Перевірка коду

## Особливості

- ✅ App Router з Next.js 14
- ✅ Tailwind CSS для стилізації
- ✅ TypeScript для типізації
- ✅ Адаптивний дизайн
- ✅ Модальні вікна
- ✅ Прелоадер
- ✅ Плавні анімації
- ✅ SEO оптимізація

## Ліцензія

© 2024 STEPS LAB. Всі права захищені.
