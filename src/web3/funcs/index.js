import Web3 from "web3";
import AmbarJSON from '../ABI/Ambar.json';
import AmbarPlanJSON from '../ABI/AmbarPlan.json';

export const BSC_MAINNET_RPC = "https://data-seed-prebsc-1-s1.binance.org:8545/";

// 97 -> Testnet
// 56 -> Mainnet
export const CHAIN_ID = 97;

// const { ethereum, web3 } = window;


const Contract = require('web3-eth-contract');

Contract.setProvider(BSC_MAINNET_RPC);

// Contract Address
export const Contract_Ambar_Address = "0x2a77B8097B7442CBe55dcEAF7Bb31c0D5eE8B9B0";
export const Contract_Beginner_Plan_Address = "0x7BEd86CF03F32200EAB466c47488955de3E0564c";

// export const Contract_Ambar_Plan_Address = "";

export const loadBasicData = async () => {
    await loadWeb3();

    // Contracts
    const ContractAmbar = new Contract(AmbarJSON.output.abi, Contract_Ambar_Address);
    const ContractBeginnerPlan = new Contract(AmbarPlanJSON.output.abi, Contract_Beginner_Plan_Address);

    const wallet = await getAccount();
    const chainID = await window.web3.eth.getChainId();


    const Ambar = {
        contract: ContractAmbar
    };

    const BeginnerPlan = {
        contract: ContractBeginnerPlan
    };

    console.log("Ambar: ", Ambar);
    console.log("BeginnerPlan: ", BeginnerPlan);

    return {
        wallet,
        chainID,
        Ambar,
        BeginnerPlan
    }
};

export const getAccount = async () => {
    const account = await ethereum.request({ method: 'eth_coinbase' });
    String(account).replaceAll(' ', '');
    return account;
};

export const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            // await ethereum.enable();
            // Acccounts now exposed
            await ethereum.request({ method: 'eth_requestAccounts' })
        } catch (error) {
            // User denied account access...
            console.log('Error: requiring browser wallet: ', error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */ });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

};