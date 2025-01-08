import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import CreateAuction from "./pages/MyAuction";
import { Provider, Wallet } from "zksync-ethers"; // Correctly import Wallet
import { ethers } from "ethers"; // Correctly import ethers

// Set up Abstract Chain's provider (replace with actual Abstract URL)
const provider = new Provider("https://api.testnet.abs.xyz"); // Update with the correct Abstract endpoint
const wallet = new Wallet(ethers.Wallet.createRandom().privateKey, provider);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar wallet={wallet} /> {/* Pass wallet to Navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/create-auction" element={<CreateAuction />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
