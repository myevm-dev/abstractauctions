import { Product } from './types';

export const products: Product[] = [
  {
    id: "1",
    name: "Collection1",
    description: "...",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    rating: 4.5,
    collection: "Electronics",
    brand: "TechPro",
    inStock: true
  },
  {
    id: "2",
    name: "Collection2",
    description: "...",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    rating: 4.8,
    collection: "Electronics",
    brand: "AudioMax",
    inStock: true
  },
  {
    id: "3",
    name: "Collection3",
    description: "...",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    rating: 4.3,
    collection: "Wearables",
    brand: "TechPro",
    inStock: true
  },
  {
    id: "4",
    name: "Collection4",
    description: "...",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    rating: 4.7,
    collection: "Home Appliances",
    brand: "HomeElite",
    inStock: true
  },
  {
    id: "5",
    name: "Collection5",
    description: "...",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    rating: 4.6,
    collection: "Furniture",
    brand: "ComfortPro",
    inStock: true
  },
  {
    id: "6",
    name: "Collection6",
    description: "...",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    rating: 4.9,
    collection: "Electronics",
    brand: "TechPro",
    inStock: true
  },
  {
    id: "7",
    name: "Collection7",
    description: "...",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    rating: 4.4,
    collection: "Electronics",
    brand: "GameTech",
    inStock: true
  },
  {
    id: "8",
    name: "Collection8",
    description: "...",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb",
    rating: 4.2,
    collection: "Smart Home",
    brand: "SecureHome",
    inStock: true
  }
];

export const getProductsByCollection = (collection: string) => {
  return products.filter(product => product.collection === collection);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getSimilarProducts = (product: Product) => {
  return products
    .filter(p => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4);
};

export const collections = Array.from(new Set(products.map(product => product.collection)));