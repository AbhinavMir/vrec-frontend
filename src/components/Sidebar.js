import React, { useState } from "react";
import { Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import Link component from React Router

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <VStack spacing={3} align="stretch">
      <Button colorScheme="gray" variant="outline" onClick={toggleSidebar}>
        {isOpen ? "Collapse" : "Expand"}
      </Button>
      {isOpen && (
        <>
          {/* Use the Link component for routing */}
          <Link to="/">
            <Button colorScheme="gray" variant="outline" width="100%" textAlign="left">
              New entry
            </Button>
          </Link>
          <Link to="/notes">
            <Button colorScheme="gray" variant="outline" width="100%" textAlign="left">
              Notes
            </Button>
          </Link>
          <Link to="/insights">
            <Button colorScheme="gray" variant="outline" width="100%" textAlign="left">
              Insights
            </Button>
          </Link>
          <Link to="/faq">
            <Button colorScheme="gray" variant="outline" width="100%" textAlign="left">
              FAQ
            </Button>
          </Link>
        </>
      )}
    </VStack>
  );
}

export default Sidebar;
