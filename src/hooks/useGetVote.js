import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import {
  MARKET_SENTIMENT_CONTRACT_ABI,
  MARKET_SENTIMENT_CONTRACT_ADDRESS,
} from "../constants";

const useGetVote = (ticker) => {
  const { data } = useContractRead({
    addressOrName: MARKET_SENTIMENT_CONTRACT_ADDRESS,
    contractInterface: MARKET_SENTIMENT_CONTRACT_ABI,
    functionName: "getVote",
    args: ticker,
  });
  return {
    _up: data?.[0] ? Number(ethers.utils.formatUnits(data[0], 0)) : 0,
    _down: data?.[1] ? Number(ethers.utils.formatUnits(data[1], 0)) : 0,
  };
};

export default useGetVote;
