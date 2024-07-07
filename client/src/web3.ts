import Web3 from 'web3';

const getWeb3 = () =>
  new Promise<Web3>((resolve, reject) => {
    window.addEventListener('load', async () => {
      if ((window as any).ethereum) {
        const web3 = new Web3((window as any).ethereum);
        try {
          await (window as any).ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if ((window as any).web3) {
        const web3 = (window as any).web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      } else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
