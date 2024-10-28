import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold">Ecom</a>
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
          
          <ThemeToggle />
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;