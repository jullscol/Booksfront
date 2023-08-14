import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getProducts, filterByAge, filterByPrice, filterByCategory, filterByBrand, orderByPrice, getProductsFiltered, getProductsFilteredPage, productsFilter, actualizarFiltroPaginado } from "../redux/actions";
import { Box, Flex, Button, FormLabel, Select, Input, InputGroup } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
//import SearchBar from "./SearchBar";
const GET_PRODUCTS_ALL = import.meta.env.VITE_GET_ALL_PRODUCTS;


const FilterAndOrder = () => {

    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        price:0,
        brand: "",
        category: "",
        minimun_age: 0,
        name: "",
    })

    const [priceInput, setPriceInput] = useState('')
    const [searchInput, setSearchInput] = useState('')

    const handleFilters = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setFilters({...filters, [e.target.name]: e.target.value})
    }

    const handlePriceInput = (e) => {
        const {value} = e.target
        setPriceInput(value);
    };

    const handleSearchInput = (e) => {
        const {value} = e.target
        console.log(value)
        setSearchInput(value);
    };

    useEffect(()=> {
        const params = {}
        for(const key in filters){
        if(filters[key]){
            params[key] = filters[key]
        }
        }
        console.log(params);
        dispatch(actualizarFiltroPaginado(params));

       axios.get(GET_PRODUCTS_ALL,{params})
       .then(res => {dispatch(productsFilter(res.data))})
    },[filters])

    const resetInput = () => {
        //  const selects = document.querySelectorAll(".resetSelect");
        //      selects.forEach((select) => (select.selectedIndex = 0 ));
        var dropDown = document.getElementById("ageSelect");
        var dropDown2 = document.getElementById("brandSelect");
        var dropDown3 = document.getElementById("categorySelect");
        dropDown.selectedIndex = "All";
        dropDown2.selectedIndex = "All";
        dropDown3.selectedIndex = "All";
        setPriceInput('');
        setSearchInput('')

    }


    const ages = [
        'All',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
    ];
    const categoriesData = [
        "All",
        "Peluches",
        "Bloques de construcción",
        "Muñecas",
        "Vehículos",
        "Puzzles",
        "Ciencia",
        "Imitación",
        "Juegos de exterior",
        "Juegos de mesa",
        "Robótica",
        "Juegos de imitación",
        "Pistola",
        "Arte y manualidades",
        "Construction toys",
        "Electronic toys",
        "Vehicle Toys",
        "Playsets",
        "Kitchen Playsets",
        "Deportes",
        "Pista de carreras",
        "Art and Craft Toys"
    ];
    const brandsData = [
        "All",
        "Juguetelandia",
        "LEGO",
        "Mattel",
        "ToysRUs",
        "SportsWorld",
        "Toyland",
        "ScienceKids",
        "Playtime",
        "Berjuan",
        "Nerf",
        "Hasbro",
        "Makeblock",
        "Barbie",
        "Meccano",
        "ToyZone",
        "Puzzlemaster",
        "Juguetitos",
        "VTech",
        "Melissa & Doug",
        "Hot Wheels",
    ];


    
    return (
      <div>
        <Box w={"200px"} h={"550px"}>
          <br />
          <Flex direction={"column"} align={"center"}>
            <Button
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              bg={"blue.900"}
              color={"white"}
              w={"100px"}
              onClick={() => {
                resetInput();
                setFilters({
                  price: 0,
                  brand: "",
                  category: "",
                  minimun_age: 0,
                  name: "",
                });
              }}
            >
              Borrar Filtros
            </Button>
            <br />
            <Box>
            <Input
                type="text"
                name="name"
                value={searchInput}
                onChange={handleSearchInput}
                w={"110px"}
                bg={"blue.900"}
                color={"white"}
              ></Input>
              <Button
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                bg={"blue.900"}
                color={"white"}
                onClick={handleFilters}
                value={searchInput}
                name="name"
              >
                Buscar
              </Button>
            </Box>
            <br />
            <FormLabel>Filtro Edad</FormLabel>
            <Select
              w={"130px"}
              id="ageSelect"
              onChange={handleFilters}
              bg={"gray.200"}
              color={"black"}
              name="minimun_age"
            >
              {ages.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Select>

            <FormLabel>Filtro Categoria</FormLabel>
            <Select
              w={"130px"}
              id="categorySelect"
              onChange={handleFilters}
              bg={"gray.200"}
              color={"black"}
              name="category"
            >
              {categoriesData.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Select>

            <FormLabel>Filtro Marcas</FormLabel>
            <Select
              w={"130px"}
              id="brandSelect"
              onChange={handleFilters}
              bg={"gray.200"}
              color={"black"}
              name="brand"
            >
              {brandsData.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Select>
            <br />
            <div>
              <FormLabel>Precio Maximo: </FormLabel>
              <Input
                type="number"
                name="price"
                value={priceInput}
                onChange={handlePriceInput}
                w={"110px"}
                bg={"blue.900"}
                color={"white"}
              ></Input>
              <Button
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                bg={"blue.900"}
                color={"white"}
                onClick={handleFilters}
                value={priceInput}
                name="price"
              >
                Ver
              </Button>
            </div>
            <br />
            <Box>
              <Button
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                bg={"green.500"}
                color={"white"}
                value="higher"
                name="order"
                onClick={handleFilters}
              >
                Mayor
              </Button>
              <Button
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                bg={"red.500"}
                color={"white"}
                value="lower"
                name="order"
                onClick={handleFilters}
              >
                Menor
              </Button>
            </Box>
          </Flex>
        </Box>
      </div>
    );

}

export default FilterAndOrder;