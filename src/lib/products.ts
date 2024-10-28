import { Product } from './types';

export const products: Product[] = [
  {
    id: "1",
    name: "Professional Laptop Pro",
    description: "High-performance laptop perfect for professionals and creatives. Features a stunning display and powerful processor.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    rating: 4.5,
    category: "Electronics",
    brand: "TechPro",
    inStock: true
  },
  {
    id: "2",
    name: "Wireless Comfort Headphones",
    description: "Premium wireless headphones with noise cancellation and exceptional sound quality.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    rating: 4.8,
    category: "Electronics",
    brand: "AudioMax",
    inStock: true
  },
  {
    id: "3",
    name: "Smart Watch Elite",
    description: "Advanced smartwatch with health tracking and seamless connectivity.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    rating: 4.3,
    category: "Wearables",
    brand: "TechPro",
    inStock: true
  }
];