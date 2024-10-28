import { useState, useEffect } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/lib/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductList = () => {
  const [sortBy, setSortBy] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let sorted = [...products];

    // Apply price filter
    if (minPrice !== "" || maxPrice !== "") {
      sorted = sorted.filter((product) => {
        const price = product.price;
        const min = minPrice === "" ? Number.MIN_SAFE_INTEGER : parseFloat(minPrice);
        const max = maxPrice === "" ? Number.MAX_SAFE_INTEGER : parseFloat(maxPrice);
        return price >= min && price <= max;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(sorted);
  }, [sortBy, minPrice, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Our Products</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-full md:w-[200px]">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[240px,1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <Label>Price Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main>
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
};

export default ProductList;
