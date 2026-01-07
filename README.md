# La Diabla - Restaurante Website

Sitio web moderno para restaurante mediterráneo con gestión de contenido headless.

## Stack Tecnológico

- **Next.js 16** - Framework React con SSR y generación estática
- **Sanity CMS** - Headless CMS para gestión de contenido (menús, imágenes, textos)
- **Tailwind CSS 4** - Estilos utility-first
- **TypeScript** - Tipado estático
- **Vercel** - Hosting y deployment

## Características

- Diseño responsive mobile-first
- Módulos personalizados (Hero Video, Parallax, Bento Gallery, Menu Explorer)
- Integración WhatsApp para reservaciones
- SEO optimizado
- Security headers configurados
- Edición de contenido en tiempo real vía Sanity Studio

## Desarrollo Local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Variables de Entorno

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
```

## Licencia

MIT - Basado en [SanityPress](https://github.com/nuotsu/sanitypress)
