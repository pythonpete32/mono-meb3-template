"use client";

import React, { useState, useEffect } from "react";

import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@ui/components/ui/card";
import { Alert, AlertDescription } from "@ui/components/ui/alert";
import {
  useReadSimpleStorageGet,
  useWriteSimpleStorageSet,
} from "../../../components/generated";
import { useWaitForTransactionReceipt } from "wagmi";

import { ToastAction } from "@ui/components/ui/toast";
import { useToast } from "@ui/components/ui/use-toast";

type Props = {
  initialData: string;
};

const SimpleStorageComponent = ({ initialData }: Props) => {
  const [newValue, setNewValue] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const { data: simpleStorageData } = useReadSimpleStorageGet({
    query: { initialData },
  });

  const { data: hash, isPending, writeContract } = useWriteSimpleStorageSet();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { toast } = useToast();

  useEffect(() => {
    if (isPending) {
      setStatus("Transaction pending. Check your wallet.");
    } else if (isConfirming) {
      setStatus("Transaction confirming...");
    } else if (isConfirmed) {
      setStatus("Transaction confirmed!");
      toast({
        title: "Success",
        description: "Value has been updated successfully.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    }
  }, [isPending, isConfirming, isConfirmed, toast]);

  const handleSet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newValue = formData.get("newValue") as string;
    try {
      writeContract({ args: [newValue] });
      toast({
        title: "Sending",
        description: "Sending transaction",
      });
    } catch (error) {
      console.error("Error writing contract:", error);
      setStatus("Error occurred while setting new value.");
      toast({
        title: "Error",
        description: "Failed to update the value. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-[350px]" variant="neutral">
      <CardHeader>
        <CardTitle>SimpleStorage</CardTitle>
        <CardDescription className="text-center">
          {simpleStorageData}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form onSubmit={handleSet}>
            <Input
              type="text"
              name="newValue"
              placeholder="Enter new value"
              className="mb-2"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || isConfirming}
            >
              {isPending || isConfirming ? "Processing..." : "Set New Value"}
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter>
        {status && (
          <Alert>
            <AlertDescription>{status}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default SimpleStorageComponent;
