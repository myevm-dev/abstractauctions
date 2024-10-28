import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold">TechStore</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm hover:text-brand-600 transition-colors">Home</Link>
            <Link to="/products" className="text-sm hover:text-brand-600 transition-colors">Products</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;