"use client";

import React from "react";
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
import { useSimpleStorage } from "./useSimpleStorage";

type Props = {
  initialData: string;
};

const SimpleStorageComponent = ({ initialData }: Props) => {
  const { currentValue, setValue, isProcessing } =
    useSimpleStorage(initialData);

  const handleSet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newValue = formData.get("newValue") as string;
    await setValue(newValue);
  };

  return (
    <Card className="w-[350px]" variant="neutral">
      <CardHeader className="text-center">
        <CardTitle>SimpleStorage</CardTitle>
        <CardDescription className="text-center"></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form onSubmit={handleSet}>
            <Input
              type="text"
              name="newValue"
              placeholder="Enter new value"
              className="mb-2"
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isProcessing}
              variant="neutral"
            >
              {isProcessing ? "Processing..." : "Set New Value"}
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter>
        <Alert>
          <AlertDescription className="text-center text-xl ">
            {currentValue}
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
};

export default SimpleStorageComponent;
