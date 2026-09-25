import { useState, useEffect } from 'react';
import { UserLocation } from '../types';

export function useGeolocation() {
  const [location, setLocation] = useState<UserLocation>({
    lat: 25.7617,
    lng: -80.1918,
    city: 'Miami',
    country: 'USA',
    countryCode: 'US',
    loading: true,
    error: null,
  });

  useEffect(() => {
    const getLocation = async () => {
      // Intentar geolocalización del navegador
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 10000,
              enableHighAccuracy: false,
            });
          });

          const { latitude, longitude } = position.coords;

          // Reverse geocoding con Nominatim (OpenStreetMap)
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
              {
                headers: {
                  'User-Agent': 'PulsarFM/1.0 (https://pulsarfm.app)',
                },
              }
            );
            const data = await response.json();

            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.state ||
              'Desconocida';
            const country = data.address?.country || 'Desconocido';
            const countryCode = data.address?.country_code?.toUpperCase() || '';

            setLocation({
              lat: latitude,
              lng: longitude,
              city,
              country,
              countryCode,
              loading: false,
              error: null,
            });
          } catch {
            setLocation({
              lat: latitude,
              lng: longitude,
              city: 'Tu ubicación',
              country: '',
              countryCode: '',
              loading: false,
              error: null,
            });
          }
        } catch {
          // Si falla, usar API de IP
          await getLocationByIP();
        }
      } else {
        await getLocationByIP();
      }
    };

    const getLocationByIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        setLocation({
          lat: data.latitude || 25.7617,
          lng: data.longitude || -80.1918,
          city: data.city || 'Miami',
          country: data.country_name || 'USA',
          countryCode: data.country_code || 'US',
          loading: false,
          error: null,
        });
      } catch {
        setLocation({
          lat: 25.7617,
          lng: -80.1918,
          city: 'Miami',
          country: 'USA',
          countryCode: 'US',
          loading: false,
          error: 'No se pudo determinar tu ubicación',
        });
      }
    };

    getLocation();
  }, []);

  return location;
}
