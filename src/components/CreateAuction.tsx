import { useState, useEffect } from 'react';
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
    startTimestamp: Math.floor(defaultStart.getTime() / 1000),
    endTimestamp: Math.floor(defaultEnd.getTime() / 1000),
  });

  const [nftData, setNftData] = useState<{ image: string; name: string; description: string } | null>(null);
  const [loadingNft, setLoadingNft] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (field: 'startTimestamp' | 'endTimestamp', date: Date | null) => {
    if (date instanceof Date) {
      const timestamp = Math.floor(date.getTime() / 1000);
      setFormData((prevState) => ({
        ...prevState,
        [field]: timestamp,
      }));
    }
  };

  const fetchNftData = async () => {
    if (!formData.assetContract || !formData.tokenId) return;
    setLoadingNft(true);

    try {
      const response = await fetch(
        `https://api.testnet.abs.xyz/v1/nft/${formData.assetContract}/${formData.tokenId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch NFT data');
      }

      const metadata = await response.json();

      setNftData({
        image: metadata.image || metadata.image_url,
        name: metadata.name || 'Unknown NFT',
        description: metadata.description || 'No description available',
      });
    } catch (error) {
      console.error('Error fetching NFT data:', error);
      setNftData(null);
    } finally {
      setLoadingNft(false);
    }
  };

  useEffect(() => {
    fetchNftData();
  }, [formData.assetContract, formData.tokenId]);

  const handleSubmit = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(auctionContractAddress, auctionContractABI, signer);

    const minimumBidAmountInWei = ethers.parseUnits(formData.minimumBidAmount || '0', 18);
    const buyoutBidAmountInWei = ethers.parseUnits(formData.buyoutBidAmount || '0', 18);

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

      {loadingNft ? (
        <p>Loading NFT...</p>
      ) : nftData ? (
        <div className="p-4 border rounded-md">
          <img src={nftData.image} alt={nftData.name} className="w-full h-auto mb-2" />
          <h2 className="text-xl font-bold">{nftData.name}</h2>
          <p>{nftData.description}</p>
        </div>
      ) : (
        <p>No NFT preview available. Enter contract and token ID to view.</p>
      )}

      {Object.keys(formData).map((key) => {
        const isTimestamp = key === 'startTimestamp' || key === 'endTimestamp';
        const label =
          key === 'assetContract'
            ? 'NFT Contract Address'
            : key === 'minimumBidAmount'
            ? 'Starting Bid Amount'
            : key === 'buyoutBidAmount'
            ? 'Buy Now Price'
            : key.replace(/([A-Z])/g, ' $1').toUpperCase();

        return (
          <div key={key}>
            <label htmlFor={key} className="block font-medium text-[#02de73] mb-2">
              {label}
            </label>
            {isTimestamp ? (
              <div className="flex items-center relative">
                <FaCalendarAlt
                  className="absolute left-2 top-2 text-[#02de73] cursor-pointer"
                  onClick={() => document.getElementById(`${key}-datepicker`)?.click()}
                />
                <DatePicker
                  id={`${key}-datepicker`}
                  selected={new Date((formData[key as keyof typeof formData] as number) * 1000)}
                  onChange={(date: Date) => handleDateChange(key as 'startTimestamp' | 'endTimestamp', date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full pl-8"
                />
              </div>
            ) : (
              <Input
                id={key}
                name={key}
                type="text"
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                placeholder={label}
              />
            )}
          </div>
        );
      })}

      <Button onClick={handleSubmit} className="bg-[#02de73] text-black w-full">
        Create Auction
      </Button>
    </div>
  );
};

export default CreateAuction;
