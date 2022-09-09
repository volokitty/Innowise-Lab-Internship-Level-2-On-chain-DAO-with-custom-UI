// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';

import './interfaces/IToken.sol';
import './interfaces/INFT.sol';

contract DAO is Ownable {
    enum VotingType {
        TOKEN,
        NFT
    }

    struct Vote {
        bool isPositive;
        uint256 amount;
    }

    struct Voting {
        address author;
        VotingType votingType;
        string description;
        uint8[9] uniqueParameterValues;
        uint256 startTime;
        uint256 endTime;
        uint256 positive;
        uint256 negative;
        bytes32 hash;
    }

    IToken tokenContract;
    INFT nftContract;

    Voting[] public votings;
    uint256 public lastVotingIndex;

    mapping(bytes32 => mapping(address => Vote)) public votingHashToVoters;

    function isVotingAccepted(uint256 _votingIndex) public view returns (bool) {
        Voting memory voting = votings[_votingIndex];

        if (voting.positive > voting.negative) {
            return true;
        }

        return false;
    }

    function addVote(uint256 _amount, bool _isPositive) private {
        votingHashToVoters[votings[lastVotingIndex].hash][msg.sender] = Vote({
            isPositive: _isPositive,
            amount: _amount
        });
    }

    function tokenVote(uint256 _amount, bool _isPositive) private {
        require(_amount > 0, 'Send more tokens than zero to vote');
        require(tokenContract.balanceOf(msg.sender) >= _amount, 'Not enough tokens to vote');

        tokenContract.burnFrom(msg.sender, _amount);

        if (_isPositive) {
            votings[lastVotingIndex].positive += _amount;
        } else {
            votings[lastVotingIndex].negative += _amount;
        }

        addVote(_amount, _isPositive);
    }

    function nftVote(bool _isPositive) private {
        require(
            nftContract.balanceOf(msg.sender) > 0,
            "Can't vote because there is no nft on balance"
        );

        uint256 nextTokenId = nftContract.getNextTokenId();
        uint256 amount = 0;

        for (uint256 tokenId = 0; tokenId < nextTokenId; tokenId++) {
            if (nftContract.ownerOf(tokenId) == msg.sender) {
                amount += nftContract.getTokenRarity(tokenId);
            }
        }

        if (_isPositive) {
            votings[lastVotingIndex].positive += amount;
        } else {
            votings[lastVotingIndex].negative += amount;
        }

        addVote(amount, _isPositive);
    }

    function vote(uint256 _amount, bool _isPositive) external {
        require(votings.length > 0, 'There is no voting');
        require(block.timestamp < votings[lastVotingIndex].endTime, 'The voting has ended');
        require(
            votingHashToVoters[votings[lastVotingIndex].hash][msg.sender].amount == 0,
            "Can't vote again"
        );

        VotingType votingType = votings[lastVotingIndex].votingType;

        if (votingType == VotingType.TOKEN) {
            tokenVote(_amount, _isPositive);
        } else if (votingType == VotingType.NFT) {
            nftVote(_isPositive);
        } else {
            revert('Unknown type of voting');
        }
    }

    function createVoting(
        string calldata _description,
        uint8[9] calldata _uniqueParameterValues,
        uint256 _votingTime,
        VotingType _votingType
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
                votingType: _votingType,
                description: _description,
                uniqueParameterValues: _uniqueParameterValues,
                startTime: block.timestamp,
                endTime: block.timestamp + votingTime,
                positive: 0,
                negative: 0,
                hash: keccak256(
                    abi.encode(
                        msg.sender,
                        _votingType,
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

    function setNFTContract(address _addr) public onlyOwner {
        nftContract = INFT(_addr);
    }

    function getVotingsCount() public view returns (uint256) {
        return votings.length;
    }

    function isVotingEnded() public view returns (bool) {
        if (getVotingsCount() > 0 && block.timestamp > votings[lastVotingIndex].endTime) {
            return true;
        }

        return false;
    }

    function getLastVotingIndex() public view returns (uint256) {
        return lastVotingIndex;
    }

    function getLastVotingUniqueParameters() public view returns (uint8[9] memory) {
        require(getVotingsCount() > 0, "There hasn't been votings yet");
        require(isVotingEnded(), "The voting hasn't ended");

        return votings[lastVotingIndex].uniqueParameterValues;
    }
}
