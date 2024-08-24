#!/bin/bash

# Get the directory of the script & source the env
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$SCRIPT_DIR/../.env"


forge create SimpleStorage \
--private-key $PK  \
--rpc-url $TENDERLY_RPC \
--etherscan-api-key $TENDERLY_ACCESS_KEY \
--verify \
--verifier-url "${TENDERLY_RPC}/verify/etherscan"