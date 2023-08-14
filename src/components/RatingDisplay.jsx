import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import axios from 'axios';

const GET_RATING_PRODUCT_BY_ID = import.meta.env.VITE_GET_RATING_PRODUCT_BY_ID;

const RatingDisplay = ({ productId }) => {
  const [ratingsAverage, setRatingsAverage] = useState('');
  //console.log(props);

  useEffect(() => {
    const getProductRatings = async (productId) => {
      //const response = await axios.get(`http://localhost:3010/rating/product/${productId}`);
      const response = await axios.get(`${GET_RATING_PRODUCT_BY_ID}/${productId}`);
      const ratings = response.data;

      const totalCantidad = ratings.reduce((acumulador, product) => {
        return acumulador + product.rate;
      }, 0);

      const average = totalCantidad / ratings.length;
      //console.log(average);

      setRatingsAverage(average);
    };

    getProductRatings(productId);
  }, [productId]);

  return (
    <Flex alignItems="center">
      {[...Array(5)].map((star, i) => {
        let starIcon;

        if (i < Math.floor(ratingsAverage)) {
          starIcon = <BsStarFill />;
        } else if (i < Math.ceil(ratingsAverage)) {
          starIcon = <BsStarHalf />;
        } else {
          starIcon = <BsStar />;
        }

        return (
          <Box cursor="pointer" key={i} ml={1} mt={2}>
            {starIcon}
          </Box>
        );
      })}
    </Flex>
  );
};

export default RatingDisplay;



