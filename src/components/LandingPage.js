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
      Reach out to me @ me at abhinavmir dot xyz for an early (and free) invite!
      <Box>

      <br></br>
      <b>DevLog v0.0.1: </b>
    There are some missing elements, for example your notes are currently not encrypted. I'm working on it!<br></br> I'm also drawing up a privacy and TnC agreement for the app. The mobile app is coming soon too! This landing page needs <br></br>some work, sure.  Oh, I'm also fixing the login duration, right now it logs you out when you leave the current session - <br></br>that is not good UX. Once I've fixed that, I'll get you social logins + magic link. The voice recognition is horrible right now, it <br></br> will be better on mobile. Thanks for being one of the first users of ThoughtForest :) <br></br>
      </Box>
    </Box>
  );
};

export default LandingPage;
