import React from 'react';
import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactNode, useEffect } from 'react';
  import { formatPrice } from '../views/Cart/PriceTag'
  import { BsPerson } from 'react-icons/bs';
  import { BsCashCoin } from 'react-icons/bs';
  import { BsCartCheck  } from 'react-icons/bs';
  import { FiServer } from 'react-icons/fi';
  import { GoLocation } from 'react-icons/go';
  import { Link } from 'react-router-dom';
  import StatsGridWithImage from "./StatsGrid"
  import { useSelector, useDispatch } from 'react-redux';
  import { getAllUsers, getAllOrders, getAllDetailOrders } from '../redux/actions';
  
  //interface StatsCardProps {
  //  title: string;
  //  stat: string;
  //  icon: ReactNode;
  //}
  function StatsCard(props /*StatsCardProps*/) {
    const { title, stat, icon } = props;

    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'8'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('white', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated  color={'white'}>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'} color={'white'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('white', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function BasicStatistics() {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const orders = useSelector((state) => state.orders);
    const detailOrders = useSelector((state) => state.detailOrders);

    useEffect(() => {
      dispatch(getAllUsers());
      dispatch(getAllDetailOrders());
      dispatch(getAllOrders());
    }, []);

    console.log(orders)

    const totalPrice = orders.reduce((total, item) => total + parseInt(item.totalprice),0);

    console.log(totalPrice)

    return (
      <Box maxW="7xl" bg={''}  mx={'auto'} mt={'1%'} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={1}
          fontWeight={'bold'}
          color={'white'}>
          Estadisticas Wonder Toys
        </chakra.h1>
        <br />
        <br />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <Link to= "/admin/users">
          <StatsCard
            title={'Usuarios'}
            stat={users.length}
            icon={<BsPerson size={'3em'} />}
          />
          </Link>
          <Link to= "/admin/orders">
            <StatsCard
            title={'Ventas'}
            stat={orders.length}
            icon={<BsCartCheck size={'3em'} />}
            />
          </Link>
          
          <StatsCard
            title={'Ingresos Totales'}
            stat={formatPrice(totalPrice)}
            icon={<BsCashCoin size={'3em'} />}
          />
        </SimpleGrid>
        <Box bg={''} maxH={'50%'}>
          <StatsGridWithImage />
        </Box>
      </Box>
    );
  }