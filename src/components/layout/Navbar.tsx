import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/CartDrawer";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* "Abstract Auctions" text now links to home with desired color */}
          <Link to="/" className="text-2xl font-bold text-[#02de73]">
            Abstract Auctions
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm hover:text-brand-600 transition-colors">Auctions</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
       
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
