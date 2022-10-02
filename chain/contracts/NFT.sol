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

    struct TokenInfo {
        uint256 id;
        uint8 rarity;
    }

    IToken tokenContract;
    IDAO daoContract;

    constructor() ERC721('NFT', 'DAON') {}

    function setUniqueParameterValues(uint8[9] memory _uniqueParameterValues) public {
        for (uint256 i = 0; i < 9; i++) {
            uniqueParameterValues[i] = _uniqueParameterValues[i];
        }

        _tokenRarityIndexCounter.reset();
    }

    function safeMint() external payable {
        require(msg.value > 0, 'The amount sent must be greater than zero');

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

    function getNFTs() public view returns (TokenInfo[] memory) {
        TokenInfo[] memory tokens = new TokenInfo[](balanceOf(msg.sender));
        uint256 nextTokenId = _tokenIdCounter.current();

        uint256 i = 0;
        for (uint256 tokenId = 0; tokenId < nextTokenId; tokenId++) {
            if (ownerOf(tokenId) == msg.sender) {
                tokens[i] = TokenInfo(tokenId, tokenIdToRarity[tokenId]);
                i++;
            }
        }

        return tokens;
    }

    function getTokenRarity(uint256 _tokenId) public view returns (uint8) {
        return tokenIdToRarity[_tokenId];
    }

    function getUniqueParameterValues() public view returns (uint8[9] memory) {
        return uniqueParameterValues;
    }

    function getNextTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
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
