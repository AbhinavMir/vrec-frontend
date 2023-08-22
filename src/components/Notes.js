import React, { useState, useEffect } from "react";
import { Box, Text, Button, Spinner, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { MdDelete } from "react-icons/md";

const Notes = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isNotesActive, setIsNotesActive] = useState(false);
  const toggleNotes = () => {
    setIsNotesActive(!isNotesActive);
  };
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [transcriptions, setTranscriptions] = useState([]);

  const fetchTranscriptions = () => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("https://vrec.onrender.com/api/get-transcriptions/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        const today = new Date();
        const updatedTranscriptions = response.data.map((transcription) => {
          const transcriptionDate = new Date(transcription.date);
          const daysDifference = Math.floor(
            (today - transcriptionDate) / (1000 * 60 * 60 * 24)
          );

          let displayText = "";

          if (daysDifference <= 0) {
          } else if (daysDifference === 1) {
            displayText = "1 day ago";
          } else if (daysDifference <= 7) {
            displayText = `${daysDifference} days ago`;
          } else if (daysDifference <= 30) {
            const weeks = Math.floor(daysDifference / 7);
            displayText = `${weeks} week${weeks > 1 ? "s" : ""} ago`;
          } else if (daysDifference <= 365) {
            const months = Math.floor(daysDifference / 30);
            displayText = `${months} month${months > 1 ? "s" : ""} ago`;
          } else {
            const years = Math.floor(daysDifference / 365);
            displayText = `${years} year${years > 1 ? "s" : ""} ago`;
          }

          return {
            ...transcription,
            displayText,
          };
        });
        setTranscriptions(updatedTranscriptions);
      })
      .catch((error) => {
        console.error("Error fetching transcriptions:", error);

        // Clear the cookie and refresh the page
        localStorage.removeItem("accessToken");
        // take the user to the login page
        window.location.href = "/";

        toast({
          title: "Transcription fetch failed",
          description:
            "An error occurred while fetching transcriptions. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const deleteTranscription = (id) => {
    toast({
      title: "Deleting transcription...",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    const accessToken = localStorage.getItem("accessToken");

    axios
      .delete(`https://vrec.onrender.com/api/transcription/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Transcription deleted successfully:", response);
        fetchTranscriptions(); // Refresh the list after deletion
        toast({
          title: "Transcription deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error deleting transcription:", error);
      });
  };

  useEffect(() => {
    fetchTranscriptions(); // Initial fetch

    const interval = setInterval(() => {
      fetchTranscriptions(); // Fetch periodically
    }, 100000); // Adjust the interval duration as needed

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <Box p={4}>
      <div className="notes">
        <Sidebar />
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Spinner
                size="md"
                mt={2}
                color={colorMode === "light" ? "blue.500" : "blue.200"}
              />
            </div>
          ) : (
            <Box>
              {transcriptions.map((transcription) => (
                <Box
                  key={transcription.id}
                  borderWidth="1px"
                  borderRadius="md"
                  p={3}
                  my={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  shadow={colorMode === "light" ? "md" : "dark-md"}
                >
                  <div>
                    <Box></Box>
                    <Text>
                      Transcript:{" "}
                      {transcription.transcript || "No transcript available"}
                    </Text>

                    <Text
                      backgroundColor={
                        colorMode === "light" ? "gray.200" : "gray.700"
                      }
                      fontSize={10}
                      borderRadius={4}
                      p={1}
                    >
                      Created on {transcription.date}
                    </Text>
                    <Text>{transcription.displayText}</Text>
                  </div>
                  <Button
                    colorScheme="red"
                    size="sm" // Set the size to "sm" for small
                    onClick={() => deleteTranscription(transcription.id)}
                  >
                    <MdDelete />
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Notes;
