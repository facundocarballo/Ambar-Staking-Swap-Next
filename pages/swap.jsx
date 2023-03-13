import React from "react";
import { Text, VStack, Box, Button, Heading } from "@chakra-ui/react";
import { NavBar } from "@/src/components/NavBar";
import { SwapCard } from "@/src/components/Swap/swapCard";

const Swap = () => {
  // Attributes
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);
  // Context
  // Methods
  // Component
  return isBrowser ? (
    <>
      <div className="App">
        <NavBar />
      </div>
      <VStack>
        <Box h="120px" />
        <Heading>AMBAR SWAP</Heading>
        <Box h="50px" />
        <SwapCard />
      </VStack>
    </>
  ) : null;
};

export default Swap;
