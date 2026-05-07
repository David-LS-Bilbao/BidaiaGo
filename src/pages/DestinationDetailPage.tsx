import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCountryInfo, getWeatherConditions, getSafetyRecommendations } from '../services/tipsApi';
import type { CountryInfo, WeatherCondition, SafetyRecommendation } from '../services/tipsApi';



const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
};

const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
    },
};

const staggerContainer = {
    initial: {},
    animate: {
    transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const errorVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const floatVariants = {
    initial: { y: 0, opacity: 0.3 },
    animate: { 
        y: [0, -20, 0], 
        opacity: [0.3, 0.7, 0.3],
        transition: { 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" as const 
        } 
    },
};

const pulseVariants = {
    initial: { scale: 1, opacity: 0.2 },
    animate: { 
        scale: [1, 1.5, 1], 
        opacity: [0.2, 0.5, 0.2],
        transition: { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" as const,
            delay: 1
        } 
    },
};

function FloatingElement({ delay, left, size }: { delay: number; left: string; size: number }) {
    return (
        <motion.div
            className="floating-element"
            style={{ left, width: size, height: size }}
            variants={floatVariants}
            initial="initial"
            animate="animate"
            transition={{ delay, duration: 4 + delay }}
        />
    );
}

function PulseElement({ delay, left, top, size }: { delay: number; left: string; top: string; size: number }) {
    return (
        <motion.div
            className="pulse-element"
            style={{ left, top, width: size, height: size }}
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            transition={{ delay, duration: 3 + delay }}
        />
    );
}

function BackgroundEffects() {
    return (
        <div className="background-effects">
            <motion.div className="background-gradient" />

            <FloatingElement delay={0} left="10%" size={80} />
            <FloatingElement delay={0.5} left="25%" size={60} />
            <FloatingElement delay={1} left="40%" size={100} />
            <FloatingElement delay={1.5} left="55%" size={70} />
            <FloatingElement delay={2} left="70%" size={90} />
            <FloatingElement delay={2.5} left="85%" size={50} />
            <FloatingElement delay={0.8} left="15%" size={40} />
            <FloatingElement delay={1.3} left="60%" size={55} />
            <FloatingElement delay={1.8} left="80%" size={65} />

            <PulseElement delay={0} left="20%" top="30%" size={120} />
            <PulseElement delay={0.7} left="60%" top="50%" size={80} />
            <PulseElement delay={1.4} left="80%" top="70%" size={100} />
            <PulseElement delay={2.1} left="30%" top="80%" size={60} />

            <div className="background-fade" />
        </div>
    );
}

function DestinationDetailPage() {
const { id } = useParams<{ id: string }>();
const [searchQuery, setSearchQuery] = useState('');
const [correctedQuery, setCorrectedQuery] = useState<string | null>(null);
const [countryData, setCountryData] = useState<CountryInfo | null>(null);
const [weatherData, setWeatherData] = useState<WeatherCondition | null>(null);
const [safetyData, setSafetyData] = useState<SafetyRecommendation[]>([]);
const [loading, setLoading] = useState<boolean>(() => !!id);
const [error, setError] = useState<string | null>(null);
const [showResults, setShowResults] = useState(false);

// Lógica de carga reutilizable — llamada desde handleSearch (event handler)
const loadDestination = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setCountryData(null);
    setWeatherData(null);
    setSafetyData([]);
    setCorrectedQuery(null);
    setShowResults(false);

    const countryResult = await getCountryInfo(query);

    if (countryResult.error) {
      setError(countryResult.error);
      setLoading(false);
      return;
    }

    if (countryResult.correctedQuery) {
      setCorrectedQuery(countryResult.correctedQuery);
    }

    const country = countryResult.data;
    setCountryData(country);

    if (country.capital?.[0]) {
        const weatherResult = await getWeatherConditions(country.capital[0]);
        if (!weatherResult.error) {
          setWeatherData(weatherResult.data);
        }
    }

    const safetyResult = await getSafetyRecommendations(country.name.common);
    if (!safetyResult.error) {
        setSafetyData(safetyResult.data);
    }

    setLoading(false);
    setTimeout(() => setShowResults(true), 100);
}, []);

// Auto-carga desde URL: todos los setState van después del primer await
useEffect(() => {
    if (!id) return;
    let cancelled = false;

    void (async () => {
        const countryResult = await getCountryInfo(id);
        if (cancelled) return;

        if (countryResult.error) {
            setError(countryResult.error);
            setLoading(false);
            return;
        }

        if (countryResult.correctedQuery) {
            setCorrectedQuery(countryResult.correctedQuery);
        }

        const country = countryResult.data;
        setCountryData(country);

        if (country.capital?.[0]) {
            const weatherResult = await getWeatherConditions(country.capital[0]);
            if (!cancelled && !weatherResult.error) {
                setWeatherData(weatherResult.data);
            }
        }

        if (!cancelled) {
            const safetyResult = await getSafetyRecommendations(country.name.common);
            if (!safetyResult.error) {
                setSafetyData(safetyResult.data);
            }
            setLoading(false);
            setTimeout(() => setShowResults(true), 100);
        }
    })();

    return () => { cancelled = true; };
}, [id]);

const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loadDestination(searchQuery);
};

    const getSafetyBadgeClass = (level: string) => {
    switch (level) {
        case 'low': return 'badge-seguro';
        case 'medium': return 'badge-advertencia';
        case 'high': return 'badge-peligro';
        default: return '';
    }
    };

    const getSafetyLabel = (level: string) => {
    switch (level) {
        case 'low': return '✓ Seguro';
        case 'medium': return '⚠ Advertencia';
        case 'high': return '⚠ Peligro';
        default: return level;
    }
    };

    return (
    <>
        <BackgroundEffects />
        <motion.div
            className="destination-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
        >
        <motion.section className="hero" variants={itemVariants}>
        <h1>Descubre tu próximo destino</h1>
        <p>
            Explora información de países, conoce el clima actual y recibe recomendaciones de seguridad
            para planificar tu viaje con total tranquilidad.
        </p>
        </motion.section>

        <motion.section className="seccion-busqueda" variants={itemVariants}>
        <form onSubmit={handleSearch} className="formulario-busqueda">
            <motion.input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ingresa el nombre de un país (ej: Japan, France, Spain)"
            className="input-busqueda"
            whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(79, 104, 20, 0.3)' }}
            transition={{ duration: 0.2 }}
            />
            <motion.button
            type="submit"
            className="boton-buscar"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            >
            {loading ? 'Buscando...' : 'Buscar'}
            </motion.button>
        </form>
        </motion.section>

        <AnimatePresence>

        {error && (
            <motion.div
            className="alerta-error"
            variants={errorVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -10 }}
            >
            {error}
            </motion.div>
        )}
        </AnimatePresence>

        {countryData && showResults && (
        <motion.section
            className="resultado-pais"
            variants={cardVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div className="tarjeta-info" variants={itemVariants}>
            <div className="info-cabecera">
                {countryData.flags?.svg && (
                <motion.img
                    src={countryData.flags.svg}
                    alt={`Bandera de ${countryData.name.common}`}
                    className="bandera-pais"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                />
                )}
                <div>
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {countryData.name.common}
                </motion.h2>
                {correctedQuery && (
                    <p className="correccion-texto">
                        ¿Querías decir {correctedQuery}? Hemos corregido tu búsqueda.
                    </p>
                )}
                <p className="informacion-secundaria">
                    {countryData.region} · {countryData.subregion}
                </p>
                </div>
            </div>

            <motion.div
                className="info-detalles"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {[
                { label: 'Capital', value: countryData.capital?.[0] || 'N/A' },
                { label: 'Población', value: countryData.population?.toLocaleString() || 'N/A' },
                { label: 'Área', value: countryData.area ? `${countryData.area.toLocaleString()} km²` : 'N/A' },
                { label: 'Zona Horaria', value: countryData.timezones?.[0] || 'N/A' },
                { label: 'Conducción', value: countryData.car?.side ? (countryData.car.side === 'left' ? 'Izquierda' : 'Derecha') : 'N/A' },
                { label: 'Idiomas', value: countryData.languages ? Object.values(countryData.languages).join(', ') : 'N/A' },
                { label: 'Moneda', value: countryData.currencies ? Object.values(countryData.currencies).map((c) => `${c.name} (${c.symbol})`).join(', ') : 'N/A' },
                ].map((item) => (
                <motion.div key={item.label} className="info-item" variants={itemVariants}>
                    <span className="info-label">{item.label}</span>
                    <span className="info-valor">{item.value}</span>
                </motion.div>
                ))}
            </motion.div>
            </motion.div>

            {weatherData && (
            <motion.div
                className="tarjeta-clima"
                variants={itemVariants}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
            >
                <h3>Clima Actual</h3>
                <div className="clima-contenido">
                <motion.span
                    className="clima-icono"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    {weatherData.icon}
                </motion.span>
                <div className="clima-info">
                    <motion.span
                    className="clima-temperatura"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    >
                    {weatherData.temperature}°C
                    </motion.span>
                    <span className="clima-condicion">{weatherData.condition}</span>
                </div>
                <div className="clima-detalles">
                    <span>Humedad: {weatherData.humidity}%</span>
                    <span>Viento: {weatherData.windSpeed} km/h</span>
                </div>
                </div>
            </motion.div>
            )}

            {safetyData.length > 0 && (
            <motion.div
                className="tarjeta-seguridad"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <h3>Recomendaciones de Seguridad</h3>
                <ul className="lista-recomendaciones">
                {safetyData.map((rec, index) => (
                    <motion.li
                    key={index}
                    className="recomendacion-item"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                    >
                    <span className={`badge-nivel ${getSafetyBadgeClass(rec.level)}`}>
                        {getSafetyLabel(rec.level)}
                    </span>
                    <div className="recomendacion-contenido">
                        <span className="recomendacion-categoria">{rec.category}</span>
                        <p className="recomendacion-texto">{rec.description}</p>
                    </div>
                    </motion.li>
                ))}
                </ul>
            </motion.div>
            )}
        </motion.section>
        )}
        </motion.div>
    </>
    );
}

export default DestinationDetailPage;