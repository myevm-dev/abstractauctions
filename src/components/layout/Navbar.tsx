import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MyBidsDrawer } from "@/components/cart/MyBidsDrawer";
import { Wallet, Provider } from "zksync-ethers";
import { ethers } from "ethers";

// Define the expected prop types for the Navbar component
interface NavbarProps {
  wallet: Wallet; // Accept Wallet prop
}

const Navbar: React.FC<NavbarProps> = ({ wallet }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isDisconnecting, setIsDisconnecting] = useState(false); // State for confirming disconnect

  // Handle wallet connection
  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await ethersProvider.send("eth_accounts", []);
        if (accounts && accounts.length > 0) {
          setIsConnected(true);
          setWalletAddress(accounts[0]);
        }
      } else {
        alert("Please install MetaMask to connect your wallet.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Handle wallet disconnection
  const handleDisconnectWallet = async () => {
    // Ask for confirmation before disconnecting
    const confirmDisconnect = window.confirm("Do you want to disconnect your wallet?");
    if (confirmDisconnect) {
      setIsConnected(false);
      setWalletAddress(null);
      // Optional: You can clear the provider or perform other cleanup tasks here
    }
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-[#02de73]">
            Abstract Auctions
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm hover:text-brand-600 transition-colors">LIVE AUCTIONS</Link>
            <Link to="/create-auction" className="text-sm hover:text-brand-600 transition-colors">MY AUCTIONS</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-10">
          <MyBidsDrawer />
          
          <Button
            onClick={isConnected ? handleDisconnectWallet : handleConnectWallet} // Toggle between connect and disconnect
            className="bg-[#02de73] text-black px-6 py-2 rounded-md"
          >
            {isConnected ? `Connected: ${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}` : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
