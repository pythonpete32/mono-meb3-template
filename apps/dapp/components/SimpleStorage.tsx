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
import { Address } from "viem";

type AddressProp = {
  contractAddress: Address;
};

const SimpleStorageComponent = () => {
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [newValue, setNewValue] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleGet = async () => {
    // Mock get operation
    setStoredValue("42");
    setStatus("Value retrieved successfully");
  };

  const handleSet = async () => {
    // Mock set operation
    if (newValue.trim() === "") {
      setStatus("Please enter a value");
      return;
    }
    setStoredValue(newValue);
    setStatus(`Value set to: ${newValue}`);
    setNewValue("");
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>SimpleStorage Interaction</CardTitle>
        <CardDescription>
          Interact with the SimpleStorage contract
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Button onClick={handleGet} className="w-full">
              Get Stored Value
            </Button>
            {storedValue && <p className="mt-2">Stored Value: {storedValue}</p>}
          </div>
          <div>
            <Input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter new value"
              className="mb-2"
            />
            <Button onClick={handleSet} className="w-full">
              Set New Value
            </Button>
          </div>
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
