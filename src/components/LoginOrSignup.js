import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const LoginOrSignUp = () => {
  const [landingPage, setLandingPage] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const toast = useToast();

  const handleLogin = async () => {
    console.log("handleLogin");
    toast({
      title: "Logging you in, just a moment!",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    try {
      const loginData = { email, password };
      const response = await fetch("https://vrec.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const { access_token } = await response.json();
        localStorage.setItem("accessToken", access_token);
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // refresh
        window.location.href = "/";
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Failed to log in.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSignUp = () => {
    const signUpData = { name, email, password };

    const response = fetch("https://vrec.onrender.com/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });
    if (response.ok) {
      setIsLogin(true);
      toast({
        title: "Sign up successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "You should be signed up now",
        description:
          "Go to the login page and log in. If there is any error, please contact me.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Stack spacing={4}>
        {!isLogin && ( // Render the name field only for sign-up
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        {isLogin ? ( // Show appropriate button based on the form type
          <Button onClick={handleLogin}>Login</Button>
        ) : (
          <Button onClick={handleSignUp}>Sign Up</Button>
        )}
        <Button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Sign Up" : "Switch to Login"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginOrSignUp;
