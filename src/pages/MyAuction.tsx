import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ethers } from 'ethers';
import Navbar from '@/components/Navbar';

// Smart contract ABI (just for reference, add the actual ABI)
const auctionContractAddress = '0xdbEf63D610347231B38c141465A3671abb7BCCe5'; // Replace with your actual contract address
const auctionContractABI = [
  // Add the ABI for the `createAuction` function here
  {
    "constant": false,
    "inputs": [
      { "name": "assetContract", "type": "address" },
      { "name": "tokenId", "type": "uint256" },
      { "name": "quantity", "type": "uint256" },
      { "name": "currency", "type": "address" },
      { "name": "minimumBidAmount", "type": "uint256" },
      { "name": "buyoutBidAmount", "type": "uint256" },
      { "name": "timeBufferInSeconds", "type": "uint64" },
      { "name": "bidBufferBps", "type": "uint64" },
      { "name": "startTimestamp", "type": "uint64" },
      { "name": "endTimestamp", "type": "uint64" }
    ],
    "name": "createAuction",
    "outputs": [
      { "name": "auctionId", "type": "uint256" }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const MyAuctions = () => {
  const [isCreating, setIsCreating] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    assetContract: '',
    tokenId: 0,
    quantity: 1,
    currency: '',
    minimumBidAmount: 0,
    buyoutBidAmount: 0,
    timeBufferInSeconds: 0,
    bidBufferBps: 0,
    startTimestamp: 0,
    endTimestamp: 0
  });

  const handleToggle = (view: string) => {
    setIsCreating(view === 'create');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(auctionContractAddress, auctionContractABI, signer);

    try {
      const tx = await contract.createAuction(
        formData.assetContract,
        formData.tokenId,
        formData.quantity,
        formData.currency,
        formData.minimumBidAmount,
        formData.buyoutBidAmount,
        formData.timeBufferInSeconds,
        formData.bidBufferBps,
        formData.startTimestamp,
        formData.endTimestamp
      );
      alert(`Auction created with ID: ${tx}`);
    } catch (error) {
      console.error('Error creating auction:', error);
      alert('Failed to create auction');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => handleToggle('create')}
          className={`px-6 py-2 font-medium text-lg rounded-md border-2 ${isCreating ? 'bg-[#02de73] text-black border-[#02de73]' : 'bg-neutral-900 text-gray-300 border-[#02de73]'}`}
        >
          Create
        </button>
        <button
          onClick={() => handleToggle('running')}
          className={`px-6 py-2 font-medium text-lg rounded-md border-2 ${!isCreating ? 'bg-[#02de73] text-black border-[#02de73]' : 'bg-neutral-900 text-gray-300 border-[#02de73]'}`}
        >
          Running
        </button>
      </div>

      {/* Conditional Rendering */}
      {isCreating ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-4">Create Auction</h1>

          {/* Auction Inputs */}
          <div>
            <label htmlFor="assetContract" className="block font-medium">NFT Contract Address</label>
            <Input
              id="assetContract"
              name="assetContract"
              value={formData.assetContract}
              onChange={handleChange}
              placeholder="Enter asset contract address"
            />
          </div>

          <div>
            <label htmlFor="tokenId" className="block font-medium">NFT Token ID</label>
            <Input
              id="tokenId"
              name="tokenId"
              value={formData.tokenId}
              onChange={handleChange}
              type="number"
              placeholder="Enter token ID"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block font-medium">Quantity</label>
            <Input
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              type="number"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label htmlFor="currency" className="block font-medium">Currency Address</label>
            <Input
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="Enter currency contract address"
            />
          </div>

          <div>
            <label htmlFor="minimumBidAmount" className="block font-medium">Minimum Bid Amount</label>
            <Input
              id="minimumBidAmount"
              name="minimumBidAmount"
              value={formData.minimumBidAmount}
              onChange={handleChange}
              type="number"
              placeholder="Enter minimum bid"
            />
          </div>

          <div>
            <label htmlFor="buyoutBidAmount" className="block font-medium">Buyout Bid Amount</label>
            <Input
              id="buyoutBidAmount"
              name="buyoutBidAmount"
              value={formData.buyoutBidAmount}
              onChange={handleChange}
              type="number"
              placeholder="Enter buyout bid"
            />
          </div>

          <div>
            <label htmlFor="timeBufferInSeconds" className="block font-medium">Time Buffer (in seconds)</label>
            <Input
              id="timeBufferInSeconds"
              name="timeBufferInSeconds"
              value={formData.timeBufferInSeconds}
              onChange={handleChange}
              type="number"
              placeholder="Enter time buffer"
            />
          </div>

          <div>
            <label htmlFor="bidBufferBps" className="block font-medium">Bid Buffer (Basis Points)</label>
            <Input
              id="bidBufferBps"
              name="bidBufferBps"
              value={formData.bidBufferBps}
              onChange={handleChange}
              type="number"
              placeholder="Enter bid buffer in bps"
            />
          </div>

          <div>
            <label htmlFor="startTimestamp" className="block font-medium">Start Timestamp</label>
            <Input
              id="startTimestamp"
              name="startTimestamp"
              value={formData.startTimestamp}
              onChange={handleChange}
              type="number"
              placeholder="Enter auction start timestamp"
            />
          </div>

          <div>
            <label htmlFor="endTimestamp" className="block font-medium">End Timestamp</label>
            <Input
              id="endTimestamp"
              name="endTimestamp"
              value={formData.endTimestamp}
              onChange={handleChange}
              type="number"
              placeholder="Enter auction end timestamp"
            />
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmit} className="bg-[#02de73] text-black w-full">
            Create Auction
          </Button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">Running Auctions</h1>
          <p>Here will be the list of running auctions...</p>
        </div>
      )}
    </div>
  );
};

export default MyAuctions;
