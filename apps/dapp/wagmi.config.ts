import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import { deployments } from "./config/deployments";

export default defineConfig({
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
