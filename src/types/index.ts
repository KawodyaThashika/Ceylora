export interface FlavorProfile {
  aroma: number; // 0-10
  body: number;
  sweetness: number;
  astringency: number;
  finish: number;
}

export interface BrewingGuide {
  temperatureC: number;
  temperatureF: number;
  steepTimeSec: number;
  ratioGrams: number;
  ratioWaterMl: number;
  infusionCount: number;
  sommelierTip: string;
}

export interface TeaProduct {
  id: string;
  name: string;
  sinhalaName?: string;
  subtitle: string;
  category: 'black' | 'green' | 'white' | 'herbal' | 'reserve';
  categoryLabel: string;
  price: number;
  weight: string;
  rating: number;
  reviewCount: number;
  elevation: string;
  estate: string;
  region: string;
  harvestSeason: string;
  grade: string;
  caffeine: 'None' | 'Low' | 'Medium' | 'High';
  tastingNotes: string[];
  description: string;
  story: string;
  imageUrl: string;
  accentColor: string;
  flavorProfile: FlavorProfile;
  brewing: BrewingGuide;
  isBestseller?: boolean;
  isLimited?: boolean;
  organicCertified?: boolean;
}

export interface CartItem {
  product: TeaProduct;
  quantity: number;
  grindOrFormat: 'Whole Leaf Tin' | 'Silk Pyramids (20x)' | 'Refill Pouch';
}

export interface JourneyStage {
  step: number;
  title: string;
  subtitle: string;
  elevation: string;
  timeOfDay: string;
  description: string;
  sensoryNote: string;
  imageUrl: string;
  quote: string;
  quoteAuthor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  location: string;
  teaFav: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Origin & Terroir' | 'Brewing & Storage' | 'Orders & Sustainability';
}
