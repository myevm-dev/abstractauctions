// NewAuctionEvent.ts

// Define the structure for the Auction tuple
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
    tokenType: number;  // Enum IEnglishAuctions.TokenType, represented as a number
    status: number;     // Enum IEnglishAuctions.Status, represented as a number
  }
  
  // Define the structure for the NewAuction event
  export interface NewAuctionEvent {
    auctionCreator: string;  // Address of the auction creator
    auctionId: number;      // Auction ID
    assetContract: string;  // Asset contract address
    auction: Auction;       // Auction details
  }
  