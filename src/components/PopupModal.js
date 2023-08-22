import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  IconButton,
  useToast,
  Box,
} from "@chakra-ui/react";
import {
  MdStop,
  MdDelete,
  MdStart,
  MdAdd,
  MdCheck,
  MdVoiceChat,
  MdRecordVoiceOver,
} from "react-icons/md";
import useClipboard from "react-use-clipboard";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PopupModal = ({ userId }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [transcriptionText, setTranscriptionText] = useState("");
  const [transcriptLength, setTranscriptLength] = useState(0);
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const toast = useToast();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const stopListening = () => SpeechRecognition.stopListening;
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    toast({
      title:
        "Browser does not support speech recognition - try Chrome or Safari. Sorry for the inconvenience!",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  const handleTextChange = (event) => {
    setTranscriptionText(event.target.value);
    setTranscriptLength(event.target.value.length);
  };

  console.log(transcript);

  const clearTextArea = () => {
    setTranscriptionText("");
    setTranscriptLength(0);
  };

  const sendTranscription = () => {
    toast({
      title: "Saving note",
      status: "info",
      duration: 3000,
      isClosable: true,
    });

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in format YYYY-MM-DD
      const requestBody = {
        date: currentDate,
        length: transcriptLength,
        user: userId,
        transcript: transcriptionText + transcript,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      };

      fetch("https://vrec.onrender.com/api/add-transcription/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          toast({
            title: "Transcription saved successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          // Close modal
          setIsOpen(false);
        })
        .catch((error) => {
          // Handle the error
          console.error("Error sending transcription:", error);
          toast({
            title:
              "Failed to save transcription. Clearing cookie and reloading...",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          // Clear the cookie
          localStorage.removeItem("accessToken");
          // Reload the page
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        });
    }
  };

  return (
    <>
      {showTranscript && (
        <Textarea
          placeholder="Enter text here..."
          value={transcriptionText + transcript}
          onChange={handleTextChange}
          border={0}
          style={{
            height: "10vh", // 100% of the viewport height
          }}
        />
      )}
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={clearTextArea} mr={2}>
          <MdDelete />
        </Button>
        <Button onClick={toggleTranscript}>
          {showTranscript ? <AiFillEyeInvisible /> : <AiFillEye />}
        </Button>
        <Button onClick={SpeechRecognition.stopListening}>
          <MdStop />
        </Button>
        <Button onClick={sendTranscription}>
          <MdCheck />
        </Button>
        <Button onClick={startListening} mr={2}>
          <MdRecordVoiceOver />
        </Button>
      </Box>
    </>
  );
};

export default PopupModal;
