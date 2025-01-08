import { Product } from './types';

export const products: Product[] = [
  {
    id: "1",
    name: "Auction1",
    description: "...",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    collection: "Collection1",
    brand: "TechPro",
    inStock: true
  },
  {
    id: "2",
    name: "Auction2",
    description: "...",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    collection: "Collection2",
    brand: "AudioMax",
    inStock: true
  },
  {
    id: "3",
    name: "Auction3",
    description: "...",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    collection: "Collection3",
    brand: "TechPro",
    inStock: true
  },
  {
    id: "4",
    name: "Auction4",
    description: "...",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    collection: "Collection4",
    brand: "HomeElite",
    inStock: true
  },
  {
    id: "5",
    name: "Auction5",
    description: "...",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    collection: "Collection5",
    brand: "ComfortPro",
    inStock: true
  },
  {
    id: "6",
    name: "Auction6",
    description: "...",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    collection: "Collection6",
    brand: "TechPro",
    inStock: true
  },
  {
    id: "7",
    name: "Auction7",
    description: "...",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    collection: "Collection7",
    brand: "GameTech",
    inStock: true
  },
  {
    id: "8",
    name: "Auction8",
    description: "...",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb",
    collection: "Collection8",
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