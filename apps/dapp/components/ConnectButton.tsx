"use client";

import React from "react";
import { ConnectKitButton } from "connectkit";
import { Button } from "@ui/components/button";
import { Wallet } from "lucide-react";

const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName }) => {
        return (
          <Button onClick={show} className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            {isConnected ? (
              <span>
                {ensName ??
                  (address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : "")}
              </span>
            ) : isConnecting ? (
              <span>Connecting...</span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectButton;
