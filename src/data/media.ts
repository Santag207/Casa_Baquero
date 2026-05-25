/** Prefijo de imágenes del sitio original (CDN propio del hotel) */
export const MEDIA = 'https://www.casabaquero.com';

export function media(path: string, width?: number, height?: number): string {
  const base = path.startsWith('http') ? path : `${MEDIA}${path.startsWith('/') ? '' : '/'}${path}`;
  if (!width) return base;
  const params = new URLSearchParams({ width: String(width), mode: 'crop' });
  if (height) params.set('height', String(height));
  return `${base}?${params}`;
}
