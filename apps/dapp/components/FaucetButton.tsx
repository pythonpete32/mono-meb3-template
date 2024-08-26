"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { Label } from "@ui/components/ui/label";
import { createPublicClient, Hex, http, parseEther } from "viem";
import { virtualMainnet } from "../config/wagmi/chains";
import { Droplet } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@ui/lib/utils";
import { Input } from "@ui/components/ui/input";
import { z } from "zod";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";

const client = createPublicClient({
  chain: virtualMainnet,
  transport: http(process.env.TENDERLY_RPC),
});

export type TSetBalanceRpc = {
  method: "tenderly_setBalance";
  Parameters: [addresses: Hex[], value: Hex];
  ReturnType: Hex;
};

// Zod schema for amount validation
const amountSchema = z.string().refine(
  (val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0 && num <= 100; // Adjust max value as needed
  },
  { message: "Amount must be a number between 0 and 100" }
);

const FaucetButton = () => {
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  const faucetMutation = useMutation({
    mutationFn: async (amount: string) => {
      const amountInWei = parseEther(amount);
      const hexValue = `0x${amountInWei.toString(16)}`;
      const txHash = await client.request<TSetBalanceRpc>({
        method: "tenderly_setBalance",
        params: [[address!], hexValue as Hex],
      });
      return txHash;
    },
    onSuccess: (txHash) => {
      toast.success("Faucet request successful", {
        description: `Transaction hash: ${txHash.slice(0, 10)}...`,
        action: {
          label: "View Tx",
          onClick: () => {
            // TODO: Add logic to view transaction, e.g., open in block explorer
            console.log("View transaction:", txHash);
          },
        },
      });
      setOpen(false);
      setAmount("");
    },
    onError: (error: Error) => {
      toast.error("Faucet request failed", {
        description: error.message || "Please try again.",
      });
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
    if (isConfirmed && receipt) {
      toast.success("Transaction confirmed", {
        description: `Your balance has been updated. Block number: ${receipt.blockNumber}`,
        action: {
          label: "View Tx",
          onClick: () => {
            // Add logic to view transaction, e.g., open in block explorer
            console.log("View transaction:", receipt.transactionHash);
          },
        },
      });
    }
  }, [isConfirmed, receipt]);
  const handleFaucetRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    try {
      amountSchema.parse(amount);
      faucetMutation.mutate(amount);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0]?.message ?? "Error!");
      }
    }
  };

  const isProcessing = faucetMutation.isPending || isConfirming;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          aria-label="Request Tokens"
          variant="neutral"
          disabled={!isConnected || isProcessing}
        >
          <Droplet className={cn("w-5 h-5", isProcessing && "animate-pulse")} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Tokens</DialogTitle>
          <DialogDescription>
            Enter the amount of ETH you'd like to request from the faucet (max
            100 ETH).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFaucetRequest}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (ETH)
              </Label>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setValidationError(null);
                }}
                className={cn(
                  "col-span-3",
                  validationError && "border-red-500"
                )}
                placeholder="0.1"
              />
            </div>
            {validationError && (
              <p className="text-sm text-red-500 mt-1">{validationError}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isProcessing || !isConnected}>
              {isProcessing ? "Processing..." : "Request Tokens"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FaucetButton;
