import type { I18nText, Locale } from './content.schema'

export function normalizeLocale(locale: string) {
    return locale.startsWith('en') ? 'en' : 'es'
}

export function ct(value: I18nText, locale: string) {
    return value[normalizeLocale(locale)]
}

