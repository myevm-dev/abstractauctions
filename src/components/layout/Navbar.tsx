import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react"; // For handling wallet connection state
import { MyBidsDrawer } from "@/components/cart/MyBidsDrawer"; // Import MyBidsDrawer

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false); // State for wallet connection
  
  // Handle wallet connection toggle
  const handleConnectWallet = () => {
    setIsConnected(true); // Simulate wallet connection for demo
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-[#02de73]">
            Abstract Auctions
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm hover:text-brand-600 transition-colors">Auctions</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-10"> {/* Increased gap to create more space */}
          {/* MyBids Button (without icon) */}
          <MyBidsDrawer />
          
          {/* Connect Wallet Button */}
          <Button
            onClick={handleConnectWallet}
            className="bg-[#02de73] text-black px-6 py-2 rounded-md"
          >
            {isConnected ? "Wallet Connected" : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
