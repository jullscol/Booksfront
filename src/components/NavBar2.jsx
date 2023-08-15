import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginAuth } from "../views/Login/LoginAuth";
import { LogoutButton } from "../views/Login/Logout";
import { Profile } from "../views/Login/Profile";
import MenuUser from "./MenuUser";
import CartIcon from "./icons/cartIcon";
import {Link} from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useSelector } from "react-redux";

export default function WithSubnavigation() {
  const { isAuthenticated } = useAuth0();
  const userAdmin = useSelector(state => state.userObject);

  const { isOpen, onToggle } = useDisclosure();

  const navigationItems = isAuthenticated
    ? userAdmin.role_id === "Administrador" ?[
        //{ label: "My Orders", href: "#" },
        { label: "Home", href: "/" },
        {
          label: "Admin",
          children: [
            {
              label: "Create Toy",
              subLabel: "Create a New Toy",
              href: "/form",
            },
            {
              label: "Stats",
              subLabel: "Sales, Orders, Users",
              href: "/admin",
            },
            {
              label: "Edit Product",
              subLabel: "Update or Delete Product",
              href: "/edit",
            },
          ],
        },
        // { label: "Create Toy", href: "/form" },
        { label: "Cart", href: "/cart" },
        // { label: "Admin", href: "/admin" },
        { label: "Profile", href: "/Profile" },
      ]

    : [
      { label: "Home", href: "/" },
      { label: "Cart", href: "/cart" },
      { label: "Profile", href: "/Profile" },
    ] :[
        { label: "Home", href: "/" },
        { label: "Cart", href: "/cart" },
      ];

  return (
    <Box w={"100%"}>
      <Flex
        bg={useColorModeValue("blue.900", "gray.800")}
        // color={useColorModeValue("black", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.900", "gray.900")}
        align={"center"}
        paddingLeft={"200px"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <div>
            <Image src="/LOGO PNG.png" w={"70px"} alt="Wonder Toys" />
          </div>
        </Flex>
        <Flex ml="auto" paddingRight={"100px"}>
          {isAuthenticated ? (
            <Box>
              {/* <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <DesktopNav navigationItems={navigationItems} />
              </Flex> */}
              <Flex
              // display={{ base: "none", md: "flex" }}
              // ml={10}
              // justifyContent="flex-start"
              // justify={'space-around'}
              >
                <Box marginRight={"850px"} marginTop={"10px"}>
                  <DesktopNav navigationItems={navigationItems} />
                </Box>

                <Profile />
                {/* <LogoutButton /> */}
              </Flex>
            </Box>
          ) : (
            <Box>
              <Flex>
                <Box marginRight={"1000px"} marginTop={"10px"}>
                  <DesktopNav navigationItems={navigationItems} />
                </Box>
                <LoginAuth />
              </Flex>
            </Box>
          )}
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = (props) => {
  const linkColor = useColorModeValue("white", "gray.200");
  const linkHoverColor = useColorModeValue("red.600", "black");
  const popoverContentBgColor = useColorModeValue("black", "gray.800");

  return (
    <Stack  direction={"row"} spacing={4} align={"center"}>
      {props.navigationItems.map((navItem) => (
        <Box key={navItem.label} color={'white'}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link to={navItem.href ?? "#"} 
                 p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}            
              >
                {/* */}
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel } /*: NavItem*/) => {
  return (
    <Link to={href}
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
     _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      {/* */}
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href } /*: NavItem*/) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} to={child.href} py={2}>
                {/*key={child.label}  href={child.href}*/}
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

//interface NavItem {
//  label: string;
//  subLabel?: string;
//  children?: Array<NavItem>;
//  href?: string;
//}

const NAV_ITEMS /*: Array<NavItem>*/ = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Cart",
    href: "/cart",
  },
  {
    label: "My Orders",
    href: "#",
  },
  {
    label: "Admin",
    children: [
      {
        label: "Create Toy",
        subLabel: "Create a New Toy",
        href: "/form",
      },
      {
        label: "Stats",
        subLabel: "Sales, Orders, Users",
        href: "/admin",
      },
      {
        label: "Edit Product",
        subLabel: "Update or Delete Product",
        href: "/edit",
      },
    ],
  },
];

const NAV_ITEMS_NOT_LOGGED = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Cart",
    href: "/cart",
  },
];
