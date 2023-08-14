import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const navigate = useNavigate();
    
  return (
    <Button
      colorScheme="gray"
      variant="solid"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Logout
    </Button>
  );
};