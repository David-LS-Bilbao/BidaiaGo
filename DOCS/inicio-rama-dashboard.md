# Inicio de feature: Dashboard / HomePage

## Proyecto

**BidaiaGo**  
Aplicación web React + TypeScript para explorar países como posibles destinos de viaje.

## Rama de trabajo

```txt
feat/dashboard
```

## Rama base

```txt
feat/commons
```

## Contexto de la feature

El equipo está trabajando con `feat/commons` como rama común de integración previa.

Cada feature individual se crea desde `feat/commons` y después se integra mediante Pull Request hacia esa misma rama común.

Flujo previsto:

```txt
feat/landing-page → Pull Request → feat/commons
feat/dashboard    → Pull Request → feat/commons
feat/commons      → Pull Request → dev
dev               → Pull Request final → main
```

Esta feature corresponde a la creación de la pantalla funcional principal de la aplicación: exploración de destinos.

---

## Decisión técnica importante

Por decisión de equipo, se reutiliza:

```txt
src/pages/HomePage.tsx
```

como pantalla funcional de exploración de destinos.

Motivo:

- Evitar renombrados innecesarios.
- Reducir conflictos de rutas e imports.
- Mantener el flujo actual de la rama común.
- Trabajar de forma pragmática para el MVP.

Aunque el archivo se llama `HomePage.tsx`, en esta feature actuará como el dashboard principal de la aplicación.

---

## CSS específico de la feature

Por coherencia con el nombre del componente, el CSS específico será:

```txt
src/styles/home.css
```

La página `HomePage.tsx` importará únicamente su CSS específico:

```ts
import "../styles/home.css";
```

No se debe importar `styles.css` dentro de `HomePage.tsx`, porque el CSS global ya se carga desde `main.tsx`.

---

## Objetivo de la feature

Crear la pantalla principal de exploración de destinos de BidaiaGo.

Esta pantalla debe permitir al usuario:

- Ver un listado de países/destinos.
- Buscar destinos por nombre.
- Filtrar destinos por región.
- Visualizar los resultados en un grid de cards.
- Ver estados de carga, error y sin resultados.
- Preparar la base para futuras acciones como ver detalle o guardar destinos.

---

## Ruta prevista

La pantalla se usará como dashboard funcional de la aplicación.

Ruta objetivo:

```txt
/dashboard → HomePage
```

La landing page quedará como portada:

```txt
/ → LandingPage
```

---

## Alcance de esta feature

Esta feature se centra en la pantalla de exploración de destinos.

Incluye:

- Estructura visual del dashboard.
- Consumo de REST Countries API.
- Transformación de datos básicos si es necesario.
- Buscador por nombre.
- Filtro por región.
- Grid de cards.
- Estados de carga y error.
- CSS específico de la pantalla.

No incluye:

- Backend.
- Login.
- Base de datos.
- Reservas.
- Hoteles.
- Vuelos.
- Pagos.
- Gestión avanzada de usuarios.

---

## API usada

La aplicación usará la API pública REST Countries:

```txt
https://restcountries.com/
```

Endpoint recomendado:

```txt
https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,region,subregion,population,area,languages,currencies,flags,maps,borders,continents,timezones,latlng
```

---

## Datos principales que se usarán

Información prevista para cada país:

- Nombre común.
- Nombre oficial.
- Código del país.
- Capital.
- Región.
- Subregión.
- Población.
- Área.
- Idiomas.
- Monedas.
- Bandera.
- URL de mapa.
- Continente.
- Zonas horarias.

---

## Modelo interno recomendado

Aunque la API devuelve datos en formato propio, las vistas deberían trabajar con un modelo interno sencillo.

Modelo conceptual:

```txt
TravelDestination
```

Campos previstos:

```txt
id
name
officialName
code
capital
region
subregion
population
area
languages
currencies
flag
flagAlt
mapUrl
borders
continents
timezones
latlng
```

---

## Archivos previstos

Archivos principales de esta feature:

```txt
src/pages/HomePage.tsx
src/styles/home.css
```

Archivos comunes que podrían usarse o completarse si son necesarios:

```txt
src/services/countriesApi.ts
src/types/api.ts
src/models/TravelDestination.ts
src/utils/countryMapper.ts
src/utils/formatters.ts
```

Importante: si se modifican archivos comunes, debe hacerse de forma mínima y documentada, porque pueden afectar a otras features.

---

## Componentes posibles

Si la pantalla crece, se podrán separar componentes propios.

Componentes candidatos:

```txt
src/components/SearchBar/
src/components/RegionFilter/
src/components/DestinationCard/
```

Para el MVP, se puede empezar con todo dentro de `HomePage.tsx` y extraer componentes después si hace falta.

---

## Estructura funcional prevista

La pantalla debería tener:

1. Encabezado de sección.
2. Texto breve explicando el dashboard.
3. Buscador por nombre.
4. Filtro por región.
5. Estado de carga.
6. Estado de error.
7. Estado sin resultados.
8. Grid de cards de destinos.

---

## Estados mínimos

La página debería manejar estos estados:

```txt
loading
error
countries
searchTerm
selectedRegion
filteredCountries
```

---

## Regiones recomendadas para el filtro

La API REST Countries usa regiones como:

```txt
Africa
Americas
Asia
Europe
Oceania
Antarctic
```

Opcionalmente, se puede incluir una opción inicial:

```txt
Todas las regiones
```

---

## CSS previsto

El archivo `home.css` debe contener solo estilos de esta pantalla.

Clases recomendadas:

```txt
home-page
home-header
home-title
home-description
home-controls
home-search
home-filter
home-grid
home-card
home-card-image
home-card-content
home-card-title
home-card-meta
home-loading
home-error
home-empty
```

Reglas:

- Usar prefijo `home-`.
- No usar clases genéricas como `.card`, `.button`, `.container`, `.title`.
- No aplicar estilos globales a `h1`, `p`, `button`, `section`, `main` o `a`.
- Reutilizar variables globales de `styles.css`.
- Mantener enfoque mobile-first.
- Añadir responsive básico.
- Mantener buena legibilidad y contraste.

---

## Variables globales reutilizables

Se pueden usar variables ya existentes:

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

---

## Criterios de aceptación

La feature se considerará terminada cuando:

- La ruta `/dashboard` muestre la pantalla de exploración.
- Se carguen países desde REST Countries.
- Se muestre estado de carga mientras llegan los datos.
- Se muestre un mensaje de error si falla la petición.
- El usuario pueda buscar por nombre de país.
- El usuario pueda filtrar por región.
- Los resultados se muestren en un grid de cards.
- El diseño sea responsive de forma básica.
- No haya errores en consola.
- `npm run build` funcione correctamente.
- `npm run lint` funcione correctamente, si el proyecto lo permite.

---

## Checklist de verificación

Antes de abrir el Pull Request:

```txt
[ ] Estoy trabajando en feat/dashboard
[ ] La rama sale desde feat/commons
[ ] La rama está actualizada con feat/commons
[ ] HomePage.tsx actúa como dashboard funcional
[ ] home.css existe y se importa desde HomePage.tsx
[ ] La pantalla carga datos desde REST Countries
[ ] Hay estado loading
[ ] Hay estado error
[ ] Hay buscador por nombre
[ ] Hay filtro por región
[ ] Hay grid de cards
[ ] No se ha tocado la landing
[ ] No se han tocado páginas de otras features sin necesidad
[ ] npm run build funciona
[ ] npm run lint funciona
```

---

## Errores típicos a evitar

### Mezclar dashboard con landing

La landing presenta el producto.  
El dashboard permite usar la aplicación.

### Tocar rutas sin necesidad

Si la ruta `/dashboard` ya apunta a `HomePage`, no cambiar rutas salvo que sea imprescindible.

### Usar directamente la respuesta cruda de la API en toda la UI

Mejor transformar los datos a un modelo interno simple antes de pintarlos.

### No controlar campos opcionales

La API puede devolver países sin capital, sin monedas o sin idiomas.

### Crear CSS global accidentalmente

El CSS de esta feature debe vivir en `home.css` y usar clases con prefijo `home-`.

### Hacer una pantalla demasiado grande

Prioridad MVP:

```txt
API + buscador + filtro + cards
```

---

## Flujo Git de esta feature

Crear o actualizar la rama desde `feat/commons`:

```bash
git checkout feat/dashboard
git fetch origin
git merge origin/feat/commons
```

Verificar:

```bash
npm install
npm run build
npm run lint
```

Subir cambios:

```bash
git push
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
git commit -m "docs: add dashboard feature plan"
```

```bash
git add src/pages/HomePage.tsx src/styles/home.css
git commit -m "feat: add destinations dashboard structure"
```

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: add countries API loading"
```

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: add search and region filter"
```

```bash
git add src/styles/home.css
git commit -m "style: add home dashboard responsive styles"
```

---

## Pull Request previsto

Título recomendado:

```txt
feat: add destinations dashboard
```

Descripción breve:

```txt
## Resumen

Se implementa la pantalla principal de exploración de destinos usando HomePage como dashboard funcional.

## Cambios principales

- Se reutiliza HomePage como pantalla de dashboard.
- Se añade consumo de REST Countries.
- Se añade buscador por nombre.
- Se añade filtro por región.
- Se muestra grid de cards.
- Se añade CSS específico home.css.

## Verificación

[ ] npm run build
[ ] npm run lint
[ ] /dashboard muestra la pantalla de exploración
[ ] Buscador y filtro funcionan
[ ] No se rompe la landing
```

---

## Resultado esperado

Al finalizar esta feature, BidaiaGo tendrá una pantalla funcional de exploración de destinos donde el usuario podrá consultar países, buscar por nombre y filtrar por región.

Esta pantalla será la base principal de uso de la aplicación antes de desarrollar detalle, lista de viaje y estadísticas.
