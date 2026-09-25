import { Station } from '../types';
import { thematicChannels, ThematicChannel } from './thematicChannels';

export interface ThematicStation {
  id: string;
  channelId: string;
  city: string;
  country: string;
  countryCode: string;
  population: number;
  frequency: string;
  lat: number;
  lng: number;
  station: Station;
}

// Generar emisoras temáticas geolocalizadas
// Cada canal temático tiene emisoras en ciudades relevantes para ese género

const thematicStationsData: Record<string, Array<{
  city: string;
  country: string;
  countryCode: string;
  population: number;
  frequency: string;
  lat: number;
  lng: number;
}>> = {
  // FLAMENCO - Ciudades con tradición flamenca
  'flamenco': [
    { city: 'Sevilla', country: 'España', countryCode: 'ES', population: 688000, frequency: '88.1 FM', lat: 37.3891, lng: -5.9845 },
    { city: 'Jerez de la Frontera', country: 'España', countryCode: 'ES', population: 212000, frequency: '88.3 FM', lat: 36.6860, lng: -6.1370 },
    { city: 'Cádiz', country: 'España', countryCode: 'ES', population: 116000, frequency: '88.5 FM', lat: 36.5271, lng: -6.2886 },
    { city: 'Granada', country: 'España', countryCode: 'ES', population: 232000, frequency: '88.7 FM', lat: 37.1773, lng: -3.5986 },
    { city: 'Córdoba', country: 'España', countryCode: 'ES', population: 325000, frequency: '88.9 FM', lat: 37.8882, lng: -4.7794 },
    { city: 'Málaga', country: 'España', countryCode: 'ES', population: 574000, frequency: '89.1 FM', lat: 36.7213, lng: -4.4214 },
    { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '89.3 FM', lat: 40.4168, lng: -3.7038 },
    { city: 'Barcelona', country: 'España', countryCode: 'ES', population: 1620000, frequency: '89.5 FM', lat: 41.3851, lng: 2.1734 },
    { city: 'Algeciras', country: 'España', countryCode: 'ES', population: 116000, frequency: '89.7 FM', lat: 36.1408, lng: -5.4562 },
    { city: 'Huelva', country: 'España', countryCode: 'ES', population: 144000, frequency: '89.9 FM', lat: 37.2614, lng: -6.9447 },
  ],
  
  // ROCK - Ciudades con escena rock
  'rock': [
    { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '90.1 FM', lat: 40.4168, lng: -3.7038 },
    { city: 'Barcelona', country: 'España', countryCode: 'ES', population: 1620000, frequency: '90.3 FM', lat: 41.3851, lng: 2.1734 },
    { city: 'Bilbao', country: 'España', countryCode: 'ES', population: 345000, frequency: '90.5 FM', lat: 43.2630, lng: -2.9350 },
    { city: 'Valencia', country: 'España', countryCode: 'ES', population: 789000, frequency: '90.7 FM', lat: 39.4699, lng: -0.3763 },
    { city: 'Zaragoza', country: 'España', countryCode: 'ES', population: 681000, frequency: '90.9 FM', lat: 41.6488, lng: -0.8891 },
    { city: 'CDMX', country: 'México', countryCode: 'MX', population: 9200000, frequency: '91.1 FM', lat: 19.4326, lng: -99.1332 },
    { city: 'Guadalajara', country: 'México', countryCode: 'MX', population: 1385000, frequency: '91.3 FM', lat: 20.6597, lng: -103.3496 },
    { city: 'Monterrey', country: 'México', countryCode: 'MX', population: 1135000, frequency: '91.5 FM', lat: 25.6866, lng: -100.3161 },
    { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', population: 3075000, frequency: '91.7 FM', lat: -34.6037, lng: -58.3816 },
    { city: 'Bogotá', country: 'Colombia', countryCode: 'CO', population: 7412000, frequency: '91.9 FM', lat: 4.711, lng: -74.0721 },
  ],
  
  // ELECTRÓNICA - Ciudades con escena electrónica
  'electronica': [
    { city: 'Ibiza', country: 'España', countryCode: 'ES', population: 49000, frequency: '92.1 FM', lat: 38.9067, lng: 1.4206 },
    { city: 'Barcelona', country: 'España', countryCode: 'ES', population: 1620000, frequency: '92.3 FM', lat: 41.3851, lng: 2.1734 },
    { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '92.5 FM', lat: 40.4168, lng: -3.7038 },
    { city: 'Valencia', country: 'España', countryCode: 'ES', population: 789000, frequency: '92.7 FM', lat: 39.4699, lng: -0.3763 },
    { city: 'Berlín', country: 'Alemania', countryCode: 'DE', population: 3645000, frequency: '92.9 FM', lat: 52.5200, lng: 13.4050 },
    { city: 'Ámsterdam', country: 'Países Bajos', countryCode: 'NL', population: 872000, frequency: '93.1 FM', lat: 52.3676, lng: 4.9041 },
    { city: 'Miami', country: 'USA', countryCode: 'US', population: 467000, frequency: '93.3 FM', lat: 25.7617, lng: -80.1918 },
    { city: 'CDMX', country: 'México', countryCode: 'MX', population: 9200000, frequency: '93.5 FM', lat: 19.4326, lng: -99.1332 },
    { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', population: 3075000, frequency: '93.7 FM', lat: -34.6037, lng: -58.3816 },
    { city: 'Santiago', country: 'Chile', countryCode: 'CL', population: 6310000, frequency: '93.9 FM', lat: -33.4489, lng: -70.6693 },
  ],
  
  // POP - Ciudades principales
  'pop': [
    { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '94.1 FM', lat: 40.4168, lng: -3.7038 },
    { city: 'Barcelona', country: 'España', countryCode: 'ES', population: 1620000, frequency: '94.3 FM', lat: 41.3851, lng: 2.1734 },
    { city: 'CDMX', country: 'México', countryCode: 'MX', population: 9200000, frequency: '94.5 FM', lat: 19.4326, lng: -99.1332 },
    { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', population: 3075000, frequency: '94.7 FM', lat: -34.6037, lng: -58.3816 },
    { city: 'Bogotá', country: 'Colombia', countryCode: 'CO', population: 7412000, frequency: '94.9 FM', lat: 4.711, lng: -74.0721 },
    { city: 'Lima', country: 'Perú', countryCode: 'PE', population: 10555000, frequency: '95.1 FM', lat: -12.0464, lng: -77.0428 },
    { city: 'Santiago', country: 'Chile', countryCode: 'CL', population: 6310000, frequency: '95.3 FM', lat: -33.4489, lng: -70.6693 },
    { city: 'Miami', country: 'USA', countryCode: 'US', population: 467000, frequency: '95.5 FM', lat: 25.7617, lng: -80.1918 },
    { city: 'Caracas', country: 'Venezuela', countryCode: 'VE', population: 2935000, frequency: '95.7 FM', lat: 10.4806, lng: -66.9036 },
    { city: 'Santo Domingo', country: 'República Dominicana', countryCode: 'DO', population: 2908000, frequency: '95.9 FM', lat: 18.4861, lng: -69.9312 },
  ],
  
  // JAZZ - Ciudades con tradición jazzística
  'jazz': [
    { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '96.1 FM', lat: 40.4168, lng: -3.7038 },
    { city: 'Barcelona', country: 'España', countryCode: 'ES', population: 1620000, frequency: '96.3 FM', lat: 41.3851, lng: 2.1734 },
    { city: 'San Sebastián', country: 'España', countryCode: 'ES', population: 186000, frequency: '96.5 FM', lat: 43.3183, lng: -1.9812 },
    { city: 'Vitoria', country: 'España', countryCode: 'ES', population: 251000, frequency: '96.7 FM', lat: 42.8467, lng: -2.6726 },
    { city: 'Nueva Orleans', country: 'USA', countryCode: 'US', population: 383000, frequency: '96.9 FM', lat: 29.9511, lng: -90.0715 },
    { city: 'Nueva York', country: 'USA', countryCode: 'US', population: 8336000, frequency: '97.1 FM', lat: 40.7128, lng: -74.0060 },
    { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', population: 3075000, frequency: '97.3 FM', lat: -34.6037, lng: -58.3816 },
    { city: 'CDMX', country: 'México', countryCode: 'MX', population: 9200000, frequency: '97.5 FM', lat: 19.4326, lng: -99.1332 },
    { city: 'Bogotá', country: 'Colombia', countryCode: 'CO', population: 7412000, frequency: '97.7 FM', lat: 4.711, lng: -74.0721 },
    { city: 'Montevideo', country: 'Uruguay', countryCode: 'UY', population: 1381000, frequency: '97.9 FM', lat: -34.9011, lng: -56.1645 },
  ],
  
  // CLÁSICA - Ciudades con tradición clásica
  'clasica': [
    { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '98.1 FM', lat: 40.4168, lng: -3.7038 },
    { city: 'Barcelona', country: 'España', countryCode: 'ES', population: 1620000, frequency: '98.3 FM', lat: 41.3851, lng: 2.1734 },
    { city: 'Sevilla', country: 'España', countryCode: 'ES', population: 688000, frequency: '98.5 FM', lat: 37.3891, lng: -5.9845 },
    { city: 'Valencia', country: 'España', countryCode: 'ES', population: 789000, frequency: '98.7 FM', lat: 39.4699, lng: -0.3763 },
    { city: 'Viena', country: 'Austria', countryCode: 'AT', population: 1897000, frequency: '98.9 FM', lat: 48.2082, lng: 16.3738 },
    { city: 'Salzburgo', country: 'Austria', countryCode: 'AT', population: 153000, frequency: '99.1 FM', lat: 47.8095, lng: 13.0550 },
    { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', population: 3075000, frequency: '99.3 FM', lat: -34.6037, lng: -58.3816 },
    { city: 'CDMX', country: 'México', countryCode: 'MX', population: 9200000, frequency: '99.5 FM', lat: 19.4326, lng: -99.1332 },
    { city: 'Lima', country: 'Perú', countryCode: 'PE', population: 10555000, frequency: '99.7 FM', lat: -12.0464, lng: -77.0428 },
    { city: 'Bogotá', country: 'Colombia', countryCode: 'CO', population: 7412000, frequency: '99.9 FM', lat: 4.711, lng: -74.0721 },
  ],
  
  // HIP HOP - Ciudades con escena hip hop
  'hiphop': [
    { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '100.1 FM', lat: 40.4168, lng: -3.7038 },
    { city: 'Barcelona', country: 'España', countryCode: 'ES', population: 1620000, frequency: '100.3 FM', lat: 41.3851, lng: 2.1734 },
    { city: 'CDMX', country: 'México', countryCode: 'MX', population: 9200000, frequency: '100.5 FM', lat: 19.4326, lng: -99.1332 },
    { city: 'Medellín', country: 'Colombia', countryCode: 'CO', population: 2569000, frequency: '100.7 FM', lat: 6.2476, lng: -75.5658 },
    { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', population: 3075000, frequency: '100.9 FM', lat: -34.6037, lng: -58.3816 },
    { city: 'Santiago', country: 'Chile', countryCode: 'CL', population: 6310000, frequency: '101.1 FM', lat: -33.4489, lng: -70.6693 },
    { city: 'Lima', country: 'Perú', countryCode: 'PE', population: 10555000, frequency: '101.3 FM', lat: -12.0464, lng: -77.0428 },
    { city: 'Caracas', country: 'Venezuela', countryCode: 'VE', population: 2935000, frequency: '101.5 FM', lat: 10.4806, lng: -66.9036 },
    { city: 'Santo Domingo', country: 'República Dominicana', countryCode: 'DO', population: 2908000, frequency: '101.7 FM', lat: 18.4861, lng: -69.9312 },
    { city: 'Miami', country: 'USA', countryCode: 'US', population: 467000, frequency: '101.9 FM', lat: 25.7617, lng: -80.1918 },
  ],
  
  // REGGAE - Ciudades con tradición reggae
  'reggae': [
    { city: 'Kingston', country: 'Jamaica', countryCode: 'JM', population: 587000, frequency: '102.1 FM', lat: 17.9714, lng: -76.7931 },
    { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '102.3 FM', lat: 40.4168, lng: -3.7038 },
    { city: 'Barcelona', country: 'España', countryCode: 'ES', population: 1620000, frequency: '102.5 FM', lat: 41.3851, lng: 2.1734 },
    { city: 'CDMX', country: 'México', countryCode: 'MX', population: 9200000, frequency: '102.7 FM', lat: 19.4326, lng: -99.1332 },
    { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', population: 3075000, frequency: '102.9 FM', lat: -34.6037, lng: -58.3816 },
    { city: 'Bogotá', country: 'Colombia', countryCode: 'CO', population: 7412000, frequency: '103.1 FM', lat: 4.711, lng: -74.0721 },
    { city: 'Lima', country: 'Perú', countryCode: 'PE', population: 10555000, frequency: '103.3 FM', lat: -12.0464, lng: -77.0428 },
    { city: 'Santiago', country: 'Chile', countryCode: 'CL', population: 6310000, frequency: '103.5 FM', lat: -33.4489, lng: -70.6693 },
    { city: 'Caracas', country: 'Venezuela', countryCode: 'VE', population: 2935000, frequency: '103.7 FM', lat: 10.4806, lng: -66.9036 },
    { city: 'Santo Domingo', country: 'República Dominicana', countryCode: 'DO', population: 2908000, frequency: '103.9 FM', lat: 18.4861, lng: -69.9312 },
  ],
  
  // LATINA - Ciudades latinas
  'latin': [
    { city: 'CDMX', country: 'México', countryCode: 'MX', population: 9200000, frequency: '104.1 FM', lat: 19.4326, lng: -99.1332 },
    { city: 'Guadalajara', country: 'México', countryCode: 'MX', population: 1385000, frequency: '104.3 FM', lat: 20.6597, lng: -103.3496 },
    { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', population: 3075000, frequency: '104.5 FM', lat: -34.6037, lng: -58.3816 },
    { city: 'Bogotá', country: 'Colombia', countryCode: 'CO', population: 7412000, frequency: '104.7 FM', lat: 4.711, lng: -74.0721 },
    { city: 'Cali', country: 'Colombia', countryCode: 'CO', population: 2227000, frequency: '104.9 FM', lat: 3.4516, lng: -76.5320 },
    { city: 'Lima', country: 'Perú', countryCode: 'PE', population: 10555000, frequency: '105.1 FM', lat: -12.0464, lng: -77.0428 },
    { city: 'Caracas', country: 'Venezuela', countryCode: 'VE', population: 2935000, frequency: '105.3 FM', lat: 10.4806, lng: -66.9036 },
    { city: 'Santo Domingo', country: 'República Dominicana', countryCode: 'DO', population: 2908000, frequency: '105.5 FM', lat: 18.4861, lng: -69.9312 },
    { city: 'San Juan', country: 'Puerto Rico', countryCode: 'PR', population: 381000, frequency: '105.7 FM', lat: 18.4655, lng: -66.1057 },
    { city: 'Miami', country: 'USA', countryCode: 'US', population: 467000, frequency: '105.9 FM', lat: 25.7617, lng: -80.1918 },
  ],
  
  // FOLK - Ciudades con tradición folk
  'folk': [
    { city: 'Madrid', country: 'España', countryCode: 'ES', population: 3223000, frequency: '106.1 FM', lat: 40.4168, lng: -3.7038 },
    { city: 'Barcelona', country: 'España', countryCode: 'ES', population: 1620000, frequency: '106.3 FM', lat: 41.3851, lng: 2.1734 },
    { city: 'Santiago de Compostela', country: 'España', countryCode: 'ES', population: 96000, frequency: '106.5 FM', lat: 42.8782, lng: -8.5448 },
    { city: 'Oviedo', country: 'España', countryCode: 'ES', population: 220000, frequency: '106.7 FM', lat: 43.3614, lng: -5.8593 },
    { city: 'CDMX', country: 'México', countryCode: 'MX', population: 9200000, frequency: '106.9 FM', lat: 19.4326, lng: -99.1332 },
    { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', population: 3075000, frequency: '107.1 FM', lat: -34.6037, lng: -58.3816 },
    { city: 'Bogotá', country: 'Colombia', countryCode: 'CO', population: 7412000, frequency: '107.3 FM', lat: 4.711, lng: -74.0721 },
    { city: 'Lima', country: 'Perú', countryCode: 'PE', population: 10555000, frequency: '107.5 FM', lat: -12.0464, lng: -77.0428 },
    { city: 'La Paz', country: 'Bolivia', countryCode: 'BO', population: 835000, frequency: '107.7 FM', lat: -16.5000, lng: -68.1500 },
    { city: 'Quito', country: 'Ecuador', countryCode: 'EC', population: 2781000, frequency: '107.9 FM', lat: -0.1807, lng: -78.4678 },
  ],
};

// Generar todas las emisoras temáticas
export function generateThematicStations(): ThematicStation[] {
  const stations: ThematicStation[] = [];
  
  thematicChannels.forEach(channel => {
    const channelStations = thematicStationsData[channel.id] || [];
    
    channelStations.forEach((stationData, index) => {
      const stationId = `quawe-${channel.id}-${stationData.city.toLowerCase().replace(/\s+/g, '-')}`;
      
      stations.push({
        id: stationId,
        channelId: channel.id,
        city: stationData.city,
        country: stationData.country,
        countryCode: stationData.countryCode,
        population: stationData.population,
        frequency: stationData.frequency,
        lat: stationData.lat,
        lng: stationData.lng,
        station: {
          stationuuid: stationId,
          name: `${channel.name} ${stationData.city}`,
          url: '',
          url_resolved: '',
          homepage: 'https://audius.co/profmanuelgago',
          favicon: '',
          tags: `quawe,${channel.id},${stationData.city.toLowerCase()}`,
          country: stationData.country,
          countrycode: stationData.countryCode,
          state: stationData.city,
          language: 'español',
          languagecodes: 'es',
          votes: Math.floor(Math.random() * 5000) + 1000,
          lastchangetime: '',
          codec: '',
          bitrate: 320,
          hls: 0,
          lastcheckok: 1,
          lastchecktime: '',
          clicktimestamp: '',
          clickcount: Math.floor(Math.random() * 50000) + 10000,
          clicktrend: Math.floor(Math.random() * 100) + 20,
          ssl_error: 0,
          geo_lat: stationData.lat,
          geo_long: stationData.lng,
        }
      });
    });
  });
  
  return stations;
}

// Obtener emisoras por canal temático
export function getStationsByChannel(channelId: string): ThematicStation[] {
  return generateThematicStations().filter(station => station.channelId === channelId);
}

// Obtener todas las emisoras temáticas
export function getAllThematicStations(): ThematicStation[] {
  return generateThematicStations();
}

// Estadísticas de emisoras temáticas
export function getThematicStats() {
  const allStations = generateThematicStations();
  return {
    totalStations: allStations.length,
    totalChannels: thematicChannels.length,
    totalCities: new Set(allStations.map(s => s.city)).size,
    totalCountries: new Set(allStations.map(s => s.country)).size,
    totalPopulation: allStations.reduce((sum, s) => sum + s.population, 0),
  };
}
