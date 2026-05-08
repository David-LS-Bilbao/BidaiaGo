# Inicio de feature: Landing Page

## Proyecto

**BidaiaGo**  
Aplicación web React + TypeScript para explorar países como posibles destinos de viaje.

## Rama de trabajo

```txt
feat/landing-page
```

## Rama base

```txt
feat/commons
```

## Contexto de la feature

El equipo ha decidido trabajar usando `feat/commons` como rama común de integración previa, para no manchar directamente `dev`.

Cada feature individual se creará desde `feat/commons` y después se integrará mediante Pull Request hacia esa misma rama común.

Flujo previsto:

```txt
feat/landing-page → Pull Request → feat/commons
feat/dashboard     → Pull Request → feat/commons
feat/commons       → Pull Request → dev
dev                → Pull Request final → main
```

Esta feature corresponde a la creación de la página inicial de presentación de la aplicación.

---

## Objetivo de la feature

Crear una **landing page visual, dinámica y con scroll** que presente la aplicación BidaiaGo antes de acceder al dashboard principal.

La landing debe explicar de forma clara:

- Qué es BidaiaGo.
- Qué puede hacer el usuario.
- Cómo funciona la aplicación.
- Qué tipo de información se podrá consultar.
- Cómo acceder al dashboard funcional.

---

## Alcance de esta feature

Esta feature se centra únicamente en la página inicial `/`.

No se implementará todavía la lógica principal de búsqueda ni el listado real de países, ya que esa parte corresponde a la feature del dashboard.

La landing debe funcionar como una pantalla de bienvenida y presentación del producto.

---

## Ruta principal

```txt
/ → LandingPage
```

El botón principal de la landing debe llevar al usuario a:

```txt
/dashboard
```

---

## Relación con el dashboard

La landing y el dashboard son features separadas.

La landing tiene una función de presentación:

```txt
Landing → explicar el producto y llevar al usuario al dashboard
```

El dashboard tendrá la funcionalidad principal:

```txt
Dashboard → listado de destinos, buscador, filtro por región y grid de cards
```

La landing no debe implementar la lógica del dashboard.

---

## Contenido previsto de la landing

La página se dividirá en varias secciones verticales con scroll.

---

### 1. Hero

Primera sección visible al entrar en la web.

Debe incluir:

- Nombre de la aplicación: **BidaiaGo**.
- Frase breve de presentación.
- Botón principal para acceder al dashboard.
- Diseño visual atractivo relacionado con viajes, países o exploración.

Ejemplo de mensaje:

```txt
Descubre países del mundo como posibles destinos de viaje.
```

Ideas visuales:

- Imagen o icono relacionado con viajes.
- Fondo con degradado.
- Texto grande y claro.
- Botón principal visible.
- Sensación de app moderna y sencilla.

---

### 2. Qué es BidaiaGo

Sección explicativa breve.

Debe transmitir que BidaiaGo es una app para explorar países y usarlos como inspiración para planificar viajes.

Ideas clave:

- Explorar destinos.
- Consultar información útil.
- Guardar países favoritos.
- Preparar una lista personal de viaje.

Texto orientativo:

```txt
BidaiaGo es una aplicación web para descubrir países, consultar información útil y guardar posibles destinos para futuros viajes.
```

---

### 3. Qué puedes hacer

Sección con tarjetas o bloques visuales.

Funcionalidades previstas:

- Buscar destinos por nombre.
- Filtrar países por región.
- Ver información básica de cada país.
- Consultar detalles ampliados.
- Guardar destinos en una lista personal.
- Consultar estadísticas simples.

Posibles tarjetas:

```txt
Explora países
Busca destinos por nombre y descubre información básica de cada país.

Filtra por región
Organiza los destinos por continente o región geográfica.

Guarda tu viaje
Añade países a una lista personal usando localStorage.

Consulta estadísticas
Visualiza un resumen sencillo de tus destinos guardados.
```

---

### 4. Cómo funciona

Sección tipo pasos.

Flujo previsto:

1. Entra al dashboard.
2. Busca o filtra un país.
3. Consulta su información.
4. Abre el detalle del destino.
5. Guarda países en tu lista de viaje.
6. Consulta un resumen de tus destinos guardados.

Texto orientativo:

```txt
BidaiaGo funciona de forma sencilla: exploras destinos, consultas información útil y guardas los países que más te interesan.
```

---

### 5. Información que se podrá consultar

La aplicación usará la API pública REST Countries:

```txt
https://restcountries.com/
```

La información prevista incluye:

- Nombre del país.
- Nombre oficial.
- Capital.
- Región.
- Subregión.
- Población.
- Área.
- Idiomas.
- Monedas.
- Bandera.
- Mapa.
- Continente.
- Zonas horarias.

Esta información se mostrará principalmente en el dashboard y en la pantalla de detalle.

---

### 6. Llamada final a la acción

Última sección de cierre.

Debe animar al usuario a entrar en la parte funcional de la aplicación.

Botón recomendado:

```txt
Entrar al dashboard
```

Texto orientativo:

```txt
¿Listo para descubrir tu próximo destino?
```

---

## Estilo visual previsto

La landing debe tener un estilo moderno, claro y visual.

Ideas de diseño:

- Secciones a pantalla completa o casi completa.
- Scroll vertical suave.
- Colores relacionados con viaje, cielo, mapa, mar o exploración.
- Tarjetas con bordes redondeados.
- Botones visibles y claros.
- Diseño responsive para móvil y escritorio.
- Jerarquía visual clara: título, subtítulo, contenido y acción.

---

## Animaciones previstas

Se priorizarán animaciones sencillas con CSS.

Animaciones posibles:

- Aparición suave de secciones.
- Movimiento vertical ligero al hacer scroll.
- Efecto hover en tarjetas.
- Efecto hover en botones.
- Transiciones suaves.
- Scroll suave entre secciones.

No se añadirá una librería de animaciones salvo que el equipo lo decida más adelante.

Motivo:

- Mantener el MVP simple.
- Evitar dependencias innecesarias.
- Facilitar la explicación técnica.
- Reducir posibles conflictos con otras ramas.

---

## Archivos previstos

Archivos que probablemente se tocarán:

```txt
src/pages/LandingPage.tsx
src/styles/landing.css
```

Archivos que solo se tocarán si es necesario para la navegación:

```txt
src/App.tsx
src/components/Header.tsx
```

Si el router aún no está configurado en la base común, puede ser necesario coordinar con el equipo una pequeña corrección común en `feat/commons`.

---

## Restricciones

Esta feature no debe implementar:

- Consumo real de la API REST Countries.
- Buscador funcional.
- Filtros funcionales.
- Grid real de cards.
- LocalStorage.
- Backend.
- Login.
- Reservas de viajes.
- Hoteles.
- Vuelos.
- Pagos.

Esas funcionalidades pertenecen a otras features.

---

## Dependencias con otras features

La landing depende únicamente de que exista la ruta:

```txt
/dashboard
```

La landing no necesita conocer la lógica interna del dashboard.

Solo debe enlazar correctamente hacia esa ruta.

Cuando se integren las features en `feat/commons`, deberá comprobarse que:

- `/` muestra la landing.
- `/dashboard` muestra la pantalla funcional.
- El botón de la landing navega correctamente al dashboard.
- Los estilos de landing no rompen el dashboard.

---

## Criterios de aceptación

La feature se considerará terminada cuando:

- La ruta `/` muestre una landing clara y visual.
- La página tenga varias secciones con scroll.
- El usuario entienda qué es BidaiaGo.
- El usuario entienda qué puede hacer en la aplicación.
- Exista un botón visible para acceder a `/dashboard`.
- La landing sea responsive de forma básica.
- Las animaciones no dificulten la lectura.
- No haya errores visibles en consola.
- El proyecto compile correctamente.
- La feature no incluya lógica propia del dashboard.

---

## Checklist de verificación

Antes de abrir el Pull Request:

```txt
[ ] Estoy trabajando en feat/landing-page
[ ] La rama sale desde feat/commons
[ ] La landing carga en /
[ ] El botón principal lleva a /dashboard
[ ] La landing tiene sección Hero
[ ] La landing explica qué es BidaiaGo
[ ] La landing explica qué puede hacer el usuario
[ ] La landing explica cómo funciona la app
[ ] Existe una llamada final a la acción
[ ] El diseño se ve correctamente en escritorio
[ ] El diseño se ve aceptable en móvil
[ ] Las animaciones son suaves y no molestan
[ ] No hay errores en consola
[ ] No se ha implementado lógica propia del dashboard
[ ] No se han tocado archivos de otras features sin necesidad
[ ] npm run build funciona
```

---

## Errores típicos a evitar

### Mezclar landing y dashboard

La landing solo presenta la aplicación.  
El dashboard será otra feature separada.

### Añadir demasiadas animaciones

Las animaciones deben mejorar la experiencia, no distraer.

### Romper estilos globales

Usar clases específicas para la landing y evitar modificar estilos globales de forma agresiva.

Ejemplos de clases recomendadas:

```txt
landing
landing-hero
landing-section
landing-card
landing-cta
landing-button
```

### Usar rutas incorrectas

El botón de entrada debe apuntar siempre a:

```txt
/dashboard
```

### Añadir lógica innecesaria

No consumir la API ni usar localStorage en esta feature.

### Tocar demasiados archivos comunes

Si es necesario tocar `App.tsx` o navegación, hacerlo de forma mínima y justificarlo en el PR.

---

## Flujo Git de esta feature

Crear la rama desde `feat/commons`:

```bash
git checkout feat/commons
git pull origin feat/commons
git checkout -b feat/landing-page
```

Subir la rama al remoto:

```bash
git push -u origin feat/landing-page
```

Cuando esté lista, abrir Pull Request hacia:

```txt
feat/commons
```

No abrir PR directamente hacia `dev`.

---

## Commits recomendados

Commits pequeños y claros:

```bash
git add .
git commit -m "docs: add landing page feature plan"
```

Después, para la implementación:

```bash
git add .
git commit -m "feat: add landing page structure"
```

```bash
git add .
git commit -m "style: add landing page responsive styles"
```

```bash
git add .
git commit -m "style: add landing page animations"
```

---

## Pull Request previsto

Título recomendado:

```txt
feat: add landing page
```

Descripción breve del PR:

```txt
## Resumen

Se añade la landing page inicial de BidaiaGo como pantalla de presentación de la aplicación.

## Cambios principales

- Se crea la estructura visual de la landing.
- Se añaden secciones informativas sobre la app.
- Se añade botón de acceso al dashboard.
- Se incorporan estilos responsive y animaciones suaves.

## Comprobaciones

[ ] La ruta / carga correctamente.
[ ] El botón navega a /dashboard.
[ ] No hay errores en consola.
[ ] npm run build funciona.
```

---

## Resultado esperado

Al finalizar esta feature, BidaiaGo tendrá una página inicial atractiva que servirá como presentación del producto y punto de entrada hacia el dashboard funcional.

La landing permitirá que el usuario entienda rápidamente:

- Qué es BidaiaGo.
- Para qué sirve.
- Qué puede hacer.
- Cómo empezar a usarla.
