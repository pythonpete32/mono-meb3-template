import { createConfig, http } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const clientConfig = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, sepolia],
    transports: {
      // RPC URL for each chain
      // 💩 TODO: make a custom chain for tenderly, dont use mainnet
      [mainnet.id]: http(process.env.NEXT_PUBLIC_TENDERLY_RPC),
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "dApp Template",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);
