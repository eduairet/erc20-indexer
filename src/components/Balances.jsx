import { useContext } from 'react';
import { Heading, Image, Flex, Box, SimpleGrid } from '@chakra-ui/react';
import { Utils } from 'alchemy-sdk';
import { EthereumContext } from '../store/ethereum-context';

export default function Balances() {
    const ethCtx = useContext(EthereumContext);

    return (
        <>
            <Heading my={36}>ERC-20 token balances:</Heading>
            {ethCtx.hasQueried ? (
                <SimpleGrid
                    mt={50}
                    w='90vw'
                    maxW='800px'
                    columns={4}
                    spacing={24}
                >
                    {ethCtx.results.tokenBalances.map((e, i) => {
                        const { symbol, decimals, logo } =
                            ethCtx.tokenDataObjects[i];
                        console.log(symbol, decimals, logo);
                        return (
                            <Flex
                                key={`${e.id}-${i}`}
                                padding='2rem'
                                textAlign='center'
                                flexDir='column'
                                border='2px solid lime'
                                borderRadius='100%'
                                w='20rem'
                                h='20rem'
                                alignItems='center'
                                justifyContent='center'
                                gap='0.5rem'
                            >
                                <Box>
                                    <b>Symbol:</b> ${symbol}
                                </Box>
                                <Box>
                                    <b>Balance:</b>&nbsp;
                                    {Utils.formatUnits(
                                        e.tokenBalance,
                                        decimals
                                    )}
                                </Box>
                                <Image
                                    maxW='5rem'
                                    marginTop='1rem'
                                    src={logo}
                                />
                            </Flex>
                        );
                    })}
                </SimpleGrid>
            ) : (
                'Please make a query! This may take a few seconds...'
            )}
        </>
    );
}
