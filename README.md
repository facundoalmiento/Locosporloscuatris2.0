# Locos por los Cuatris 2.0

Sitio web responsive para presentar travesias en cuatriciclo, ATV y UTV, centralizar consultas por WhatsApp, mostrar proximas salidas, ordenar galerias por terreno y dar visibilidad a sponsors del proyecto.

## Estado del deploy

La URL de demo final debe confirmarse antes de compartir el portfolio con reclutadores o clientes. Durante la auditoria se detecto que una URL de Vercel asociada al portfolio podia responder 404, por lo que el enlace externo del desarrollador fue desactivado temporalmente en la app hasta contar con una URL vigente.

- Demo local: `http://127.0.0.1:5173/`
- Produccion esperada: pendiente de URL final verificada
- Dominio configurado para SEO: `https://locosporloscuatristravesias.com`

## Problema Que Resuelve

El proyecto reemplaza una presencia web dispersa por una experiencia mas clara y accionable. Permite que una persona interesada entienda rapidamente que tipo de travesias existen, vea material visual real, consulte cupos por WhatsApp y reconozca las marcas que acompanan cada salida.

## Publico Objetivo

- Personas interesadas en travesias off-road.
- Usuarios de cuatriciclos, ATV y UTV que buscan salidas organizadas.
- Sponsors y marcas del rubro que necesitan presencia institucional.
- Visitantes mobile que llegan desde redes sociales y necesitan contacto rapido.

## Capturas

### Home Desktop

![Home desktop](./docs/screenshots/home-desktop.png)

### Galeria Mobile

![Galeria mobile](./docs/screenshots/galeria-mobile.png)

## Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- GSAP
- Vercel

## Funcionalidades

- Home con hero, proximas travesias, llamadas a la accion y sponsors destacados.
- Galeria segmentada por tipos de salida: arena, barro, solidarias y nieve.
- Paginas de detalle para albumes de travesias.
- Pagina de sponsors con enlaces externos cuando estan disponibles.
- Contacto directo por WhatsApp con mensajes prearmados.
- Carga diferida de paginas y componentes pesados.
- Animaciones de transicion entre rutas.
- Mascota visual integrada como parte de la identidad del proyecto.
- Metadatos SEO, Open Graph, sitemap y robots.

## Decisiones Tecnicas

- Se usa `HashRouter` para evitar fallos de recarga en hosting estatico.
- Las paginas principales se cargan con `lazy` y `Suspense` para reducir el bundle inicial.
- Los datos de travesias, sponsors y configuracion del sitio viven en archivos separados para facilitar mantenimiento.
- Los enlaces externos se renderizan solo cuando existe una URL valida asociada.
- El layout usa utilidades responsive, `clamp()`, `min()`, grids y contenedores centrados para evitar parches por resolucion.

## Responsive

El sitio fue trabajado para mobile, tablet, notebook y pantallas grandes. Se revisaron especialmente:

- Anchos de contenedores.
- Espaciados verticales.
- Alturas de hero y secciones.
- Cards con imagenes y contenido variable.
- Navegacion mobile.
- Prevencion de overflow horizontal.

Resoluciones auditadas durante la revision: `320`, `375`, `430`, `768`, `820`, `1024`, `1280`, `1366`, `1440`, `1920` y `2560px`.

## SEO y Performance

- `title`, `description`, canonical y Open Graph en `index.html`.
- Componente `Seo` con datos estructurados.
- `robots.txt` y `sitemap.xml` en `public`.
- Imagen social configurada.
- Lazy loading para rutas y componentes visuales pesados.
- Build optimizado con Vite.
- Headers de seguridad configurados en `vercel.json`.
- Rewrite SPA hacia `index.html` para evitar 404 en rutas internas al desplegar.

## Instalacion

```bash
npm install
npm run dev
```

Para generar una version de produccion:

```bash
npm run build
```

Para previsualizar el build:

```bash
npm run preview
```

## Verificacion de Enlaces

Se revisaron enlaces internos principales en desktop y mobile desde el entorno local:

- Home
- Travesias
- Galeria
- Sponsors
- Contacto
- Botones hacia WhatsApp
- Botones internos de navegacion

Tambien se detecto que el dominio `https://locosporloscuatristravesias.com` responde con un sitio anterior, no necesariamente con esta version React. Antes de compartir el proyecto como demo publica, conviene confirmar el dominio final o actualizar la URL de produccion.

## Proximas Mejoras

- Conectar el dominio final a la version React actual.
- Actualizar la URL publica del portfolio/desarrollador cuando el deploy este confirmado.
- Agregar capturas actualizadas despues del deploy final.
- Medir Lighthouse sobre produccion.
- Automatizar chequeo de enlaces externos en CI.
- Migrar a rutas limpias con `BrowserRouter` si el hosting queda configurado con rewrites estables.

