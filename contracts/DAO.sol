// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './DAONFT.sol';
import './DAOToken.sol';

contract DAO is DAONFT, DAOToken {
    constructor() DAONFT() DAOToken() {}
}
