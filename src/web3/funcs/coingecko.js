import axios from "axios";

export const getBNBCurrentPrice = async () => {
    const req = await axios.get("https://api.coingecko.com/api/v3/coins/binancecoin", null);
    const data = req.data;
    const marketData = data['market_data'];
    const current_price = marketData['current_price'];
    const usd = current_price['usd'];

    return usd;
};