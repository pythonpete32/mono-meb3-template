import { z } from "zod";

const envVariables = z.object({
  NEXT_PUBLIC_ALCHEMY_ID: z.string(),
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
