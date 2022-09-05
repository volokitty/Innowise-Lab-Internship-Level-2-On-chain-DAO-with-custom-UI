// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract DAONFT is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _tokenRarityIndexCounter;

    uint8[9] _uniqueParameterValues = [1, 1, 2, 6, 2, 3, 4, 6, 5];
    mapping(uint256 => uint8) tokenIdToRarity;

    constructor() ERC721('DAONFT', 'DAON') {}

    function safeMint() public {
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

    function getUniqueParameterValues() public view returns (uint8[9] memory) {
        return _uniqueParameterValues;
    }

    function getTokenRarity(uint256 tokenId) public view returns (uint8) {
        return tokenIdToRarity[tokenId];
    }
}
