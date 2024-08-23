// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";

import {SimpleStorage} from "src/SimpleStroage.sol";

/// @title DeployScript
contract DeployScript is Script {
    function run() public {
        // Get private key for deployment
        vm.startBroadcast(vm.envUint("PK"));

        // Deploy simpleStroage
        address simpleStroage = address(new SimpleStorage()); // Stop broadcast and log module address
        vm.stopBroadcast();
        console.log("Deploying module at: %s", simpleStroage);
    }
}
