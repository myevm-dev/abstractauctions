// src/lib/thirdwebClient.ts

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Create the client using your clientId (get it from the thirdweb dashboard)
const client = createThirdwebClient({
  clientId: "a8f236c4b49ca3406f2591f49d0cc999", // Replace with your actual clientId
});

// Connect to your contract using the provided contract address
const contract = getContract({
  client,
  chain: defineChain(11124), // Replace with the appropriate chainId if necessary
  address: "0xdbEf63D610347231B38c141465A3671abb7BCCe5", // The contract address
});

export { client, contract };
