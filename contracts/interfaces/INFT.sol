// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

interface INFT is IERC721 {
    function getNextTokenId() external view returns (uint256);

    function getTokenRarity(uint256 _tokenId) external view returns (uint8);
}
