import { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import LoginOrSignUp from "./LoginOrSignup";
import icon from "../res/icon.png";
import TextTransition, { presets } from "react-text-transition";
import { Flex, Text } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import Paypal from "./Paypal";
const TEXTS = [" thoughts", " ideas", " feelings", " todos"];

const LandingPage = () => {
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
      height="50vh"
      flexDirection="column"
    >
      <img
        src={icon}
        alt="App Icon"
        style={{ marginBottom: "20px" }}
        width="100px"
        height="100px"
      />
      <Text as="i">
        <Text as="u">
          <Text as="b">ThoughtForest</Text>
        </Text>
      </Text>
      Journal your
      <TextTransition springConfig={presets.wobbly}>
        {TEXTS[index % TEXTS.length]}
      </TextTransition>
      <br></br>
      <Button colorScheme="teal" onClick={() => setShowLogin(true)}>
        Sign In / Sign Up
      </Button>
      <br></br>
      Reach out to the{" "}
      <Text as="u">
        <a href="https://twitter.com/augustradjoe">founder</a>{" "}
      </Text>
      for an early (and free) invite!
    </Box>
  );
};

export default LandingPage;
