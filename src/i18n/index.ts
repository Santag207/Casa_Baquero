import type { Translations, Language } from './types';
export type { Translations, Language } from './types';
export { LANGUAGE_NAMES, DEFAULT_LANGUAGE } from './types';

import es from './es';
import en from './en';
import it from './it';
import fr from './fr';

export const translations: Record<Language, Translations> = { es, en, it, fr };
