import {
  Button,
  Flex,
  Heading,
  Image,
  Container,
  HStack,
  SimpleGrid,
  Link,
  Icon,
  VStack,
  Avatar,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";

import { SiMercadopago, SiCashapp } from "react-icons/si";
import NavBar2 from "../../components/NavBar2";
import { CheckIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useNavigate } from "react-router-dom";
import { deleteCart, getDetailOrdersIDArray, emptyDetailOrdersId } from "../../redux/actions";
import { useDispatch } from "react-redux";
const apiUrl = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY;
const POST_NEW_ORDER = import.meta.env.VITE_POST_NEW_ORDER;
const POST_PAYMENT = import.meta.env.VITE_POST_PAYMENT;

initMercadoPago(apiUrl);

//global state

export default function Payment (props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const detailOrderIdsArray = useSelector(state => state.detailOrdersUsersID);
    const detailCarrito = useSelector(state => state.cartItems);
    const users = useSelector(state => state.users)
    const idUser = useSelector(state => state.idUser)

   

    const totalPrice = detailCarrito.reduce((total, item) => total + item.price * item.quantity, 0);
    console.log(detailOrderIdsArray);

  //sacar detailIds y el userId
  const [finalOrder, setFinalOrder] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [activateButton, setActivateButton] = useState(false);

  // console.log(detailOrderIdsArray[0].userId, "hola")

  const handleOrder = async () => {
    
    //esto se podria hacer con un useEffect
    const orderArray = detailOrderIdsArray[0];
    const userId = idUser; // ojo recordar arreglar con lo de user de kervys
    const orderID = await axios.post(
      POST_NEW_ORDER,
      { detailIds: orderArray, userId: userId }
    );
    console.log(orderArray)

    setFinalOrder(orderID.data.order);
    setActivateButton(true);


  };

  const handleClick = async () => {
    dispatch(emptyDetailOrdersId())
  };

  const handlePayment = async () => {
    //aqui se mandaria la data a mercado pago

    //IMPORTANTE, una vez dado el OK de la orden, antes de mandar se borra el array de ids y carrito para que no haya duplicados, zaqui se borra el carrito
    console.log(finalOrder);
    const response = await axios.post(
      POST_PAYMENT,
      { orderId: finalOrder.id, cart: detailCarrito }
    );


    console.log(response.data.init_point);
    setPreferenceId(response.data.init_point);
    window.location.href = response.data.init_point;
    dispatch(deleteCart())
    //navigate(response.data.init_point)
  };

  return (
    <Box>
      <Flex direction={"column"}>
        <NavBar2></NavBar2>
        <Box
          backgroundImage="url('/BG3.jpg')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          width="100vw"
          height="100vh"
          paddingTop={"50px"}
        >
          <Flex>
            {console.log(finalOrder)}
            <Box bg={"gray.500"} w={"50%"} h={"650px"} ml={"24%"} roundedLeft="lg">
              <Flex>
                <Box bg={"gray.200"} w={"70%"} h={"650px"} p={"30px"} roundedLeft="lg" >
                  <Flex direction={"column"}>
                    <Text>Please check your order:</Text>
                    <br />
                    <SimpleGrid
                      columns={{ base: 1, md: 1, lg: 1 }}
                      overflowY="auto"
                      maxH={"500px"}
                      bg={""}
                    >
                      {detailCarrito.map((product, index) => (
                        <HStack
                          key={index}
                          align={"center"}
                          bg={"gray.300"}
                          margin={"10px"}
                        >
                          <Box color={"green.400"} px={2}>
                            <Icon as={CheckIcon} />
                          </Box>
                          <VStack align={"start"}>
                            <Text fontWeight={600}>Nombre: {product.name}</Text>
                            <Text fontWeight={600}>
                              Precio: ${product.price}
                            </Text>
                            <Text color={"gray.600"}>
                              Cantidad: {product.quantity}
                            </Text>
                          </VStack>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  </Flex>
                </Box>

                <Box bg={""} ml={'2%'} mt={"10%"}>
                  <Image ml={'4%'} src="/LOGO PNG.png" w={"200px"} alt="Wonder Toys" />
                  <br />
                  <br />
                  <Heading>Total: ${totalPrice}</Heading>
                  <br />
                  <br />
                  <Box ml={"23%"}>
                    {/*que pasa si le doy a OK purchase y luego regreso?. que pasa si no estoy de acuerdo con la compra?*/}
                    <Button
                      onClick={handleOrder}
                      colorScheme="blue"
                      color={'white'}
                      w={'120px'}
                    >
                      Place Order
                    </Button>
                    <br />
                    <br />
                    
                    {activateButton && (
                      <Button
                        onClick={handlePayment}
                        leftIcon={<SiMercadopago size="2.5em" />}
                        colorScheme="blue"
                        w={'120px'}
                      >
                        Payment
                      </Button>
                    )}

                    <br />
                    <br />

                    <Link href="/cart">
                      <Button onClick={handleClick} bg="blue.900" color={"white"} _hover={'none'} w={'120px'}>
                        Go Back
                      </Button>
                    </Link>

                    {/*<div id="wallet_container">
 {preferenceId ? <Wallet initialization={{ preferenceId: preferenceId }} />: null} 
</div>*/}
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
