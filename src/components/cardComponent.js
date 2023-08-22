import React from "react";
import { Flex, Box, chakra, Link, Image } from "@chakra-ui/react";

const CardComponent = ({ transcript }) => {
  return (
    <Flex
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
          >
            Mar 10, 2019
          </chakra.span>
          <Link
            px={3}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{
              bg: "gray.500",
            }}
          >
            Transcript
          </Link>
        </Flex>

        <Box mt={2}>
          <Link
            fontSize="2xl"
            color="gray.700"
            _dark={{
              color: "white",
            }}
            fontWeight="700"
            _hover={{
              color: "gray.600",
              _dark: {
                color: "gray.200",
              },
              textDecor: "underline",
            }}
          >
            transcript.title
          </Link>
          <chakra.p
            mt={2}
            color="gray.600"
            _dark={{
              color: "gray.300",
            }}
          >
            {transcript.transcript}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link
            color="brand.600"
            _dark={{
              color: "brand.400",
            }}
            _hover={{
              textDecor: "underline",
            }}
          >
            Read more
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CardComponent;
