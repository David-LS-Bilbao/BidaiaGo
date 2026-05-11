import axios, { AxiosInstance } from 'axios';

export interface CountryInfo {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { common: string }>;
  };
  capital: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  flags: {
    png: string;
    svg: string;
  };
  timezones: string[];
  car: {
    side: string;
  };
  maps: {
    googleMaps: string;
  };
  translations?: Record<string, { common: string }>;
}

export interface WeatherCondition {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface SafetyRecommendation {
  level: 'low' | 'medium' | 'high';
  category: string;
  description: string;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
  correctedQuery?: string;
}

const countryNameCorrections: Record<string, string> = {
  'japon': 'japan', 'jappn': 'japan', 'japón': 'japan',
  'españa': 'spain', 'espania': 'spain', 'españia': 'spain',
  'francia': 'france', 'francial': 'france',
  'alemania': 'germany', 'alimañia': 'germany',
  'italia': 'italy',
  'portugal': 'portugal',
  'reino Unido': 'united kingdom', 'reinounido': 'united kingdom',
  'ingles': 'united kingdom', 'inglaterra': 'united kingdom',
  'eeuu': 'united states', 'estados Unidos': 'united states', 'estadosunidos': 'united states',
  'méxico': 'mexico', 'mexiko': 'mexico', 'méjico': 'mexico',
  'brasil': 'brazil',
  'argentina': 'argentina',
  'chile': 'chile',
  'perú': 'peru', 'peru': 'peru',
  'colombia': 'colombia',
  'china': 'china',
  'tailandia': 'thailand', 'thailanda': 'thailand',
  'vietnam': 'vietnam',
  'india': 'india',
  'corea del sur': 'south korea', 'coreasur': 'south korea',
  'corea del norte': 'north korea',
  'australia': 'australia',
  'nueva zelanda': 'new zealand', 'nuezeland': 'new zealand',
  'canadá': 'canada', 'canada': 'canada',
  'egipto': 'egypt',
  'marruecos': 'morocco', 'maruecos': 'morocco',
  'sudáfrica': 'south africa', 'sudafrica': 'south africa',
  'rusia': 'russia',
  'polonia': 'poland',
  'grecia': 'greece',
  'holanda': 'netherlands',
  'belgica': 'belgium', 'bélgica': 'belgium',
  'suiza': 'switzerland',
  'noruega': 'norway',
  'suecia': 'sweden',
  'finlandia': 'finland',
  'dinamarca': 'denmark',
  'irlanda': 'ireland',
  'república checa': 'czech', 'checoslovaquia': 'czech',
  'hungría': 'hungary', 'hungria': 'hungary',
  'austria': 'austria',
};

const countryNameInSpanish: Record<string, string> = {
  'spain': 'España', 'france': 'Francia', 'germany': 'Alemania', 'italy': 'Italia',
  'portugal': 'Portugal', 'united kingdom': 'Reino Unido', 'netherlands': 'Países Bajos',
  'belgium': 'Bélgica', 'switzerland': 'Suiza', 'austria': 'Austria', 'greece': 'Grecia',
  'poland': 'Polonia', 'sweden': 'Suecia', 'norway': 'Noruega', 'finland': 'Finlandia',
  'denmark': 'Dinamarca', 'ireland': 'Irlanda', 'czech': 'República Checa', 'hungary': 'Hungría',
  'japan': 'Japón', 'china': 'China', 'thailand': 'Tailandia', 'vietnam': 'Vietnam',
  'india': 'India', 'south korea': 'Corea del Sur', 'indonesia': 'Indonesia', 'malaysia': 'Malasia',
  'singapore': 'Singapur', 'philippines': 'Filipinas', 'egypt': 'Egipto', 'morocco': 'Marruecos',
  'south africa': 'Sudáfrica', 'kenya': 'Kenia', 'united states': 'Estados Unidos', 'canada': 'Canadá',
  'mexico': 'México', 'brazil': 'Brasil', 'argentina': 'Argentina', 'chile': 'Chile', 'peru': 'Perú',
  'colombia': 'Colombia', 'ecuador': 'Ecuador', 'uruguay': 'Uruguay', 'australia': 'Australia',
  'new zealand': 'Nueva Zelanda', 'fiji': 'Fiyi', 'russia': 'Rusia',
};

const correctCountryName = (input: string): { corrected: string; wasCorrected: boolean } => {
  const normalized = input.toLowerCase().trim();
  
  if (countryNameCorrections[normalized]) {
    return { corrected: countryNameCorrections[normalized], wasCorrected: true };
  }

  const words = normalized.split(/\s+/);
  let corrected = normalized;
  
  for (const [wrong, right] of Object.entries(countryNameCorrections)) {
    if (wrong.includes(' ') && words.length >= 2) {
      const combined = words.join(' ');
      if (combined.includes(wrong.replace(/\s+/g, '')) || combined === wrong) {
        corrected = right;
      }
    }
  }

  return { corrected, wasCorrected: corrected !== input.toLowerCase().trim() };
};

const getCountryNameInSpanish = (countryName: string): string => {
  const lower = countryName.toLowerCase();
  return countryNameInSpanish[lower] || countryName;
};

const countriesInstance: AxiosInstance = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const weatherInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCountryInfo = async (query: string): Promise<ApiResponse<CountryInfo>> => {
  try {
    const trimmed = query.trim();
    const isIsoCode = /^[A-Za-z]{2,3}$/.test(trimmed);

    let countries: CountryInfo[];
    let wasCorrected = false;
    let corrected = trimmed;

    if (isIsoCode) {
      const response = await countriesInstance.get<CountryInfo[]>(
        `/alpha/${encodeURIComponent(trimmed.toUpperCase())}`
      );
      countries = response.data;
    } else {
      const correction = correctCountryName(trimmed);
      wasCorrected = correction.wasCorrected;
      corrected = correction.corrected;
      const response = await countriesInstance.get<CountryInfo[]>(
        `/name/${encodeURIComponent(corrected)}`
      );
      countries = response.data;
    }

    if (!countries || countries.length === 0) {
      const errorMsg = wasCorrected
        ? `¿Querías decir "${corrected}"?`
        : `País "${query}" no encontrado`;
      return { data: {} as CountryInfo, error: errorMsg, correctedQuery: corrected };
    }

    const country = countries[0];
    const nameInSpanish = getCountryNameInSpanish(country.name.common);

    const countryWithTranslation: CountryInfo = {
      ...country,
      name: {
        ...country.name,
        common: nameInSpanish,
        official: country.name.official,
      },
    };

    return {
      data: countryWithTranslation,
      correctedQuery: wasCorrected ? nameInSpanish : undefined,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return { data: {} as CountryInfo, error: `País "${query}" no encontrado` };
      }
      return { data: {} as CountryInfo, error: `Error de conexión: ${error.message}` };
    }
    return { data: {} as CountryInfo, error: 'Error desconocido al buscar el país' };
  }
};

export const getWeatherConditions = async (
  capital: string
): Promise<ApiResponse<WeatherCondition>> => {
  try {
    const geoResponse = await axios.get(
      // El navegador no permite establecer manualmente la cabecera User-Agent.
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(capital)}&format=json&limit=1`
    );

    if (!geoResponse.data || geoResponse.data.length === 0) {
      return {
        data: {} as WeatherCondition,
        error: `Capital "${capital}" no encontrada`,
      };
    }

    const { lat, lon } = geoResponse.data[0];

    const weatherResponse = await weatherInstance.get('/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      },
    });

    const current = weatherResponse.data.current;
    const weatherCode = current.weather_code;

    const weatherData: WeatherCondition = {
      location: capital,
      temperature: current.temperature_2m,
      condition: getWeatherConditionFromCode(weatherCode),
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      icon: getWeatherIcon(weatherCode),
    };

    return { data: weatherData };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? `Error al obtener clima: ${error.message}`
      : 'Error desconocido';
    return { data: {} as WeatherCondition, error: message };
  }
};

export const getSafetyRecommendations = async (region: string, subregion: string): Promise<ApiResponse<SafetyRecommendation[]>> => {
  try {
    const recommendations: SafetyRecommendation[] = [];

    const regionData: Record<string, { level: 'low' | 'medium' | 'high'; general: string }> = {
      'europe':        { level: 'low',    general: 'Europa es generalmente segura. Mantén tus pertenencias atendidas en zonas turísticas.' },
      'asia':          { level: 'low',    general: 'Asia ofrece experiencias únicas. Evita zonas aisladas durante la noche y cuida tus objetos de valor.' },
      'africa':        { level: 'medium', general: 'En África, infórmate sobre las zonas seguras antes de viajar. Evita mostrar objetos de valor en zonas concurridas.' },
      'north america': { level: 'low',    general: 'Norteamérica es segura en general. Ten precaución en zonas urbanas grandes.' },
      'south america': { level: 'low',    general: 'Sudamérica tiene mucho que ofrecer. Evita exhibir objetos de valor en zonas turísticas muy concurridas.' },
      'oceania':       { level: 'low',    general: 'Oceanía es muy segura. Disfruta de la naturaleza pero infórmate sobre condiciones locales.' },
    };

    let detectedRegion = region.toLowerCase();
    if (detectedRegion === 'americas') {
      detectedRegion = subregion.toLowerCase().includes('south') ? 'south america' : 'north america';
    }

    const regionInfo = regionData[detectedRegion] ?? regionData['europe'];

    recommendations.push({
      level: regionInfo.level,
      category: 'Seguridad general',
      description: regionInfo.general,
    });

    recommendations.push({
      level: 'low',
      category: 'Salud',
      description: 'Consulta con tu médico las recomendaciones de vacunación antes de viajar.',
    });

    recommendations.push({
      level: 'low',
      category: 'Documentación',
      description: 'Lleva copias de tus documentos de identificación y seguro de viaje.',
    });

    return { data: recommendations };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? `Error al obtener recomendaciones: ${error.message}`
      : 'Error desconocido';
    return { data: [], error: message };
  }
};

const getWeatherConditionFromCode = (code: number): string => {
  const weatherCodes: Record<number, string> = {
    0: 'Despejado',
    1: 'Mayormente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    48: 'Niebla',
    51: 'Llovizna',
    53: 'Llovizna',
    55: 'Llovizna',
    61: 'Lluvia ligera',
    63: 'Lluvia moderada',
    65: 'Lluvia fuerte',
    71: 'Nieve ligera',
    73: 'Nieve moderada',
    75: 'Nieve fuerte',
    80: 'Chubascos',
    81: 'Chubascos',
    82: 'Chubascos intensos',
    95: 'Tormenta',
    96: 'Tormenta con granizo',
    99: 'Tormenta con granizo',
  };

  return weatherCodes[code] || 'Desconocido';
};


const getWeatherIcon = (code: number): string => {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2 || code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 55) return '🌦️';
  if (code >= 61 && code <= 65) return '🌧️';
  if (code >= 71 && code <= 75) return '❄️';
  if (code >= 80 && code <= 82) return '⛈️';
  if (code >= 95) return '🌩️';
  return '🌡️';
};
