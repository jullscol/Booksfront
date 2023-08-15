import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Button,
  /*Link,*/
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import {Link} from "react-router-dom"
import {
  removeProductFromCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  emptyCart,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { CartItem } from "./Cartitem";
import { CartOrderSummary } from "./CartOrderSummary";
//   import { cartData } from './_data'
import NavBar2 from "../../components/NavBar2";

export default function Cart2() {
  const dispatch = useDispatch();
  const productsToBuy = useSelector((state) => state.cartItems);

//   const finalQuantity = productsToBuy[0].quantity
//   console.log(finalQuantity)
//   console.log("finalQuantit")
//   const final = finalQuantity * productsToBuy

  const totalCantidad = productsToBuy.reduce((acumulador, producto) => {
    return acumulador + producto.quantity;
  }, 0);

  console.log(totalCantidad)

//   const totalPrice = productsToBuy.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

  const handleRemoveProduct = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseProductQuantity(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseProductQuantity(productId));
  };

  const handleEmptyCart = (event) => {
    dispatch(emptyCart());
  };

  return (
    <Box
      backgroundImage="url('/BG3.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      width="100vw"
      height="100vh"
    >
      <NavBar2 />
      <Box
        bg={"white"}
        margin={"70px"}
        padding={"30px"}
        rounded={"20px"}
        h={"60%"}
      >
        {/* <Flex> */}
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            lg: "flex-start",
          }}
          spacing={{
            base: "8",
            md: "16",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              md: "10",
            }}
            flex="2"
          >
            <Box>
              <Flex justify={'space-between'}>
                <Heading fontSize="2xl" fontWeight="extrabold">
                  {totalCantidad} Toys
                </Heading>
                <Button _hover={'none'} bg={'gray.800'} color={'white'} onClick={handleEmptyCart}>Empty Cart</Button>
              </Flex>
            </Box>
            <Box overflowY="auto" maxHeight="400px">
              {productsToBuy.length === 0 ? (
                <Text>el carrito esta vacio.</Text>
              ) : (
                <Stack spacing="6">
                  {productsToBuy.map(
                    (
                      item //cartData.map
                    ) => (
                      <CartItem key={item.id} {...item} />
                    )
                  )}
                </Stack>
              )}
            </Box>
          </Stack>

          <Flex direction="column" align="center" flex="1" marginTop={"30px"}>
            <CartOrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link to="/" color={mode("blue.500", "blue.200")}>
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
        {/* </Flex> */}
      </Box>
    </Box>
  );
}
