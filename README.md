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

## Despliegue en Render

La web se despliega como **Web Service** de Node (hace falta servidor por la redirección de idioma de `src/proxy.ts`).
El archivo `render.yaml` ya trae la configuración.

1. En [dashboard.render.com](https://dashboard.render.com): **New → Web Service** y elige el repositorio `palomaguiral/portfolio`.
2. Configuración:
   - **Runtime:** Node
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm run start`
   - **Environment Variables:** `NODE_VERSION=22`
3. Pulsa **Deploy Web Service**.
4. (Opcional) Con dominio propio, añádelo en **Settings → Custom Domains** y crea la variable
   `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com` (así el sitemap, el canonical y Open Graph usan ese dominio).
   Sin ella se usa automáticamente la URL `*.onrender.com` (`RENDER_EXTERNAL_URL`).

Cada `git push` a `main` vuelve a desplegar la web automáticamente.
En el plan gratuito, el servicio se duerme tras unos 15 minutos sin visitas y la primera visita después tarda en cargar.
