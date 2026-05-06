# Feature: Landing Page BidaiaGo

## Resumen

La feature `feat/landing-page` implementa una landing page visual para presentar BidaiaGo antes de entrar a la parte funcional de la aplicación.

La página funciona como pantalla de bienvenida y explicación del producto:

- Presenta qué es BidaiaGo.
- Explica qué puede hacer el usuario.
- Muestra un flujo básico de uso.
- Resume la información que se podrá consultar.
- Refuerza la identidad visual de viajes usando imágenes reales.
- Evita duplicar botones de navegación interna porque el acceso principal queda delegado al header.

## Archivos principales

```txt
src/pages/LandingPage.tsx
src/styles/landing.css
public/images/travel_images/
package.json
package-lock.json
```

## Dependencia añadida

Se instaló `motion` para usar Motion for React:

```txt
motion
```

Uso principal:

```ts
import { motion, useReducedMotion } from "motion/react";
```

La dependencia se usa para:

- Animaciones de entrada en el hero.
- Aparición de secciones al entrar en viewport.
- Microinteracciones en imágenes y cards.
- Hover animado en elementos visuales.
- Respeto de preferencias de reducción de movimiento con `useReducedMotion`.

## Estructura de la landing

La landing se compone de las siguientes zonas:

1. Hero principal.
2. Sección explicativa de qué es BidaiaGo.
3. Cards visuales de funcionalidades.
4. Galería visual de scroll.
5. Sección de pasos de funcionamiento.
6. Grid de información disponible.
7. Cierre visual sin botón.
8. Botón flotante para volver arriba.

## Hero principal

El hero incluye:

- Eyebrow: `Explora el mundo con BidaiaGo`.
- Título principal: `Descubre tu próximo destino`.
- Texto descriptivo breve.
- Collage de imágenes de viaje.

Clases relevantes:

```txt
landing-hero
landing-hero-content
landing-eyebrow
landing-title
landing-subtitle
landing-hero-gallery
landing-hero-image
landing-hero-image-large
landing-hero-image-small
landing-hero-image-top
landing-hero-image-bottom
landing-hero-image-tiny
```

El hero ya no contiene botones propios. Esta decisión evita duplicar navegación, ya que el header debe encargarse del acceso a las secciones principales de la app.

## Cards de funcionalidades

La sección `¿Qué puedes hacer?` usa cards con imagen, etiqueta, título, texto y numeración visual.

Funcionalidades representadas:

- Explorar destinos.
- Comparar información.
- Preparar próximos viajes.

Clases relevantes:

```txt
landing-features-grid
landing-feature-card
landing-feature-image
landing-feature-content
landing-feature-icon
landing-feature-title
landing-feature-text
landing-feature-index
```

Efectos:

- Elevación con Motion en hover.
- Zoom suave de imagen con CSS.
- Aumento de saturación/contraste en hover.
- Sombra más intensa al interactuar.

## Galería visual de scroll

Se añadió una sección intermedia para dar más recorrido visual y dinamismo al scroll.

Contenido:

- Inspira.
- Compara.
- Descubre.
- Planifica.

Clases relevantes:

```txt
landing-visual-section
landing-visual-header
landing-visual-grid
landing-visual-card
landing-visual-image
landing-visual-content
landing-visual-label
landing-visual-text
```

Efectos:

- Aparición escalonada al entrar en viewport.
- Cards con desplazamiento vertical alterno en tablet/desktop.
- Overlay oscuro para mejorar legibilidad.
- Zoom de imagen y saturación en hover.

## Sección de pasos

La sección `¿Cómo funciona?` se muestra como una serie de pasos con imagen.

Pasos actuales:

1. Entra al panel principal.
2. Descubre datos del país.
3. Elige tu siguiente ruta.

Clases relevantes:

```txt
landing-steps
landing-step
landing-step-image
landing-step-content
landing-step-number
landing-step-title
landing-step-text
```

Efectos:

- Hover con escala ligera mediante Motion.
- Imagen con zoom y saturación en hover.
- Layout de una columna en mobile.
- Layout de imagen + contenido en desktop.

## Información disponible

La sección de información resume datos que se consultarán en la app:

- Capital.
- Región.
- Población.
- Idiomas.
- Monedas.
- Bandera.
- Mapa.
- Continente.

Clases relevantes:

```txt
landing-info-grid
landing-info-item
```

## CTA final

El cierre visual mantiene un tono de invitación, pero no incluye botón.

Motivo:

- La navegación principal vive en el header.
- Se evita repetir acciones en hero y cierre.
- La landing queda más editorial y menos cargada.

Clases relevantes:

```txt
landing-cta
landing-cta-title
landing-cta-text
```

## Botón flotante para subir arriba

Se añadió un botón flotante fijo abajo a la derecha para volver al inicio del scroll.

Marcado:

```tsx
<motion.a
  className="landing-scroll-top"
  href="#landing-top"
  aria-label="Subir al inicio de la landing"
>
  ↑
</motion.a>
```

Clases relevantes:

```txt
landing-scroll-top
```

Características:

- Usa colores globales de la app.
- Está fijo en la esquina inferior derecha.
- Tiene hover con gradiente hacia `var(--color-acento)`.
- Tiene `focus-visible` accesible.
- Usa `aria-label`.

## Imágenes usadas

Las imágenes se cargan desde:

```txt
public/images/travel_images/
```

Rutas referenciadas en `LandingPage.tsx`:

```txt
/images/travel_images/Playa-Tailandia-122-600x900.webp
/images/travel_images/Statue-of-Liberty-Island-New-York-Bay.webp
/images/travel_images/ko-phi-phi-tailandia__1280x720.jpg
/images/travel_images/beautiful-tropical-maldives-island-scene-blue-sea-blue-sky-holiday-vacation-vertical-background-wooden-pathway-pier-amazing-summer-travel-concept-ocean-bay-palm-trees-sandy-beach-exotic-nature-photo.jpg
/images/travel_images/cuento-viajes-pareja_52683-102408.avif
/images/travel_images/vista-desde-la-ria.jpg
/images/travel_images/7-of-the-best-apps-for-travel-photography-jpg_header-136404-1.jpeg
/images/travel_images/gettyimages-2271604618-612x612.jpg
/images/travel_images/1%20(2)__0.webp
```

Nota: el archivo `1 (2)__0.webp` se referencia con espacio escapado como `%20` para evitar problemas en URL.

## Variables CSS reutilizadas

La feature reutiliza variables globales existentes en `src/styles/styles.css`.

Variables principales:

```txt
var(--color-primario)
var(--color-primario-oscuro)
var(--color-primario-claro)
var(--color-acento)
var(--color-fondo)
var(--color-superficie)
var(--color-texto)
var(--color-texto-secundario)
var(--radio-medio)
var(--radio-grande)
var(--radio-pill)
var(--sombra-media)
var(--sombra-fuerte)
var(--max-ancho)
```

## Convenciones CSS

La hoja específica de la landing está aislada en:

```txt
src/styles/landing.css
```

Convenciones aplicadas:

- Todas las clases usan prefijo `landing-`.
- No se usan clases genéricas como `.card`, `.button`, `.container`, `.title` o `.section`.
- No se añaden estilos globales sobre etiquetas como `h1`, `p`, `button`, `section`, `main` o `a`.
- El diseño es mobile-first.
- Se incluyen media queries para tablet y desktop.
- Se incluyen comentarios por bloques.

## Accesibilidad

Medidas incluidas:

- `aria-labelledby` en secciones principales.
- `aria-hidden="true"` en imágenes decorativas.
- `alt=""` en imágenes decorativas.
- `aria-label` en el botón flotante.
- Estados `focus-visible` en el botón flotante.
- Uso de `useReducedMotion` para reducir animaciones controladas con Motion.
- Soporte CSS para `prefers-reduced-motion`.

## Responsive

Breakpoints usados:

```css
@media (min-width: 640px)
@media (min-width: 960px)
```

Comportamiento:

- Mobile: una columna, imágenes apiladas y cards verticales.
- Tablet: grids de dos columnas y galería alterna.
- Desktop: hero en dos columnas, cards en tres columnas, info en cuatro columnas y pasos con imagen + contenido.

## Animaciones

Motion for React:

- `initial`
- `animate`
- `whileInView`
- `whileHover`
- `whileTap`
- `viewport`
- `transition`

CSS:

- `landing-float`
- `landing-soft-glow`
- Transiciones de sombra, saturación, contraste y escala.

## Verificación técnica

Comandos ejecutados:

```bash
npm run build
npm run lint
```

Resultado:

```txt
build OK
lint OK
```

Durante el build siguen apareciendo avisos heredados de estilos globales por imágenes no resueltas:

```txt
/images/hero/img-hero.jpg
../images/logo/logo_signatour.png
```

Estos avisos no pertenecen a la nueva implementación de `landing.css`.

## Verificación visual recomendada

Levantar el servidor:

```bash
npm run dev
```

Revisar:

- El hero debe mostrar texto + collage de imágenes.
- Las imágenes deben animarse al cargar.
- Las cards deben elevarse y hacer zoom de imagen en hover.
- La galería visual debe aparecer durante el scroll.
- Los pasos deben mostrar imagen y contenido.
- El botón flotante debe aparecer abajo a la derecha y volver al inicio.
- En mobile no debe haber overflow horizontal.
- En desktop debe verse una composición amplia y respirada.

## Pendientes recomendados

- Actualizar el header para que tenga enlaces reales, especialmente hacia `/dashboard`.
- Resolver los avisos de imágenes heredadas en estilos globales.
- Revisar textos finales de producto antes de entrega.
- Confirmar derechos/licencia de las imágenes incluidas en `public/images/travel_images/`.
