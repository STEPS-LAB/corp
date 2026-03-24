import type { BilingualText, CasePageDetail } from '@/lib/cms-types'

function b(en: string, uk: string): BilingualText {
  return { en, uk }
}

const emptyImages = () => ({
  heroBackground: '',
  heroMain: '',
  screen1: '',
  screen2: '',
  screen3: '',
  screen4: '',
  fullscreen: '',
})

/** New cases in admin start with this shape; merge fills from built-ins when id matches. */
export function emptyCasePageDetail(): CasePageDetail {
  const z = b('', '')
  return {
    screensSectionTitle: z,
    breadcrumb: z,
    subtitle: z,
    overviewP1: z,
    overviewP2: z,
    screen1Caption: z,
    screen2Caption: z,
    screen3Caption: z,
    screen4Caption: z,
    feature1Title: z,
    feature1Text: z,
    feature2Title: z,
    feature2Text: z,
    feature3Title: z,
    feature3Text: z,
    feature4Title: z,
    feature4Text: z,
    fullscreenCaption: z,
    result1Value: '',
    result2Value: '',
    result3Value: '',
    result1Label: z,
    result2Label: z,
    result3Label: z,
    clientType: z,
    timelineValue: z,
    technologies: [],
    ctaTitle: z,
    images: emptyImages(),
  }
}

export function builtInCaseDetail(caseId: string): CasePageDetail {
  switch (caseId) {
    case 'case-ecommerce':
      return ecommerceDetail()
    case 'case-saas':
      return saasDetail()
    case 'case-corporate':
      return corporateDetail()
    default:
      return emptyCasePageDetail()
  }
}

function ecommerceDetail(): CasePageDetail {
  return {
    screensSectionTitle: b('Platform interface', 'Інтерфейс платформи'),
    breadcrumb: b('← Cases', '← Кейси'),
    subtitle: b(
      'Web development of a platform for online sales built to scale',
      'Веб-розробка платформи для онлайн-продажів під масштабування'
    ),
    overviewP1: b(
      'The client needed a modern platform for online sales that would combine e-commerce functionality, inventory management and payment system integrations.',
      "Клієнт потребував сучасної платформи для онлайн-продажів, яка б об'єднала функціональність інтернет-магазину, системи управління складом та інтеграції з платіжними системами."
    ),
    overviewP2: b(
      'Task: create a scalable solution to handle high order volumes and automate business processes.',
      'Завдання: створити масштабоване рішення, яке дозволить обробляти великі обсяги замовлень та автоматизувати бізнес-процеси.'
    ),
    screen1Caption: b('Homepage with product catalog', 'Головна сторінка з каталогом товарів'),
    screen2Caption: b('Product page with details', 'Сторінка товару з деталями'),
    screen3Caption: b('Cart and checkout', 'Кошик та оформлення замовлення'),
    screen4Caption: b('User account', 'Особистий кабінет користувача'),
    feature1Title: b('Platform development', 'Розробка платформи'),
    feature1Text: b(
      'We built a full-featured e-commerce platform with product catalog, cart, order system and user account.',
      'Створили повнофункціональну e-commerce платформу з каталогом товарів, кошиком, системою замовлень та особистим кабінетом користувача.'
    ),
    feature2Title: b('Payment integration', 'Інтеграція платежів'),
    feature2Text: b(
      'We integrated multiple payment systems, including card payments, e-wallets and cash on delivery.',
      'Підключили кілька платіжних систем, включаючи карткові платежі, електронні гаманці та оплату при отриманні.'
    ),
    feature3Title: b('Inventory management', 'Система управління складом'),
    feature3Text: b(
      'We developed a module for tracking stock, automatic product reservation and supply management.',
      'Розробили модуль для відстеження залишків, автоматичного резервування товарів та управління постачанням.'
    ),
    feature4Title: b('AI optimization', 'AI-оптимізація'),
    feature4Text: b(
      'We implemented AI product recommendations, automatic categorization and search optimization to improve conversion.',
      'Впровадили AI-рекомендації товарів, автоматичну категорізацію та оптимізацію пошуку для покращення конверсії.'
    ),
    fullscreenCaption: b('Admin panel with order management', 'Панель адміністратора з управлінням замовленнями'),
    result1Value: '340%',
    result2Value: '60%',
    result3Value: '85%',
    result1Label: b('Increase in online sales in 6 months', 'Збільшення онлайн-продажів за 6 місяців'),
    result2Label: b('Reduction in order processing time', 'Зниження часу обробки замовлень'),
    result3Label: b('Business process automation', 'Автоматизація бізнес-процесів'),
    clientType: b('E-commerce company', 'E-commerce компанія'),
    timelineValue: b('12 weeks', '12 тижнів'),
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Payment APIs', 'AI Integration'],
    ctaTitle: b('Ready to create your success case?', 'Готові створити свій успішний кейс?'),
    images: emptyImages(),
  }
}

function saasDetail(): CasePageDetail {
  return {
    screensSectionTitle: b('Product interface', 'Інтерфейс продукту'),
    breadcrumb: b('← Cases', '← Кейси'),
    subtitle: b(
      'AI development for startup: minimum product with AI integration',
      'AI-розробка для стартапу: мінімальний продукт з AI-інтеграцією'
    ),
    overviewP1: b(
      'The startup needed a fast MVP launch to validate the business hypothesis. Task: create a functional product in minimum time without sacrificing quality.',
      'Стартап потребував швидкого запуску MVP для перевірки бізнес-гіпотези. Завдання: створити функціональний продукт за мінімальний термін без втрати якості.'
    ),
    overviewP2: b(
      'Using AI-accelerated development, we built a full-featured MVP that allowed the client to quickly get market feedback and validate the business model.',
      'Використовуючи AI-прискорену розробку, ми створили повнофункціональний MVP, який дозволив клієнту швидко отримати фідбек від ринку та валідувати бізнес-модель.'
    ),
    screen1Caption: b('Main dashboard panel', 'Головна панель з дашбордом'),
    screen2Caption: b('Process automation', 'Автоматизація процесів'),
    screen3Caption: b('AI analytics and reports', 'AI-аналітика та звіти'),
    screen4Caption: b('Settings and integrations', 'Налаштування та інтеграції'),
    feature1Title: b('Fast MVP development', 'Швидка розробка MVP'),
    feature1Text: b(
      'We built a minimum product with core functionality in 8 weeks using AI to speed up development.',
      'Створили мінімальний продукт з core функціональністю за 8 тижнів, використовуючи AI для прискорення розробки.'
    ),
    feature2Title: b('Business process automation', 'Автоматизація бізнес-процесів'),
    feature2Text: b(
      'We implemented automation of routine tasks so the team could focus on strategy and development.',
      'Впровадили автоматизацію рутинних завдань, що дозволило команді зосередитись на стратегії та розвитку.'
    ),
    feature3Title: b('AI integration for analytics', 'AI-інтеграція для аналітики'),
    feature3Text: b(
      'We added an AI module for user data analysis and insight generation for decision-making.',
      'Додали AI-модуль для аналізу даних користувачів та генерації інсайтів для прийняття рішень.'
    ),
    feature4Title: b('Analytics system', 'Система аналітики'),
    feature4Text: b(
      'We built a comprehensive system for tracking key metrics to monitor product success.',
      'Вбудували комплексну систему відстеження ключових метрик для моніторингу успіху продукту.'
    ),
    fullscreenCaption: b('Mobile version of the product', 'Мобільна версія продукту'),
    result1Value: '8',
    result2Value: '100+',
    result3Value: '—',
    result1Label: b('From idea to launch', 'Від ідеї до запуску'),
    result2Label: b('Paying users in first month', 'Платних користувачів за місяць'),
    result3Label: b('Business model validated', 'Валідація бізнес-моделі'),
    clientType: b('Tech startup', 'Tech стартап'),
    timelineValue: b('8 weeks', '8 тижнів'),
    technologies: ['React', 'Node.js', 'MongoDB', 'AI APIs', 'Analytics'],
    ctaTitle: b('Ready to create your success case?', 'Готові створити свій успішний кейс?'),
    images: emptyImages(),
  }
}

function corporateDetail(): CasePageDetail {
  return {
    screensSectionTitle: b('Design and interface', 'Дизайн та інтерфейс'),
    breadcrumb: b('← Cases', '← Кейси'),
    subtitle: b(
      'Corporate website development with CRM integration and lead generation automation',
      'Розробка корпоративного сайту з CRM-інтеграцією та автоматизацією лідогенерації'
    ),
    overviewP1: b(
      'The client needed a modern corporate website that would not only represent the company but also work as a tool for lead generation and sales automation.',
      'Клієнт потребував сучасного корпоративного сайту, який би не тільки представляв компанію, але й працював як інструмент для генерації лідів та автоматизації продажів.'
    ),
    overviewP2: b(
      'Task: create a site with content management, CRM integration and request handling automation.',
      'Завдання: створити сайт з системою управління контентом, інтеграцією з CRM та автоматизацією процесу обробки заявок.'
    ),
    screen1Caption: b('Homepage', 'Головна сторінка'),
    screen2Caption: b('Services page', 'Сторінка послуг'),
    screen3Caption: b('Contact form', "Форма зворотного зв'язку"),
    screen4Caption: b('Blog and news', 'Блог та новини'),
    feature1Title: b('Corporate website development', 'Розробка корпоративного сайту'),
    feature1Text: b(
      'We built a modern corporate site with responsive design, content management and search engine optimization.',
      'Створили сучасний корпоративний сайт з адаптивним дизайном, системою управління контентом та оптимізацією для пошукових систем.'
    ),
    feature2Title: b('CRM integration', 'CRM-інтеграція'),
    feature2Text: b(
      'We connected the site to the CRM for automatic sync of requests, contacts and customer interaction history.',
      'Підключили сайт до CRM-системи для автоматичної синхронізації заявок, контактів та історії взаємодії з клієнтами.'
    ),
    feature3Title: b('Lead generation automation', 'Автоматизація лідогенерації'),
    feature3Text: b(
      'We set up automatic form handling, lead distribution to managers and traffic source tracking.',
      'Налаштували автоматичну обробку форм, розподіл лідів між менеджерами та відстеження джерел трафіку.'
    ),
    feature4Title: b('SEO optimization', 'SEO-оптимізація'),
    feature4Text: b(
      'We performed comprehensive SEO optimization that improved search rankings and organic traffic.',
      'Провели комплексну SEO-оптимізацію, що дозволило покращити позиції в пошукових системах та збільшити органічний трафік.'
    ),
    fullscreenCaption: b('Responsive design for mobile devices', 'Адаптивний дизайн для мобільних пристроїв'),
    result1Value: '250%',
    result2Value: '180%',
    result3Value: 'SEO',
    result1Label: b('Conversion increase', 'Збільшення конверсії'),
    result2Label: b('Growth in number of leads', 'Зростання кількості заявок'),
    result3Label: b('Improved SEO rankings', 'Покращення SEO-позицій'),
    clientType: b('Corporation', 'Корпорація'),
    timelineValue: b('10 weeks', '10 тижнів'),
    technologies: ['Next.js', 'Headless CMS', 'CRM API', 'Analytics', 'SEO Tools'],
    ctaTitle: b('Ready to create your success case?', 'Готові створити свій успішний кейс?'),
    images: emptyImages(),
  }
}
