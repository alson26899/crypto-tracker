import axios from 'axios';
import StockModel from '../models/StockModel';

const CRYPTO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const fetchAndStoreCryptoData = async () => {
    try {
        const symbols = ['bitcoin','ethereum','litecoin','ripple','cardano'];
        for (const symbol of symbols) {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);

            const price = response.data[symbol]?.usd;
            const timestamp = new Date().toISOString();

            if (price !== undefined) {
                const newData = new StockModel({ symbol, price, timestamp });
                await newData.save();
            }
        }
    } catch (error) {
        console.error('Failed to fetch or store stock data:', error);
    }
};

