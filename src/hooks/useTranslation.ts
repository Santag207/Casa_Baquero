import { useLanguage } from '../context/LanguageContext';

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => {
    const val = vars[key];
    return val !== undefined ? String(val) : `{${key}}`;
  });
}

export function useTranslation() {
  const { t: translations } = useLanguage();

  function t(key: string, vars?: Record<string, string | number>): string {
    const value = getNestedValue(translations as unknown as Record<string, unknown>, key);
    if (typeof value === 'string') return interpolate(value, vars);
    console.warn(`Translation key not found: ${key}`);
    return key;
  }

  return { t };
}
