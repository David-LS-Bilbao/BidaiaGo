import { useState, useMemo, useEffect } from 'react';
import '../styles/home.css';
import { getAllCountries, type RestCountry } from '../services/countriesApi';

// ─── Tipo interno de la UI ────────────────────────────────────────────────────

interface Destination {
  id: string;
  name: string;
  officialName: string;
  capital: string;
  region: string;
  subregion: string;
  population: string;
  imageUrl: string;
  flagUrl: string;
  featured: boolean;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

// Lista fija de países que aparecen en el carrusel
const FEATURED_CCA3 = new Set([
  'JPN', 'FRA', 'BRA', 'MAR', 'ITA', 'AUS', 'CAN', 'MEX',
]);

const REGION_OPTIONS: Array<{ value: string; label: string }> = [
  { value: '', label: 'Todas las regiones' },
  { value: 'Africa', label: 'África' },
  { value: 'Americas', label: 'América' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europa' },
  { value: 'Oceania', label: 'Oceanía' },
  { value: 'Antarctic', label: 'Antártida' },
];

// Mapeo de valores de la API a etiquetas en español para la UI
const REGION_LABELS: Record<string, string> = {
  Africa: 'África',
  Americas: 'América',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
  Antarctic: 'Antártida',
};

const numberFormatter = new Intl.NumberFormat('es-ES');

// ─── Transformación API → UI ──────────────────────────────────────────────────

function mapToDestination(country: RestCountry): Destination {
  return {
    id: country.cca3,
    name: country.name.common,
    officialName: country.name.official,
    capital: country.capital?.[0] ?? 'Sin capital',
    region: country.region,
    subregion: country.subregion ?? 'Sin subregión',
    population: numberFormatter.format(country.population),
    imageUrl: `https://picsum.photos/seed/${country.cca3}/800/450`,
    flagUrl: country.flags.svg || country.flags.png,
    featured: FEATURED_CCA3.has(country.cca3),
  };
}

// ─── Componente ───────────────────────────────────────────────────────────────

function HomePage() {
  const [countries, setCountries] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllCountries();
        if (!cancelled) {
          const destinations = data
            .map(mapToDestination)
            .sort((a, b) => a.name.localeCompare(b.name, 'es'));
          setCountries(destinations);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Error desconocido al cargar los destinos',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCountries();

    // Cancela el efecto anterior si retryKey cambia o el componente desmonta
    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  const featured = useMemo(
    () => countries.filter((d) => d.featured),
    [countries],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return countries.filter((d) => {
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.officialName.toLowerCase().includes(q) ||
        d.capital.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q);
      const matchRegion = !region || d.region === region;
      return matchSearch && matchRegion;
    });
  }, [countries, search, region]);

  // ── Estado: cargando ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="home-page">
        <div
          className="home-loading"
          role="status"
          aria-label="Cargando destinos"
        >
          <div className="home-loading-spinner" aria-hidden="true" />
          <span>Cargando destinos…</span>
        </div>
      </main>
    );
  }

  // ── Estado: error ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <main className="home-page">
        <div className="home-error" role="alert">
          <h2 className="home-error-title">
            No se pudieron cargar los destinos
          </h2>
          <p className="home-error-message">{error}</p>
          <button
            className="home-error-retry"
            type="button"
            onClick={() => setRetryKey((k) => k + 1)}
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  // ── Render principal ────────────────────────────────────────────────────────
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
            {REGION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
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
              <span className="home-carousel-card-sub">
                {REGION_LABELS[dest.region] ?? dest.region}
              </span>
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
          {(search || region) && (
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
              {search
                ? `No encontramos destinos para «${search}»${region ? ` en ${REGION_LABELS[region] ?? region}` : ''}.`
                : 'No hay destinos en la región seleccionada.'}{' '}
              Prueba con otro término o cambia los filtros.
            </p>
          </div>
        ) : (
          <div className="home-grid">
            {filtered.map((dest) => (
              <article key={dest.id} className="home-card">
                {/* Favorito — overlay esquina superior izquierda */}
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
                      Región: {REGION_LABELS[dest.region] ?? dest.region}
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
