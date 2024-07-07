import Web3 from 'web3';
import VotingContract from './contracts/Voting.json';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545'); // Update port as per your configuration

// Replace 'YOUR_CONTRACT_ADDRESS' with your actual contract address
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const instance = new web3.eth.Contract(
  VotingContract.abi as any, // Use 'any' or cast to 'any' if TypeScript complains
  contractAddress
);

export { web3, instance };
