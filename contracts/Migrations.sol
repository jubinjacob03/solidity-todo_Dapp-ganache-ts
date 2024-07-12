// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  event MigrationCompleted(uint completed);
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
    emit MigrationCompleted(completed);
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function transferOwnership(address newOwner) public restricted {
    require(newOwner != address(0), "New owner is the zero address");
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}
