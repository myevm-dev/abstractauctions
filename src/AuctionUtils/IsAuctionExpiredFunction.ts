// IsAuctionExpiredFunction.ts

// Define the structure for the auction expiration status
export interface IsAuctionExpiredResponse {
    isExpired: boolean;  // Boolean indicating if the auction is expired
  }
  
  // Define the input parameters for the isAuctionExpired function
  export interface IsAuctionExpiredParams {
    _auctionId: number;
  }
  