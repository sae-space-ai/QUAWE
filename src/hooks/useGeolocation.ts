import { useState, useEffect } from "react";

interface GeoLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
  loading: boolean;
  error: string | null;
}

// Ciudades principales para fallback basado en IP
const CITY_MAP: Record<string, { city: string; country: string; lat: number; lng: number }> = {
  "US": { city: "Miami", country: "USA", lat: 25.7617, lng: -80.1918 },
  "MX": { city: "Ciudad de México", country: "México", lat: 19.4326, lng: -99.1332 },
  "ES": { city: "Madrid", country: "España", lat: 40.4168, lng: -3.7038 },
  "AR": { city: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },
  "CO": { city: "Bogotá", country: "Colombia", lat: 4.711, lng: -74.0721 },
  "PE": { city: "Lima", country: "Perú", lat: -12.0464, lng: -77.0428 },
  "DO": { city: "Santo Domingo", country: "Rep. Dominicana", lat: 18.4861, lng: -69.9312 },
  "CL": { city: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693 },
};

export function useGeolocation() {
  const [location, setLocation] = useState<GeoLocation>({
    lat: 25.7617,
    lng: -80.1918,
    city: "Miami",
    country: "USA",
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Intentar obtener geolocalización del navegador
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Intentar reverse geocoding con API pública
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
            );
            const data = await response.json();
            
            const city = data.address?.city || data.address?.town || data.address?.village || data.address?.state || "Desconocida";
            const country = data.address?.country || "Desconocido";
            
            setLocation({
              lat: latitude,
              lng: longitude,
              city,
              country,
              loading: false,
              error: null,
            });
          } catch {
            // Si falla el reverse geocoding, usar coordenadas
            setLocation({
              lat: latitude,
              lng: longitude,
              city: "Tu ubicación",
              country: "",
              loading: false,
              error: null,
            });
          }
        },
        async () => {
          // Si el usuario deniega permisos, usar API de IP
          try {
            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();
            
            setLocation({
              lat: data.latitude || 25.7617,
              lng: data.longitude || -80.1918,
              city: data.city || "Miami",
              country: data.country_name || "USA",
              loading: false,
              error: null,
            });
          } catch {
            // Fallback final
            setLocation({
              lat: 25.7617,
              lng: -80.1918,
              city: "Miami",
              country: "USA",
              loading: false,
              error: "No se pudo determinar tu ubicación",
            });
          }
        },
        { timeout: 10000 }
      );
    } else {
      // Navegador no soporta geolocalización
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocalización no soportada",
      }));
    }
  }, []);

  const getLocalAds = (ads: any[], radiusKm: number = 20) => {
    // Filtrar anuncios basados en la ciudad del usuario
    return ads.filter((ad) => ad.city === location.city);
  };

  return { location, getLocalAds };
}
