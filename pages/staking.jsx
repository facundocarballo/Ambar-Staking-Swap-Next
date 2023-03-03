import React from "react";
import { NavBar } from "@/src/components/NavBar";
import { StakingCard } from "@/src/components/Staking/card";
import { VStack, Text, Box } from "@chakra-ui/react";
import { StakingView } from "@/src/components/Staking/view";

const Staking = () => {
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
        <Box h="150px" />
        <StakingView />
      </VStack>
    </>
  ) : null;
};

export default Staking;
