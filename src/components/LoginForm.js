import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      toast({
        title: "Please wait a moment as we log you in...",
        status: "info",
        duration: 1000,
        isClosable: true,
      });

      const response = await fetch("https://vrec.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Login response:", responseData.access_token)
        localStorage.setItem("access_token", responseData.access_token);

        toast({
          title: "Login Successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/success"); // Navigate to the dashboard or any other page
      } else {
        toast({
          title: "Login Failed",
          description: responseData.error || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error sending login request:", error);
    }
  };

  return (
    <Box
      p={8}
      borderWidth={1}
      borderRadius={8}
      marginTop={50}
      width={{ base: "100%", md: "40%" }}
      m="auto"
      boxShadow="lg"
      textAlign="center"
    >
      <Heading as="h2" size="lg" mb={6}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password:</FormLabel>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <IconButton
            size="sm"
            variant="ghost"
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            onClick={togglePasswordVisibility}
            ml={2}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mb={4}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
