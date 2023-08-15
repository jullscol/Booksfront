import { Box } from '@chakra-ui/react';
import BasicStatistics from "../../components/Stats"
import NavBar2 from "../../components/NavBar2"
// import { ChartPie } from '../../components/Chart';


const Admin = () => {
    return(
        <Box
        backgroundImage="url('/BG3.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        width="100vw"
        height="100vh"
        overflow="hidden"
        >
        <NavBar2></NavBar2>
        {/* <ChartPie/> */}
        <BasicStatistics/>
        </Box>
    )
}



export default Admin;