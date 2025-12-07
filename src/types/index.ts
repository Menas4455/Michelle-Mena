export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  imageUrl: string;
  category: string;
  tags: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  inStock: boolean;
  hasDiscount?: boolean;
  freeShipping?: boolean;
  hasWarranty?: boolean;
  vipAccess?: boolean;
}

export interface ThemeColors {
  bg: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  cardBg: string;
  border: string;
  gradient: string;
  buttonPrimary: string;
  buttonHover: string;
  accentGradient: string;
  overlay: string;
  particleOpacity: string;
}