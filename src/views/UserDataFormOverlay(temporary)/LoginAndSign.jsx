import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import passwordValidator from "password-validator";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Select,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import NavBar2 from "../../components/NavBar2";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const POST_NEW_USER = import.meta.env.VITE_POST_NEW_USER;

const schema = new passwordValidator();
schema
  .is()
  .min(9) // Minimum length
  .is()
  .max(100) // Maximum length
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces(); // Should not have spaces

export default function LoginAndSign() {
  const { loginWithRedirect } = useAuth0();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleLoginWithGoogle = () => {
    loginWithRedirect({
      connection: "google-oauth2",
      screen_hint: "signup",
    });
  };

  const [newUser, setNewUser] = useState(false);
  const [userRegister, setUserRegister] = useState({
    email: "",
    user_password: "",
    first_name: "",
    last_name: "",
    gender: "",
    delivery_address: "",
    role_id: "Cliente",
  });

  const [invalidPassword, setInvalidPassword] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const handleChangeRegister = (event) => {
    const { name, value } = event.target;
    if (name === "user_password") {
      setInvalidPassword(false);
    }
    setUserRegister((preValue) => ({ ...preValue, [name]: value }));
  };

  const handleNewUser = async (event) => {
    setInvalidPassword(false);
    event.preventDefault();
    //console.log(userRegister)
    if (!schema.validate(userRegister.user_password)) {
      console.log("Invalid password");
      setInvalidPassword(true);
      //alert("contraseña invalida, intente de nuevo");
      // Handle the error or display a message to the user
      return;
    }
    try {
      const usuarioNuevo = await axios.post(
        POST_NEW_USER /*"http://localhost:3010/users/create"*/,
        userRegister
      );
      setUserRegister({
        email: "",
        user_password: "",
        first_name: "",
        last_name: "",
        gender: "",
        delivery_address: "",
        role_id: "Cliente",
      });
      setUserCreated(true);
      console.log(usuarioNuevo.data);
      loginWithRedirect();
    } catch (error) {
      console.log("ocurrio un error", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <NavBar2></NavBar2>
      <Box
        backgroundImage="url('/BG3.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        width="100vw"
        height="92vh"
        overflow="hidden"
      >
        <Box>
        <Flex minH={"100vh"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={2}>
            <Stack align={"center"}>
              <Heading color={"white"} fontSize={"4xl"} textAlign={"center"}>
                Sign up
              </Heading>
              <Text fontSize={"lg"} color={"gray.200"}>
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <form onSubmit={handleNewUser}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel htmlFor="first_name">First Name</FormLabel>
                        <Input
                          type="text"
                          name="first_name"
                          value={newUser.first_name}
                          onChange={handleChangeRegister}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName">
                        <FormLabel htmlFor="last_name">Last Name</FormLabel>
                        <Input
                          type="text"
                          name="last_name"
                          value={newUser.last_name}
                          onChange={handleChangeRegister}
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleChangeRegister}
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel htmlFor="user_password">Password</FormLabel>
                    <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="user_password"
                      value={newUser.user_password}
                      onChange={handleChangeRegister}
                    />
                    <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
                    {invalidPassword && (
                      <p>
                        la contraseña tiene que contener al menos 1 mayuscula, 1
                        numero y una longitud de 9 caracteres
                      </p>
                    )}
                    </InputGroup>
                  </FormControl>
                  <FormLabel htmlFor="gender">Genero</FormLabel>
                  <Select name="gender" id="" onChange={handleChangeRegister}>
                    <option value="">Seleccione un genero:</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="X">Indefinido</option>
                  </Select>

                  <FormLabel htmlFor="delivery_address">Direccion: </FormLabel>
                  <Input
                    type="text"
                    name="delivery_address"
                    value={newUser.delivery_address}
                    onChange={handleChangeRegister}
                  />

                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign up
                    </Button>
                    {userCreated && <p>usuario creado con exito!</p>}
                  </Stack>
                </form>
                {/* <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user? <Link color={"blue.400"}>Login</Link>
                  </Text>
                </Stack> */}
              </Stack>
            </Box>
          </Stack>
        </Flex>
        </Box>

        {/* <h2>Sign in</h2>
        <form onSubmit={handleNewUser}>
          <label htmlFor="email">email:</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChangeRegister}
          />

          <label htmlFor="user_password">password:</label>
          <input
            type="password"
            name="user_password"
            value={newUser.user_password}
            onChange={handleChangeRegister}
          />
          {invalidPassword && (
            <p>
              la contraseña tiene que contener al menos 1 mayuscula, 1 numero y
              una longitud de 9 caracteres
            </p>
          )}

          <label htmlFor="first_name">nombre:</label>
          <input
            type="text"
            name="first_name"
            value={newUser.first_name}
            onChange={handleChangeRegister}
          />

          <label htmlFor="last_name">apellido:</label>
          <input
            type="text"
            name="last_name"
            value={newUser.last_name}
            onChange={handleChangeRegister}
          />

          <label htmlFor="gender">genero</label>
          <select name="gender" id="" onChange={handleChangeRegister}>
            <option value="">seleccione un genero:</option>
            <option value="M">masculino</option>
            <option value="F">femenino</option>
            <option value="X">indefinido</option>
          </select>

          <label htmlFor="delivery_address">direccion: </label>
          <input
            type="text"
            name="delivery_address"
            value={newUser.delivery_address}
            onChange={handleChangeRegister}
          />

          <Button type="submit"> registrarse</Button>
          {userCreated && <p>usuario creado con exito!</p>}
        </form> */}
      </Box>
    </Box>
  );
}
