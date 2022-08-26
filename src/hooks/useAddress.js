import { useAccount, useContractRead } from "wagmi";
import {
  MARKET_SENTIMENT_CONTRACT_ABI,
  MARKET_SENTIMENT_CONTRACT_ADDRESS,
} from "../constants";
const useAddress = () => {
  const { address } = useAccount();
  const { data: owner } = useContractRead({
    addressOrName: MARKET_SENTIMENT_CONTRACT_ADDRESS,
    contractInterface: MARKET_SENTIMENT_CONTRACT_ABI,
    functionName: "owner",
  });

  return {
    isOwner: address ? (address === owner ? true : false) : false,
    isConnected: address ? true : false,
  };
};

export default useAddress;
