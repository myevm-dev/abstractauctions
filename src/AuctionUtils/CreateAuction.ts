import { ethers } from 'ethers';
import { MARKETPLACE_CONTRACT_ADDRESS, CURRENCY_TOKEN_ADDRESS, RPC_URL, CHAIN_ID } from './constants';

// Export the createAuction function so it can be used elsewhere
export async function createAuction(
  assetContract: string,
  tokenId: number,
  quantity: number,
  currency: string = CURRENCY_TOKEN_ADDRESS, // Default to the provided currency token
  minimumBidAmount: number,
  buyoutBidAmount: number,
  timeBufferInSeconds: number,
  bidBufferBps: number,
  startTimestamp: number,
  endTimestamp: number,
  account: string,
) {
  try {
    // Set up the provider
    const provider = new ethers.JsonRpcProvider(RPC_URL, CHAIN_ID);

    // Get the signer from the provider
    const signer = await provider.getSigner(account); // Await the signer here

    // Set up the contract ABI and interface
    const abi = [
      "function createAuction(address assetContract, uint256 tokenId, uint256 quantity, address currency, uint256 minimumBidAmount, uint256 buyoutBidAmount, uint64 timeBufferInSeconds, uint64 bidBufferBps, uint64 startTimestamp, uint64 endTimestamp) returns (uint256 auctionId)"
    ];

    // Create the contract instance
    const contract = new ethers.Contract(MARKETPLACE_CONTRACT_ADDRESS, abi, signer);

    // Prepare the auction parameters
    const params = [
      assetContract,
      tokenId,
      quantity,
      currency,
      minimumBidAmount,
      buyoutBidAmount,
      timeBufferInSeconds,
      bidBufferBps,
      startTimestamp,
      endTimestamp,
    ];

    // Call the createAuction function on the smart contract
    const transaction = await contract.createAuction(...params);

    // Wait for the transaction to be mined
    const receipt = await transaction.wait();

    // Extract the transaction hash from the receipt
    const transactionHash = receipt.transactionHash;

    console.log(`Auction created successfully with transaction hash: ${transactionHash}`);

    return { transactionHash };
  } catch (error) {
    console.error("Error creating auction:", error);
    throw error;
  }
}
