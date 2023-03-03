import React from "react";
import { loadBasicData } from "./web3/funcs";

const AmbarContext = React.createContext(null);

export const AmbarProvider = (props) => {
    // State Variables
    const [wallet, setWallet] = React.useState(null);
    const [chainID, setChainID] = React.useState(null);
    const [Ambar, setAmbar] = React.useState(null);
    const [AmbarPlan, setAmbarPlan] = React.useState(null);
    const [planSelected, setPlanSelected] = React.useState(0);

    // Functions
    const setBasicData = (data) => {
        setWallet(data.wallet);
        setChainID(data.chainID);
        setAmbar(data.Ambar);
        setAmbarPlan(data.AmbarPlan);
    };

    const loadContractData = async () => {
        const basicData = await loadBasicData();
        setBasicData(basicData);
    };

    // Values
    const values = {
        wallet,
        chainID,
        Ambar,
        AmbarPlan,
        planSelected,
        setPlanSelected,
        loadContractData
    };

    return <AmbarContext.Provider value={values} {...props} />
};

export const useProvider = () => {
    const context = React.useContext(AmbarContext);
    if (!context) throw new Error("useProvider have to be inside of AmbarProvider");
    return context;
};