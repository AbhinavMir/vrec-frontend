import React, { useState, useEffect } from "react";
import {
  Box,
  useToast,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Switch, // Import the Switch component
  useColorMode, // Import the useColorMode hook
  VStack,
  Button,
} from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link
import { FaMoon, FaSun } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import TranscriptionComponent from "./Tx";
import PopupModal from "./PopupModal";
import Sidebar from "./Sidebar";
import SettingsPage from "./Settings";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const [isNotesActive, setIsNotesActive] = useState(false);
  const toast = useToast();

  const toggleNotes = () => {
    setIsNotesActive(!isNotesActive);
  };
  // Initialize color mode
  const { colorMode, toggleColorMode } = useColorMode();

  const checkLoggedInStatus = () => {
    // Check if the accessToken is not available
    if (!localStorage.getItem("accessToken")) {
      toast({
        title: "An error occurred. Please login again!",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      localStorage.removeItem("accessToken");
      setInterval(() => {
        window.location.reload();
      }, 1500);
    }
  };

  useEffect(() => {
    // Check user's logged in status every 8 seconds
    const intervalId = setInterval(checkLoggedInStatus, 100000);

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "https://vrec.onrender.com/api/user-details/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const userDetailsData = await response.json();
          setUserDetails(userDetailsData);
          setIsLoading(false);
        } else {
          // Handle error case
          toast({
            title: "An error occurred.",
            description: "Please try again.",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
          setIsLoading(false);
          localStorage.removeItem("accessToken");
          // reload
          setInterval(() => {
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        // Handle error case
        toast({
          title: "An error occurred.",
          description: "Please try again.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        setIsLoading(false);
        localStorage.removeItem("accessToken");
        // reload
        setInterval(() => {
          window.location.reload();
        }, 1500);
      }
    };

    if (accessToken) {
      fetchUserDetails();
    }

    // Check if userDetails.is_email_verified after 10 seconds
    if (userDetails?.is_email_verified) {
      const emailVerifiedTimeout = setTimeout(() => {
        toast({
          title: "Please verify your email!",
          description: "We have sent you an email with a verification link.",
          status: "warning",
          duration: 1500,
          isClosable: true,
        });
      }, 10000);

      return () => {
        clearTimeout(emailVerifiedTimeout);
      };
    }
  }, [accessToken, userDetails]);

  useEffect(() => {
    // Check if userDetails.name is null and clear cookie if needed
    if (userDetails && userDetails.name === null) {
      localStorage.removeItem("accessToken");
      window.location.reload();
    }
  }, [userDetails]);

  return (
    <Box p={4}>
      <Sidebar />
      <Flex justifyContent="space-between" alignItems="center">
        <Flex>
          {colorMode === "dark" ? (
            <FaMoon style={{ marginRight: "10px" }} />
          ) : (
            <FaSun style={{ marginRight: "10px" }} />
          )}
          <Switch
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            aria-label="Toggle Dark Mode"
          />
        </Flex>
        <Menu>
          <MenuButton>
            <IconButton
              icon={<MdAccountCircle />}
              variant="unstyled"
              size="lg" // Set the size to "lg" (large)
            />
          </MenuButton>
          <MenuList>
            {isLoading ? (
              <MenuItem>
                <Spinner size="sm" mr={2} />
                Loading user details...
              </MenuItem>
            ) : (
              <>
                <MenuItem>User: {userDetails?.name}</MenuItem>
                <MenuItem>Email: {userDetails?.email}</MenuItem>
                <MenuItem>
                  {userDetails?.is_subscription_active
                    ? "Subscription Active"
                    : "Subscription Inactive"}
                </MenuItem>
                <Flex justifyContent="space-between" p={4}>
                  <LogoutButton />
                  <Link to="/settings">
                    <Button colorScheme="blue">Settings</Button>
                  </Link>
                </Flex>
              </>
            )}
          </MenuList>
        </Menu>
      </Flex>
      {userDetails?.is_subscription_active ? (
        <PopupModal userId={userDetails?.id} />
      ) : (
        <Box>
          <button
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "10px 20px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold", // Added bold font weight
              fontSize: "16px", // Added font size
              color: "#333", // Added text color
              boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.1)", // Added subtle box shadow
            }}
          >
            We currently do not have a free tier, check out our{" "}
            <a
              href="/pricing"
              style={{ textDecoration: "underline", color: "#007bff" }}
            >
              pricing
            </a>
          </button>
          <Box
            style={{
              filter: "blur(4px)",
              pointerEvents: "none",
              // Add any other styling you want for the non-active state
            }}
          >
            <PopupModal userId={userDetails?.id} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
