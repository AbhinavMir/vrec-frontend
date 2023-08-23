import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Badge,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
  Divider,
  Text,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import VerifyModal from "./VerifyModal";

const SettingsPage = () => {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState(""); // For name change
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [user, setUser] = useState("");
  const [showNameField, setShowNameField] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showDeleteAccountField, setShowDeleteAccountField] = useState(false);
  const [cancelSubscription, setCancelSubscription] = useState(false);

  useEffect(() => {
    const url_user_details = "https://vrec.onrender.com/api/user-details/";

    toast({
      title: "Loading your details...",
      description:
        "Give me a second, the server runs on a 2004 Windows machine.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    fetch(url_user_details, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setEmailVerified(data.is_email_verified);
        setUser(data);
      })
      .catch((error) => {
        toast({
          title: "Name changed failed",
          description: "Oops. Try logging in again!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        window.location.href = "/";
      });
  }, []);

  const toast = useToast();
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    if (event.target.name === "oldPassword") {
      setOldPassword(event.target.value);
    } else if (event.target.name === "newPassword") {
      setNewPassword(event.target.value);
    }
  };

  const handleExportData = () => {
    toast({
      title: "Exporting your data!",
    });
    const export_url = "https://vrec.onrender.com/api/export-data/";

    fetch(export_url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Exported data!",
            description: "You should recieve your data shortly",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          console.error("Failed to update name.");
        }
      })
      .catch((error) => {
        toast({
          title: "Error occured!",
          description: "Oops. We're working on it!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  const handleEmailVerification = () => {
    toast({
      title: "Sending email!",
    });

    const resend_email_url = "https://vrec.onrender.com/api/generate-new-code";
    fetch(resend_email_url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((response) => {
      if (response.ok) {
        toast({
          title: "Email sent!",
          description: "You should recieve your email shortly",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        console.error("Sending email failed.");
      }
    });
  };

  const handleSubmiNameChange = () => {
    const change_name_url =
      "https://vrec.onrender.com/api/user-profile/update/";
    const data = {
      name: newName,
      email: email,
    };

    fetch(change_name_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Name changed!",
            description: "Your name has been changed.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          console.error("Failed to update name.");
          toast({
            title: "Name changed failed",
            description: "Oops. We're working on it!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Name changed failed",
          description: "Oops. We're working on it!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmitEmailChange = () => {
    const change_name_url =
      "https://vrec.onrender.com/api/user-profile/update/";
    const data = {
      name: name,
      email: newEmail,
    };

    fetch(change_name_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Name changed!",
            description: "Your password has been changed.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          console.error("Failed to update name.");
        }
      })
      .catch((error) => {
        toast({
          title: "Name changed failed",
          description: "Your password has been changed.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const toggleField = (fieldName) => {
    if (fieldName === "name") {
      setShowNameField(!showNameField);
      setShowEmailField(false);
      setShowPasswordField(false);
    } else if (fieldName === "email") {
      setShowEmailField(!showEmailField);
      setShowNameField(false);
      setShowPasswordField(false);
    } else if (fieldName === "password") {
      setShowPasswordField(!showPasswordField);
      setShowNameField(false);
      setShowEmailField(false);
    } else if (fieldName === "delete") {
      setShowDeleteAccountField(!showDeleteAccountField);
    } else if (fieldName === "cancel") {
      setCancelSubscription(!cancelSubscription);
    }
  };

  const handleChangePassword = () => {
    const url_pw_change = "https://vrec.onrender.com/api/change-password/";
    const data = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    fetch(url_pw_change, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Password changed!",
            description: "Your password has been changed.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          alert("Password change failed!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box p={4}>
      {" "}
      {localStorage.getItem("accessToken") ? (
        <>
          <VStack align="flex-start">
            <Button onClick={handleBack} mb={4}>
              Back
            </Button>

            <UserCard {...user}></UserCard>
            <Button
              onClick={() => toggleField("name")}
              colorScheme="blue"
              mb={2}
            >
              {showNameField ? "Hide Name" : "Change Name"}
            </Button>
            {showNameField && (
              <FormControl id="name" mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                />
                <Button
                  size="sm"
                  colorScheme="green"
                  p={4}
                  onClick={handleSubmiNameChange}
                >
                  Change
                </Button>
              </FormControl>
            )}

            <Button
              onClick={() => toggleField("email")}
              colorScheme="blue"
              mb={2}
            >
              {showEmailField ? "Hide Email" : "Change Email"}
            </Button>
            {showEmailField && (
              <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={newEmail}
                  onChange={handleEmailChange}
                />
                <Button
                  size="sm"
                  colorScheme="green"
                  p={4}
                  onClick={handleSubmitEmailChange}
                >
                  {" "}
                  Change{" "}
                </Button>
                {isEmailVerified ? (
                  <Badge colorScheme="green" m={2} p={1} borderRadius={4}>
                    Verified
                  </Badge>
                ) : (
                  <VerifyModal/>
                )}
              </FormControl>
            )}

            <Button
              onClick={() => toggleField("password")}
              colorScheme="blue"
              mb={2}
            >
              {showPasswordField ? "Hide Password" : "Change Password"}
            </Button>
            {showPasswordField && (
              <FormControl id="password" mb={4}>
                <FormLabel>Change password</FormLabel>
                <Input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter old password"
                  mb={2}
                />
                <Input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  mb={2}
                />
                <Button onClick={handleChangePassword} colorScheme="green">
                  Change Password
                </Button>
              </FormControl>
            )}
            <Button colorScheme="blue" onClick={handleExportData}>
              Export data
            </Button>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box textAlign="left" p={2}>
                      More
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <Button colorScheme="red" mb={4}>
                    Delete Account
                  </Button>
                  <Button colorScheme="red">Cancel Subscription</Button>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
        </>
      ) : (
        <p>You are not logged in!</p> // Display a message if not logged in
      )}
    </Box>
  );
};

const UserCard = ({ name, email, isEmailVerified }) => {
  return (
    <Box
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="lg"
      width={"100%"}
      mb={4}
    >
      <VStack direction="row" align="left" mb={3}>
        <Avatar name={name} size="md" />
        <Text ml={3} fontWeight="bold">
          Name:{name}
        </Text>
        <Text ml={3} fontWeight="bold">
          Email: {email}
        </Text>
      </VStack>
    </Box>
  );
};

export default SettingsPage;
