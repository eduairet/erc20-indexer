import { Center, Flex, Heading, Text } from '@chakra-ui/react';
import ConnectWallet from './ConnectWallet';

export default function IndexerHeader() {
    return (
        <Center>
            <Flex
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
            >
                <Heading fontSize={36}>ERC-20 Token Indexer</Heading>
                <ConnectWallet />
                <Text maxWidth={600} textAlign='center'>
                    Plug in an address and this website will return all of its
                    ERC-20 token balances!
                </Text>
            </Flex>
        </Center>
    );
}
