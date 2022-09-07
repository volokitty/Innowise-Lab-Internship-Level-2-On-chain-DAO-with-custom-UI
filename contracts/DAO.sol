// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';

import './interfaces/IToken.sol';

contract DAO is Ownable {
    struct Voting {
        address author;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 pos;
        uint256 neg;
    }

    IToken tokenContract;

    Voting[] public votings;

    constructor() {}

    function vote(uint256 _amount) external {
        require(votings.length > 0, 'There is no voting');
        require(block.timestamp < votings[votings.length - 1].endTime, 'The voting has ended');
        require(_amount > 0, 'Send more than zero to vote');
        require(tokenContract.balanceOf(msg.sender) >= _amount, 'Not enough tokens to vote');

        tokenContract.burnFrom(msg.sender, _amount);
    }

    function createVoting(
        string calldata _description,
        // uint8[9] calldata _uniqueParameterValues,
        uint256 _votingTime
    ) external {
        require(votings.length == 0 || votings[votings.length - 1].endTime < block.timestamp);

        uint256 votingTime = _votingTime;

        if (votingTime < 5 minutes) {
            votingTime = 5 minutes;
        }

        votings.push(
            Voting({
                author: msg.sender,
                description: _description,
                startTime: block.timestamp,
                endTime: block.timestamp + votingTime,
                pos: 0,
                neg: 0
            })
        );
    }

    function setTokenContract(address _addr) public onlyOwner {
        tokenContract = IToken(_addr);
    }
}
