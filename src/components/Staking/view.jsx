import React from "react";
import { HStack, Box, Spacer } from "@chakra-ui/react";
import { Plans } from "./data";
import { StakingCard } from "./card";

export const StakingView = () => {
  // Attributes

  // Context
  // Methods
  // Component
  return (
    <HStack w='100%' overflowX="scroll">
        <Box w='2px' />
      {Plans.map((plan, idx) => (
        <>
          <Box w="2px" />
          <StakingCard
            title={plan.title}
            description={plan.description}
            interesRate={plan.interesRate}
            termDays={plan.termDays}
            minDeposit={plan.minDeposit}
            maxDeposit={plan.maxDeposit}
            totalReturn={plan.totalReturn}
            idx={idx}
          />
          <Box w="2px" />
        </>
      ))}
    </HStack>
  );
};
