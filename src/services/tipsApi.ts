import axios, { AxiosInstance } from 'axios';

export interface CountryInfo {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  subregion: string;
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
}

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

export const getCountryInfo = async (countryName: string): Promise<ApiResponse<CountryInfo>> => {
  try {
    const response = await countriesInstance.get<CountryInfo[]>(`/name/${encodeURIComponent(countryName)}`);
    const countries = response.data;
    if (!countries || countries.length === 0) {
      return { data: {} as CountryInfo, error: `País "${countryName}" no encontrado` };
    }
    console.log('API Response:', countries[0]);
    return { data: countries[0] };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.status, error.message);
      if (error.response?.status === 404) {
        return { data: {} as CountryInfo, error: `País "${countryName}" no encontrado` };
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
    // ✅ CORREGIDO: dominio .com en vez de .io
    const geoResponse = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(capital)}&count=1&language=en&format=json`
    );

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      return {
        data: {} as WeatherCondition,
        error: `Capital "${capital}" no encontrada`,
      };
    }

    const { latitude, longitude } = geoResponse.data.results[0];

    const weatherResponse = await weatherInstance.get('/forecast', {
      params: {
        latitude,
        longitude,
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

export const getSafetyRecommendations = async (countryName: string): Promise<ApiResponse<SafetyRecommendation[]>> => {
  try {
    const recommendations: SafetyRecommendation[] = [];
    const countryLower = countryName.toLowerCase();

    const regionData: Record<string, { level: 'low' | 'medium' | 'high', general: string }> = {
      'europe': { level: 'low', general: 'Europa es generalmente segura. Mantén tus pertenencias atendidas en zonas turísticas.' },
      'asia': { level: 'low', general: 'Asia ofrece experiencias únicas. Evita zonas aisladas durante la noche y cuida tus objetos de valor.' },
      'africa': { level: 'medium', general: 'En África, infórmate sobre las zonas seguras antes de viajar. Evita mostrar objetos de valor en zonas concurridas.' },
      'north america': { level: 'low', general: 'Norteamérica es segura en general. Ten precaución en zonas urbanas grandes.' },
      'south america': { level: 'low', general: 'Sudamérica tiene mucho que ofrecer. Evita exhibir objetos de valor en zonas turísticas muy concurridas.' },
      'oceania': { level: 'low', general: 'Oceanía es muy segura. Disfruta de la naturaleza pero infórmate sobre condiciones locales.' },
    };

    const countryRegions: Record<string, string> = {
      'spain': 'europe', 'france': 'europe', 'germany': 'europe', 'italy': 'europe', 'portugal': 'europe',
      'united kingdom': 'europe', 'netherlands': 'europe', 'belgium': 'europe', 'switzerland': 'europe',
      'austria': 'europe', 'greece': 'europe', 'poland': 'europe', 'sweden': 'europe', 'norway': 'europe',
      'finland': 'europe', 'denmark': 'europe', 'ireland': 'europe', 'czech': 'europe', 'hungary': 'europe',
      'japan': 'asia', 'china': 'asia', 'thailand': 'asia', 'vietnam': 'asia', 'india': 'asia',
      'south korea': 'asia', 'indonesia': 'asia', 'malaysia': 'asia', 'singapore': 'asia', 'philippines': 'asia',
      'egypt': 'africa', 'morocco': 'africa', 'south africa': 'africa', 'kenya': 'africa', 'tanzania': 'africa',
      'united states': 'north america', 'canada': 'north america', 'mexico': 'north america',
      'brazil': 'south america', 'argentina': 'south america', 'chile': 'south america', 'peru': 'south america',
      'colombia': 'south america', 'ecuador': 'south america',
      'uruguay': 'south america', 
      'australia': 'oceania', 'new zealand': 'oceania', 'fiji': 'oceania',
    };

    const countrySpecificWarnings: Record<string, { level: 'low' | 'medium' | 'high', category: string, description: string }> = {
      'mexico': { level: 'medium', category: 'Zonas seguras', description: 'Evita zonas marginales de ciudades grandes. Usa transporte oficial y evita exhibir objetos de valor.' },
      'brazil': { level: 'medium', category: 'Seguridad', description: 'Ten precaución en zonas turísticas de Rio de Janeiro. No muestres objetos de valor en la playa.' },
      'india': { level: 'medium', category: 'Cultura', description: 'Respeta las normas locales de vestimenta en lugares religiosos. Ten cuidado con la comida callejera.' },
      'south africa': { level: 'medium', category: 'Seguridad', description: 'Evita circular solo por la noche en ciudades como Johannesburgo. Usa taxis de empresas reconocidas.' },
      'morocco': { level: 'low', category: 'Cultura', description: 'Respeta las normas culturales y vestimenta conservadora, especialmente en zonas religiosas.' },
      'egypt': { level: 'low', category: 'Salud', description: 'Bebe solo agua embotellada. Evita alimentos de vendedores callejeros en zonas turísticas.' },
      'thailand': { level: 'low', category: 'Salud', description: 'Ten cuidado con las condiciones del tráfico. Respeta las normas locales en templos.' },
      'japan': { level: 'low', category: 'Transporte', description: 'El transporte público es muy seguro. Respeta las normas de etiqueta en lugares públicos.' },
      'peru': { level: 'medium', category: 'Altitud', description: 'Si visitas zonas altas como Cusco, toma precauciones por la altitud. Hidrátate bien.' },
    };

    let detectedRegion = 'europe';
    for (const [country, region] of Object.entries(countryRegions)) {
      if (countryLower.includes(country)) {
        detectedRegion = region;
        break;
      }
    }

    const regionInfo = regionData[detectedRegion] || regionData['europe'];

    recommendations.push({
      level: regionInfo.level,
      category: 'Seguridad general',
      description: regionInfo.general,
    });

    for (const [country, warning] of Object.entries(countrySpecificWarnings)) {
      if (countryLower.includes(country)) {
        recommendations.push({
          level: warning.level,
          category: warning.category,
          description: warning.description,
        });
        break;
      }
    }

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