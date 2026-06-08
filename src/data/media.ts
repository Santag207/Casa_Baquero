/** Prefijo de imágenes del sitio original (CDN propio del hotel) */
export const MEDIA_CDN = 'https://www.casabaquero.com';

/**
 * Utilidad para resolver imágenes locales o del CDN.
 * Prioriza /images/ en public si el path empieza por /images/
 */
export function media(path: string, width?: number, height?: number): string {
  // Si ya es una URL absoluta, retornar tal cual
  if (path.startsWith('http')) return path;

  // Si es local, retornar path relativo
  if (path.startsWith('/images/') || path.startsWith('images/')) {
    const localPath = path.startsWith('/') ? path : `/${path}`;
    return localPath;
  }

  // Fallback al CDN original
  const base = `${MEDIA_CDN}${path.startsWith('/') ? '' : '/'}${path}`;
  if (!width) return base;
  const params = new URLSearchParams({ width: String(width), mode: 'crop' });
  if (height) params.set('height', String(height));
  return `${base}?${params}`;
}
