import "../styles/landing.css";
import { motion, useReducedMotion } from "motion/react";

const travelImages = {
  beach: "/images/travel_images/Playa-Tailandia-122-600x900.webp",
  city: "/images/travel_images/Statue-of-Liberty-Island-New-York-Bay.webp",
  islands: "/images/travel_images/ko-phi-phi-tailandia__1280x720.jpg",
  maldives:
    "/images/travel_images/beautiful-tropical-maldives-island-scene-blue-sea-blue-sky-holiday-vacation-vertical-background-wooden-pathway-pier-amazing-summer-travel-concept-ocean-bay-palm-trees-sandy-beach-exotic-nature-photo.jpg",
  couple: "/images/travel_images/cuento-viajes-pareja_52683-102408.avif",
  ria: "/images/travel_images/vista-desde-la-ria.jpg",
  camera:
    "/images/travel_images/7-of-the-best-apps-for-travel-photography-jpg_header-136404-1.jpeg",
  mountain: "/images/travel_images/gettyimages-2271604618-612x612.jpg",
  hiddenPlace: "/images/travel_images/1%20(2)__0.webp",
};

const landingFeatureCards = [
  {
    image: travelImages.islands,
    label: "Explorar",
    title: "Explorar destinos",
    text: "Consulta países de todo el mundo y descubre información básica sobre cada destino.",
  },
  {
    image: travelImages.city,
    label: "Comparar",
    title: "Comparar información",
    text: "Revisa regiones, capitales, población, idiomas y otros datos útiles antes de decidir.",
  },
  {
    image: travelImages.beach,
    label: "Preparar",
    title: "Preparar próximos viajes",
    text: "Construye una primera idea de viaje con destinos que encajan con lo que buscas.",
  },
];

const landingSteps = [
  {
    image: travelImages.maldives,
    title: "Entra al panel principal",
    text: "Desde la navegación superior accedes al espacio donde se muestran los destinos.",
  },
  {
    image: travelImages.ria,
    title: "Descubre datos del país",
    text: "Cada destino resume información esencial para entenderlo de un vistazo.",
  },
  {
    image: travelImages.couple,
    title: "Elige tu siguiente ruta",
    text: "Con la información clara, puedes decidir qué destinos quieres seguir explorando.",
  },
];

const landingVisualMoments = [
  {
    image: travelImages.camera,
    label: "Inspira",
    text: "Imagina rutas antes de decidir.",
  },
  {
    image: travelImages.mountain,
    label: "Compara",
    text: "Mira cada destino con contexto.",
  },
  {
    image: travelImages.hiddenPlace,
    label: "Descubre",
    text: "Encuentra lugares que no tenías en mente.",
  },
  {
    image: travelImages.ria,
    label: "Planifica",
    text: "Convierte una idea en próximo viaje.",
  },
];

/**
 * LandingPage
 *
 * Página inicial de presentación de BidaiaGo.
 *
 * Responsabilidad:
 * - Explicar qué es la aplicación.
 * - Mostrar qué puede hacer el usuario.
 * - Explicar el flujo básico de uso.
 * - Presentar la navegación hacia el dashboard desde la cabecera.
 *
 */
function LandingPage() {
  const shouldReduceMotion = useReducedMotion();
  const revealInitial = shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 };
  const revealInView = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
  const heroImageInitial = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 0, y: 36, scale: 0.96 };
  const heroImageAnimate = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };

  return (
    <main id="landing-top" className="landing-page">
      {/* HERO PRINCIPAL */}
      <section className="landing-hero" aria-labelledby="landing-title">
        <motion.div
          className="landing-hero-content"
          initial={revealInitial}
          animate={revealInView}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <span className="landing-eyebrow">Explora el mundo con BidaiaGo</span>

          <h1 id="landing-title" className="landing-title">
            Descubre tu próximo destino
          </h1>

          <p className="landing-subtitle">
            BidaiaGo te ayuda a explorar países del mundo, consultar información útil
            y guardar posibles destinos para preparar tus próximos viajes.
          </p>
        </motion.div>

        <div className="landing-hero-gallery" aria-hidden="true">
          <motion.img
            className="landing-hero-image landing-hero-image-large"
            src={travelImages.maldives}
            alt=""
            initial={heroImageInitial}
            animate={heroImageAnimate}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04, rotate: -1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
          />
          <motion.img
            className="landing-hero-image landing-hero-image-small landing-hero-image-top"
            src={travelImages.city}
            alt=""
            initial={heroImageInitial}
            animate={heroImageAnimate}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08, rotate: 2 }}
            transition={{ duration: 0.75, delay: 0.24, ease: "easeOut" }}
          />
          <motion.img
            className="landing-hero-image landing-hero-image-small landing-hero-image-bottom"
            src={travelImages.beach}
            alt=""
            initial={heroImageInitial}
            animate={heroImageAnimate}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08, rotate: -2 }}
            transition={{ duration: 0.75, delay: 0.36, ease: "easeOut" }}
          />
          <motion.img
            className="landing-hero-image landing-hero-image-tiny"
            src={travelImages.camera}
            alt=""
            initial={heroImageInitial}
            animate={heroImageAnimate}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: 7 }}
            transition={{ duration: 0.75, delay: 0.48, ease: "easeOut" }}
          />
        </div>
      </section>

      {/* QUÉ ES BIDAIGO */}
      <motion.section
        className="landing-section landing-intro-section"
        aria-labelledby="que-es-bidaiago"
        initial={revealInitial}
        whileInView={revealInView}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
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
      </motion.section>

      {/* FUNCIONALIDADES */}
      <motion.section
        className="landing-section"
        aria-labelledby="que-puedes-hacer"
        initial={revealInitial}
        whileInView={revealInView}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
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
          {landingFeatureCards.map((feature, index) => (
            <motion.article
              className="landing-feature-card"
              key={feature.title}
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <img className="landing-feature-image" src={feature.image} alt="" />
              <div className="landing-feature-content">
                <span className="landing-feature-icon">{feature.label}</span>
                <h3 className="landing-feature-title">{feature.title}</h3>
                <p className="landing-feature-text">{feature.text}</p>
              </div>
              <span className="landing-feature-index" aria-hidden="true">
                0{index + 1}
              </span>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* MOMENTOS VISUALES */}
      <motion.section
        className="landing-section landing-visual-section"
        aria-labelledby="momentos-visuales"
        initial={revealInitial}
        whileInView={revealInView}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="landing-section-header landing-visual-header">
          <h2 id="momentos-visuales" className="landing-section-title">
            Viajar empieza con una imagen
          </h2>

          <p className="landing-section-text">
            La landing usa fotografías como pequeñas escenas de exploración para que el
            recorrido sea más inmersivo antes de entrar al dashboard.
          </p>
        </div>

        <div className="landing-visual-grid">
          {landingVisualMoments.map((moment, index) => (
            <motion.article
              className="landing-visual-card"
              key={moment.label}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 42, rotate: -2 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
              whileHover={shouldReduceMotion ? undefined : { y: -10, scale: 1.025 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            >
              <img className="landing-visual-image" src={moment.image} alt="" />
              <div className="landing-visual-content">
                <span className="landing-visual-label">{moment.label}</span>
                <p className="landing-visual-text">{moment.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* CÓMO FUNCIONA */}
      <motion.section
        id="como-funciona"
        className="landing-section"
        aria-labelledby="como-funciona-title"
        initial={revealInitial}
        whileInView={revealInView}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
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
          {landingSteps.map((step, index) => (
            <motion.article
              className="landing-step"
              key={step.title}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <img className="landing-step-image" src={step.image} alt="" />
              <div className="landing-step-content">
                <span className="landing-step-number">0{index + 1}</span>
                <h3 className="landing-step-title">{step.title}</h3>
                <p className="landing-step-text">{step.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* INFORMACIÓN DISPONIBLE */}
      <motion.section
        className="landing-section"
        aria-labelledby="info-disponible"
        initial={revealInitial}
        whileInView={revealInView}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
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
      </motion.section>

      {/* CTA FINAL */}
      <motion.section
        className="landing-cta"
        aria-labelledby="landing-cta-title"
        initial={revealInitial}
        whileInView={revealInView}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <h2 id="landing-cta-title" className="landing-cta-title">
          ¿Listo para descubrir tu próximo destino?
        </h2>

        <p className="landing-cta-text">
          La navegación principal mantiene el acceso al dashboard para que la landing
          respire como una presentación visual, sin repetir acciones en cada bloque.
        </p>
      </motion.section>

      <motion.a
        className="landing-scroll-top"
        href="#landing-top"
        aria-label="Subir al inicio de la landing"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.82 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        ↑
      </motion.a>
    </main>
  );
}

export default LandingPage;
