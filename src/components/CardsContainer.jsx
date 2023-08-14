import Cards2 from "./Cards2";
import {
  Flex,
  Box,
  Button,
  Image,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FilterAndOrder from "./Filters";
import SearchBar from "./SearchBar";
import axios from "axios";
import { getProductsFiltered, getProductsFilteredPage, productsFilter } from "../redux/actions";
import { useDispatch } from "react-redux";

////////////////prueba alert///////////////////
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
const GET_PRODUCTS_ALL = import.meta.env.VITE_GET_ALL_PRODUCTS;





///////////////////////////////////////////////
const CardsContainer = (props) => {

  const dispatch = useDispatch()
  const productsData = useSelector(state=>state.filteredProducts)
  const configuracionFiltros = useSelector(state => state.filtroParaPaginado);
  //let currentPageData = Number(productsData.currentPage)
  const [currentPageData, setCurrentPageData] = useState(
    Number(productsData.currentPage)
  );
  const pages = Number(productsData.totalPages)

  useEffect(()=> {
    setCurrentPageData(Number(productsData.currentPage));
  },[productsData]);



  // const handlePageState = (pageNumber) => {
  //   dispatch(getProductsFilteredPage({pageNumber:pageNumber}))
  //   // currentPageData = pageNumber
  // }

  const handlePageState = (e) => {
    console.log(e.target.name);
    //const nextPage = currentPageData + 1;
    const nextPage = e.target.name === 'siguiente'? currentPageData + 1 : currentPageData - 1
    setCurrentPageData(nextPage);
    const filters = configuracionFiltros;
    const params = { ...configuracionFiltros, pageNumber: nextPage }; // Agrega la propiedad 'page' al objeto de parámetros

    axios
      .get(GET_PRODUCTS_ALL, { params })
      .then((res) => {
        dispatch(productsFilter(res.data));
      })
      .catch((error) => {
        console.error("Error al obtener los productos: ", error);
      });
  };

  return (
    <div>
      <div>
        <Box bg={""} w={"98%"} ml={'1%'} maxW={'100%'}>
          <Flex direction={"column"} paddingTop={"60px"} align={"center"}>
            <div>
              <Button
                w={"100px"}
                name="anterior"
                isDisabled={currentPageData === 1}
                _hover={""}
                color={"white"}
                bg={"#0E1A40"}
                onClick={handlePageState}
              >
                Anterior
              </Button>
              <span>
                Página {currentPageData} de {pages}
              </span>
              <Button
                w={"100px"}
                name="siguiente"
                isDisabled={currentPageData === productsData.totalPages}
                _hover={""}
                color={"white"}
                bg={"#0E1A40"}
                onClick={handlePageState}
              >
                Siguiente
              </Button>
            </div>

            <Box>
              <Flex>
                <Box
                  bg={"gray.400"}
                  marginLeft={""}
                  rounded={"20px"}
                  w={"250px"}
                  h={"530px"}
                >
                  <Flex direction={"column"} align={"center"}>
                    <FilterAndOrder />
                  </Flex>
                </Box>
                <Box bg={""} rounded={"20px"}>
                  
                  <SimpleGrid columns={5} bg={""} w={"100%"} h={"100%"}>
                    {                    
                      productsData.data?.length ? (
                        productsData.data.map((product) => {
                          return (
                            <Cards2
                              key={product.id}
                              id={product.id}
                              name={product.name}
                              price={product.price}
                              image={product.image}
                              description={product.description}
                              productoCarrito={product}
                            />
                          );
                        })
                      ) : (
                        <Box
                          display='flex'
                          gridColumn={3}
                          gridRow={2}
                          
                        >
                          <Alert
                            status="success"
                            variant="subtle"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            height="200px"
                            borderRadius='10px'
                          >
                            <Search2Icon boxSize="40px" mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize="lg">
                              No Results!
                            </AlertTitle>
                            <AlertDescription maxWidth="sm">
                              There are no products that match your search.
                            </AlertDescription>
                          </Alert>
                        </Box>
                      )
                    }
                  </SimpleGrid>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </div>
    </div>
  );
};

export default CardsContainer;
