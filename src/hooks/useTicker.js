import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import {
  MARKET_SENTIMENT_CONTRACT_ADDRESS,
  MARKET_SENTIMENT_CONTRACT_ABI,
} from "../constants";

const useTicker = (id) => {
  const { data: ticker } = useContractRead({
    addressOrName: MARKET_SENTIMENT_CONTRACT_ADDRESS,
    contractInterface: MARKET_SENTIMENT_CONTRACT_ABI,
    functionName: "tickersArray",
    args: id === 0 ? ethers.utils.parseEther(id.toString()) : id,
  });
  return { ticker: ticker ? ticker : "ETH" };
};

export default useTicker;
