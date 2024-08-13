import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch, fetchStockData } from '../../redux/store';
import './StockPage.css';
import StockModal from '../stock-model/StockModel'; // Correct import
import { StockData } from '../../interfaces/StockData';

const StockPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { symbols, data } = useSelector((state: RootState) => state);
    const [selectedSymbols, setSelectedSymbols] = useState(symbols);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchStockData(selectedSymbols));
        const interval = setInterval(() => {
            dispatch(fetchStockData(selectedSymbols));
        }, 2000); // Poll every 2 seconds
        return () => clearInterval(interval);
    }, [dispatch, selectedSymbols]);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    const handleSymbolChange = (newSymbols: string[]) => {
        setSelectedSymbols(newSymbols);
        handleModalClose();
    };

    return (
        <div>
            <button className="open-modal-button" onClick={handleModalOpen}>
                Select Stocks/Cryptos
            </button>
            <div className='stock-box'>
                {selectedSymbols.map((symbol: string) => (
                    <div key={symbol} className="stock-container">
                        <h1 className="stock-header">{symbol.toUpperCase()}</h1>
                        <table className="stock-table">
                            <thead>
                                <tr>
                                    <th>Price (USD)</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data[symbol]?.map((entry: StockData, index: number) => (
                                    <tr key={index}>
                                        <td>{entry.price}</td>
                                        <td>{new Date(entry.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
                {isModalOpen && (
                    <StockModal
                        currentSymbols={selectedSymbols}
                        onClose={handleModalClose}
                        onSymbolChange={handleSymbolChange}
                    />
                )}
            </div>
        </div>
    );
};

export default StockPage;
