import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ethers } from 'ethers';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const auctionContractAddress = '0xdbEf63D610347231B38c141465A3671abb7BCCe5';
const auctionContractABI = [ /* ABI */ ];

const currencyTokenAddress = '0xbFD5FA9e2e319dFBE03Ef42d38248A2B987Bb6c4';

const CreateAuction = () => {
  const now = new Date();
  const defaultStart = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now
  const defaultEnd = new Date(defaultStart.getTime() + 7 * 24 * 60 * 60 * 1000); // One week later

  const [formData, setFormData] = useState({
    assetContract: '',
    tokenId: '',
    minimumBidAmount: '',
    buyoutBidAmount: '',
    timeBufferInSeconds: 0,
    startTimestamp: Math.floor(defaultStart.getTime() / 1000),
    endTimestamp: Math.floor(defaultEnd.getTime() / 1000),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (field: 'startTimestamp' | 'endTimestamp', date: Date | null) => {
    if (date instanceof Date) {
      const timestamp = Math.floor(date.getTime() / 1000); // Convert to Unix timestamp in seconds
      setFormData((prevState) => ({
        ...prevState,
        [field]: timestamp,
      }));
    }
  };

  const handleSubmit = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(auctionContractAddress, auctionContractABI, signer);

    const minimumBidAmountInWei = ethers.parseUnits(formData.minimumBidAmount, 18);
    const buyoutBidAmountInWei = ethers.parseUnits(formData.buyoutBidAmount, 18);

    try {
      const tx = await contract.createAuction(
        formData.assetContract,
        formData.tokenId,
        1,
        currencyTokenAddress,
        minimumBidAmountInWei,
        buyoutBidAmountInWei,
        300,
        250,
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
    <div className="max-w-[760px] mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Create Auction</h1>

      {Object.keys(formData).map((key) => {
        if (key !== 'quantity' && key !== 'bidBufferBps' && key !== 'timeBufferInSeconds') {
          return (
            <div key={key}>
              <label htmlFor={key} className="block font-medium text-[#02de73] mb-2">
                {key === 'assetContract'
                  ? 'NFT Contract Address'
                  : key === 'minimumBidAmount'
                  ? 'Starting Bid Amount'
                  : key === 'buyoutBidAmount'
                  ? 'Buy Now Price'
                  : key.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
              {key === 'startTimestamp' || key === 'endTimestamp' ? (
                <div className="flex items-center relative">
                  <FaCalendarAlt
                    className="absolute left-2 top-2 text-[#02de73] cursor-pointer"
                    onClick={() => document.getElementById(`${key}-datepicker`)?.click()} // Simulates click on DatePicker
                  />
                  <DatePicker
                    id={`${key}-datepicker`}
                    selected={
                      typeof formData[key as keyof typeof formData] === 'number'
                        ? new Date((formData[key as keyof typeof formData] as number) * 1000)
                        : null
                    }
                    onChange={(date: Date) => handleDateChange(key as 'startTimestamp' | 'endTimestamp', date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full pl-8" // Add padding for the calendar icon
                  />
                </div>
              ) : (
                <Input
                  id={key}
                  name={key}
                  type={key === 'tokenId' || key === 'minimumBidAmount' || key === 'buyoutBidAmount' ? 'number' : 'text'}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={
                    key === 'minimumBidAmount'
                      ? 'Enter Starting Bid'
                      : key === 'buyoutBidAmount'
                      ? 'Enter Buy Now Price'
                      : `Enter ${key}`
                  }
                />
              )}
            </div>
          );
        }
      })}

      <Button onClick={handleSubmit} className="bg-[#02de73] text-black w-full">
        Create Auction
      </Button>
    </div>
  );
};

export default CreateAuction;
