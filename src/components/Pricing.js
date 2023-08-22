import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Stack,
  useToast,
  Center,
  Tooltip,
  Tag,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Paypal from "./Paypal";

const PricingCard = ({ title, price, features, isLoggedIn }) => {
  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box p="1">
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  ));

  const [inputValue, setInputValue] = useState(""); // State for the input value

  const toast = useToast(); // Create toast using the useToast hook
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAccessCode = async () => {
    try {
      if (!isLoggedIn) {
        // If user is not logged in, show error and return
        toast({
          title: "Access Denied",
          description: "You need to log in to access this feature.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const accessToken = localStorage.getItem("accessToken"); // Retrieve access token from localStorage

      if (!accessToken) {
        console.error("Access token not found in localStorage.");
        return;
      }

      const response = await fetch("https://vrec.onrender.com/api/check-code/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessCode: inputValue }),
      });

      if (response.ok) {
        toast({
          title: "Access code verified!",
          description: "You can now access the premium content.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Take user to home page
        window.location.href = "/";
        console.log("Access code verified!");
      } else {
        // Handle error response
        console.error("Access code verification failed.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" shadow={"xl"}>
      <Heading size="md" mb={4}>
        {title}
      </Heading>
      <Text fontSize="xl" fontWeight="semibold">
        ${price} / month
      </Text>
      {features.map((feature, index) => (
        <Text key={index}>{feature}</Text>
      ))}

      <Box p={5} style={{ position: "relative" }}>
        <Tooltip label="We're still working on payments!" placement="top">
          <Box p={5} style={{ filter: "blur(4px)" }}>
            <Paypal />
          </Box>
        </Tooltip>
      </Box>
      <Text textAlign="center" mt={4}>
        Or enter an access code
      </Text>

      <Box
        mt={6}
        borderStyle="dashed"
        borderColor="gray.300"
        borderWidth="2px"
        p={4}
        rounded="md"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter access code..."
          disabled={!isLoggedIn}
        />
        <Button onClick={handleAccessCode} mt={2} disabled={!isLoggedIn}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

const PricingPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  const pricingPlans = [
    {
      price: 9.99,
      features: [
        "1 Weekly insight",
        "1 Monthly insight",
        "Voice-recording support",
      ],
    },
  ];

  const isLoggedIn = localStorage.getItem("accessToken") !== null; // Check if user is logged in

  return (
    <Box p={4}>
      <Button onClick={handleGoBack} mb={4}>
        Back
      </Button>
      <Flex justify="center" align="center" minHeight="30vh">
        <Flex justify="center">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} isLoggedIn={isLoggedIn} />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default PricingPage;
