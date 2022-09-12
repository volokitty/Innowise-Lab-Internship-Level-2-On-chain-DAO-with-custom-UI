import hre from 'hardhat';
import { deployContracts } from './deploy';

async function main() {
  await hre.run('node');
  await deployContracts();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
