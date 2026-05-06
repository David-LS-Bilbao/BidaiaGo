// ─── Tipos de la API REST Countries ──────────────────────────────────────────

export interface RestCountryName {
  common: string;
  official: string;
}

export interface RestCountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface RestCountry {
  name: RestCountryName;
  cca2: string;
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  flags: RestCountryFlags;
}

// ─── Endpoint ────────────────────────────────────────────────────────────────

const COUNTRIES_API_URL =
  'https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,region,subregion,population,flags';

// ─── Servicio ─────────────────────────────────────────────────────────────────

export async function getAllCountries(): Promise<RestCountry[]> {
  const response = await fetch(COUNTRIES_API_URL);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<RestCountry[]>;
}
