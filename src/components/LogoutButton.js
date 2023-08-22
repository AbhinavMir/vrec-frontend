import React from 'react';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const LogoutButton = () => {
    const toast = useToast();
  const handleLogout = () => {
    toast({
        title: "Logged out",
        description: "You have been logged out",
        status: "success",
        duration: 9000,
        isClosable: true,
        })
    // Perform any logout logic here, such as clearing local storage or invalidating tokens
    localStorage.removeItem('accessToken');
    // Add any additional logout logic as needed
    
    // refresh
    window.location.reload();
    // You might also want to redirect the user to a login page or perform other actions
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
