import { getImageOfERC20, getSymbolOfERC20, unixToDate } from ".";

export const getPlanData = async (Contract, contractAddress, wallet, info) => {
    const erc20 = await Contract.methods.erc20_of_plan(wallet).call();
    const symbol = getSymbolOfERC20(erc20);
    const image = getImageOfERC20(erc20);
    const investment_amount_wei = await Contract.methods.investment_of(wallet).call();
    const investment_amount = web3.utils.fromWei(investment_amount_wei, 'ether');
    const timestamp_investment_ends = await Contract.methods.investment_ends_of(wallet).call();
    const timestamp_investment_starts = await Contract.methods.investment_starts_of(wallet).call();

    const date_created = unixToDate(Number(timestamp_investment_starts) * 1000);
    const date_ends = unixToDate(Number(timestamp_investment_ends) * 1000);
    const is_active = await Contract.methods.is_active(wallet).call();

    return {
        contract: Contract,
        address: contractAddress,
        info,
        erc20,
        symbol,
        image,
        investment_amount,
        timestamp_investment_ends,
        timestamp_investment_starts,
        date_created,
        date_ends,
        is_active
    }
};