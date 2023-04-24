import { Button, Center, Flex } from '@chakra-ui/react';
import { useState, useContext, useEffect } from 'react';
import { EthereumContext } from '../store/ethereum-context';

export default function ConnectWallet() {
    const ethCtx = useContext(EthereumContext),
        [hasEth, setHasEth] = useState(false),
        [isLoading, setIsLoading] = useState(false),
        buttonStyle = { borderColor: 'lime', variant: 'outline' },
        connectEther = async () => {
            setIsLoading(true);
            try {
                const [signer] = await window.ethereum.enable();
                ethCtx.setSigner(signer);
                ethCtx.setUserAddress(signer);
            } catch (err) {
                alert(err.message);
            }
            setIsLoading(false);
        };

    useEffect(() => {
        if (window.ethereum) {
            setHasEth(true);
            const signer = window.ethereum.selectedAddress || '';
            ethCtx.setSigner(signer);
            ethCtx.setUserAddress(signer);
            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            });
        }
    }, []);

    return hasEth ? (
        <Center w={'100vw'} paddingY={40}>
            <Flex direction={'column'}>
                {ethCtx.signer ? (
                    <Button isDisabled={true} {...buttonStyle}>
                        {`${ethCtx.signer.slice(0, 5)}...${ethCtx.signer.slice(
                            -4
                        )}`}
                    </Button>
                ) : (
                    <Button
                        isLoading={isLoading}
                        onClick={connectEther}
                        {...buttonStyle}
                    >
                        Connect Wallet
                    </Button>
                )}
            </Flex>
        </Center>
    ) : null;
}
