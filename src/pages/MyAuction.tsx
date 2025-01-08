import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const MyAuctions = () => {
  const [isCreating, setIsCreating] = useState(true); // State to toggle between Create and Running

  const handleToggle = (view) => {
    setIsCreating(view === 'create');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => handleToggle('create')}
          className={`px-6 py-2 font-medium text-lg rounded-md border-2 ${
            isCreating
              ? 'bg-[#02de73] text-black border-[#02de73]'
              : 'bg-neutral-900 text-gray-300 border-[#02de73]'
          }`}
        >
          Create
        </button>
        <button
          onClick={() => handleToggle('running')}
          className={`px-6 py-2 font-medium text-lg rounded-md border-2 ${
            !isCreating
              ? 'bg-[#02de73] text-black border-[#02de73]'
              : 'bg-neutral-900 text-gray-300 border-[#02de73]'
          }`}
        >
          Running
        </button>
      </div>

      {/* Conditional Rendering */}
      {isCreating ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-4">Create Auction</h1>

          {/* Auction Title */}
          <div>
            <label htmlFor="auction-title" className="block font-medium">Auction Title</label>
            <Input
              id="auction-title"
              placeholder="Enter auction title"
            />
          </div>

          {/* Auction Description */}
          <div>
            <label htmlFor="auction-description" className="block font-medium">Auction Description</label>
            <Textarea
              id="auction-description"
              placeholder="Enter auction description"
              rows={4}
            />
          </div>

          {/* Auction Price */}
          <div>
            <label htmlFor="auction-price" className="block font-medium">Starting Price ($)</label>
            <Input
              id="auction-price"
              placeholder="Enter starting price"
              type="number"
            />
          </div>

          {/* Auction Image */}
          <div>
            <label htmlFor="auction-image" className="block font-medium">Auction Image URL</label>
            <Input
              id="auction-image"
              placeholder="Enter image URL"
            />
          </div>

          {/* Submit Button */}
          <Button className="bg-[#02de73] text-black w-full">
            Create Auction
          </Button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">Running Auctions</h1>
          <p>Here will be the list of running auctions...</p>
          {/* Add code for displaying running auctions here */}
        </div>
      )}
    </div>
  );
};

export default MyAuctions;
