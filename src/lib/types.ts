export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  collection: string;
  brand: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}