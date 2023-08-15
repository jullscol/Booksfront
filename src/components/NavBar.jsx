import { Link } from "react-router-dom";
import { Flex, Button, Image, Box } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginAuth } from "../views/Login/LoginAuth";
import { LogoutButton } from "../views/Login/Logout";
import { Profile } from "../views/Login/Profile";
import MenuUser from "./MenuUser";
import CartIcon from "./icons/cartIcon";

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <Flex justifyContent="space-between" align="center">
        <Flex>
          <Link to="/">
            <Button colorScheme="facebook" variant="solid">
              Home
            </Button>
          </Link>
        </Flex>

        <Flex justifyContent="center">
          <Link to="/form">
            <Button colorScheme="facebook" variant="solid">
              Create Toy
            </Button>
          </Link>
        </Flex>

        <Flex ml="auto">
          {isAuthenticated ? (
            <>
              <Profile />
              <LogoutButton />
              {MenuUser}
            </>
          ) : (
            <LoginAuth />
          )}
        </Flex>

        <Flex justifyContent="center">
          <Link to="/cart">
            <CartIcon/>
          </Link>
        </Flex>

      </Flex>

      <div>
        <Image src="/LOGO PNG.png" boxSize={"200px"} alt="Wonder Toys" />
      </div>
    </div>
  );
};

export default NavBar;
