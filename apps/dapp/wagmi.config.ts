import { Config, defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import { deployments } from "./config/deployments";

const config: Config = defineConfig({
  out: "components/generated.ts",
  contracts: [],
  plugins: [
    react(),
    foundry({
      project: "../contracts",
      deployments,
    }),
  ],
});

export default config;
