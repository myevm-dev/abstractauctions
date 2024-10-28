import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold text-brand-600">Ecom</a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm hover:text-brand-600 transition-colors">Home</a>
            <a href="/products" className="text-sm hover:text-brand-600 transition-colors">Products</a>
            <a href="/categories" className="text-sm hover:text-brand-600 transition-colors">Categories</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;