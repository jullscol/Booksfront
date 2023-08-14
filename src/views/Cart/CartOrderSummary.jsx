import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";
import { useToast } from '@chakra-ui/react'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getDetailOrdersIDArray, getIdEmailUser } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const POST_NEW_DETAIL_ORDER = import.meta.env.VITE_POST_NEW_DETAIL_ORDER;
const POST_USER_EMAIL = import.meta.env.VITE_POST_USER_EMAIL;
const GET_USERS = import.meta.env.VITE_GET_USERS;

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;

  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const idCliente = useSelector((state) => state.idUser);
  const toast = useToast();

    useEffect(() => {
      const getUser = async() => {

        try {
          if(isAuthenticated && !idCliente){
            const idClient = await axios.post(POST_USER_EMAIL, {email: user?.email});
            dispatch(getIdEmailUser(idClient.data.idUser));
            setUserData(idClient.data.user);
          }; 

          if(!userData && idCliente){
            const dataUser = await axios.get(`${GET_USERS}/${idCliente}`);
            setUserData(dataUser.data);
          }
        } catch (error) {
          console.log(error);
        };
        
        
      };

    getUser();
  }, []);

  const productsToBuy = useSelector((state) => state.cartItems);

  // console.log(productsToBuy[0].quantity)

  /*const handleSubmit = async (quantity, productId, userId) => {
      console.log(quantity, productId, userId)

      try {
        const detailCreated = await axios.post("http://localhost:3010/detailorders/create",{quantity, productId, userId});

        console.log(detailCreated.data.id)
        dispatch(getDetailOrdersIDArray(detailCreated.data.id));
        navigate("/payment");
      } catch (error) {
        console.log(error);
      }
      
    }*/

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast({
        title: "No has iniciado sesión",
        description: "Por favor, inicia sesión para continuar",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!idCliente) {
      alert(
        "please, complete the rest of your data in your profile to be able to send your toys"
      );
      return;
    } // aqui agregar un else if si el usuario esta registrado o no en la base de datos
    try {
      const detailOrders = productsToBuy.map((item) => {
        return {
          quantity: item.quantity,
          productId: item.id,
          userId: userData.id,
        };
      });
      const detailCreated = await axios.post(
        POST_NEW_DETAIL_ORDER,
        detailOrders
      );
      console.log(detailCreated.data.detailOrders);
      dispatch(getDetailOrdersIDArray(detailCreated.data.detailOrders));
      navigate("/payment");
    } catch (error) {
      console.log(error);
    } 
  };

  const totalPrice = productsToBuy.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  console.log(totalPrice);

    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Suma de los productos</Heading>
      {console.log(user)}
      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(totalPrice)} />
        {/* <OrderSummaryItem label="Shipping + Tax">
            <Link href="#" textDecor="underline">
              Calculate shipping
            </Link>
          </OrderSummaryItem> */}
        {/* <OrderSummaryItem label="Coupon Code">
            <Link href="#" textDecor="underline">
              Add coupon code
            </Link>
          </OrderSummaryItem> */}
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(totalPrice)}
          </Text>
        </Flex>
      </Stack>
      <Link to="#">
        <Button
          type="submit"
          onClick={handleSubmit}
          colorScheme="blue"
          size="lg"
          fontSize="md"
          rightIcon={<FaArrowRight />}
        >
          Orden
        </Button>
      </Link>
    </Stack>
  );
};
