import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { postProduct } from "../../redux/actions"
import NavBar2 from "../../components/NavBar2";
import { useToast } from '@chakra-ui/react'
import {
    Button,
    Flex,
    VStack,
    FormControl,
    FormLabel,
    Heading,
    FormHelperText,
    Select,
    Input,
    Box,
    RadioGroup,
    HStack,
    Radio,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,

  } from '@chakra-ui/react'

const Form = ()=>{

    const toast = useToast()

    const dispatch = useDispatch()
    const navigate = useNavigate();


    const [form, setForm] = useState({ //creo un estado del form.
        name:"",
        brand:"",
        category:"",
        minimun_age:"",
        description:"",
        quantity:"",
        price:"",
        product_status: true,
    })

    const [image, setImage] = useState(null);

    const [errors, setErrors] = useState({});

    const validateForm = (form, image) => {

       let errors = {};
       if(!form.name.trim()) errors.name = 'Name is required';
       if(!form.brand) errors.brand = 'Brand is required';
       if(!form.category) errors.category = 'Category is required';
       if(form.minimun_age === '0' || !form.minimun_age) errors.minimun_age = 'Minimun Age is required';
       if(!form.description) errors.description = 'Description is required';
       if(!image) errors.image = "Product image is required";
       if (image && !image.type.startsWith('image/')) errors.image = 'Please select a valid image file.'

       return errors; 
    };

    const handleOnBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form, image));       
    };


    // function handleChange (e) {
    //     setForm({
    //         ...form,
    //         [e.target.name] : e.target.value //agrega el value al estado del form
    //     })
    // }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setForm(prevState => ({...prevState, [name]: value}));
    };

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImage(file);
      const error = validateForm(form, file);
      setErrors(error);
 
    };



    function handleSelect (e) { //hago una funcion para cuando cambia el select
        setForm({
            ...form,
            [e.target.value] : e.target.value //agrega los tipos al estado
        })
    }

    const handleNumbersChange = (value, name) => {
        setForm(prevState => ({...prevState, [name]: value}));
    };



//con esta funcion le digo que si estan todos los datos, me haga el dispatch, pero sino no.
    // function handleSubmit(e) {
    //     console.log('handlesubmit ok')
    //     try {
    //         axios.post("http://localhost:3010/products/create", form);
    //     } catch (error) {
    //         console.log(error)
    //     }
        
    // }
    const categoriesData = [
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
    

    const handleSubmit = event => {

        event.preventDefault();

        try {
            if(!image) {
                alert("por favor inserte una imagen");
                return;
            }
            const postData = new FormData();
            postData.append('name', form.name);
            postData.append('brand', form.brand);
            postData.append('category', form.category);
            postData.append('minimun_age', form.minimun_age);
            postData.append('description', form.description);
            postData.append('quantity', form.quantity);
            postData.append('price', form.price);
            postData.append('product_status', form.product_status);
            postData.append('image', image);
           
            
            dispatch(postProduct(postData));
            toast({
                title: "Juguete Creado",
                description: "El Juguete a sido creado con exito.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });

            setImage(null);
            setForm({    
            name:"",
            brand:"",
            category:"",
            minimun_age:"",
            description:"",
            quantity:"",
            price:"",
            product_status: true,})

            navigate("/");
            
        } catch (error) {
            console.log(error)
        }
    };

    return(
        <Box>
            <NavBar2></NavBar2>
        <Box
            backgroundImage="url('/BG3.jpg')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            width="100vw"
            height="92vh"
            paddingTop={'40px'}
            >
        <VStack>
        <Heading color={'white'}>Create Toy</Heading>
        <br />
            <Flex direction="column" align={'center'}>
                <form onSubmit={handleSubmit}>
                <FormControl>
                    <Flex direction={'column'} align={'center'}>
                    <FormLabel  color={'white'}>Name</FormLabel>
                    <Input type='text' name="name" value={form.name} bg={'white'} onChange={handleChange} onBlur={handleOnBlur}/>
                    {errors.name && <p>{errors.name}</p>}
                <FormLabel color={'white'}>Brands</FormLabel>
                <Select placeholder='Select Brand' name="brand" value={form.brand} bg={'white'} onChange={handleChange} onBlur={handleOnBlur}>
                    {brandsData.map((b) => (
                            <option value={b} key={b} >{b}</option>
                        ))}
                </Select>
                {errors.brand && <p>{errors.brand}</p>}
                <FormLabel color={'white'}>Category</FormLabel>
                <Select placeholder='Select Category' name="category" value={form.category} bg={'white'} onChange={handleChange} onBlur={handleOnBlur}>
                    {categoriesData.map((c) => (
                        <option value={c} key={c} >{c}</option>
                    ))}
                </Select>
                {errors.category && <p>{errors.category}</p>}        
                <FormLabel color={'white'}>Minimum Age</FormLabel>
                <NumberInput max={15} min={0} name="minimun_age" value={form.minimun_age} bg={'white'} w={'350px'} onChange={value => handleNumbersChange(value, "minimun_age")} onBlur={handleOnBlur}>
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                {errors.minimun_age && <p>{errors.minimun_age}</p>}
                <FormLabel color={'white'}>Description</FormLabel>
                    <Input type='text' name="description" value={form.description} bg={'white'} onChange={handleChange} onBlur={handleOnBlur}/>
                    {errors.description && <p>{errors.description}</p>}
                <FormLabel color={'white'}>Quantity</FormLabel>
                <NumberInput max={10000} min={0} name="quantity" value={form.quantity} bg={'white'} w={'350px'} onChange={value => handleNumbersChange(value, "quantity")}>
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <FormLabel color={'white'}>Price</FormLabel>
                <NumberInput max={300000} min={0} name="price" value={form.price} bg={'white'} w={'350px'} onChange={value => handleNumbersChange(value, "price")}>
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <FormLabel color={'white'}>Image</FormLabel>
                    <Input type="file" id="imagen" name="imagen" w={'350px'} onChange={handleImageChange}/>
                    {/* {image && <img src={URL.createObjectURL(image)} alt="alt"/>} */}
                    {errors.image && <p>{errors.image}</p>}
                    <br />
                    <Button type="submit" isDisabled={Object.keys(errors).length || form.name=== '' || form.brand === ''}>Create Toy</Button>

                    </Flex>
                </FormControl>
                </form>
            </Flex>
        </VStack>
        </Box>
        </Box>
    )

}



export default Form;