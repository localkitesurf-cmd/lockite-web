import { getRequestConfig } from 'next-intl/server';

export const locales = ['de', 'en', 'fr', 'es', 'nl'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'de';

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  nl: 'Nederlands',
};

export const localeFlags: Record<Locale, string> = {
  de: '🇩🇪',
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  nl: '🇳🇱',
};

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
