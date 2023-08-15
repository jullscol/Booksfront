import { Box, Flex, Badge, Icon } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box position="relative">
      <Icon as={FaShoppingCart} boxSize={6} />
      {cartItemCount > 0 && (
        <Badge colorScheme="red" position="absolute" borderRadius="full" top={-2} right={-2}>
          {cartItemCount}
        </Badge>
      )}
    </Box>
  );
};

export default CartIcon;
