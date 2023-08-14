import React  from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  Flex,
  Link,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { addProductToCart } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CaptionCarousel(props) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState/*<typeof Slider | null>*/(null);
  const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartItems);
  const allProducts = useSelector((state) => state.allProducts);
    
    const addProductCarrito = (product) => {
      dispatch(addProductToCart(product));
  };
  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: 'Jenga Classic Juego de Mesa',
      text:
        "El juego de mesa Jenga Classic es un juego de habilidad y equilibrio en el que los jugadores deben quitar y apilar bloques de madera sin que la torre se derrumbe.",
      image:
        '/nerf.jpg.png',
      id: 1030, 
    },
    {
      title: 'LEGO Star Wars Halcón Milenario',
      text:
        "Construye el icónico Halcón Milenario de Star Wars con más de 1300 piezas y recrea escenas de las películas con las mini-figuras de Han Solo, Chewbacca y otros personajes.",
      image:
        '/halcon23.png',
      id: 1023,
    },
    {
      title: 'Hot Wheels Basic Car 50-Pack',
      text:
        "Un juego de 50 autos Hot Wheels en varios diseños y colores para horas de juego imaginativo y colección.",
      image:
        '/schoolbus3.png.jpg.png',
      id: 1038,
    },
  ];

  return (
    <Box
      position={'relative'}
      width={'full'}
      h={'600px'}
      overflow={'hidden'}
      >
        <Flex direction={'column'}>
          {/* <Box>
            <link
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            </Box> */}
       {/* CSS files for react-slick */}
          
          {/* Left Icon */}
          <IconButton
            aria-label="left-arrow"
            paddingLeft={'300px'}
            color={'white'}
            variant='unstyled'
            position="absolute"
            left={side}
            top={top}
            transform={'translate(0%, -50%)'}
            zIndex={2}
            onClick={() => slider?.slickPrev()}>
            <BiLeftArrowAlt size="100px" />
          </IconButton>
          {/* Right Icon */}
          <IconButton
            aria-label="right-arrow"
            paddingRight={'300px'}
            color={'white'}
            variant="unstyled"
            position="absolute"
            right={side}
            top={top}
            transform={'translate(0%, -50%)'}
            zIndex={2}
            onClick={() => slider?.slickNext()}>
            <BiRightArrowAlt size="100px" />
          </IconButton>
          {/* Slider */}
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {cards.map((card, index) => (
              <Box
                key={index}
                height={'1xl'}
                position="relative"
                backgroundPosition="50%"
                backgroundRepeat="no-repeat"
                backgroundSize="480px"
                backgroundImage={`url(${card.image})`}
                h={'550px'}
                >
                {/* This is the block you need to change, to customize the caption */}
                <Container size="container.lg" height="500px" position="relative">
                  <Stack
                    spacing={5}
                    w={'full'}
                    maxW={'lg'}
                    position="absolute"
                    transform="translate(0, -50%)"
                    direction={'column'} 
                    align={'center'}>
                    {/* <Heading fontSize={'30px'} color={'white'}
                    fontWeight={'bold'}>
                      {card.title}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color="white">
                      {card.text}
                    </Text> */}
                    <Box>
                        <Flex>
                        <Box>
                          <link
                            rel="stylesheet"
                            type="text/css"
                            charSet="UTF-8"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                          />
                          <link
                            rel="stylesheet"
                            type="text/css"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                          />
                        </Box>
                        {/* <Button _hover={{transform: 'translateY(-2px)',boxShadow: 'lg',}} bg={'blue.900'} color={'white'} w={'100px'} marginRight={'30px'}>Add to Cart</Button>
                        <Link href={`/detail/${card.id}`}>
                            <Button _hover={{transform: 'translateY(-2px)',boxShadow: 'lg',}} bg={'blue.900'} color={'white'} w={'100px'}>Detail</Button>
                        </Link> */}
                        
                        </Flex>
                    </Box>
                  </Stack>
                </Container>
              </Box>
            ))}
          </Slider>
        </Flex>
    </Box>
  );
}