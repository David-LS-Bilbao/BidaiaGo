const API_BASE = 'https://api.pexels.com/v1';

// ─── Tipos mínimos de la respuesta de Pexels ─────────────────────────────────

export interface PexelsPhoto {
  id: number;
  alt: string;
  src: {
    original: string;
    large: string;
    medium: string;
    landscape: string;
  };
}

export interface PexelsSearchResponse {
  total_results: number;
  photos: PexelsPhoto[];
}

export interface PexelsImageResult {
  url: string;
  alt: string;
}

// ─── Función pública ──────────────────────────────────────────────────────────

/**
 * Busca una imagen de viaje para el país indicado en Pexels.
 * Devuelve null si no hay API key, si falla la petición o si no hay resultados.
 */
export async function getCountryTravelImage(
  query: string,
): Promise<PexelsImageResult | null> {
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
  if (!apiKey) return null;

  try {
    const params = new URLSearchParams({
      query,
      orientation: 'landscape',
      per_page: '1',
      locale: 'es-ES',
    });
    const response = await fetch(`${API_BASE}/search?${params}`, {
      headers: { Authorization: apiKey },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as PexelsSearchResponse;
    const photo = data.photos[0];
    if (!photo) return null;

    return { url: photo.src.landscape, alt: photo.alt };
  } catch {
    return null;
  }
}
