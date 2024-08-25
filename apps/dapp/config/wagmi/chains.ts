import { defineChain } from "viem";

export const virtualMainnet = defineChain({
  id: 69420,
  name: "Virtual Mainnet",
  nativeCurrency: { name: "VETH", symbol: "vETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://virtual.mainnet.rpc.tenderly.co/27e2acc1-3323-4ce4-ba14-aa6d1540c469",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Tenderly Explorer",
      url: "https://virtual.mainnet.rpc.tenderly.co/6b8e5841-ec19-4dd3-a2b5-09e8a141365f",
    },
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    },
    ensUniversalResolver: {
      address: "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
      blockCreated: 16773775,
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601,
    },
  },
});
