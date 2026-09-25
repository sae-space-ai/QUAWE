// Sistema de Escaparate Publicitario Interactivo
// Los usuarios ganan puntos al interactuar con anuncios

export interface AdCampaign {
  id: string;
  brand: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rewardPoints: number;
  interactionType: 'view' | 'click' | 'complete' | 'share';
  duration: number; // segundos para ver el anuncio
  url?: string;
  ctaText: string;
  isActive: boolean;
  startDate: number;
  endDate: number;
  totalViews: number;
  totalInteractions: number;
}

export interface UserAdInteraction {
  userId: string;
  adId: string;
  interactionType: string;
  pointsEarned: number;
  timestamp: number;
  completed: boolean;
}

// Configuración de recompensas por interacción
export const AD_REWARDS = {
  view: {
    basePoints: 50,      // Puntos por ver un anuncio completo
    timeRequired: 10,    // Segundos mínimos para contar como visto
  },
  click: {
    basePoints: 100,     // Puntos por hacer clic en el anuncio
    timeRequired: 5,     // Segundos mínimos antes de poder hacer clic
  },
  complete: {
    basePoints: 250,     // Puntos por completar una acción (formulario, encuesta, etc.)
    timeRequired: 30,    // Segundos para completar la acción
  },
  share: {
    basePoints: 150,     // Puntos por compartir en redes sociales
    timeRequired: 0,     // Sin tiempo requerido
  }
};

// Campañas publicitarias activas
export const adCampaigns: AdCampaign[] = [
  {
    id: 'ad-001',
    brand: 'Nike',
    title: 'Descubre las nuevas Air Max 270',
    description: 'Explora la colección completa de zapatillas Nike Air Max. Tecnología revolucionaria para máximo confort.',
    image: 'https://image.qwenlm.ai/generated-images/820d1562-dfd8-42bf-bba2-8ff44288f282/_result.png',
    category: 'zapatos',
    rewardPoints: 100,
    interactionType: 'click',
    duration: 10,
    url: 'https://nike.com',
    ctaText: 'Ver Colección',
    isActive: true,
    startDate: Date.now(),
    endDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
    totalViews: 15420,
    totalInteractions: 3250
  },
  {
    id: 'ad-002',
    brand: 'Adidas',
    title: 'Ultraboost 22 - Energía en cada paso',
    description: 'Tecnología Boost para máxima retorno de energía. Diseñadas para corredores exigentes.',
    image: 'https://image.qwenlm.ai/generated-images/b4fb57c4-daea-4a06-a53e-439a6a3f704c/_result.png',
    category: 'zapatos',
    rewardPoints: 100,
    interactionType: 'click',
    duration: 10,
    url: 'https://adidas.com',
    ctaText: 'Comprar Ahora',
    isActive: true,
    startDate: Date.now(),
    endDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
    totalViews: 12350,
    totalInteractions: 2890
  },
  {
    id: 'ad-003',
    brand: 'Tous',
    title: 'El icónico Osito de Tous',
    description: 'Descubre la colección completa de joyería Tous. El osito más famoso del mundo.',
    image: 'https://image.qwenlm.ai/generated-images/d61edde2-1ef5-4635-9b9c-959ff5ade934/_result.png',
    category: 'joyas',
    rewardPoints: 150,
    interactionType: 'click',
    duration: 15,
    url: 'https://tous.com',
    ctaText: 'Explorar Joyería',
    isActive: true,
    startDate: Date.now(),
    endDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
    totalViews: 8920,
    totalInteractions: 1650
  },
  {
    id: 'ad-004',
    brand: 'Apple',
    title: 'AirPods Pro - Sonido inmersivo',
    description: 'Cancelación activa de ruido y audio espacial. La mejor experiencia de audio inalámbrico.',
    image: 'https://image.qwenlm.ai/generated-images/cb20c67c-93cb-4a81-bd3e-60d0f10a4e31/_result.png',
    category: 'tecnologia',
    rewardPoints: 200,
    interactionType: 'complete',
    duration: 30,
    url: 'https://apple.com/airpods-pro',
    ctaText: 'Más Información',
    isActive: true,
    startDate: Date.now(),
    endDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
    totalViews: 22150,
    totalInteractions: 5420
  },
  {
    id: 'ad-005',
    brand: 'Zara',
    title: 'Nueva colección primavera',
    description: 'Descubre las últimas tendencias en moda. Chaquetas, vestidos y más.',
    image: 'https://image.qwenlm.ai/generated-images/76209fd9-e5b1-4191-b023-285a328c7551/_result.png',
    category: 'ropa',
    rewardPoints: 75,
    interactionType: 'view',
    duration: 8,
    url: 'https://zara.com',
    ctaText: 'Ver Colección',
    isActive: true,
    startDate: Date.now(),
    endDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
    totalViews: 18750,
    totalInteractions: 4320
  },
  {
    id: 'ad-006',
    brand: 'Ray-Ban',
    title: 'Aviator - El clásico atemporal',
    description: 'Las gafas de sol más icónicas del mundo. Desde 1937.',
    image: 'https://image.qwenlm.ai/generated-images/f85be8c2-d785-405d-ae93-67384e05e38c/_result.png',
    category: 'accesorios',
    rewardPoints: 125,
    interactionType: 'click',
    duration: 12,
    url: 'https://ray-ban.com',
    ctaText: 'Descubrir Más',
    isActive: true,
    startDate: Date.now(),
    endDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
    totalViews: 14280,
    totalInteractions: 3150
  },
  {
    id: 'ad-007',
    brand: 'Sony',
    title: 'Walkman NW-A55 - Audio Hi-Res',
    description: 'Reproductor de música de alta resolución. Para los auténticos audiófilos.',
    image: 'https://image.qwenlm.ai/generated-images/b26013d5-067c-4d76-9268-e0338b84fb91/_result.png',
    category: 'tecnologia',
    rewardPoints: 175,
    interactionType: 'complete',
    duration: 25,
    url: 'https://sony.com/walkman',
    ctaText: 'Ver Especificaciones',
    isActive: true,
    startDate: Date.now(),
    endDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
    totalViews: 9850,
    totalInteractions: 2180
  },
  {
    id: 'ad-008',
    brand: 'H&M',
    title: 'Vestidos florales de temporada',
    description: 'La colección más fresca para primavera/verano. Estampados exclusivos.',
    image: 'https://image.qwenlm.ai/generated-images/466aef24-2d6c-47ed-87cb-c3d31d64d627/_result.png',
    category: 'ropa',
    rewardPoints: 75,
    interactionType: 'view',
    duration: 8,
    url: 'https://hm.com',
    ctaText: 'Comprar Vestidos',
    isActive: true,
    startDate: Date.now(),
    endDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
    totalViews: 21340,
    totalInteractions: 5680
  }
];

// Función para obtener todas las campañas activas
export function getActiveCampaigns(): AdCampaign[] {
  return adCampaigns.filter(campaign => 
    campaign.isActive && 
    campaign.startDate <= Date.now() && 
    campaign.endDate >= Date.now()
  );
}

// Función para obtener campañas por categoría
export function getCampaignsByCategory(category: string): AdCampaign[] {
  return getActiveCampaigns().filter(campaign => campaign.category === category);
}

// Función para obtener una campaña por ID
export function getCampaignById(adId: string): AdCampaign | undefined {
  return adCampaigns.find(campaign => campaign.id === adId);
}

// Función para verificar si un usuario ya interactuó con un anuncio
export function hasUserInteracted(userId: string, adId: string, interactionType: string): boolean {
  const interactions = getUserInteractions(userId);
  return interactions.some(
    interaction => 
      interaction.adId === adId && 
      interaction.interactionType === interactionType &&
      interaction.completed
  );
}

// Función para obtener todas las interacciones de un usuario
export function getUserInteractions(userId: string): UserAdInteraction[] {
  const allInteractions = JSON.parse(localStorage.getItem('quawe_ad_interactions') || '[]');
  return allInteractions.filter((interaction: UserAdInteraction) => interaction.userId === userId);
}

// Función para registrar una interacción con un anuncio
export function registerAdInteraction(
  userId: string,
  adId: string,
  interactionType: string,
  pointsEarned: number
): void {
  const allInteractions = JSON.parse(localStorage.getItem('quawe_ad_interactions') || '[]');
  
  const newInteraction: UserAdInteraction = {
    userId,
    adId,
    interactionType,
    pointsEarned,
    timestamp: Date.now(),
    completed: true
  };
  
  allInteractions.push(newInteraction);
  localStorage.setItem('quawe_ad_interactions', JSON.stringify(allInteractions));
  
  // Actualizar estadísticas de la campaña
  const campaign = getCampaignById(adId);
  if (campaign) {
    if (interactionType === 'view') {
      campaign.totalViews++;
    }
    campaign.totalInteractions++;
  }
  
  console.log(`[AdShowcase] Interacción registrada: ${interactionType} en ${adId} - ${pointsEarned} puntos`);
}

// Función para calcular puntos por interacción
export function calculateAdPoints(interactionType: string, adCampaign: AdCampaign): number {
  const baseReward = AD_REWARDS[interactionType as keyof typeof AD_REWARDS]?.basePoints || 50;
  
  // Bonus por categoría premium
  const categoryBonus = {
    'tecnologia': 1.5,
    'joyas': 1.3,
    'zapatos': 1.2,
    'ropa': 1.0,
    'accesorios': 1.1,
    'hogar': 1.0,
    'bisuteria': 0.9
  };
  
  const multiplier = categoryBonus[adCampaign.category as keyof typeof categoryBonus] || 1.0;
  
  return Math.floor(baseReward * multiplier);
}

// Función para obtener estadísticas de interacciones del usuario
export function getUserAdStats(userId: string) {
  const interactions = getUserInteractions(userId);
  
  return {
    totalInteractions: interactions.length,
    totalPointsEarned: interactions.reduce((sum, i) => sum + i.pointsEarned, 0),
    interactionsByType: {
      view: interactions.filter(i => i.interactionType === 'view').length,
      click: interactions.filter(i => i.interactionType === 'click').length,
      complete: interactions.filter(i => i.interactionType === 'complete').length,
      share: interactions.filter(i => i.interactionType === 'share').length
    },
    uniqueAdsInteracted: new Set(interactions.map(i => i.adId)).size
  };
}

// Función para obtener campañas disponibles para un usuario
export function getAvailableCampaignsForUser(userId: string): AdCampaign[] {
  const activeCampaigns = getActiveCampaigns();
  
  return activeCampaigns.filter(campaign => {
    // Verificar si el usuario ya completó la interacción principal
    return !hasUserInteracted(userId, campaign.id, campaign.interactionType);
  });
}
