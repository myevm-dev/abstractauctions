import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { getProductById, getSimilarProducts } from '@/lib/products';
import { toast } from '@/components/ui/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
                    ? 'fill-neutral-900 text-neutral-900'
                    : 'text-neutral-300'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground">
              ({product.rating})
            </span>
          </div>

          <div className="text-2xl font-bold text-neutral-900">
            ${product.price.toFixed(2)}
          </div>

          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-neutral-900 hover:bg-neutral-800 text-white"
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
              <CarouselItem 
                key={product.id} 
                className="md:basis-1/2 lg:basis-1/4 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded">
                      View Details
                    </span>
                  </div>
                </div>
                <h3 className="mt-2 font-semibold">{product.name}</h3>
                <p className="text-neutral-900 font-bold">${product.price.toFixed(2)}</p>
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