import React from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Select,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Box,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  import {Link, useNavigate} from "react-router-dom";
  import { useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { getProduct } from "../redux/actions";
  import { putProduct } from "../redux/actions";
  import { useToast } from '@chakra-ui/react'

  
  export default function ProductProfileEdit(features)/*: JSX.Element*/ {

    const dispatch = useDispatch();

    const toast = useToast()

    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    

    const [update, setUpdate] = useState({ //creo un estado del form.
      name:"",
      brand:"",
      category:"",
      minimun_age:"",
      description:"",
      quantity:"",
      price:"",
      // image:"",
      product_status: "",
  })

    const params = useParams()
    
    const productDetail = useSelector((state)=>state.productDetail)
    


    const handleChange = (event) => {
      const {name, value} = event.target;
      setUpdate(prevState => ({...prevState, [name]: value}));
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    setImage(file);
};

    const handleSubmit = event => {


      try {

          if(update.name === "") {
            update.name = productDetail.name
          }
          if(update.brand === "") {
            update.brand = productDetail.brand
          }
          if(update.category === "") {
            update.category = productDetail.category
          }
          if(update.minimun_age === "") {
            update.minimun_age = productDetail.minimun_age
          }
          if(update.description === "") {
            update.description = productDetail.description
          }
          if(update.quantity === "") {
            update.quantity = productDetail.quantity
          }
          if(update.price === "") {
            update.price = productDetail.price
          }
          if(update.product_status === "") {
            update.product_status = productDetail.product_status
          }
          if(image === "") {
            setImage(productDetail.image)
          }

          dispatch(putProduct(params.id, update));

          // e.preventDefault()

          toast({
            title: "Juguete Actualizado",
            description: "El Juguete a sido actualizado con exito.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          setUpdate({    
          name:"",
          brand:"",
          category:"",
          minimun_age:"",
          description:"",
          quantity:"",
          price:"",
          product_status:"",})

          navigate("/edit");
          
      } catch (error) {
          console.log(error)
      }
  };

    useEffect(()=>{
      dispatch(getProduct(params.id))
  },[dispatch, params.id])

    return (
      <Box>
      <Flex
        minH={'80vh'}
        align={'center'}
        justify={'center'}
        >
        <Stack
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={4}
          marginTop={'6px'}
          h={'730px'}>
          <Heading lineHeight={0} fontSize={20}>
          Update: {productDetail.name}
          </Heading>
          <br />
          <form onSubmit={handleSubmit}>
          <FormControl id="productName">
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={productDetail.image}>
                </Avatar>
              </Center>
              <Center w="full">
                <Input 
                type='file'
                name="image"
                id="image"
                value={update.image}
                onChange={handleImageChange}
                // onBlur={handleOnBlur}
                ></Input>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="productName" >
            <FormLabel>Current Name: {productDetail.name}</FormLabel>
            <Input
              placeholder="New Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              name="name"
              value={update.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="productBrand" >
            <FormLabel>Current Brand: {productDetail.brand}</FormLabel>
            <Input
              placeholder="New Brand"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              name="brand"
              value={update.brand}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="productCategory" >
            <FormLabel>Current Category: {productDetail.category}</FormLabel>
            <Input
              placeholder="New Category"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              name="category"
              value={update.category}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="productPrice" >
            <FormLabel>Current Price: ${productDetail.price}</FormLabel>
            <Input
              placeholder="New Price"
              _placeholder={{ color: 'gray.500' }}
              type="number"
              name="price"
              value={update.price}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="productCategory" >
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="New Description"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              name="description"
              value={update.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="productCategory" >
            <FormLabel>Current Quantity: {productDetail.quantity}</FormLabel>
            <Input
              placeholder="New Quantity"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              name="quantity"
              value={update.quantity}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="productCategory" >
            <FormLabel>Current Minimum Age: {productDetail.minimun_age}</FormLabel>
            <Input
              placeholder="New Minimum Age"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              name="minimun_age"
              value={update.minimun_age}
              onChange={handleChange}
            />
          <FormLabel>Estado: {productDetail.product_status === true ? "Activo" : "Pausado"}</FormLabel>
          <Select
              placeholder="Select"
              _placeholder={{ color: 'gray.500' }}
              type="boolean"
              name="product_status"
              value={update.product_status}
              onChange={handleChange}>
            <option value="True">Activo</option>
            <option value="False">Pausado</option>
          </Select>
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Link to={'/edit'} href={'/edit'}>
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}>
                Cancel
              </Button>
            </Link>
            <Button
             type='submit'
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.900',
              }}
              onSubmit={handleSubmit}>
              Submit Update
            </Button>
          </Stack>
          </form>
        </Stack>
      </Flex>
      </Box>
    );
  }