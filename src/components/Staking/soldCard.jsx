import React from "react";
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Text,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
} from "@chakra-ui/react";
import { useProvider } from "@/src/context";
import { buildTransaciont, getActualTimestamp } from "@/src/web3/funcs";

export const StakingSoldCard = ({ plan }) => {
  // Attributes
  // Context
  const { actual_timestamp, wallet } = useProvider();
  // Methods
  const getSliderValue = () => {
    const dif_start =
      Number(actual_timestamp) - Number(plan.timestamp_investment_starts);
    const dif_ends =
      Number(plan.timestamp_investment_ends) - Number(actual_timestamp);
    if (dif_ends < 0) return 1;
    return dif_start / dif_ends;
  };
  const handleWithdraw = async () => {
    const data = await plan.contract.methods.withdraw().encodeABI();
    const params = await buildTransaciont(wallet, plan.address, data);

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        const interval = setInterval(async () => {
          web3.eth.getTransactionReceipt(res, async (err, rec) => {
            if (rec) {
              await update_plan(idx);
              clearInterval(interval);
              setLoading(false);
            }

            if (err) {
              clearInterval(interval);
              console.log("ERROR: ", err);
            }
          });
        }, 500);
      });
  };
  // Component
  return (
    <VStack>
      <VStack
        bg="black"
        border="1px solid #fff"
        borderRadius={16}
        w="350px"
        minH="550px"
      >
        <VStack bg="green.700" borderRadius="16px 16px 1px 1px" w="full">
          <Box h="5px" />
          <HStack w="full">
            <Box w="5px" />
            <VStack>
              <HStack>
                <Box w="1px" />
                <Text>{plan.info.title}</Text>
              </HStack>
              <HStack>
                <Box w="1px" />
                <Text fontSize="10px" color="gray.400">
                  {plan.info.description}
                </Text>
              </HStack>
            </VStack>
            <Spacer />
            <Image
              src={plan.image}
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
              <Text color="white">{plan.info.interesRate}</Text>
              <Box w="5px" />
            </HStack>

            <HStack w="full">
              <Box w="5px" />
              <Text color="white">Total Retorno</Text>
              <Spacer />
              <Text color="white">{plan.info.totalReturn}</Text>
              <Box w="5px" />
            </HStack>

            <Box h="10px" />
          </VStack>
          <Box w="5px" />
        </HStack>
        <Box h="15px" />
        <HStack w="full">
          <Box w="5px" />
          <Text color="white" fontWeight="bold">
            Creado:
          </Text>
          <Spacer />
          <Text color="white" fontWeight="bold">
            {plan.date_created}
          </Text>
          <Box w="5px" />
        </HStack>

        <HStack w="full">
          <Box w="5px" />
          <Text color="white" fontWeight="bold">
            Finaliza:
          </Text>
          <Spacer />
          <Text color="white" fontWeight="bold">
            {plan.date_ends}
          </Text>
          <Box w="5px" />
        </HStack>
        <Box h="10px" />
        <HStack w="full">
          <Box w="5px" />
          <Text color="white" fontWeight="bold">
            Inversion:
          </Text>
          <Spacer />
          <Text color="white" fontWeight="bold">
            {plan.investment_amount} {plan.symbol}
          </Text>
          <Box w="5px" />
        </HStack>
        <HStack w="full">
          <Box w="5px" />
          <Text color="white" fontWeight="bold">
            Retorno:
          </Text>
          <Spacer />
          <Text color="white" fontWeight="bold">
            {plan.info.interest * Number(plan.investment_amount)} {plan.symbol}
          </Text>
          <Box w="5px" />
        </HStack>

        <Box h="20px" />

        <HStack w="full">
          <Box w="10px" />
          <Slider
            min={0}
            max={1}
            value={getSliderValue()}
            h="100px"
            cursor="default"
          >
            <SliderTrack
              bg="gray.800"
              h="50px"
              borderRadius={8}
              _hover={{
                transform: "scale(1.1)",
                shadow: "0px 0px 10px #fff ",
              }}
            >
              <SliderFilledTrack bg="green.500" />
              <VStack
                w="full"
                h="full"
                position="absolute"
                cursor="default"
                _hover={{
                  transform: "scale(1.1)",
                }}
              >
                <Spacer />
                <HStack
                  w="full"
                  onClick={handleWithdraw}
                  cursor={getSliderValue() >= 1 ? "pointer" : "default"}
                >
                  <Box w="30%" />
                  <Text color="white" fontWeight="bold">
                    RETIRAR DINERO
                  </Text>
                </HStack>
                <Spacer />
              </VStack>
            </SliderTrack>
          </Slider>
          <Box w="10px" />
        </HStack>

        <Text color="gray.600" fontWeight="bold">
          Contactar con Soporte
        </Text>
      </VStack>
      <Box h="10px" />
    </VStack>
  );
};
