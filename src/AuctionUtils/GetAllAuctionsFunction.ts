// GetAllAuctionsFunction.ts

// Define the structure of the auction object returned by getAllAuctions
export interface Auction {
    auctionId: number;
    tokenId: number;
    quantity: number;
    minimumBidAmount: number;
    buyoutBidAmount: number;
    timeBufferInSeconds: number;
    bidBufferBps: number;
    startTimestamp: number;
    endTimestamp: number;
    auctionCreator: string;
    assetContract: string;
    currency: string;
    tokenType: number;  // TokenType enum value
    status: number;     // Status enum value
  }
  
  // Define the input parameters for the getAllAuctions function
  export interface GetAllAuctionsParams {
    _startId: number;
    _endId: number;
  }
  