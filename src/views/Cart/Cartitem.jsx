import { CloseButton, Flex, Link, Select, useColorModeValue, Button, Text, Box } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import { useDispatch } from "react-redux";
import { removeProductFromCart, decreaseProductQuantity, increaseProductQuantity, emptyCart } from "../../redux/actions";


const QuantitySelect = (props) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  )
}

export const CartItem = (props) => {

  const dispatch = useDispatch();

  const {
    productId,
    isGiftWrapping,
    name,
    description,
    quantity,
    image,
    currency,
    price,
    onChangeQuantity,
    onClickDelete,
  } = props

  const handleRemoveProduct = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseProductQuantity(productId));
    };

  const handleIncreaseQuantity = (productId) => {
      dispatch(increaseProductQuantity(productId));
  };

  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        description={description}
        image={image}
        isGiftWrapping={isGiftWrapping}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
        {/* <QuantitySelect
          value={quantity}
          // onChange={(e) => {
          //   onChangeQuantity?.(+e.currentTarget.value)
          // }}
        /> */}
        <Box marginLeft={'100px'}>
          <Text>Quantity: {quantity}</Text>
          <PriceTag price={price} currency={currency} />
          <Button variant="outline" colorScheme="red" size="sm" onClick={() => handleDecreaseQuantity(props.id)} mt={2}>
                          -
          </Button>

          <Button variant="outline" colorScheme="red" size="sm" onClick={() => handleIncreaseQuantity(props.id)} mt={2}>
          +
          </Button>
        </Box>
        <Button variant="outline" colorScheme="red" size="sm" onClick={() => handleRemoveProduct(props.id)} mt={2}>
          Eliminar
        </Button>
        {/* <CloseButton aria-label={`Delete ${name} from cart`} onClick={handleRemoveProduct(productId)} /> */}
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value)
          }}
        />
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  )
}