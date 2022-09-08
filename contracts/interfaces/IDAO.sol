// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IDAO {
    function getLastVotingUniqueParameters() external view returns (uint8[9] memory);

    function isVotingEnded() external view returns (bool);
}
