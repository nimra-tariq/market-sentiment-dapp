import "./App.css";
import Header from "./components/Header";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { goerliTestnet } from "./constants/index";
import CoinContainer from "./components/CoinContainer";
import { publicProvider } from "wagmi/providers/public";
function App() {
  const { provider, chains } = configureChains(
    [chain.mainnet, goerliTestnet],
    [
      jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "MarketSentiment  Dapp",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Header></Header>
          <CoinContainer></CoinContainer>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
