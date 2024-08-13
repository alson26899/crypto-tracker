import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const StockModel = mongoose.model('StockData', DataSchema);

export default StockModel;
