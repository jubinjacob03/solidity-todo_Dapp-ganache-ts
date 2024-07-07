import web3 from './web3';
import { AbiItem } from 'web3-utils';
import Voting from './contracts/Voting.json';

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const instance = new web3.eth.Contract(
  Voting.abi as AbiItem[],
  contractAddress
);

export default instance;
