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
  },
  {
    id: "4",
    name: "Premium Coffee Maker",
    description: "Professional-grade coffee maker with temperature control and multiple brewing options.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
    rating: 4.7,
    category: "Home Appliances",
    brand: "HomeElite",
    inStock: true
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support and adjustable features.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505843490578-d3186c8e723e",
    rating: 4.6,
    category: "Furniture",
    brand: "ComfortPro",
    inStock: true
  },
  {
    id: "6",
    name: "4K Gaming Monitor",
    description: "Ultra-wide gaming monitor with high refresh rate and HDR support.",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    rating: 4.9,
    category: "Electronics",
    brand: "TechPro",
    inStock: true
  },
  {
    id: "7",
    name: "Wireless Gaming Mouse",
    description: "High-precision gaming mouse with customizable buttons and RGB lighting.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    rating: 4.4,
    category: "Electronics",
    brand: "GameTech",
    inStock: true
  },
  {
    id: "8",
    name: "Smart Home Security Camera",
    description: "HD security camera with night vision and motion detection.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb",
    rating: 4.2,
    category: "Smart Home",
    brand: "SecureHome",
    inStock: true
  },
  {
    id: "9",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360-degree sound and long battery life.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    rating: 4.6,
    category: "Electronics",
    brand: "AudioMax",
    inStock: true
  },
  {
    id: "10",
    name: "Electric Standing Desk",
    description: "Motorized standing desk with memory presets and cable management.",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1587212805560-48333c1b8e8a",
    rating: 4.7,
    category: "Furniture",
    brand: "ComfortPro",
    inStock: true
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getSimilarProducts = (product: Product) => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
};

export const categories = Array.from(new Set(products.map(product => product.category)));