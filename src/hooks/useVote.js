import { useContractWrite, usePrepareContractWrite } from "wagmi";
import {
  MARKET_SENTIMENT_CONTRACT_ABI,
  MARKET_SENTIMENT_CONTRACT_ADDRESS,
} from "../constants";

const useVote = (ticker, voteStatus) => {
  const { config } = usePrepareContractWrite({
    addressOrName: MARKET_SENTIMENT_CONTRACT_ADDRESS,
    contractInterface: MARKET_SENTIMENT_CONTRACT_ABI,
    functionName: "vote",
    args: [ticker, voteStatus],
  });
  const { data, isLoading, isSuccess, isError,error, status, write } =
    useContractWrite(config);
  return {
    data,
    isLoading,
    isError,
    error,
    status,
    vote: (voteStatus) =>
      write({
        recklesslySetUnpreparedArgs: [ticker, voteStatus],
      }),
    isSuccess,
  };
};

export default useVote;
