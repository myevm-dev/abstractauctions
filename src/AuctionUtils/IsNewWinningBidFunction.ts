// IsNewWinningBidFunction.ts

// Define the structure for the response indicating if the bid is the new winning bid
export interface IsNewWinningBidResponse {
    isNewWinningBid: boolean;  // Boolean indicating if the bid is a new winning bid
  }
  
  // Define the input parameters for the isNewWinningBid function
  export interface IsNewWinningBidParams {
    _auctionId: number;  // Auction ID
    _bidAmount: number;   // Bid amount to check
  }
  