import React from 'react';
import { useState, useMemo } from 'react';

export const EthereumContext = React.createContext({
    signer: '',
    userAddress: '',
    results: [],
    hasQueried: false,
    isQuerying: false,
    tokenDataObjects: [],
    setSigner: () => {},
    setUserAddress: () => {},
    setHasQueried: () => {},
    setIsQuerying: () => {},
    setResults: () => {},
    setTokenDataObjects: () => {},
});

export default function EthereumContextProvider({ children }) {
    const [signer, setSigner] = useState(),
        [userAddress, setUserAddress] = useState(''),
        [results, setResults] = useState([]),
        [hasQueried, setHasQueried] = useState(false),
        [isQuerying, setIsQuerying] = useState(false),
        [tokenDataObjects, setTokenDataObjects] = useState([]),
        value = useMemo(() => {
            return {
                signer,
                userAddress,
                results,
                hasQueried,
                isQuerying,
                tokenDataObjects,
                setSigner,
                setUserAddress,
                setHasQueried,
                setIsQuerying,
                setResults,
                setTokenDataObjects,
            };
        });

    return (
        <EthereumContext.Provider value={value}>
            {children}
        </EthereumContext.Provider>
    );
}
