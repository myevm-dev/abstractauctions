import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart"; // This could represent bids
import { ScrollArea } from "@/components/ui/scroll-area";

export function MyBidsDrawer() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();

  return (
    <Sheet>
      {/* Trigger button that opens the drawer */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative border-2 border-[#02de73] hover:bg-[#02de73] text-[#02de73] hover:text-white transition-colors py-2 px-8 flex items-center justify-center"
        >
          {/* Removed the icon, only text now */}
          <span className="text-sm">MyBids</span>
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#02de73] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      {/* Sheet Content - This will hold the drawer content */}
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>MyBids ({getTotalItems()} items)</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 py-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-auto"
                      onClick={() => removeItem(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {items.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
