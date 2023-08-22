import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { Button, Box, Heading } from "@chakra-ui/react";

const VerificationComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); // Get the navigate object from react-router-dom

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found.");
      return;
    }

    fetch(`https://vrec.onrender.com/api/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        X_VERIFICATION_CODE: inputValue,
      },
    }).then((response) => {
      if (response.ok) {
        navigate("/dashboard");
      }
    });
  };

  const handleHomeClick = () => {
    navigate("/"); // Redirect to the home page
  };

  // Render the component
  return (
    <div>
      <Box p={4} bg="gray.200">
        <Heading as="h1" size="lg">
          Verification Component
        </Heading>
        <Button onClick={handleHomeClick} mt={2} colorScheme="blue">
          Home
        </Button>
      </Box>
      <Box p={4}>
        <input
          type="text"
          placeholder="Enter verification code"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} mt={2} colorScheme="green">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default VerificationComponent;
