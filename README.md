# Portfolio · Paloma Guiral Ortuño

Web personal en **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**, bilingüe ES / EN.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000 → redirige a /es
npm run build    # build de producción
npm run lint
```

## Estructura

| Carpeta | Qué hay |
|---|---|
| `src/messages/es.json`, `en.json` | **Todos los textos** de la web. Para cambiar un texto, edítalo aquí (en los dos idiomas). |
| `src/lib/content.ts` | Enlaces, imágenes y ajustes visuales de productos y análisis (lo que no es texto). |
| `src/lib/site.ts` | Email, LinkedIn, GitHub, ruta del CV y orden de las pestañas. |
| `src/app/[lang]/…` | Una carpeta por página (`/es/experiencia`, `/en/productos/obrik`…). |
| `src/components/` | Pestañas, switch de idioma, modal "Mi perfil en 1 minuto", carpeta de productos… |
| `src/proxy.ts` | Redirige `/` y rutas sin idioma a `/es` (o al idioma recordado en la cookie `NEXT_LOCALE`). |
| `public/` | Fotos, capturas, TFM y `cv-paloma-guiral.pdf`. |

Para actualizar el CV basta con sustituir `public/cv-paloma-guiral.pdf` por la nueva versión (mismo nombre).

## Despliegue en Vercel

1. Entra en [vercel.com](https://vercel.com) con tu cuenta de GitHub.
2. **Add New… → Project**, elige el repositorio `palomaguiral/portfolio` y pulsa **Import**.
3. Vercel detecta Next.js solo: deja la configuración por defecto y pulsa **Deploy**.
4. (Opcional) Si usas un dominio propio, añádelo en **Settings → Domains** y crea la variable de entorno
   `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com` en **Settings → Environment Variables** (así el sitemap, el canonical y Open Graph usan ese dominio). Sin ella se usa automáticamente la URL de producción de Vercel.

Cada `git push` a `main` vuelve a desplegar la web automáticamente.
