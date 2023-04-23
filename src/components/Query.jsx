import { useContext } from 'react';
import { Heading, Input, Button } from '@chakra-ui/react';
import { EthereumContext } from '../store/ethereum-context';

export default function Query() {
    const ethCtx = useContext(EthereumContext);

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
                onChange={ethCtx.handleAddressChange}
                w='100%'
                maxWidth={600}
                backgroundColor='#242424'
                textAlign='center'
                p='0.5rem'
                fontSize={21}
                borderRadius='0.5rem'
                border='2px solid lime'
                color='aquamarine'
                value={ethCtx.userAddress}
            />
            <Button
                isLoading={ethCtx.isQuerying}
                fontSize={20}
                borderColor='lime'
                variant='outline'
                onClick={ethCtx.getTokenBalance}
                mt={36}
            >
                Check ERC-20 Token Balances
            </Button>
        </>
    );
}
