import { http, createConfig } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";
import { virtualMainnet } from "./chains";

export const serverConfig = createConfig({
  chains: [virtualMainnet, sepolia],
  transports: {
    [virtualMainnet.id]: http(process.env.TENDERLY_RPC),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`
    ),
  },
});
