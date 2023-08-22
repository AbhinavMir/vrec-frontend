import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
  Progress,
  useToast,
  Center,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import zxcvbn from "zxcvbn";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { SiLinkedin, SiMessenger } from "react-icons/si";

function SignupForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    const strength = zxcvbn(newPassword).score * 25;
    setPasswordStrength(strength);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = { email, password, name };

    try {
      toast({
        title: "Please wait a moment as we sign you up...",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
      const response = await fetch("https://vrec.onrender.com/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        toast({
          title: "Sign Up Successful",
          status: "success",
          duration: 500,
          isClosable: true,
        });
        navigate("/success", { state: { email } });
      } else {
        toast({
          title: "Signup Failed",
          description: "Please try again!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error sending signup request:", error);
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
      boxShadow="lg" // Add a nice shadow
      textAlign="center" // Center horizontally
    >
      <Heading as="h2" size="lg" mb={6}>
        Signup
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>
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
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
          />
          <IconButton
            size="sm"
            variant="ghost"
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            onClick={togglePasswordVisibility}
            ml={2}
          />
          <Progress value={passwordStrength} size="xs" mt={2} />
        </FormControl>

        <Button type="submit" colorScheme="blue" mb={4}>
          Sign Up
        </Button>
        <Box>
          <Center p={8}>
            <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
              {/* Facebook */}
              <Button
                w={"full"}
                colorScheme={"facebook"}
                leftIcon={<FaFacebook />}
              >
                <Center>
                  <Text>Continue with Facebook</Text>
                </Center>
              </Button>

              {/* Google */}
              <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>

              {/* LinkedIn */}
              <Button
                w={"full"}
                colorScheme={"messenger"}
                leftIcon={<SiLinkedin />}
              >
                <Center>
                  <Text>Send to Linkedin</Text>
                </Center>
              </Button>

              {/* Messenger */}
              <Button
                w={"full"}
                colorScheme={"messenger"}
                leftIcon={<SiMessenger />}
              >
                <Center>
                  <Text>Send to Messenger</Text>
                </Center>
              </Button>
            </Stack>
          </Center>
        </Box>
      </form>
    </Box>
  );
}

export default SignupForm;
