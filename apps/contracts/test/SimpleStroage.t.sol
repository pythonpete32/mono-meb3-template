// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test} from "forge-std/Test.sol";
import {SimpleStorage} from "src/SimpleStroage.sol";

contract SimpleStorageTest is Test {
    // account and modules
    SimpleStorage internal instance;

    function setUp() public {
        instance = new SimpleStorage();
    }

    function testSetAndGet() public {
        string memory testString = "Hello, World!";

        // Test setting the value
        instance.set(testString);

        // Test getting the value
        string memory retrievedString = instance.get();

        // Assert that the retrieved value matches the set value
        assertEq(
            retrievedString,
            testString,
            "Retrieved string should match the set string"
        );
    }

    function testSetEmptyString() public {
        // Test setting an empty string
        instance.set("");
        string memory retrievedString = instance.get();
        assertEq(retrievedString, "", "Retrieved string should be empty");
    }

    function testSetMultipleTimes() public {
        string[3] memory testStrings = ["First", "Second", "Third"];

        for (uint i = 0; i < testStrings.length; i++) {
            instance.set(testStrings[i]);
            string memory retrievedString = instance.get();
            assertEq(
                retrievedString,
                testStrings[i],
                "Retrieved string should match the last set string"
            );
        }
    }
}
