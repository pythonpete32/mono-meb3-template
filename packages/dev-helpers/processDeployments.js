const fs = require("fs");
const path = require("path");
const glob = require("glob");

const contractsDir = path.join(__dirname, "..", "..", "apps", "contracts");
const outputDir = path.join(__dirname, "..", "..", "apps", "dapp", "config");

function processDeployments() {
  const deployments = {};

  // Find all run-latest.json files
  const files = glob.sync(`${contractsDir}/broadcast/**/**/run-latest.json`);

  files.forEach((file) => {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    const networkId = Number(data.chain);

    data.transactions.forEach((tx) => {
      if (tx.transactionType === "CREATE") {
        const contractName = tx.contractName;
        const contractAddress = tx.contractAddress;

        if (!deployments[contractName]) {
          deployments[contractName] = {};
        }

        // Use computed property name to ensure networkId is treated as a number
        deployments[contractName] = {
          ...deployments[contractName],
          [networkId]: contractAddress,
        };
      }
    });
  });

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write deployments to file
  const outputPath = path.join(outputDir, "deployments.ts");
  const output = `export const deployments = ${JSON.stringify(deployments, null, 2)} as const;`;
  fs.writeFileSync(outputPath, output);

  console.log(`Deployments processed and written to ${outputPath}`);
}

processDeployments();
