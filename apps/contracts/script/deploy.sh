#!/bin/bash

# Get the directory of the script & source the env
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$SCRIPT_DIR/../.env"


forge script "${SCRIPT_DIR}/Deploy.s.sol:DeployScript" \
  --rpc-url $TENDERLY_RPC \
  --verify  \
  --verifier-url "${TENDERLY_RPC}/verify/etherscan" \
  --etherscan-api-key $TENDERLY_ACCESS_KEY 
