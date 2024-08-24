// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/// @title SimpleStorage
/// @notice A simple contract for storing and retrieving a string value
/// @dev This contract demonstrates basic storage and retrieval operations
contract SimpleStorage {
    /// @notice The stored string data
    /// @dev This variable is private and can only be accessed through the getter function
    string private storedData;

    /// @notice Sets the stored string value
    /// @dev Updates the private storedData variable
    /// @param newValue The new string value to be stored
    function set(string memory newValue) public {
        storedData = newValue;
    }

    /// @notice Retrieves the stored string value
    /// @dev Returns the current value of the private storedData variable
    /// @return The currently stored string value
    function get() public view returns (string memory) {
        return storedData;
    }
}
