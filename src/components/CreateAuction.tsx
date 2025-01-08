import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ethers } from 'ethers';  // Import ethers as usual

// Destructure parseUnits from ethers
const { parseUnits } = ethers;

// Smart contract ABI and address (same as before)
const auctionContractAddress = '0xdbEf63D610347231B38c141465A3671abb7BCCe5';
const auctionContractABI = [
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

// Predefined currency token address
const currencyTokenAddress = '0xbFD5FA9e2e319dFBE03Ef42d38248A2B987Bb6c4';

const CreateAuction = () => {
  const [formData, setFormData] = useState({
    assetContract: '',
    tokenId: 0,
    minimumBidAmount: 0,
    buyNowPrice: 0,  // Changed to buyNowPrice for clarity
    startTimestamp: 0,
    endTimestamp: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Convert `minimumBidAmount` and `buyNowPrice` to the smallest unit (using 18 decimals)
    const minimumBidAmountInWei = parseUnits(formData.minimumBidAmount.toString(), 18);
    const buyNowPriceInWei = parseUnits(formData.buyNowPrice.toString(), 18);

    try {
      const tx = await contract.createAuction(
        formData.assetContract,
        formData.tokenId,
        1, // Always 1 quantity
        currencyTokenAddress, // Use the predefined currency token address
        minimumBidAmountInWei,
        buyNowPriceInWei,  // Buy Now Price instead of Buyout Bid Amount
        300, // Fixed buffer time of 300 seconds
        250, // Always 250 bps for bid buffer
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Create Auction</h1>

      {Object.keys(formData).map((key) => {
        if (key !== 'quantity' && key !== 'timeBufferInSeconds' && key !== 'bidBufferBps') {  // Skip these fields
          return (
            <div key={key}>
              <label htmlFor={key} className="block font-medium">
                {key === 'assetContract' ? 'NFT Contract Address' : key.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
              <Input
                id={key}
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
              />
            </div>
          );
        }
      })}

      {/* Submit Button */}
      <Button onClick={handleSubmit} className="bg-[#02de73] text-black w-full">
        Create Auction
      </Button>
    </div>
  );
};

export default CreateAuction;
