BidaiaGo 🌍✈️

BidaiaGo es una aplicación web desarrollada con React + TypeScript + Vite orientada a la exploración de destinos de viaje accesibles e informativos.

La aplicación permite buscar países, consultar información útil sobre ellos, visualizar clima y recomendaciones de viaje, y guardar destinos favoritos para preparar futuros viajes de forma sencilla y visual.

✨ Características principales
🔎 Búsqueda de países por nombre
🌎 Información detallada de cada destino:

Bandera
Nombre oficial y común
Región y subregión
Capital
Población
Área
Zona horaria
Idiomas
Moneda

🌤️ Clima actual de la capital
⚠️ Recomendaciones de seguridad y salud
❤️ Lista de favoritos usando localStorage
📱 Diseño responsive mobile-first
♿ Accesibilidad WCAG AA
🎨 Sistema de diseño basado en variables CSS reutilizables
⚡ Navegación SPA con React Router
🎞️ Animaciones con Framer Motion

Parte de estas funcionalidades ya están implementadas y otras están en desarrollo.

🛠️ Tecnologías utilizadas
Tecnología	Uso
React 19	Interfaz de usuario
TypeScript	Tipado estático
Vite	Build tool y desarrollo
React Router	Navegación SPA
Framer Motion	Animaciones
Axios / Fetch	Consumo de APIs
CSS	Estilos y accesibilidad

Tecnologías documentadas en el proyecto:

🌐 APIs utilizadas
API	Uso
Rest Countries API	Información de países
Open-Meteo API	Clima actual
Open-Meteo Geocoding API	Coordenadas de capitales

📁 Estructura del proyecto 
```text
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
│
├── pages/
│   ├── HomePage.tsx
│   ├── DestinationDetailPage.tsx
│   ├── TripListPage.tsx
│   ├── AboutPage.tsx
│   └── TipsViajesPage.tsx
│
├── services/
│   ├── tipsApi.ts
│   └── countriesApi.ts
│
├── hooks/
│   └── useLocalStorage.ts
│
├── models/
│   └── TravelDestination.ts
│
├── styles/
│   ├── styles.css
│   ├── components.css
│   ├── pages.css
│   └── DestinationDetail.css
│
├── App.tsx
└── main.tsx
```

Basado en la estructura definida en el proyecto.

🎨 Sistema de estilos

El proyecto sigue una arquitectura CSS por features:

styles.css contiene:
variables globales
reset
layout común
accesibilidad
header/footer
Cada página tiene su CSS específico:
DestinationDetail.css
pages.css
etc.

Esto evita conflictos entre ramas y mejora el mantenimiento del proyecto.

Características visuales
Diseño mobile-first
Inspiración visual en Komoot
Paleta verde accesible
Variables CSS reutilizables
Contrastes WCAG AA
Preferencias de reducción de movimiento (prefers-reduced-motion)
♿ Accesibilidad

La aplicación incorpora varias medidas de accesibilidad:

Contrastes WCAG AA
Focus visibles
Tamaños mínimos táctiles
Navegación por teclado
skip-link
Soporte para reducción de movimiento
Responsive accesible

Parte implementada directamente en styles.css.

🚀 Instalación y ejecución
1. Clonar el repositorio
git clone <url-del-repo>
2. Entrar en la carpeta
cd bidaiago
3. Instalar dependencias
npm install
4. Ejecutar el entorno de desarrollo
npm run dev

La aplicación estará disponible normalmente en:

http://localhost:5173

📝 Notas de desarrollo

Durante el desarrollo puede aparecer en la consola del navegador este mensaje:

```text
Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
```

Este aviso suele venir de extensiones del navegador que usan mensajería interna, no del código de BidaiaGo. Para confirmarlo, abrir la app en una ventana de incógnito sin extensiones o probar en otro navegador.

Correcciones MVP recientes en destinos:

- La página de detalle de destino invalida peticiones antiguas para evitar que una respuesta lenta sobrescriba la búsqueda más reciente.
- Se limpian los temporizadores usados para mostrar resultados, evitando actualizaciones de estado obsoletas.
- La subregión del país se trata como dato opcional, porque algunas respuestas de Rest Countries no la incluyen.
- La petición de geolocalización para el clima ya no intenta establecer la cabecera `User-Agent`, bloqueada por los navegadores.
- El buscador de destinos incluye etiqueta accesible para lectores de pantalla.

📦 Scripts disponibles
npm run dev       # Servidor desarrollo
npm run build     # Build producción
npm run preview   # Preview build
npm run lint      # Linter

🧠 Arquitectura del proyecto

El proyecto se organiza mediante:

Features separadas por páginas
Componentes reutilizables
Servicios para APIs
Hooks personalizados
Modelo común TravelDestination
Flujo Git basado en ramas feature

👥 Organización del trabajo

El proyecto está planteado para trabajo colaborativo:

main → rama estable
dev → integración
feat/* → desarrollo individual

Ejemplo:

feat/home-explore
feat/destination-detail
feat/trip-list
feat/stats-about-docs

📌 Estado actual

Implementado
Header y Footer
Página landing
Página Tips Viajes
Consumo APIs
Responsive
Sistema CSS global
Navegación básica
Accesibilidad base
En desarrollo
Sistema completo de favoritos
Más rutas
Estadísticas
Mejoras visuales
About completo


📚 Objetivos del proyecto

Este proyecto busca aplicar:

React moderno
TypeScript
Arquitectura SPA
Consumo de APIs
Hooks
Responsive Design
Accesibilidad
Trabajo colaborativo con Git
Organización por features
📄 Licencia

Proyecto educativo desarrollado para aprendizaje y práctica de desarrollo frontend moderno.

👨‍💻 Equipo

Proyecto desarrollado por el equipo de BidaiaGo.
