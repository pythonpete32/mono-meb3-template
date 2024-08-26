import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { createPublicClient, http, Hex, parseEther, isAddress } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { z } from "zod";
import { virtualMainnet } from "../config/wagmi/chains";

const client = createPublicClient({
  chain: virtualMainnet,
  transport: http(process.env.TENDERLY_RPC),
});

type TSetBalanceRpc = {
  method: "tenderly_setBalance";
  Parameters: [addresses: Hex[], value: Hex];
  ReturnType: Hex;
};

export const faucetSchema = z.object({
  address: z.string().refine((val) => isAddress(val), {
    message: "Invalid Ethereum address",
  }),
  amount: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num <= 1000;
    },
    { message: "Amount must be a number between 0 and 1000" }
  ),
});

export const useFaucet = () => {
  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();
  const toastIdRef = useRef<string | number>();

  const faucetMutation = useMutation({
    mutationFn: async ({ address, amount }: z.infer<typeof faucetSchema>) => {
      toastIdRef.current = toast.loading("Processing faucet request...");
      const amountInWei = parseEther(amount);
      const hexValue = `0x${amountInWei.toString(16)}`;
      const txHash = await client.request<TSetBalanceRpc>({
        method: "tenderly_setBalance",
        params: [[address], hexValue as Hex],
      });
      return txHash;
    },
    onSuccess: (txHash) => {
      if (toastIdRef.current !== undefined) {
        toast.success("Faucet request successful", {
          id: toastIdRef.current,
          description: `Transaction hash: ${txHash.slice(0, 10)}...`,
          action: {
            label: "View Tx",
            onClick: () => {
              console.log("View transaction:", txHash);
            },
          },
        });
      }
      queryClient.invalidateQueries({ queryKey: ["balance", address] });
    },
    onError: (error: Error) => {
      if (toastIdRef.current !== undefined) {
        toast.error("Faucet request failed", {
          id: toastIdRef.current,
          description: error.message || "Please try again.",
        });
      }
      console.error("Faucet error:", error);
    },
  });

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash: faucetMutation.data,
  });

  useEffect(() => {
    if (isConfirming && toastIdRef.current !== undefined) {
      toast.loading("Confirming transaction...", {
        id: toastIdRef.current,
      });
    }
    if (isConfirmed && receipt && toastIdRef.current !== undefined) {
      toast.success("Transaction confirmed", {
        id: toastIdRef.current,
        description: `Your balance has been updated. Block number: ${receipt.blockNumber}`,
        action: {
          label: "View Tx",
          onClick: () => {
            console.log("View transaction:", receipt.transactionHash);
          },
        },
      });
      toastIdRef.current = undefined; // Reset the ref after the process is complete
    }
  }, [isConfirming, isConfirmed, receipt]);

  const isProcessing = faucetMutation.isPending || isConfirming;

  return {
    address,
    isConnected,
    isProcessing,
    requestFaucet: faucetMutation.mutate,
  };
};
