import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  useReadSimpleStorageGet,
  useWriteSimpleStorageSet,
} from "../../../components/generated";
import { useWaitForTransactionReceipt } from "wagmi";

export const useSimpleStorage = (initialData: string) => {
  const [status, setStatus] = useState<string | null>(null);
  const toastId = useRef<string | number | null>(null);

  const { data: simpleStorageData } = useReadSimpleStorageGet({
    query: { initialData, refetchInterval: 5000 },
  });

  const {
    data: hash,
    isPending,
    writeContract,
    isError,
  } = useWriteSimpleStorageSet();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isError) {
      setStatus("Transaction Error!");
      toastId.current = toast.error("Transaction Error!");
    } else if (isPending) {
      setStatus("Transaction pending. Check your wallet.");
      toastId.current = toast.loading(
        "Transaction pending. Check your wallet."
      );
    } else if (isConfirming) {
      setStatus("Transaction confirming...");
      if (toastId.current) {
        toast.loading("Transaction confirming...", { id: toastId.current });
      }
    } else if (isConfirmed) {
      setStatus("Transaction confirmed!");
      if (toastId.current) {
        toast.success("Value has been updated successfully.", {
          id: toastId.current,
        });
      }
      toastId.current = null; // Reset the toast ID after completion
    }
  }, [isPending, isConfirming, isConfirmed, isError]);

  const setValue = async (newValue: string) => {
    try {
      writeContract({ args: [newValue] });
    } catch (error) {
      console.error("Error writing contract:", error);
      setStatus("Error occurred while setting new value.");
      if (toastId.current) {
        toast.error("Failed to update the value. Please try again.", {
          id: toastId.current,
        });
      } else {
        toast.error("Failed to update the value. Please try again.");
      }
      toastId.current = null; // Reset the toast ID after error
    }
  };

  return {
    currentValue: simpleStorageData,
    setValue,
    status,
    isProcessing: isPending || isConfirming,
  };
};
