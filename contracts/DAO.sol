// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';

contract DAO is Ownable {
    enum VotingType {
        TOKENS,
        NFTS
    }

    mapping(address => uint256) addressNFTsPower;

    constructor() {}

    function createTokensVoting() public payable {
        require(msg.value > 0, 'The amount sent must be greater than zero');
    }

    function createNFTsVoting() public {}

    function createVoting(string memory description, VotingType votingType) public {}
}
