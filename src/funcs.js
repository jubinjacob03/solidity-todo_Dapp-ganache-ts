import TodoListJSON from '../build/contracts/TodoList.json';
import Web3 from 'web3';
var contract = require('@truffle/contract');

export const load = async () => {
    await loadWeb3();
    const addressAccount = await loadAccount();
    const { todoContract, tasks } = await loadContract(addressAccount);

    return { addressAccount, todoContract, tasks };
};

const loadTasks = async (todoContract, addressAccount) => {
    const tasksCount = await todoContract.tasksCount(addressAccount);
    const tasks = [];
    for (var i = 0; i < tasksCount; i++) {
        const task = await todoContract.tasks(addressAccount, i);
        tasks.push(task);
    }
    return tasks
};

const loadContract = async (addressAccount) => {
    const theContract = contract(TodoListJSON);
    theContract.setProvider(web3.eth.currentProvider);
    const todoContract = await theContract.deployed();
    const tasks = await loadTasks(todoContract, addressAccount);

    return { todoContract, tasks }
};

const loadAccount = async () => {
    let addressAccount = await web3.eth.getCoinbase();
    while (!addressAccount) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        addressAccount = await web3.eth.getCoinbase();
    }
    return addressAccount;
};

const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};
