// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

import './interfaces/IToken.sol';

contract NFT is ERC721, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant UNIQUE_PARAMETER_SETTER_ROLE =
        keccak256('UNIQUE_PARAMETER_SETTER_ROLE');

    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _tokenRarityIndexCounter;

    uint8[9] uniqueParameterValues = [1, 1, 2, 6, 2, 3, 4, 6, 5];
    event ChangeUniqueParameterValues(uint8[9] uniqueParameterValues);

    mapping(uint256 => uint8) tokenIdToRarity;

    IToken tokenContract;

    constructor() ERC721('NFT', 'DAON') {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UNIQUE_PARAMETER_SETTER_ROLE, msg.sender);
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

    function getTokenRarity(uint256 _tokenId) public view returns (uint8) {
        return tokenIdToRarity[_tokenId];
    }

    function setUniqueParameterValues(uint8[9] calldata _uniqueParameterValues)
        public
        onlyRole(UNIQUE_PARAMETER_SETTER_ROLE)
    {
        uniqueParameterValues = _uniqueParameterValues;
        _tokenRarityIndexCounter.reset();
        emit ChangeUniqueParameterValues(_uniqueParameterValues);
    }

    function getUniqueParameterValues() public view returns (uint8[9] memory) {
        return uniqueParameterValues;
    }

    function setUniqueParameterSetterRole(address _account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(UNIQUE_PARAMETER_SETTER_ROLE, _account);
    }

    function setTokenContract(address _addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        tokenContract = IToken(_addr);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
