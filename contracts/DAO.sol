// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';

import './interfaces/IToken.sol';

contract DAO is Ownable {
    struct Vote {
        bool isPositive;
        uint256 amount;
    }

    struct Voting {
        address author;
        string description;
        uint8[9] uniqueParameterValues;
        uint256 startTime;
        uint256 endTime;
        uint256 positive;
        uint256 negative;
        bytes32 hash;
    }

    IToken tokenContract;

    Voting[] public votings;
    uint256 public lastVotingIndex;

    mapping(bytes32 => mapping(address => Vote)) public votingHashToVoters;

    function vote(uint256 _amount, bool isPositive) external {
        require(votings.length > 0, 'There is no voting');
        require(block.timestamp < votings[lastVotingIndex].endTime, 'The voting has ended');
        require(
            votingHashToVoters[votings[lastVotingIndex].hash][msg.sender].amount == 0,
            "Can't vote again"
        );
        require(_amount > 0, 'Send more tokens than zero to vote');
        require(tokenContract.balanceOf(msg.sender) >= _amount, 'Not enough tokens to vote');

        tokenContract.burnFrom(msg.sender, _amount);

        if (isPositive) {
            votings[lastVotingIndex].positive += _amount;
        } else {
            votings[lastVotingIndex].negative += _amount;
        }

        votingHashToVoters[votings[lastVotingIndex].hash][msg.sender] = Vote({
            isPositive: isPositive,
            amount: _amount
        });
    }

    function createVoting(
        string calldata _description,
        uint8[9] calldata _uniqueParameterValues,
        uint256 _votingTime
    ) external {
        require(
            votings.length == 0 || votings[lastVotingIndex].endTime < block.timestamp,
            'The voting is not ended'
        );

        uint256 votingTime = _votingTime;

        if (votingTime < 5 minutes) {
            votingTime = 5 minutes;
        }

        votings.push(
            Voting({
                author: msg.sender,
                description: _description,
                uniqueParameterValues: _uniqueParameterValues,
                startTime: block.timestamp,
                endTime: block.timestamp + votingTime,
                positive: 0,
                negative: 0,
                hash: keccak256(
                    abi.encode(
                        msg.sender,
                        _description,
                        _uniqueParameterValues,
                        block.timestamp,
                        block.timestamp + votingTime
                    )
                )
            })
        );

        if (votings.length > 1) {
            lastVotingIndex++;
        }
    }

    function setTokenContract(address _addr) public onlyOwner {
        tokenContract = IToken(_addr);
    }

    function getLastVotingUniqueParameters() public view returns (uint8[9] memory) {
        return votings[lastVotingIndex].uniqueParameterValues;
    }

    function isLastVotingEnded() public view returns (bool) {
        require(votings.length > 0, "There hasn't been votings yet");
        return block.timestamp > votings[lastVotingIndex].endTime;
    }
}
