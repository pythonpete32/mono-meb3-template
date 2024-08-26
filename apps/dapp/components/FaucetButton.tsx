"use client";

import React, { useState } from "react";
import { z } from "zod";
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
import { Droplet } from "lucide-react";
import { cn } from "@ui/lib/utils";
import { Input } from "@ui/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFaucet, faucetSchema } from "../hooks/useFaucet";

const FaucetButton = () => {
  const [open, setOpen] = useState(false);
  const { address, isConnected, isProcessing, requestFaucet } = useFaucet();

  const form = useForm<z.infer<typeof faucetSchema>>({
    resolver: zodResolver(faucetSchema),
    defaultValues: {
      address: address || "0x",
      amount: "",
    },
  });

  const onSubmit = (values: z.infer<typeof faucetSchema>) => {
    requestFaucet(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          aria-label="Request Tokens"
          variant="neutral"
          disabled={isProcessing}
        >
          <Droplet className={cn("w-5 h-5", isProcessing && "animate-pulse")} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Balance</DialogTitle>
          <DialogDescription>
            Enter the amount of ETH you'd like to set for your wallet (max 1000
            ETH). Note: this sets a NEW balance, not add to it.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the Ethereum address to receive the tokens.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (ETH)</FormLabel>
                  <FormControl>
                    <Input placeholder="0.1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the amount of ETH (max 1000).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isProcessing || !isConnected}>
                {isProcessing ? "Processing..." : "Request Tokens"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FaucetButton;
