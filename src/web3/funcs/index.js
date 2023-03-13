import { Beginner, Business, Executive, Expert, Premium, Standar } from "@/src/components/Staking/data";
import Web3 from "web3";
import AmbarJSON from '../ABI/Ambar.json';
import AmbarPlanJSON from '../ABI/AmbarPlan.json';
import ERC20_JSON from '../ABI/ERC20.json';
import PAIR_JSON from "../ABI/Pair.json";
import ROUTER_JSON from '../ABI/Router.json';
import { getBNBCurrentPrice } from "./coingecko";
import { getPairInfo } from "./pair";
import { getPlanData } from "./plans";
import { getAllTokensInfo } from "./tokens";

export const BSC_MAINNET_RPC = "https://data-seed-prebsc-1-s1.binance.org:8545/";

// 97 -> Testnet
// 56 -> Mainnet
export const CHAIN_ID = 97;

// const { ethereum, web3 } = window;


const Contract = require('web3-eth-contract');

Contract.setProvider(BSC_MAINNET_RPC);

// Owner Address
export const Owner_Address = "0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5";

// Contract Address
export const Contract_Ambar_Address = "0x2a77B8097B7442CBe55dcEAF7Bb31c0D5eE8B9B0"; // Este contrato no es el mismo que el ERC20 Ambar
export const Contract_Beginner_Plan_Address = "0xf98C14027bA102cb8044CE18A871A099E1e5cBAd"; //"0xe6a7120ba2eB72C72C467051Dd4d1B310C787101"; //"0x7BEd86CF03F32200EAB466c47488955de3E0564c";

// ERC20's
export const Contract_Busd_Address = "0x2E50a44F2C744E2BcDe025028622d6349115D7Bf";
export const Contract_Usdt_Address = "0x24DA85920bbF1be872632aF232ac34a2C5580Ef6";
export const Contract_WBNB_Address = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
export const Contract_Ambar_ERC20_Address = "0x0bcaEaB8160482801D5bC3f57ee5ED5caB2458ae";

// PancakeSwap
export const Contract_Pair_AMBAR_BNB_Address = "0xFaB8aaa174574ca62eA164F968BaBeea7e0190c9" //"0xA2C9147Bb87A117340F0cf7f9789DF3722b0fc1d";
export const Contract_Router_Address = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";

// IMAGES
export const BUSD_IMAGE = "https://i.ibb.co/3C00M3S/busd.png";
export const USDT_IMAGE = "https://i.ibb.co/tXBk12n/usdt.png";
export const AMBAR_IMAGE = "https://i.ibb.co/B29Kxfp/ambar-image.png";
export const BNB_IMAGE = "https://i.ibb.co/5nrV3wY/bnb.png";

export const loadBasicData = async () => {
    await loadWeb3();

    // Investment Contracts
    const ContractAmbar = new Contract(AmbarJSON.output.abi, Contract_Ambar_Address);
    const ContractBeginnerPlan = new Contract(AmbarPlanJSON.output.abi, Contract_Beginner_Plan_Address);

    // ERC20 Contracts
    const ContractBUSD = new Contract(ERC20_JSON.output.abi, Contract_Busd_Address);
    const ContractUSDT = new Contract(ERC20_JSON.output.abi, Contract_Usdt_Address);
    const ContractAmbarERC20 = new Contract(ERC20_JSON.output.abi, Contract_Ambar_ERC20_Address);

    // PancakeSwap Contract
    const ContractPair_AMBAR_BNB = new Contract(PAIR_JSON.output.abi, Contract_Pair_AMBAR_BNB_Address);
    const ContractRouter = new Contract(ROUTER_JSON.output.abi, Contract_Router_Address);

    const bnbPrice = await getBNBCurrentPrice();
    
    const PAIR = await getPairInfo(ContractPair_AMBAR_BNB);

    const wallet = await getAccount();
    const chainID = await window.web3.eth.getChainId();

    const actual_timestamp = await getActualTimestamp();

    const ERC20 = await getAllTokensInfo(ContractBUSD, ContractUSDT, ContractAmbarERC20, wallet, 'ether');

    const Ambar = {
        contract: ContractAmbar,
        address: Contract_Ambar_Address
    };

    const BeginnerPlan = await getPlanData(
        ContractBeginnerPlan,
        Contract_Beginner_Plan_Address,
        wallet,
        Beginner
    );

    const StandarPlan = {
        contract: null,
        address: null,
        info: Standar,
        erc20: null,
        symbol: null,
        image: null,
        investment_amount: null,
        timestamp_investment_ends: null,
        date_created: null,
        date_ends: null,
        is_active: false
    }

    const ExpertPlan = {
        contract: null,
        address: null,
        info: Expert,
        erc20: null,
        symbol: null,
        image: null,
        investment_amount: null,
        timestamp_investment_ends: null,
        date_created: null,
        date_ends: null,
        is_active: false
    }

    const BusinessPlan = {
        contract: null,
        address: null,
        info: Business,
        erc20: null,
        symbol: null,
        image: null,
        investment_amount: null,
        timestamp_investment_ends: null,
        date_created: null,
        date_ends: null,
        is_active: false
    }

    const PremiumPlan = {
        contract: null,
        address: null,
        info: Premium,
        erc20: null,
        symbol: null,
        image: null,
        investment_amount: null,
        timestamp_investment_ends: null,
        date_created: null,
        date_ends: null,
        is_active: false
    }

    const ExecutivePlan = {
        contract: null,
        address: null,
        info: Executive,
        erc20: null,
        symbol: null,
        image: null,
        investment_amount: null,
        timestamp_investment_ends: null,
        date_created: null,
        date_ends: null,
        is_active: false
    }


    return {
        wallet,
        chainID,
        Ambar,
        BeginnerPlan,
        StandarPlan,
        ExpertPlan,
        BusinessPlan,
        PremiumPlan,
        ExecutivePlan,
        ERC20,
        PAIR,
        ContractRouter,
        actual_timestamp,
        bnbPrice
    }
};

export const unixToDate = (timestamp) => {
    const d = new Date(Number(timestamp));
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
}

export const getSymbolOfERC20 = (address) => {
    switch (address) {
        case Contract_Busd_Address:
            return 'BUSD';
        case Contract_Usdt_Address:
            return 'USDT';
        case Contract_Ambar_Address:
            return 'AMBAR';
        default:
            return 'BNB';
    }
};

export const getImageOfERC20 = (address) => {
    switch (address) {
        case Contract_Busd_Address:
            return 'https://i.ibb.co/3C00M3S/busd.png';
        case Contract_Usdt_Address:
            return 'https://i.ibb.co/tXBk12n/usdt.png';
        case Contract_Ambar_Address:
            return 'https://i.ibb.co/B29Kxfp/ambar-image.png';
        default:
            return 'https://i.ibb.co/5nrV3wY/bnb.png';
    }
};

export const getActualTimestamp = async () => {
    const currentBlock = await web3.eth.getBlockNumber();

    const block = await web3.eth.getBlock(currentBlock);

    return block.timestamp;
};

export const getAccount = async () => {
    const account = await ethereum.request({ method: 'eth_coinbase' });
    String(account).replaceAll(' ', '');
    return account;
};

export const buildTransaciont = async (addressAccount, to, data) => {
    const nonce = await web3.eth.getTransactionCount(addressAccount);
    const estimateGas = await web3.eth.estimateGas({
        from: addressAccount,
        to: to,
        nonce: nonce,
        data: data
    });
    const gas_price = await web3.eth.getGasPrice();
    return {
        from: addressAccount,
        to: to,
        gas: web3.utils.toHex(estimateGas),
        gasPrice: web3.utils.toHex(gas_price),
        data: data
    };

}

export const buildTransacion_WithNativePayment = async (addressAccount, to, data, msg_value) => {
    const nonce = await web3.eth.getTransactionCount(addressAccount);
    const estimateGas = await web3.eth.estimateGas({
        from: addressAccount,
        to: to,
        value: web3.utils.toHex(msg_value),
        nonce: nonce,
        data: data
    });
    const gas_price = await web3.eth.getGasPrice();
    return {
        from: addressAccount,
        to: to,
        value: web3.utils.toHex(msg_value),
        gas: web3.utils.toHex(estimateGas),
        gasPrice: web3.utils.toHex(gas_price),
        data: data
    };

}

export const getERC20Info = async (Contract, addressAccount, format, contractAddress) => {
    const balanceWEI = await Contract.methods.balanceOf(addressAccount).call();
    const balance = web3.utils.fromWei(balanceWEI, format);

    return {
        contract: Contract,
        address: contractAddress,
        balance: Number(balance).toFixed(2)
    }
}

export const getNativeCryptoInfo = async (wallet, format) => {
    const bnbAmountWEI = await web3.eth.getBalance(wallet);
    const bnbAmount = web3.utils.fromWei(bnbAmountWEI, format);

    return {
        contract: null,
        address: null,
        balance: Number(bnbAmount).toFixed(2)
    }
}

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