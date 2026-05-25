# Finca Hotel Casa Baquero — Sitio web

Sitio moderno en **React + Vite** con el contenido de [casabaquero.com](https://www.casabaquero.com/): habitaciones, plan romántico, eventos, llano, mascotas, galerías, tour 360° (Kuula) y reservas multi-paso con envío por **WhatsApp**.

## Desarrollo local

```bash
cd C:\Users\santi\Projects\casa-baquero
npm install
npm run dev
```

## Variables de entorno (Vercel)

Copia `.env.example` y configura en el panel de Vercel:

| Variable | Descripción |
|----------|-------------|
| `VITE_GOOGLE_CALENDAR_API_KEY` | API Key de Google Cloud con Calendar API habilitada |
| `VITE_GOOGLE_CALENDAR_ID` | ID del calendario público (ej. `xxx@group.calendar.google.com`) |

### Google Calendar + FullCalendar

1. Crear proyecto en [Google Cloud Console](https://console.cloud.google.com/).
2. Habilitar **Google Calendar API** y crear una **API Key** (restringir por dominio en producción).
3. Crear un calendario en Google Calendar y marcarlo como **público**.
4. En el calendario, crear eventos de fondo con títulos que contengan **Alta**, **Media** o **Baja** para colorear temporadas.
5. Marcar reservas confirmadas con títulos como **Ocupado** o **Reserva**.

Sin API Key, el sitio muestra temporadas demo y calcula precios con la lógica colombiana en código.

## Despliegue en Vercel

1. Importar el repositorio en [vercel.com](https://vercel.com).
2. Framework: **Vite** — comando build: `npm run build` — salida: `dist`.
3. Añadir las variables `VITE_*` anteriores.
4. Conectar dominio personalizado y HTTPS (automático).

## Tour virtual Kuula

Editar la URL en `src/data/site.ts` → `kuulaTour`:

```ts
kuulaTour: 'https://kuula.co/share/collection/7lpl9?fs=1&vr=0&logo=0&info=0&thumbs=1',
```

## WhatsApp

Reservas y contacto usan `+57 310 818 8183` (`api.whatsapp.com`).

## Estructura

- `src/data/` — habitaciones, textos, galerías
- `src/components/booking/` — calendario FullCalendar + wizard tipo Marriott
- `src/pages/` — una ruta por sección del sitio original
