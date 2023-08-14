import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Flex,
  Image,
  Badge,
  Tooltip,
  VStack,
  Button,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Input,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
//import { addProductToCart } from "../redux/actions";
import Rating from "./Rating";
import RatingDisplay from "./RatingDisplay";
import axios from "axios";

const GET_USER_RATINGS = import.meta.env.VITE_GET_USER_RATINGS;
const POST_RATING = import.meta.env.VITE_POST_RATING;


const ShoppingCard = ({ id, image, name, price, rating, numReviews }) => {
  // Dispatch para agregar productos al carrito
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);

  // Estado local para el popover de calificación y comentario
  const [isOpen, setIsOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");

  //suscripcion al estado idUser
  let user = useSelector(state=>state.idUser);

  // Manejador para el clic en una estrella de calificación
  const handleRatingClick = (value) => {
    setRatingValue(value);
    //setIsOpen(false); // Cerrar el popover después de hacer clic en una estrella
  };

  // Manejador para el cambio de comentario
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const toast = useToast();
  const createRating = async (data) => {
    try {
      //await axios.post(`http://localhost:3010/rating/create`,data)//viteAlert
      await axios.post(POST_RATING,data)
      toast({
        title: 'Success',
        description: 'You rated this product',
        status: 'success',
        duration: 9000,
        isClosable: true,
        // onClose: ()=> {window.location.reload()},
      })
    } catch (error) {
        toast({
        title: 'error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
        setIsOpen(false)
        setRatingValue(0)
        setComment('')
    };
  };

  const clearStates = () => {
    setIsOpen(false)
    setRatingValue(0)
    setComment('')
    toast({
      title: 'Error',
      position:'top',
      description: "sorry you already rated this product.",
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  //funcion manejo de 'submit'

  const submitHandler = async (e) => {
    const data = {
      rate: ratingValue,
      review: comment,
      productId: id,
      userId: user,
    }
    //const ratings = await axios.get(`http://localhost:3010/rating/user/${user}`);
    const ratings = await axios.get(`${GET_USER_RATINGS}/${user}`);
    const alreadyRated = ratings.data.filter(el=>el.productId===id);
    Boolean(alreadyRated.length)
    ?clearStates()
    :createRating(data);
  };

  return (
    <Box
      bg="white"
      w="250px"
      h="300px"
      borderWidth="3px"
      rounded="lg"
      shadow="lg"
      position="relative"
      margin="5px"
      gridAutoRows="1"
    >
      <Flex direction="column">
        <VStack>
          <Box h="220px">
            <Flex>
                <Image
                  src={image}
                  alt={`Picture of ${name}`}
                  roundedTop="lg"
                  maxH="200px"
                />
            </Flex>
          </Box>
          <Box>
            <Flex>
              <Box>
                <Flex
                  mt="1"
                  justifyContent="space-between"
                  alignContent="center"
                >
                  <Box
                    fontSize="13px"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    h="30px"
                    w="200px"
                  >
                    {name}
                  </Box>
                </Flex>
                <Flex justifyContent="space-between" alignContent="center">
                  <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <PopoverTrigger>
                      <div onClick={() => setIsOpen(true)}>
                        {/* Contenido visible del PopoverTrigger */}
                        <RatingDisplay productId={id}/>
                        {/* <Rating ratingValue={ratingValue} handleRatingClick={handleRatingClick} /> */}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverCloseButton/>
                      <PopoverHeader>Puntua este producto</PopoverHeader>
                      <PopoverBody>
                        <Flex justifyContent="center">
                          <Rating ratingValue={ratingValue} handleRatingClick={handleRatingClick} />
                        </Flex>
                        <Input
                          placeholder="Your comment"
                          value={comment}
                          onChange={handleCommentChange}
                          mt={4}
                        />
                        <Button
                          colorScheme="blue"
                          mt={4}
                          onClick={submitHandler}
                        >
                          Submit
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <Box fontSize="2xl" color="gray.800">
                    <Box as="span" color="gray.600" fontSize="lg">
                      $
                    </Box>
                    {price.toFixed(2)}
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ShoppingCard;