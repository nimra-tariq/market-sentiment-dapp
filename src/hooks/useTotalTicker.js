import { useContractRead } from "wagmi";
import {
  MARKET_SENTIMENT_CONTRACT_ADDRESS,
  MARKET_SENTIMENT_CONTRACT_ABI,
} from "../constants";

const useTotalTicker = () => {
  const { data: tickers } = useContractRead({
    addressOrName: MARKET_SENTIMENT_CONTRACT_ADDRESS,
    contractInterface: MARKET_SENTIMENT_CONTRACT_ABI,
    functionName: "totalTicker",
  });
  return { tickers: tickers ? tickers : 0 };
};

export default useTotalTicker;
