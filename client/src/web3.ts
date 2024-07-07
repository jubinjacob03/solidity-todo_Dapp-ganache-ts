import Web3 from 'web3';

let web3: Web3 | undefined;
let instance: any; // Adjust the type if necessary based on the contract methods

const getWeb3 = () =>
  new Promise<Web3>((resolve, reject) => {
    window.addEventListener('load', async () => {
      if ((window as any).ethereum) {
        web3 = new Web3((window as any).ethereum);
        try {
          await (window as any).ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if ((window as any).web3) {
        web3 = new Web3((window as any).web3.currentProvider);
        console.log("Injected web3 detected.");
        resolve(web3);
      } else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }

      // Initialize contract instance here if needed
      if (web3) {
        try {
          const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
          const Voting = require('./contracts/Voting.json'); // Adjust path as needed

          instance = new web3.eth.Contract(
            Voting.abi as any, // Use 'any' or cast to 'any' if TypeScript complains
            contractAddress
          );
        } catch (error) {
          console.error('Error initializing contract instance:', error);
          reject(error);
        }
      }
    });
  });

export { getWeb3, web3, instance };
