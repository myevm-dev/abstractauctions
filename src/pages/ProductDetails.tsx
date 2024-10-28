import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { getProductById, getSimilarProducts } from '@/lib/products';
import { toast } from '@/components/ui/use-toast';
import ProductCard from '@/components/products/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetails = () => {
  const { id } = useParams();
  const product = getProductById(id || '');
  const similarProducts = product ? getSimilarProducts(product) : [];
  const addItem = useCartStore((state) => state.addItem);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-lg">
          <div
            className={`cursor-zoom-in transition-transform duration-300 ${
              isZoomed ? 'scale-150' : ''
            }`}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground">
              ({product.rating})
            </span>
          </div>

          <div className="text-2xl font-bold text-brand-600">
            ${product.price.toFixed(2)}
          </div>

          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-brand-600 hover:bg-brand-700 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {similarProducts.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductDetails;