export interface NutritionInfo {
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  nutritionInfo: NutritionInfo;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  name: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentId?: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
} 