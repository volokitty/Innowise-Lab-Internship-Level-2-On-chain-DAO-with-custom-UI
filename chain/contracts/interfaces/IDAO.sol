// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IDAO {
    function getLastVotingUniqueParameters() external view returns (uint8[9] memory);

    function getVotingsCount() external view returns (uint256);

    function isVotingEnded() external view returns (bool);

    function getLastVotingIndex() external view returns (uint256);

    function isVotingAccepted(uint256 _votingIndex) external view returns (bool);
}
