import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
            alt="Hero background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Tech Excellence Delivered
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover premium tech products that elevate your digital lifestyle. Quality meets innovation in every purchase.
          </p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 text-lg"
          >
            Explore Products
          </Button>
        </div>
      </div>

      {/* Featured Products Preview */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Professional Laptop"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
              alt="Wireless Headphones"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="Smart Watch"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;