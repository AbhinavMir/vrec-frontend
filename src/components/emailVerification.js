import { useState, useEffect } from "react";
import { Button, Box, Icon } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const VerificationComponent = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      setCode(codeParam);
    }
  }, []);

  const verifyCode = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://vrec.onrender.com/api/verify/?code=${code}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.ok) {
        setIsVerified(true);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }

    setIsLoading(false);
  };

  return (
    <Box textAlign="center" marginTop="4">
      <Button onClick={handleBack} mb={4}>
        Back
      </Button>

      {isVerified ? (
        <Icon as={FaCheck} boxSize="8" color="green.500" />
      ) : (
        <Button
          onClick={verifyCode}
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Verifying"
          disabled={!code}
        >
          Verify Code
        </Button>
      )}
      {isVerified ? null : isLoading ? null : (
        <Icon as={FaTimes} boxSize="8" color="red.500" marginTop="2" />
      )}
    </Box>
  );
};

export default VerificationComponent;
