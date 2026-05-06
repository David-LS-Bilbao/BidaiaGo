import "../styles/home.css";

/**
 * Tipo temporal para pintar países de ejemplo.
 *
 * Más adelante este tipo se podrá sustituir por el modelo común
 * TravelDestination cuando conectemos REST Countries.
 */
type MockDestination = {
  id: string;
  name: string;
  capital: string;
  region: string;
  population: string;
  flagUrl: string;
  imageUrl: string;
};

/**
 * Datos mock temporales.
 *
 * Objetivo:
 * - Probar la estructura visual.
 * - Validar el carrusel.
 * - Validar el grid.
 *
 * Más adelante estos datos vendrán desde REST Countries API.
 */
const mockDestinations: MockDestination[] = [
  {
    id: "ESP",
    name: "España",
    capital: "Madrid",
    region: "Europe",
    population: "47,4 M",
    flagUrl: "https://flagcdn.com/w640/es.png",
    imageUrl:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "JPN",
    name: "Japón",
    capital: "Tokio",
    region: "Asia",
    population: "125,7 M",
    flagUrl: "https://flagcdn.com/w640/jp.png",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "BRA",
    name: "Brasil",
    capital: "Brasilia",
    region: "Americas",
    population: "203 M",
    flagUrl: "https://flagcdn.com/w640/br.png",
    imageUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "MAR",
    name: "Marruecos",
    capital: "Rabat",
    region: "Africa",
    population: "37 M",
    flagUrl: "https://flagcdn.com/w640/ma.png",
    imageUrl:
      "https://images.unsplash.com/photo-1539020140153-e8c237112e53?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "AUS",
    name: "Australia",
    capital: "Canberra",
    region: "Oceania",
    population: "26 M",
    flagUrl: "https://flagcdn.com/w640/au.png",
    imageUrl:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80",
  },
];

/**
 * HomePage
 *
 * Esta página se usa como dashboard funcional de BidaiaGo.
 *
 * Responsabilidad actual:
 * - Mostrar una base visual con datos mock.
 * - Pintar buscador y filtro de región.
 * - Mostrar carrusel de destinos destacados.
 * - Mostrar grid de cards.
 *
 * Próximo paso:
 * - Añadir estado React.
 * - Conectar con REST Countries.
 * - Filtrar por país/capital y región.
 */
function HomePage() {
  const featuredDestinations = mockDestinations.slice(0, 4);

  return (
    <section className="home-page" aria-labelledby="home-title">
      {/* CABECERA DEL DASHBOARD */}
      <header className="home-header">
        <div>
          <h1 id="home-title" className="home-title">
            Explorar destinos
          </h1>

          <p className="home-description">
            Busca países, compara información útil y descubre posibles destinos
            para tu próximo viaje.
          </p>
        </div>
      </header>

      {/* CONTROLES VISUALES: buscador + filtro */}
      <div className="home-controls" aria-label="Controles de búsqueda y filtrado">
        <label className="home-search" htmlFor="country-search">
          <span className="home-search-icon" aria-hidden="true">
            🔎
          </span>

          <input
            id="country-search"
            type="search"
            placeholder="Buscar por país o capital..."
            aria-label="Buscar por país o capital"
          />
        </label>

        <label className="home-filter" htmlFor="region-filter">
          <span className="home-filter-icon" aria-hidden="true">
            🌍
          </span>

          <select id="region-filter" aria-label="Filtrar por región">
            <option value="">Todas las regiones</option>
            <option value="Africa">África</option>
            <option value="Americas">América</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceanía</option>
          </select>
        </label>
      </div>

      {/* CARRUSEL DE DESTINOS DESTACADOS */}
      <section className="home-carousel-section" aria-labelledby="featured-title">
        <div className="home-carousel-header">
          <h2 id="featured-title" className="home-carousel-title">
            Destinos destacados
          </h2>
        </div>

        <div className="home-carousel" aria-label="Carrusel de países destacados">
          {featuredDestinations.map((destination) => (
            <article
              key={destination.id}
              className="home-carousel-card"
              style={{ backgroundImage: `url(${destination.imageUrl})` }}
            >
              <h3 className="home-carousel-card-label">{destination.name}</h3>
              <p className="home-carousel-card-sub">
                {destination.capital} · {destination.region}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* GRID DE TODOS LOS DESTINOS */}
      <section className="home-grid-section" aria-labelledby="grid-title">
        <div className="home-grid-header">
          <h2 id="grid-title" className="home-grid-title">
            Todos los destinos
          </h2>
        </div>

        <div className="home-grid">
          {mockDestinations.map((destination) => (
            <article key={destination.id} className="home-card">
              <img
                className="home-card-flag"
                src={destination.flagUrl}
                alt={`Bandera de ${destination.name}`}
              />

              <div className="home-card-content">
                <h3 className="home-card-title">{destination.name}</h3>

                <div className="home-card-meta">
                  <span className="home-card-meta-item">
                    Capital: {destination.capital}
                  </span>

                  <span className="home-card-meta-item">
                    Región: {destination.region}
                  </span>

                  <span className="home-card-meta-item">
                    Población: {destination.population}
                  </span>
                </div>
              </div>

              <div className="home-card-actions">
                <a className="home-card-link" href={`/destinations/${destination.id}`}>
                  Ver detalle
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default HomePage;