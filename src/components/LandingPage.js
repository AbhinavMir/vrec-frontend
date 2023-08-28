import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react"; // Import necessary components
import LoginOrSignUp from "./LoginOrSignup";
import icon from "../res/icon.png";
import TextTransition, { presets } from "react-text-transition";
import { MdSearch } from "react-icons/md";

const TEXTS = [" thoughts", " ideas", " feelings", " todos"];

const LandingPage = () => {
  const [isDevLogOpen, setIsDevLogOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  if (showLogin) {
    return <LoginOrSignUp />;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Adjust the height
      flexDirection="column"
      background="linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%), url('/path/to/your/background.jpg') center/cover no-repeat" // Apply the background
      color="white" // Adjust text color
      padding="2rem" // Add padding
    >
      <img
        src={icon}
        alt="App Icon"
        style={{ marginBottom: "20px" }}
        width="100px"
        height="100px"
      />
      <Text as="i" fontSize="xl">
        <Text as="u" fontSize="lg">
          <Text as="b" fontSize="2xl">
            ThoughtForest
          </Text>
        </Text>
      </Text>
      Journal your
      <TextTransition springConfig={presets.wobbly} fontSize="xl">
        {TEXTS[index % TEXTS.length]}
      </TextTransition>
      <Button
        colorScheme="teal"
        size="lg"
        marginTop="2rem"
        onClick={() => setShowLogin(true)}
        style={{
          background: "rgba(255, 255, 255, 0.15)", // Background color and opacity
          color: "#d6d6d6", // Text color
          backdropFilter: "blur(5px)", // Backdrop blur for the glass effect
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
          border: "none", // Remove border
          transition:
            "transform 0.2s ease, backdrop-filter 0.2s ease, box-shadow 0.2s ease", // Transitions
          _hover: {
            transform: "scale(2)", // Enlarge on hover
            backdropFilter: "blur(100px)", // Increase blur on hover
            boxShadow: "0 6px 10px rgba(1,1,1,1)", // Adjust hover shadow
          },
        }}
      >
        Sign In / Sign Up
      </Button>
      <Button
        colorScheme="black"
        backdropBlur={5}
        size="lg"
        marginTop="2rem"
        onClick={() => setIsDevLogOpen(true)} // Open the modal
        // ... existing button styles
      >
        Devlogs
      </Button>
      <Modal isOpen={isDevLogOpen} onClose={() => setIsDevLogOpen(false)} backdropBlur={500} opacity={0.9}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>DevLog v0.0.1</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="2rem">
            There are some missing elements, for example your notes are
            currently not encrypted. I'm working on it! I'm also drawing up a
            privacy and TnC agreement for the app. The mobile app is coming soon
            too! This landing page needs some work, sure. Oh, I'm also fixing
            the login duration, right now it logs you out when you leave the
            current session - that is not good UX. Once I've fixed that, I'll
            get you social logins + magic link. The voice recognition is
            horrible right now, it will be better on mobile. Thanks for being
            one of the first users of ThoughtForest :)
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LandingPage;
