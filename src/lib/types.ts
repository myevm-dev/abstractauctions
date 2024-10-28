export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  brand: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}