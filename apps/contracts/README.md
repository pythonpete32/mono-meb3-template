## Module Template

**A template for building smartcontracts with foundry**

## Using the template

### Install dependencies

```shell
pnpm install
```

### Deploying contracts

1. Import your contracts into the `script/Deploy.s.sol` file.
2. Create a `.env` file in the root directory based on the `.env.example` file and fill in the variables.
3. Run the following command:

```shell
source .env && forge script script/Deploy.s.sol:DeployScript --rpc-url $DEPLOYMENT_RPC --broadcast --sender $DEPLOYMENT_SENDER --verify
```

Your module is now deployed to the blockchain and verified on Etherscan.

If the verification fails, you can manually verify it on Etherscan using the following command:

```shell
source .env && forge verify-contract --chain-id [YOUR_CHAIN_ID] --watch --etherscan-api-key $ETHERSCAN_API_KEY [YOUR_MODULE_ADDRESS] src/[PATH_TO_MODULE].sol:[MODULE_CONTRACT_NAME]
```

## Using this repo

To install the dependencies, run:

```bash
pnpm install
```

To build the project, run:

```bash
pnpm build
```

To run the tests, run:

```bash
pnpm test
```
