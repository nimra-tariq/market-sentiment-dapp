import MARKET_SENTIMENT_CONTRACT_ABI from "../marketSentimentABI/index.json";
export const MARKET_SENTIMENT_CONTRACT_ADDRESS =
  "0xAb1207074D6A81CAeDc95c257914Fde2564EFEF8";

export const MARKET_SENTIMENT_CONTRACT_ARGS = {
  addressOrName: MARKET_SENTIMENT_CONTRACT_ADDRESS,
  contractInterface: MARKET_SENTIMENT_CONTRACT_ABI,
};
export { MARKET_SENTIMENT_CONTRACT_ABI };
export const goerliTestnet = {
  id: 5,
  name: "Goerli Testnet",
  network: "goerli",
  iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Goerli Testnet",
    symbol: "ETH",
  },
  rpcUrls: {
    default: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  },
  blockExplorers: {
    default: { name: "etherscan", url: "https://snowtrace.io" },
    etherscan: { name: "etherscan", url: "https://goerli.etherscan.io" },
  },
  testnet: true,
};
