import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  MARKET_SENTIMENT_CONTRACT_ABI,
  MARKET_SENTIMENT_CONTRACT_ADDRESS,
} from "../constants";

const useAddTicker = (ticker) => {
  const { config } = usePrepareContractWrite({
    addressOrName: MARKET_SENTIMENT_CONTRACT_ADDRESS,
    contractInterface: MARKET_SENTIMENT_CONTRACT_ABI,
    functionName: "addTicker",
    args: ticker,
  });
  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite(config);

  const { data: trxData, isLoading: isTrxLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  const loading = isLoading || isTrxLoading || (data && !trxData);

  return {
    data,
    isError,
    addTicker: () => write(),
    isSuccess,
    loading,
    error,
  };
};

export default useAddTicker;
