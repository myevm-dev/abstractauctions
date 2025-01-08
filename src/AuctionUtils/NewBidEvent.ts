// NewBidEvent.ts

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
  
  // Define the structure for the NewBid event
  export interface NewBidEvent {
    auctionId: number;      // Auction ID
    bidder: string;         // Address of the bidder
    assetContract: string;  // Asset contract address
    bidAmount: number;      // Bid amount
    auction: Auction;       // Auction details
  }
  