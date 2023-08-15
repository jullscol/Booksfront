import { Input, InputGroup, InputLeftElement, Flex, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { getProductsName } from '../redux/actions';
import React, { useState, useEffect } from 'react';

const SearchBar = ({handleFilters}) => {
  const dispatch = useDispatch();
  
  const [searchNames, setSearchNames] = useState('');
  const handleInputChange = (event) => {
    const {value} = event.target; 
    setSearchNames(value)
    console.log(searchNames)
  };

  // const handleSearch = () => {
  //   dispatch(getProductsName(searchNames))
  //   setSearchNames("");
  // };

  return (
    <InputGroup>
      <Input w={'100px'} type="text" placeholder="Search..." value={searchNames} bg={'gwhite'} onChange={handleInputChange} />
      <Button _hover={{transform: 'translateY(-2px)',boxShadow: 'lg',}} bg={'#0E1A40'} color={'white'} name="name" value={searchNames} onClick={handleFilters}>{<SearchIcon color="white" />}</Button>
    </InputGroup>
  );
};

export default SearchBar;