import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import EthereumContextProvider from './store/ethereum-context';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <EthereumContextProvider>
            <App />
        </EthereumContextProvider>
    </React.StrictMode>
);
