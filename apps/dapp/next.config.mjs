import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./config/env.ts");

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  transpilePackages: ["ui"],
};
