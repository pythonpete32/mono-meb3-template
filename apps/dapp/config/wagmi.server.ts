import { http, createConfig } from "@wagmi/core";
import { mainnet, sepolia } from "@wagmi/core/chains";

export const serverConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    // 💩 TODO: make a custom chain for tenderly, dont use mainnet
    [mainnet.id]: http(process.env.TENDERLY_RPC),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`
    ),
  },
});
