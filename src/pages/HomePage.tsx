import { useState, useMemo } from 'react';
import '../styles/home.css';

interface MockDestination {
  id: string;
  name: string;
  capital: string;
  region: string;
  population: string;
  imageUrl: string;
  flagUrl: string;
  featured?: boolean;
}

const MOCK_DESTINATIONS: MockDestination[] = [
  {
    id: 'jp',
    name: 'Japón',
    capital: 'Tokio',
    region: 'Asia',
    population: '125.7 M',
    imageUrl: 'https://picsum.photos/seed/japan-temple/800/450',
    flagUrl: 'https://flagcdn.com/jp.svg',
    featured: true,
  },
  {
    id: 'fr',
    name: 'Francia',
    capital: 'París',
    region: 'Europa',
    population: '67.4 M',
    imageUrl: 'https://picsum.photos/seed/paris-tower/800/450',
    flagUrl: 'https://flagcdn.com/fr.svg',
    featured: true,
  },
  {
    id: 'br',
    name: 'Brasil',
    capital: 'Brasília',
    region: 'América del Sur',
    population: '215.3 M',
    imageUrl: 'https://picsum.photos/seed/brazil-nature/800/450',
    flagUrl: 'https://flagcdn.com/br.svg',
    featured: true,
  },
  {
    id: 'ma',
    name: 'Marruecos',
    capital: 'Rabat',
    region: 'África',
    population: '37.5 M',
    imageUrl: 'https://picsum.photos/seed/morocco-desert/800/450',
    flagUrl: 'https://flagcdn.com/ma.svg',
    featured: true,
  },
  {
    id: 'it',
    name: 'Italia',
    capital: 'Roma',
    region: 'Europa',
    population: '59.5 M',
    imageUrl: 'https://picsum.photos/seed/italy-colosseum/800/450',
    flagUrl: 'https://flagcdn.com/it.svg',
  },
  {
    id: 'au',
    name: 'Australia',
    capital: 'Canberra',
    region: 'Oceanía',
    population: '26.1 M',
    imageUrl: 'https://picsum.photos/seed/australia-reef/800/450',
    flagUrl: 'https://flagcdn.com/au.svg',
  },
  {
    id: 'ca',
    name: 'Canadá',
    capital: 'Ottawa',
    region: 'América del Norte',
    population: '38.2 M',
    imageUrl: 'https://picsum.photos/seed/canada-forest/800/450',
    flagUrl: 'https://flagcdn.com/ca.svg',
  },
  {
    id: 'nz',
    name: 'Nueva Zelanda',
    capital: 'Wellington',
    region: 'Oceanía',
    population: '5.1 M',
    imageUrl: 'https://picsum.photos/seed/newzealand-fjord/800/450',
    flagUrl: 'https://flagcdn.com/nz.svg',
  },
  {
    id: 'co',
    name: 'Colombia',
    capital: 'Bogotá',
    region: 'América del Sur',
    population: '51.9 M',
    imageUrl: 'https://picsum.photos/seed/colombia-coffee/800/450',
    flagUrl: 'https://flagcdn.com/co.svg',
  },
  {
    id: 'eg',
    name: 'Egipto',
    capital: 'El Cairo',
    region: 'África',
    population: '104.2 M',
    imageUrl: 'https://picsum.photos/seed/egypt-pyramids/800/450',
    flagUrl: 'https://flagcdn.com/eg.svg',
  },
  {
    id: 'mx',
    name: 'México',
    capital: 'Ciudad de México',
    region: 'América del Norte',
    population: '128.9 M',
    imageUrl: 'https://picsum.photos/seed/mexico-ruins/800/450',
    flagUrl: 'https://flagcdn.com/mx.svg',
  },
  {
    id: 'th',
    name: 'Tailandia',
    capital: 'Bangkok',
    region: 'Asia',
    population: '71.8 M',
    imageUrl: 'https://picsum.photos/seed/thailand-temples/800/450',
    flagUrl: 'https://flagcdn.com/th.svg',
  },
];

const REGIONS = [
  'Todas las regiones',
  'África',
  'América del Norte',
  'América del Sur',
  'Asia',
  'Europa',
  'Oceanía',
];

function HomePage() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('Todas las regiones');

  const featured = useMemo(
    () => MOCK_DESTINATIONS.filter((d) => d.featured),
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return MOCK_DESTINATIONS.filter((d) => {
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.capital.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q);
      const matchRegion =
        region === 'Todas las regiones' || d.region === region;
      return matchSearch && matchRegion;
    });
  }, [search, region]);

  return (
    <main className="home-page">
      {/* Cabecera del dashboard */}
      <header className="home-header">
        <div>
          <h1 className="home-title">Explorar destinos</h1>
          <p className="home-description">
            Descubre países, culturas y aventuras. Guarda tus favoritos y
            planifica tu próximo viaje.
          </p>
        </div>
      </header>

      {/* Buscador + filtro de región */}
      <div className="home-controls">
        <label className="home-search" aria-label="Buscar destino">
          <svg
            className="home-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="País, capital o región…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <div className="home-filter">
          <svg
            className="home-filter-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M3 6h18M7 12h10M11 18h2" />
          </svg>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            aria-label="Filtrar por región"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Carrusel — destinos destacados */}
      <section
        className="home-carousel-section"
        aria-labelledby="home-featured-title"
      >
        <div className="home-carousel-header">
          <h2 className="home-carousel-title" id="home-featured-title">
            Destinos destacados
          </h2>
        </div>

        <div className="home-carousel" role="list">
          {featured.map((dest) => (
            <a
              key={dest.id}
              className="home-carousel-card"
              href={`/destinations/${dest.id}`}
              role="listitem"
              style={{ backgroundImage: `url(${dest.imageUrl})` }}
              aria-label={`Ver ${dest.name}`}
            >
              <span className="home-carousel-card-label">{dest.name}</span>
              <span className="home-carousel-card-sub">{dest.region}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Grid — todos los destinos */}
      <section
        className="home-grid-section"
        aria-labelledby="home-grid-title"
      >
        <div className="home-grid-header">
          <h2 className="home-grid-title" id="home-grid-title">
            Todos los destinos
          </h2>
          {filtered.length !== MOCK_DESTINATIONS.length && (
            <span className="home-grid-count" aria-live="polite">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="home-empty" role="status">
            <span className="home-empty-icon">🗺️</span>
            <h3 className="home-empty-title">Sin resultados</h3>
            <p className="home-empty-message">
              No encontramos destinos para «{search}». Prueba con otro nombre
              o cambia la región.
            </p>
          </div>
        ) : (
          <div className="home-grid">
            {filtered.map((dest) => (
              <article key={dest.id} className="home-card">
                {/* Botón favorito — overlay esquina superior izquierda */}
                <button
                  className="home-card-favorite"
                  type="button"
                  aria-label={`Añadir ${dest.name} a favoritos`}
                >
                  ☆
                </button>

                {/* Imagen turística + bandera badge */}
                <div className="home-card-image-area">
                  <img
                    className="home-card-image"
                    src={dest.imageUrl}
                    alt={`Imagen turística de ${dest.name}`}
                    loading="lazy"
                  />
                  <img
                    className="home-card-flag-badge"
                    src={dest.flagUrl}
                    alt={`Bandera de ${dest.name}`}
                  />
                </div>

                {/* Datos del país */}
                <div className="home-card-content">
                  <h3 className="home-card-title">{dest.name}</h3>

                  <div className="home-card-meta">
                    <span className="home-card-meta-item">
                      Capital: {dest.capital}
                    </span>
                    <span className="home-card-meta-item">
                      Región: {dest.region}
                    </span>
                    <span className="home-card-meta-item">
                      Población: {dest.population}
                    </span>
                  </div>

                  <div className="home-card-actions">
                    <a
                      className="home-card-link"
                      href={`/destinations/${dest.id}`}
                    >
                      Ver detalle
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;
