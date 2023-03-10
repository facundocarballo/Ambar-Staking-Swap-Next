import { Contract_Busd_Address, getERC20Info, getNativeCryptoInfo, Contract_Usdt_Address, Contract_Ambar_ERC20_Address } from ".";


export const getAllTokensInfo = async (ContractBUSD, ContractUSDT, ContractAmbar, wallet, format) => {
    const BUSD = await getERC20Info(ContractBUSD, wallet, 'ether', Contract_Busd_Address);
    const USDT = await getERC20Info(ContractUSDT, wallet, 'ether', Contract_Usdt_Address);
    const AMBAR = await getERC20Info(ContractAmbar, wallet, 'ether', Contract_Ambar_ERC20_Address);
    const BNB = await getNativeCryptoInfo(wallet, 'ether');

    return {
        BUSD,
        USDT,
        AMBAR,
        BNB
    }
};