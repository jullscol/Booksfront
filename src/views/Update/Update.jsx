import { Box } from '@chakra-ui/react';
import NavBar2 from "../../components/NavBar2"
import ProductProfileEdit from "../../components/Update"


const Update = () => {
    return(
        <Box
        backgroundImage="url('/BG3.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        width="100vw"
        height="100vh"
        >
        <NavBar2></NavBar2>
        <ProductProfileEdit></ProductProfileEdit>
        </Box>
    )
}



export default Update;