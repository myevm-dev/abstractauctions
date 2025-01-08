// AuctionClosedEvent.ts

export interface AuctionClosedEvent {
    auctionId: number;          // The auction ID (indexed)
    assetContract: string;      // The asset contract address (indexed)
    closer: string;             // The closer address (indexed)
    tokenId: number;           // The token ID
    auctionCreator: string;    // The auction creator address
    winningBidder: string;    // The winning bidder address
  }
  