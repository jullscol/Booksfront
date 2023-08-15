import { Button, Flex, Heading, Image, Box, Center } from "@chakra-ui/react";
import CardsContainer from "../../components/CardsContainer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIdEmailUser,
  getProducts,
  emptyDetail,
  getUserObject,
  purchaseHistoryState,
} from "../../redux/actions";
import NavBar2 from "../../components/NavBar2";
import CaptionCarousel from "../../components/Carousel";
import SmallWithLogoLeft from "../../components/Footer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const POST_USER_EMAIL = import.meta.env.VITE_POST_USER_EMAIL;
const GET_ALL_PRODUCTS = import.meta.env.VITE_GET_ALL_PRODUCTS;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth0();

  ///ratings////
  const purHistoryRaw = useSelector(
    (state) => state.userObject.purchase_history
  );
  //console.log(purHistoryRaw);
  const eliminarRepetidos = (arrayDeProductos) => {
    const idsUnicos = new Set();
    const productosUnicos = [];

    for (const producto of arrayDeProductos) {
      if (!idsUnicos.has(producto.productId)) {
        idsUnicos.add(producto.productId);
        productosUnicos.push(producto);
      }
    }

    return productosUnicos;
  };

  const getPurchaseHistory = (dispatch) => {
    const purchaseHistory = [];
    const productosUnicos = eliminarRepetidos(purHistoryRaw);
    productosUnicos.forEach(async (el) => {
      const response = await axios.get(
        //`http://localhost:3010/products/${el.productId}`//alertaVite
        `${GET_ALL_PRODUCTS}/${el.productId}`
      );
      const data = response.data;
      purchaseHistory.push(data);
    });
    dispatch(purchaseHistoryState(purchaseHistory));
  };

  useEffect(() => {
    //aqui se puedde poner un if que verifique si el array de products no es cero para no llamar tanto al back
    dispatch(getProducts());
    dispatch(emptyDetail());
  }, [dispatch]);

  useEffect(() => {
    const getUserId = async () => {
      //if(isAuthenticated && !user?.given_name || !user?.family_name){
      //    alert("bienvenido a wonderToys, para proseguir con su experiencia, por favor llene los ultimos campos en su profile");
      //    navigate("/Profile");l
      //} aqui tratart de crear al usuario, si el given name y el family name estan vacios (esto para los ratings!!!) (REDIRIGIR AL USUARIO AL PROFILE PARA QUE COMPLETE LOS DATOS QuE FALTAN, tanto para usar los ratings como para comprar en el carrito), redirigirlo al profile para que complete esos datos. Los campos gender y address pueden ser nulos, verificarlos en el cart
      try {
        if (user) {
          const idUser = await axios.post(
            POST_USER_EMAIL /*"http://localhost:3010/users/userEmail"*/,
            { email: user?.email }
          );
          dispatch(getIdEmailUser(idUser.data.idUser));
          dispatch(getUserObject(idUser.data.user));
          console.log(idUser.data.idUser);
        }
      } catch (error) {
        console.log("cargando el id del user");
      }
    };

    getUserId();
    if (Boolean(purHistoryRaw?.length)) {
      getPurchaseHistory(dispatch);
    }
  }, [user]);

  return (
    <Box
      backgroundImage="url('/BG7.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      width="100%"
      h={{ base: "1500px", md: "1500px", lg: "1650px" }}
    >
      {console.log(user)}
      <Box bg={""} width="100%" height="100%">
        <Flex direction={"row"} align={"center"} justify={"space-evenly"}>
          <NavBar2 />
        </Flex>
        <CaptionCarousel></CaptionCarousel>
        <Box bg={""} h={"100vh"} maxW={"97%"}>
          <CardsContainer />
        </Box>
      </Box>
      {/* <SmallWithLogoLeft /> */}
      <Box>
        <SmallWithLogoLeft />
      </Box>
    </Box>
  );
};

export default Home;
