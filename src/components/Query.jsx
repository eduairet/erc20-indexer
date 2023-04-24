import { useContext } from 'react';
import { Heading, Input, Button } from '@chakra-ui/react';
import { utils } from 'ethers';
import { Alchemy, Network } from 'alchemy-sdk';
import { EthereumContext } from '../store/ethereum-context';
const { isAddress } = utils;

export default function Query() {
    const ethCtx = useContext(EthereumContext),
        handleAddressChange = e => {
            ethCtx.setUserAddress(e.target.value.trim());
        },
        checkAddress = () => {
            const check =
                isAddress(ethCtx.userAddress) ||
                /^[a-z]+\.eth$/.test(ethCtx.userAddress);
            return check;
        },
        getTokenBalance = async () => {
            ethCtx.setIsQuerying(true);
            ethCtx.setResults([]);
            ethCtx.setTokenDataObjects([]);
            try {
                const config = {
                        apiKey: import.meta.env.VITE_API_KEY || '',
                        network: Network.ETH_MAINNET,
                    },
                    alchemy = new Alchemy(config),
                    parsedAddress = await alchemy.core.resolveName(
                        ethCtx.userAddress
                    );
                if (parsedAddress) {
                    const data = await alchemy.core.getTokenBalances(
                        parsedAddress
                    );
                    if (data) {
                        const filteredData = data.tokenBalances.filter(tk => {
                            return tk.tokenBalance > 0;
                        });
                        if (filteredData) {
                            ethCtx.setResults({
                                ...data,
                                tokenBalances: filteredData,
                            });
                            const tokenDataPromises = [];
                            for (const datum of filteredData) {
                                try {
                                    const tokenData =
                                        await alchemy.core.getTokenMetadata(
                                            datum.contractAddress
                                        );
                                    console.log(tokenData);
                                    tokenDataPromises.push(tokenData);
                                } catch (err) {
                                    tokenDataPromises.push(null);
                                    continue;
                                }
                            }
                            ethCtx.setTokenDataObjects(
                                await Promise.all(tokenDataPromises)
                            );
                            ethCtx.setHasQueried(true);
                        } else {
                            throw new Error('No results');
                        }
                    }
                }
            } catch (err) {
                alert(err.message);
            }
            ethCtx.setIsQuerying(false);
        };

    return (
        <>
            <Heading
                maxWidth={600}
                textAlign='center'
                lineHeight='150%'
                borderTop='2px solid lime'
                padding='2.5rem 0 1rem 0'
            >
                Get all the ERC-20 token balances of this address:
            </Heading>
            <Input
                onChange={handleAddressChange}
                w='100%'
                maxWidth={600}
                backgroundColor='#242424'
                textAlign='center'
                p='0.5rem'
                fontSize={21}
                borderRadius='0.5rem'
                border={`2px solid ${
                    checkAddress() || ethCtx.userAddress === '' ? 'lime' : 'red'
                }`}
                color='aquamarine'
                value={ethCtx.userAddress}
            />
            <Button
                isLoading={ethCtx.isQuerying}
                fontSize={20}
                borderColor='lime'
                variant='outline'
                onClick={getTokenBalance}
                mt={36}
                isDisabled={!checkAddress() || ethCtx.isQuerying}
            >
                Check ERC-20 Token Balances
            </Button>
        </>
    );
}
