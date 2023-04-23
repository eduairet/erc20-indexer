import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useState, useMemo } from 'react';

export const EthereumContext = React.createContext({
    provider: {},
    signer: '',
    userAddress: '',
    results: [],
    hasQueried: false,
    isQuerying: false,
    tokenDataObjects: [],
    getTokenBalance: () => {},
    setSigner: () => {},
    setUserAddress: () => {},
    handleAddressChange: () => {},
});

export default function EthereumContextProvider({ children }) {
    const [signer, setSigner] = useState(),
        [userAddress, setUserAddress] = useState(''),
        [results, setResults] = useState([]),
        [hasQueried, setHasQueried] = useState(false),
        [isQuerying, setIsQuerying] = useState(false),
        [tokenDataObjects, setTokenDataObjects] = useState([]),
        handleAddressChange = e => setUserAddress(e.target.value),
        getTokenBalance = async () => {
            setIsQuerying(true);
            try {
                const config = {
                    apiKey: import.meta.env.VITE_API_KEY,
                    network: Network.ETH_MAINNET,
                };
                const alchemy = new Alchemy(config);
                const data = await alchemy.core.getTokenBalances(userAddress);
                setResults(data);
                const tokenDataPromises = [];
                for (let i = 0; i < data.tokenBalances.length; i++) {
                    const tokenData = await alchemy.core.getTokenMetadata(
                        data.tokenBalances[i].contractAddress
                    );
                    tokenDataPromises.push(tokenData);
                }
                setTokenDataObjects(await Promise.all(tokenDataPromises));
                setHasQueried(true);
            } catch (err) {
                alert(err.message);
            }
            setIsQuerying(false);
        },
        value = useMemo(() => {
            return {
                signer,
                userAddress,
                results,
                hasQueried,
                isQuerying,
                tokenDataObjects,
                getTokenBalance,
                setSigner,
                setUserAddress,
                handleAddressChange,
            };
        });

    return (
        <EthereumContext.Provider value={value}>
            {children}
        </EthereumContext.Provider>
    );
}
