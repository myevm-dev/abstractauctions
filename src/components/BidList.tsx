import { useState } from 'react';
import { Button } from '@/components/ui/button';

const BidList = ({ bids }) => {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-xl font-bold mb-4">Current Bids</h3>
      <div className="space-y-4">
        {bids.length > 0 ? (
          bids.map((bid, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="text-lg">{bid.username}</div>
              <div className="text-[#02de73] font-bold">${bid.amount}</div>
            </div>
          ))
        ) : (
          <p>No bids yet</p>
        )}
      </div>
      <Button className="w-full mt-4 bg-[#02de73] hover:bg-neutral-800 text-black">
        Place Your Bid
      </Button>
    </div>
  );
};

export default BidList;
