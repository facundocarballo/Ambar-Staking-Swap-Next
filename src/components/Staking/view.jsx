import React from "react";
import { HStack, Box, Text } from "@chakra-ui/react";
import { Plans } from "./data";
import { StakingSellCard } from "./sellCard";
import { StakingSoldCard } from "./soldCard";
import { useProvider } from "@/src/context";

export const StakingView = () => {
  // Attributes

  // Context
  const {
    BeginnerPlan,
    StandarPlan,
    ExpertPlan,
    BusinessPlan,
    PremiumPlan,
    ExecutivePlan,
    wallet,
  } = useProvider();

  // Methods
  const userHaveThisPlan = (idx) => {
    switch (idx) {
      case 0:
        return BeginnerPlan.is_active;
      case 1:
        return StandarPlan.is_active;
      case 2:
        return ExpertPlan.is_active;
      case 3:
        return BusinessPlan.is_active;
      case 4:
        return PremiumPlan.is_active;
      case 5:
        return ExecutivePlan.is_active;
    }
  };
  const getCorrectPlan = (idx) => {
    switch (idx) {
      case 0:
        return BeginnerPlan;
      case 1:
        return StandarPlan;
      case 2:
        return ExpertPlan;
      case 3:
        return BusinessPlan;
      case 4:
        return PremiumPlan;
      case 5:
        return ExecutivePlan;
    }
  };
  const getInfoPlan = (idx) => {
    switch (idx) {
      case 0:
        return BeginnerPlan.info;
      case 1:
        return StandarPlan.info;
      case 2:
        return ExpertPlan.info;
      case 3:
        return BusinessPlan.info;
      case 4:
        return PremiumPlan.info;
      case 5:
        return ExecutivePlan.info;
    }
  };
  // Component
  return (
    <>
      {wallet == null ? (
        <Text color="white">Por favor, conecte su billetera.</Text>
      ) : (
        <HStack w="100%" overflowX="scroll">
          <Box w="2px" />
          {Plans.map((_, idx) => (
            <div key={idx}>
              <Box w="2px" />
              {userHaveThisPlan(idx) ? (
                <StakingSoldCard plan={getCorrectPlan(idx)} />
              ) : (
                <StakingSellCard info={getInfoPlan(idx)} idx={idx} />
              )}
              <Box w="2px" />
            </div>
          ))}
        </HStack>
      )}
    </>
  );
};
