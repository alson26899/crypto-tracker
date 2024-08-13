import React, { useState } from 'react';
import './StockModel.css'
interface StockModalProps {
    currentSymbols: string[];
    onClose: () => void;
    onSymbolChange: (symbols: string[]) => void;
}

const allSymbols = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin', 'ripple']; // Example symbols

const StockModal: React.FC<StockModalProps> = ({ currentSymbols, onClose, onSymbolChange }) => {
    const [selectedSymbols, setSelectedSymbols] = useState(currentSymbols);

    const toggleSymbol = (symbol: string) => {
        setSelectedSymbols((prev) =>
            prev.includes(symbol)
                ? prev.filter((s) => s !== symbol)
                : [...prev, symbol]
        );
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Select Stocks/Cryptos</h2>
                <ul>
                    {allSymbols.map((symbol) => (
                        <li key={symbol}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedSymbols.includes(symbol)}
                                    onChange={() => toggleSymbol(symbol)}
                                />
                                {symbol}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="modal-buttons">
                    <button onClick={() => onSymbolChange(selectedSymbols)}>Apply</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default StockModal;
