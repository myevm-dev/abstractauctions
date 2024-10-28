import { Star } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="product-card group">
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              {product.rating}
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-brand-600">
              ${product.price.toFixed(2)}
            </span>
            <Button
              onClick={handleAddToCart}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;