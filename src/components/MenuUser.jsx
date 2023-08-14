import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
} from '@chakra-ui/icons';

import { useAuth0 } from "@auth0/auth0-react";

// const { logout } = useAuth0();

const MenuUser  = (
    <Menu>
    <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
    <MenuList>
      <MenuItem icon={<AddIcon />} command="⌘T">
        Favoritos
      </MenuItem>
      <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
        Mis compras
      </MenuItem>
      <MenuItem icon={<RepeatIcon />} onClick={() => logout({ returnTo: window.location.origin })}>
        Cerrar Sesion
      </MenuItem>
    </MenuList>
  </Menu>
);

export default MenuUser;