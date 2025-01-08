import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
import BidList from '@/components/BidList'; // Import BidList

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const similarProducts = product ? getSimilarProducts(product) : [];
  const addItem = useCartStore((state) => state.addItem);
  const [isZoomed, setIsZoomed] = useState(false);

  // Sample bids for now (you can replace this with actual bid data)
  const bids = [
    { username: 'User1', amount: 120 },
    { username: 'User2', amount: 150 },
    { username: 'User3', amount: 130 },
  ];

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

  const handleWrapPENGU = () => {
    toast({
      title: "Wrap PENGU",
      description: "PENGU has been wrapped successfully.",
    });
  };

  const handleUnwrapBcPENGU = () => {
    toast({
      title: "Unwrap bcPENGU",
      description: "bcPENGU has been unwrapped successfully.",
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

          <div className="text-2xl font-bold text-[#00ff99]">
            ${product.price.toFixed(2)}
          </div>

          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleAddToCart}
              className="bg-[#02de73] hover:bg-neutral-800 text-black"
            >
              Bid
            </Button>
            <Button
              onClick={handleWrapPENGU}
              className="bg-[#02de73] hover:bg-neutral-800 text-black"
            >
              Wrap PENGU
            </Button>
            <Button
              onClick={handleUnwrapBcPENGU}
              className="bg-[#02de73] hover:bg-neutral-800 text-black"
            >
              Unwrap bcPENGU
            </Button>
          </div>
        </div>
      </div>

      {/* Current Bids Section */}
      <BidList bids={bids} />

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">More Auctions</h2>
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
                <p className="text-[#02de73] font-bold">${product.price.toFixed(2)}</p>
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
