import React from "react";
import { HStack, Box, Select, Text, Image, Spacer } from "@chakra-ui/react";
import { AMBAR_IMAGE, BNB_IMAGE } from "@/src/web3/funcs";
import { useProvider } from "@/src/context";

export const SelectCoin = ({isAmbar}) => {
    // Attributes
    // Context
    const { ERC20, wallet } = useProvider();
    // Methods
    const getBalanceOf = () => {
        if (wallet != null) {
            if (isAmbar) {
                return ERC20.AMBAR.balance;
            }
    
            return ERC20.BNB.balance;
        }

        return '0.00'
    };
    // Component
    return(
        <HStack w='full'>
            <Box w='10px' />
            <Image 
            src={isAmbar ? AMBAR_IMAGE : BNB_IMAGE}
            alt='img-coin'
            boxSize='40px'
            />
            <Text fontWeight='bold'>{isAmbar ? "AMBAR" : "BNB"}</Text>
            <Spacer />
            <Text color='gray.300'>Balance: {getBalanceOf()}</Text>
            <Box w='10px' />
        </HStack>
    );
};