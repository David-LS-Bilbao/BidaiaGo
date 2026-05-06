import "../styles/landing.css";

/**
 * LandingPage
 *
 * Página inicial de presentación de BidaiaGo.
 *
 * Responsabilidad:
 * - Explicar qué es la aplicación.
 * - Mostrar qué puede hacer el usuario.
 * - Explicar el flujo básico de uso.
 * - Enviar al usuario al dashboard.
 *
 */
function LandingPage() {
  return (
    <main className="landing-page">
      {/* HERO PRINCIPAL */}
      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-hero-content">
          <span className="landing-eyebrow">Explora el mundo con BidaiaGo</span>

          <h1 id="landing-title" className="landing-title">
            Descubre tu próximo destino
          </h1>

          <p className="landing-subtitle">
            BidaiaGo te ayuda a explorar países del mundo, consultar información útil
            y guardar posibles destinos para preparar tus próximos viajes.
          </p>

          <div className="landing-actions">
            {/* 
              De momento usamos <a> para no depender todavía de React Router.
              Cuando el router esté configurado, este enlace podrá cambiarse por <Link to="/dashboard">.
            */}
            <a href="/dashboard" className="landing-button landing-button-primary">
              Entrar al dashboard
            </a>

            <a href="#como-funciona" className="landing-button landing-button-secondary">
              Ver cómo funciona
            </a>
          </div>
        </div>
      </section>

      {/* QUÉ ES BIDAIGO */}
      <section className="landing-section" aria-labelledby="que-es-bidaiago">
        <div className="landing-section-header">
          <h2 id="que-es-bidaiago" className="landing-section-title">
            ¿Qué es BidaiaGo?
          </h2>

          <p className="landing-section-text">
            BidaiaGo es una aplicación web pensada para descubrir países como posibles
            destinos de viaje. Permite explorar información básica, comparar datos útiles
            y preparar una lista personal de lugares que te gustaría visitar.
          </p>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="landing-section" aria-labelledby="que-puedes-hacer">
        <div className="landing-section-header">
          <h2 id="que-puedes-hacer" className="landing-section-title">
            ¿Qué puedes hacer?
          </h2>

          <p className="landing-section-text">
            La aplicación combina información de países con una experiencia sencilla para
            inspirarte y organizar tus destinos favoritos.
          </p>
        </div>

        <div className="landing-features-grid">
          <article className="landing-feature-card">
            <div className="landing-feature-icon" aria-hidden="true">
              🌍
            </div>
            <h3>Explorar destinos</h3>
            <p>
              Consulta países de todo el mundo y descubre información básica sobre cada
              destino.
            </p>
          </article>

          <article className="landing-feature-card">
            <div className="landing-feature-icon" aria-hidden="true">
              🔎
            </div>
            <h3>Buscar y filtrar</h3>
            <p>
              Encuentra países por nombre y filtra los resultados por región para navegar
              más rápido.
            </p>
          </article>

          <article className="landing-feature-card">
            <div className="landing-feature-icon" aria-hidden="true">
              ⭐
            </div>
            <h3>Guardar favoritos</h3>
            <p>
              Añade destinos a tu lista personal de viaje usando almacenamiento local del
              navegador.
            </p>
          </article>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section
        id="como-funciona"
        className="landing-section"
        aria-labelledby="como-funciona-title"
      >
        <div className="landing-section-header">
          <h2 id="como-funciona-title" className="landing-section-title">
            ¿Cómo funciona?
          </h2>

          <p className="landing-section-text">
            El uso de BidaiaGo es sencillo: entras al dashboard, exploras países,
            consultas información útil y guardas los destinos que más te interesan.
          </p>
        </div>

        <div className="landing-steps">
          <article className="landing-step">
            <span className="landing-step-number">1</span>
            <div>
              <h3>Entra al dashboard</h3>
              <p>Accede a la pantalla principal donde se mostrarán los destinos.</p>
            </div>
          </article>

          <article className="landing-step">
            <span className="landing-step-number">2</span>
            <div>
              <h3>Busca un país</h3>
              <p>Usa el buscador y los filtros para encontrar destinos interesantes.</p>
            </div>
          </article>

          <article className="landing-step">
            <span className="landing-step-number">3</span>
            <div>
              <h3>Guarda tu viaje</h3>
              <p>Añade países a tu lista personal para consultarlos más tarde.</p>
            </div>
          </article>
        </div>
      </section>

      {/* INFORMACIÓN DISPONIBLE */}
      <section className="landing-section" aria-labelledby="info-disponible">
        <div className="landing-section-header">
          <h2 id="info-disponible" className="landing-section-title">
            Información que podrás consultar
          </h2>

          <p className="landing-section-text">
            BidaiaGo usará datos de REST Countries para mostrar información clara y útil
            sobre cada país.
          </p>
        </div>

        <div className="landing-info-grid">
          <div className="landing-info-item">Capital</div>
          <div className="landing-info-item">Región</div>
          <div className="landing-info-item">Población</div>
          <div className="landing-info-item">Idiomas</div>
          <div className="landing-info-item">Monedas</div>
          <div className="landing-info-item">Bandera</div>
          <div className="landing-info-item">Mapa</div>
          <div className="landing-info-item">Continente</div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="landing-cta" aria-labelledby="landing-cta-title">
        <h2 id="landing-cta-title" className="landing-cta-title">
          ¿Listo para descubrir tu próximo destino?
        </h2>

        <p className="landing-cta-text">
          Entra al dashboard y empieza a explorar países como inspiración para tus futuros
          viajes.
        </p>

        <div className="landing-actions">
          <a href="/dashboard" className="landing-button landing-button-primary">
            Entrar al dashboard
          </a>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;