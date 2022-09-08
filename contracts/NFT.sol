// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import './interfaces/IToken.sol';
import './interfaces/IDAO.sol';

contract NFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _tokenRarityIndexCounter;

    uint8[9] uniqueParameterValues = [1, 1, 2, 6, 2, 3, 4, 6, 5];

    mapping(uint256 => uint8) tokenIdToRarity;

    IToken tokenContract;
    IDAO daoContract;

    constructor() ERC721('NFT', 'DAON') {}

    function needToUpdateUniqueParameterValues() private view returns (bool) {
        uint8[9] memory daoUniqueParameterValues = daoContract.getLastVotingUniqueParameters();

        for (uint256 i = 0; i < 9; i++) {
            if (uniqueParameterValues[i] != daoUniqueParameterValues[i]) {
                return true;
            }
        }

        return false;
    }

    function setUniqueParameterValues(uint8[9] memory _uniqueParameterValues) private {
        uniqueParameterValues = _uniqueParameterValues;
        _tokenRarityIndexCounter.reset();
    }

    function safeMint() external payable {
        require(msg.value > 0, 'The amount sent must be greater than zero');

        if (daoContract.isVotingEnded() && needToUpdateUniqueParameterValues()) {
            setUniqueParameterValues(daoContract.getLastVotingUniqueParameters());
        }

        tokenContract.mint(msg.sender, msg.value);

        uint256 tokenId = _tokenIdCounter.current();
        uint256 tokenRarityIndex = _tokenRarityIndexCounter.current();

        tokenIdToRarity[tokenId] = uniqueParameterValues[tokenRarityIndex];

        if (tokenRarityIndex == 8) {
            _tokenRarityIndexCounter.reset();
        } else {
            _tokenRarityIndexCounter.increment();
        }

        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function getTokenRarity(uint256 _tokenId) public view returns (uint8) {
        return tokenIdToRarity[_tokenId];
    }

    function getUniqueParameterValues() public view returns (uint8[9] memory) {
        return uniqueParameterValues;
    }

    function setTokenContract(address _addr) public onlyOwner {
        tokenContract = IToken(_addr);
    }

    function setDAOContract(address _addr) public onlyOwner {
        daoContract = IDAO(_addr);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function transferToOwner() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
