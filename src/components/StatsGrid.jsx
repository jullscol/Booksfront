import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react';
// import PureComponent from './Chart';
import PieChart from './Chart';

export default function StatsGridWithImage() {
  return (
    <Box bg={'blue.900'} h={'400px'} w={'800px'} marginTop={'45px'} marginLeft={'17%'} border={'4px solid'}
    borderColor={'white'}
    rounded={'lg'}>
      <Container maxW={'7xl'} maxH={'500px'} zIndex={10} position={'relative'}>
        <Flex>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Stack
            flex={30}
            color={'gray.400'}
            justify={{ lg: '' }}
            py={{ base: 4, md: 5, xl: 30 }}>
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={'heading'}
                fontWeight={700}
                textTransform={'uppercase'}
                mb={3}
                fontSize={'xl'}
                color={'gray.500'}>
                ESTADISTICAS
              </Text>
              <Heading
                color={'white'}
                mb={5}
                fontSize={{ base: '3xl', md: '5xl' }}>
                Wonder Toys
              </Heading>
              <PieChart></PieChart>
            </Box>
          </Stack>
          <Flex flex={1} />
        </Stack>
        </Flex>
      </Container>
    </Box>
  );
}

