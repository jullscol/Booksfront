import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { GET_PRODUCTS_FILTERED_PAGE, getProducts, getProductsFilteredPage, getProduct, getAllProducts } from "../redux/actions";
import CardsContainer from "./CardsContainer";
import {Link} from "react-router-dom";
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Icon,
    Text,
    Stack,
    HStack,
    Center,
    AvatarBadge,
    IconButton,
    Avatar,
    VStack,
    Flex,
    Button,
  } from '@chakra-ui/react';
  import { EditIcon } from '@chakra-ui/icons';
const DEL_PRODUCT= import.meta.env.VITE_DEL_PRODUCT
  

  
  export default function GridListWithHeading(props) {
     

    const dispatch = useDispatch()
    const productsData = useSelector(state=>state.filteredProducts)
    const allProducts = useSelector(state=>state.allProducts)
    let currentPageData = Number(productsData.currentPage)
    const prueba = productsData.data
    const pages = Number(productsData.totalPages)
    console.log(productsData)

    useEffect(()=>{
      dispatch(getProducts());
      dispatch(getAllProducts());
  },[dispatch])
  

    return (
      
      <Box>
        <Stack spacing={4} as={Container} maxW={'3x3'} textAlign={'center'}>
          <Heading color={'white'} fontSize={'3xl'}>Modificar Producto</Heading>
          <Text color={'white'} fontSize={'xl'}>
            Panel para modificar productos
          </Text>
        </Stack>
        <Flex justify={'center'}
        marginTop={'10px'}>
        </Flex>

        <Box>
            <Flex >
            <Container maxW={'3xl'} h={'550px'} mt={10} bg={'gray.200'}
            paddingTop={'10px'}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10} overflowY="auto" maxHeight="530px" maxW={'3xl'}>
                {allProducts.map((feature) => (
                <HStack  key={feature.id} align={'center'} w={'330px'} h={'140px'} bg={'gray.300'} >
                    <Box color={'blue.500'} px={8}>
                    <Link key={feature.id} to={`/edit/${feature.id}`} href={`/edit/${feature.id}`}>
                    <Icon as={EditIcon} />
                    </Link>
                    </Box>
                    <VStack align={'start'}>
                    <Text fontWeight={600}>{feature.name}</Text>
                    <Text color={'gray.600'}>Stock: {feature.quantity}</Text>
                    <Text color={'gray.600'}>Estado: {feature.product_status ? "Activo" : "Pausado"}</Text>
                    </VStack>
                    <Box>
                    <Center>
                      <Avatar size="xl" src={feature.image}>
                      </Avatar>
                    </Center>
                    </Box>
                </HStack>
                ))}
            </SimpleGrid>
            </Container>
            </Flex>
        </Box>
      </Box>
    );
  }