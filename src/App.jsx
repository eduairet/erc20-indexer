import { Box, Flex } from '@chakra-ui/react';
import Balances from './components/Balances';
import Query from './components/Query';
import IndexerHeader from './components/IndexerHeading';

function App() {
    return (
        <Box w='100vw'>
            <IndexerHeader />
            <Flex
                w='100%'
                flexDirection='column'
                alignItems='center'
                justifyContent={'center'}
            >
                <Query />
                <Balances />
            </Flex>
        </Box>
    );
}

export default App;
