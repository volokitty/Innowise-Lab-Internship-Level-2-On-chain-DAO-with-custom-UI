import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  paths: {
    artifacts: '../src/artifacts',
  },
};

export default config;
