# BidaiaGo - Resumen del Proyecto

## Descripcion del Proyecto

**BidaiaGo** es una aplicacion web de planificar viajes desarrollada con React, TypeScript y Vite. El proyecto esta orientado a ayudar a los usuarios a planificar sus viajes ofreciendo informacion sobre destinos, paises, clima y recomendaciones de seguridad.

## Tecnologias Utilizadas

| Tecnologia | Version | Descripcion |
|------------|---------|-------------|
| React | 19.2.5 | Framework principal |
| TypeScript | 6.0.3 | Tipado estatico |
| Vite | 8.0.10 | Build tool y servidor de desarrollo |
| React Router DOM | 7.15.0 | Enrutamiento de paginas |
| Framer Motion | 12.38.0 | Animaciones |
| Axios | 1.16.0 | Peticiones HTTP |

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.tsx       # Navegacion principal
│   └── Footer.tsx        # Pie de pagina
├── pages/
│   ├── HomePage.tsx      # Pagina de inicio
│   ├── DestinationDetailPage.tsx
│   ├── TripListPage.tsx
│   ├── AboutPage.tsx
│   └── tipsviajesPage.tsx # Busqueda de paises con clima y seguridad
├── services/
│   ├── tipsApi.ts        # API de informacion de paises, clima y seguridad
│   └── countriesApi.ts   # (En desarrollo)
├── styles/
│   ├── styles.css       # Estilos globales
│   ├── components.css   # Estilos de componentes
│   └── pages.css        # Estilos de paginas
├── hooks/
│   └── useLocalStorage.ts
├── models/
│   └── TavelDestination.ts
├── App.tsx              # Componente principal con rutas
└── main.tsx            # Punto de entrada
```

## Funcionalidades Implementadas

### 1. Pagina Tips Viajes (`/tipsviajes`)

**Caracteristicas:**
- Busqueda de paises por nombre
- Muestra informacion del pais:
  - Bandera
  - Nombre oficial y comun
  - Region y subregion
  - Capital
  - Poblacion
  - Area (km2)
  - Zona horaria
  - Lado de conduccion
  - Idiomas
  - Moneda
- Clima actual de la capital:
  - Temperatura
  - Condicion del tiempo (texto)
  - Humedad
  - Velocidad del viento
- Recomendaciones de seguridad (dinamicas por pais/region):
  - Seguridad general de la region
  - Advertencias especificas por pais
  - Recomendaciones de salud
  - Recomendaciones de documentacion

### 2. Navegacion

- Header con enlace a "Tips Viajes" (`/tipsviajes`)
- Footer basico
- Rutas configuradas con React Router DOM

### 3. Estilos

- Diseño responsive (mobile-first)
- Paleta de colores basada en verde (inspirado en Komoot)
- Variables CSS para temas y colores
- Clases para accesibilidad (WCAG AA)

## APIs Externas Utilizadas

| API                        | URL                                      | Uso                  |
|----------------------------|------------------------------------------|----------------------|
| Rest Countries             | `https://restcountries.com/v3.1`         | Informacion de paises |
| Open-Meteo                 | `https://api.open-meteo.com/v1`          | Clima actual |
| Geocoding API (Open-Meteo) | `https://geocoding-api.open-meteo.io/v1` | Busqueda de coordenadas  |                 

## Comandos Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para produccion
npm run lint     # Verificar codigo
npm run preview # Previsualizar build de produccion
```

## Estado Actual

- **Build**: OK - El proyecto compila correctamente
- **Rutas**: Solo implementadas `/` y `/tipsviajes`
- **Paginas**: HomePage, DestinationDetailPage, TripListPage, AboutPage existen pero no conectadas

## Pendientes / Siguientes Pasos

- Conectar las demas paginas (Home, Destinos, Mi viaje, About)
- Implementar autenticacion si es necesario
- Agregar mas funcionalidades de itinerarios
- Mejorar estilos de las tarjetas de ciudades
- Agregar imagenes para iconos de clima

## Paleta de Colores

- Primario: `#4f6814` (verde)
- Primario Oscuro: `#404823`
- Primario Claro: `#d8f3dc`
- Acento: `#e85d2a`
- Fondo: `#fafaf7`
- Superficie: `#ffffff`

---

*Ultima actualizacion: Mayo 2026*