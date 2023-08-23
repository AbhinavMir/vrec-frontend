import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";

const VerifyModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [verificationCode, setVerificationCode] = useState("");
  const toast = useToast();

  const handleResendCode = () => {
    const token = localStorage.getItem("accessToken");
    const url = "https://vrec.onrender.com/api/generate-new-code";

    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful verification response
        toast({
          title: "Code sent!",
          description: "Please check your inbox.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        // Handle verification error
        toast({
          title: "Code not sent!",
          description: "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.error("Code not sent:", error);
      });
  };

  const handleVerify = () => {
    const token = localStorage.getItem("accessToken");

    axios
      .post(
        "https://vrec.onrender.com/api/verify/",
        {
          verification_code: verificationCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful verification response
        toast({
          title: "Verification successful!",
          description: "Your email has been verified.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        console.log("Verification successful!", response.data);
        onClose(); // Close the modal after successful verification
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        // Handle verification error
        toast({
          title: "Verification error!",
          description: "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.error("Verification error:", error);
      });
  };

  return (
    <>
      <Button size="sm" colorScheme="teal" p={4} m={2} onClick={onOpen}>
        Verify your email
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Verify your email via the code sent in your inbox
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter code here"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleResendCode}>
              Resend code
            </Button>
            <Button colorScheme="blue" ml={3} onClick={handleVerify}>
              Verify
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerifyModal;

//
