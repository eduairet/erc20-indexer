import { useContext } from 'react';
import {
    Spinner,
    Heading,
    Image,
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
    Stack,
} from '@chakra-ui/react';
import { Utils } from 'alchemy-sdk';
import { EthereumContext } from '../store/ethereum-context';

export default function Balances() {
    const ethCtx = useContext(EthereumContext);

    return (
        <>
            <Heading my={36}>ERC-20 token balances:</Heading>
            {ethCtx.isQuerying ? (
                <Stack direction='row' height='10rem'>
                    <Spinner color='lime' thickness='4px' speed='0.65s' />
                </Stack>
            ) : ethCtx.hasQueried &&
              !ethCtx.isQuerying &&
              ethCtx.results.tokenBalances.length &&
              ethCtx.tokenDataObjects.length ? (
                <Table
                    w='90vw'
                    maxW='800px'
                    overflowX='scroll'
                    variant='striped'
                >
                    <Thead>
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Symbol</Th>
                            <Th>Balance</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ethCtx.results.tokenBalances.map((e, i) => {
                            if (ethCtx.tokenDataObjects[i]) {
                                const { symbol, decimals, logo } =
                                    ethCtx.tokenDataObjects[i];
                                return (
                                    <Tr key={`${e.id}-${i}`}>
                                        <Td>
                                            <Image maxW='1.5rem' src={logo} />
                                        </Td>
                                        <Td>{symbol}</Td>
                                        <Td textAlign='right'>
                                            {Number(
                                                Utils.formatUnits(
                                                    e.tokenBalance,
                                                    decimals
                                                )
                                            ).toFixed(4)}
                                        </Td>
                                    </Tr>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </Tbody>
                </Table>
            ) : (
                'Please make a query! This may take a few seconds...'
            )}
        </>
    );
}
