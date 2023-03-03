import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Text,
  Heading,
  Divider,
  Button,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useProvider } from "@/src/context";

export const StakingCard = ({
  title,
  description,
  interesRate,
  termDays,
  minDeposit,
  maxDeposit,
  totalReturn,
  idx,
}) => {
  // Attributes
  // Context
  const { planSelected, setPlanSelected } = useProvider();
  // Methods
    const handleSelectPlan = () => {
        setPlanSelected(idx)
    };
  // Component
  return (
    <VStack>
      <VStack bg="black" border="1px solid #fff" borderRadius={16} minW="300px">
        <VStack bg="gray.700" borderRadius="16px 16px 1px 1px" w="full">
          <Box h="5px" />
          <HStack w="full">
            <Box w="5px" />
            <VStack>
              <HStack>
                <Box w="1px" />
                <Text>{title}</Text>
              </HStack>
              <HStack>
                <Box w="1px" />
                <Text fontSize="10px" color="gray.500">
                  {description}
                </Text>
              </HStack>
            </VStack>
            <Spacer />
            <Image
              src="https://i.ibb.co/5nrV3wY/bnb.png"
              alt="imgToken"
              boxSize="55px"
              bg="white"
              borderRadius={360}
            />
            <Box w="5px" />
          </HStack>
          <Box h="10px" />
        </VStack>
        <Box h="10px" />
        <HStack w="full">
          <Box w="5px" />
          <VStack
            borderRadius={16}
            border="1px solid #ccc"
            w="full"
            bg="gray.800"
          >
            <Box h="10px" />

            <HStack w="full">
              <Box w="5px" />
              <Text color="white">Interes Diario:</Text>
              <Spacer />
              <Text color="white">{interesRate}</Text>
              {/* <Image
                src="https://i.ibb.co/K6cn57v/math-icon.png"
                alt="math_icon"
                boxSize="10px"
              /> */}
              <Box w="5px" />
            </HStack>

            <HStack w="full">
              <Box w="5px" />
              <Text color="white">Total Retorno</Text>
              <Spacer />
              <Text color="white">{totalReturn}</Text>
              {/* <Image
                src="https://i.ibb.co/K6cn57v/math-icon.png"
                alt="math_icon"
                boxSize="10px"
              /> */}
              <Box w="5px" />
            </HStack>

            <Box h="10px" />
          </VStack>
          <Box w="5px" />
        </HStack>
        <Box h="15px" />"
        <Button 
        onClick={handleSelectPlan}
        variant={planSelected == idx ? "selected" : "callToAction"}>
          {planSelected == idx ? "Plan Seleccionado" : "Selecciona este plan"}
        </Button>
        <Box h="5px" />
        <Accordion allowToggle w="full">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <HStack w="full">
                  <Spacer />
                  <Text color="white">Detalles</Text>
                  <AccordionIcon color="white" />
                </HStack>
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <HStack w="full">
                <Box w="10px" />
                <Text>Desposito Minimo</Text>
                <Spacer />
                <Text>{minDeposit}</Text>
                <Box w="10px" />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Text>Desposito Maximo</Text>
                <Spacer />
                <Text>{maxDeposit}</Text>
                <Box w="10px" />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Text>Devolucion Deposito</Text>
                <Spacer />
                <Text>YES</Text>
                <Box w="10px" />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Text>Total Retorno</Text>
                <Spacer />
                <Text>{totalReturn}</Text>
                <Box w="10px" />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Text>Term Dias</Text>
                <Spacer />
                <Text>{termDays}</Text>
                <Box w="10px" />
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box h="15px" />
      </VStack>
      <Box h="10px" />
    </VStack>
  );
};

/*
    Accordion:

            <Accordion allowToggle w="full">
          <HStack w="full">
            <Spacer />
            <AccordionItem>
              <AccordionButton>
                <Text>Detalles</Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <HStack w="full">
                  <Box w="10px" />
                  <Text>Desposito Minimo</Text>
                  <Spacer />
                  <Text>{minDeposit}</Text>
                  <Box w="10px" />
                </HStack>
                <HStack w="full">
                  <Box w="10px" />
                  <Text>Desposito Maximo</Text>
                  <Spacer />
                  <Text>{maxDeposit}</Text>
                  <Box w="10px" />
                </HStack>
                <HStack w="full">
                  <Box w="10px" />
                  <Text>Devolucion Deposito</Text>
                  <Spacer />
                  <Text>YES</Text>
                  <Box w="10px" />
                </HStack>
                <HStack w="full">
                  <Box w="10px" />
                  <Text>Total Retorno</Text>
                  <Spacer />
                  <Text>{totalReturn}</Text>
                  <Box w="10px" />
                </HStack>
              </AccordionPanel>
            </AccordionItem>
            <Box w="10px" />
          </HStack>
        </Accordion>
*/

/*
        <HStack w="full">
          <Box w="10px" />
          <VStack>
            <Heading>{interesRate}</Heading>
            <Text fontSize="12px">Interes Diario</Text>
          </VStack>
          <Spacer />
          <VStack>
            <Heading>{termDays}</Heading>
            <Text fontSize="12px">Term Dias</Text>
          </VStack>
          <Box w="10px" />
        </HStack>
        <Box h="5px" />
        <Divider />
        <Box h="5px" />
        <HStack w="full">
          <Box w="10px" />
          <Text>Desposito Minimo</Text>
          <Spacer />
          <Text>{minDeposit}</Text>
          <Box w="10px" />
        </HStack>
        <HStack w="full">
          <Box w="10px" />
          <Text>Desposito Maximo</Text>
          <Spacer />
          <Text>{maxDeposit}</Text>
          <Box w="10px" />
        </HStack>
        <HStack w="full">
          <Box w="10px" />
          <Text>Devolucion Deposito</Text>
          <Spacer />
          <Text>YES</Text>
          <Box w="10px" />
        </HStack>
        <HStack w="full">
          <Box w="10px" />
          <Text>Total Retorno</Text>
          <Spacer />
          <Text>{totalReturn}</Text>
          <Box w="10px" />
        </HStack>
*/
