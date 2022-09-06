// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

interface IToken {
    function mint(address to, uint256 amount) external;
}

contract DAONFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _tokenRarityIndexCounter;

    uint8[9] _uniqueParameterValues = [1, 1, 2, 6, 2, 3, 4, 6, 5];

    mapping(uint256 => uint8) tokenIdToRarity;
    IToken tokenContract;

    constructor() ERC721('DAONFT', 'DAON') {}

    function safeMint() external payable {
        require(msg.value > 0, 'The amount sent must be greater than zero');

        tokenContract.mint(msg.sender, msg.value);

        uint256 tokenId = _tokenIdCounter.current();
        uint256 tokenRarityIndex = _tokenRarityIndexCounter.current();

        tokenIdToRarity[tokenId] = _uniqueParameterValues[tokenRarityIndex];

        if (tokenRarityIndex == 8) {
            _tokenRarityIndexCounter.reset();
        } else {
            _tokenRarityIndexCounter.increment();
        }

        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function getTokenRarity(uint256 tokenId) public view returns (uint8) {
        return tokenIdToRarity[tokenId];
    }

    function getUniqueParameterValues() public view returns (uint8[9] memory) {
        return _uniqueParameterValues;
    }

    function setTokenContract(address _addr) public onlyOwner {
        tokenContract = IToken(_addr);
    }
}
