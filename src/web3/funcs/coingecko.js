import axios from "axios";
import PAIR_JSON from '../ABI/Pair.json';
import { Contract_Pair_AMBAR_BNB_Address } from ".";
import { getPairInfo } from "./pair";
import Web3 from "web3";

const Contract = require('web3-eth-contract');

Contract.setProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

export const getBNBCurrentPrice = async () => {
    const req = await axios.get("https://api.coingecko.com/api/v3/coins/binancecoin", null);
    const data = req.data;
    const marketData = data['market_data'];
    const current_price = marketData['current_price'];
    const usd = current_price['usd'];

    const ContractPair_AMBAR_BNB = new Contract(PAIR_JSON.output.abi, Contract_Pair_AMBAR_BNB_Address);
    const PAIR = await getPairInfo(ContractPair_AMBAR_BNB);
    
    return {
        bnb_usd: usd,
        pair: PAIR
    };
};