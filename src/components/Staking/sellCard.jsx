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
  Input,
} from "@chakra-ui/react";
import { useProvider } from "@/src/context";
import {
  AMBAR_IMAGE,
  BNB_IMAGE,
  buildTransaciont,
  buildTransacion_WithNativePayment,
  BUSD_IMAGE,
  USDT_IMAGE,
} from "@/src/web3/funcs";
import { Spinner } from "react-bootstrap";

export const StakingSellCard = ({ info, idx }) => {
  // Attributes
  // Context
  const {
    BeginnerPlan,
    StandarPlan,
    ExpertPlan,
    BusinessPlan,
    PremiumPlan,
    ExecutivePlan,
    ERC20,
    wallet,
    update_plan
  } = useProvider();
  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState("");

  const [busdSelected, setBusdSelected] = React.useState(false);
  const [busdApprove, setBusdApprove] = React.useState(false);

  const [usdtSelected, setUsdtSelected] = React.useState(false);
  const [usdtApprove, setUsdtApprove] = React.useState(false);

  const [bnbSelected, setBnbSelected] = React.useState(false);

  const [ambarSelected, setAmbarSelected] = React.useState(false);
  const [ambarApprove, setAmbarApprove] = React.useState(false);
  // Methods
  const getCorrectPlan = () => {
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
  const getERC20Contract = () => {
    if (busdSelected) return ERC20.BUSD;
    if (usdtSelected) return ERC20.USDT;
    return ERC20.AMBAR;
  };
  const handleSetApprove = () => {
    if (busdSelected) {
      setBusdApprove(true);
      return;
    }

    if (usdtSelected) {
      setUsdtApprove(true);
      return;
    }

    if (ambarSelected) {
      setAmbarApprove(true);
      return;
    }
  };
  const handleApproveERC20 = async () => {
    const Plan = getCorrectPlan();
    const Coin = getERC20Contract();
    const amount_wei = web3.utils.toWei(amount, "ether");
    const data = await Coin.contract.methods
      .approve(Plan.address, amount_wei)
      .encodeABI();
    const params = await buildTransaciont(wallet, Coin.address, data);

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [params],
      })
      .then((res) => {
        setLoading(true);
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(res, (err, rec) => {
            if (rec) {
              handleSetApprove();
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
  const handleBuyPlan = async () => {
    const Plan = getCorrectPlan();
    const amount_wei = web3.utils.toWei(amount, "ether");
    let params = null;
    if (bnbSelected) {
      const data = await Plan.contract.methods.invest_bnb_direct().encodeABI();
      params = await buildTransacion_WithNativePayment(
        wallet,
        Plan.address,
        data,
        amount_wei
      );
    } else {
      const Coin = getERC20Contract();
      const data = await Plan.contract.methods
        .invest_erc20_direct(amount_wei, Coin.address)
        .encodeABI();
      params = await buildTransaciont(wallet, Plan.address, data);
    }

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
              clearInterval(interval);
              await update_plan(idx, Plan);
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
  const handleSelectBusd = () => {
    setBnbSelected(false);
    setUsdtSelected(false);
    setAmbarSelected(false);
    setBusdSelected(!busdSelected);
  };
  const handleSelectUsdt = () => {
    setBnbSelected(false);
    setBusdSelected(false);
    setAmbarSelected(false);
    setUsdtSelected(!usdtSelected);
  };
  const handleSelectBnb = () => {
    setUsdtSelected(false);
    setBusdSelected(false);
    setAmbarSelected(false);
    setBnbSelected(!bnbSelected);
  };
  const handleSelectAmbar = () => {
    setUsdtSelected(false);
    setBusdSelected(false);
    setBnbSelected(false);
    setAmbarSelected(!ambarSelected);
  };

  const isOutOfRange = () => {
    if (amount == "") return false;
    if (bnbSelected) {
      if (Number(amount) < Number(info.minBNB)) return true;
      if (Number(amount) > Number(info.maxBNB)) return true;
      return false;
    }
    if (Number(amount) < Number(info.minDeposit)) return true;
    if (Number(amount) > Number(info.maxDeposit)) return true;
    return false;
  };

  const isDisabled_min_one_erc20_selected = () => {
    return !(busdSelected || ambarSelected || bnbSelected || usdtSelected);
  };

  const isERC20 = () => {
    return busdSelected || usdtSelected || ambarSelected;
  };

  const isApprove = () => {
    if (busdSelected && busdApprove) return true;
    if (usdtSelected && usdtApprove) return true;
    if (ambarSelected && ambarApprove) return true;
    return false;
  };

  const getImage = () => {
    if (busdSelected) return BUSD_IMAGE;
    if (usdtSelected) return USDT_IMAGE;
    if (bnbSelected) return BNB_IMAGE;
    return AMBAR_IMAGE; 
  };

  // Component
  return (
    <VStack>
      <VStack bg="black" border="1px solid #fff" borderRadius={16} w="350px" minH='550px'>
        <VStack bg="gray.700" borderRadius="16px 16px 1px 1px" w="full">
          <Box h="5px" />
          <HStack w="full">
            <Box w="5px" />
            <VStack>
              <HStack>
                <Box w="1px" />
                <Text>{info.title}</Text>
              </HStack>
              <HStack>
                <Box w="1px" />
                <Text fontSize="10px" color="gray.500">
                  {info.description}
                </Text>
              </HStack>
            </VStack>
            <Spacer />
            <Image
              src={getImage()}
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
              <Text color="white">{info.interesRate}</Text>
              <Box w="5px" />
            </HStack>

            <HStack w="full">
              <Box w="5px" />
              <Text color="white">Total Retorno</Text>
              <Spacer />
              <Text color="white">{info.totalReturn}</Text>
              <Box w="5px" />
            </HStack>

            <Box h="10px" />
          </VStack>
          <Box w="5px" />
        </HStack>
        <Box h="5px" />
        <Text>Selecciona la Moneda</Text>
        <HStack w="full">
          <Spacer />
          <Button
            onClick={handleSelectAmbar}
            variant={ambarSelected ? "selected" : "outline"}
          >
            AMBAR
          </Button>
          <Button
            onClick={handleSelectBusd}
            variant={busdSelected ? "selected" : "outline"}
          >
            BUSD
          </Button>
          <Button
            onClick={handleSelectUsdt}
            variant={usdtSelected ? "selected" : "outline"}
          >
            USDT
          </Button>
          <Button
            onClick={handleSelectBnb}
            variant={bnbSelected ? "selected" : "outline"}
          >
            BNB
          </Button>
          <Spacer />
        </HStack>
        <Box h="15px" />
        <Text>Ingresa la Cantidad a Invertir</Text>
        <Input
          value={amount}
          placeholder="Cantidad a Invertir"
          w="85%"
          onChange={(e) => setAmount(e.currentTarget.value)}
        />
        <Box h="15px" />
        {loading ? (
          <Spinner />
        ) : isERC20() ? (
          isApprove() ? (
            <Button
              isDisabled={
                isOutOfRange() ||
                wallet == null ||
                isDisabled_min_one_erc20_selected()
              }
              onClick={handleBuyPlan}
              variant="selected"
            >
              ADQUIRIR PLAN
            </Button>
          ) : (
            <Button
              onClick={handleApproveERC20}
              variant="callToAction"
              isDisabled={
                isOutOfRange() ||
                wallet == null ||
                isDisabled_min_one_erc20_selected()
              }
            >
              APROBAR
            </Button>
          )
        ) : (
          <Button
            isDisabled={
              isOutOfRange() ||
              wallet == null ||
              isDisabled_min_one_erc20_selected()
            }
            onClick={handleBuyPlan}
            variant="selected"
          >
            ADQUIRIR PLAN
          </Button>
        )}
        {isOutOfRange() ? (
          <Text color="red" fontSize="11px">
            La cantidad introducida no es apropiada para este plan.
          </Text>
        ) : null}
        {wallet == null ? (
          <Text color="red" fontSize="11px">
            Por favor, conecta tu billetera para poder Adquirir un plan.
          </Text>
        ) : null}
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
                <Text>${info.minDeposit} | {info.minBNB} BNB</Text>
                <Box w="10px" />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Text>Desposito Maximo</Text>
                <Spacer />
                <Text>${info.maxDeposit} | {info.maxBNB} BNB</Text>
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
                <Text>{info.totalReturn}</Text>
                <Box w="10px" />
              </HStack>
              <HStack w="full">
                <Box w="10px" />
                <Text>Term Dias</Text>
                <Spacer />
                <Text>{info.termDays}</Text>
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