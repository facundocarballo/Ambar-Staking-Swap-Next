import React from "react";
import { Beginner, Business, Executive, Premium, Standar } from "./components/Staking/data";
import { getERC20Info, getNativeCryptoInfo, loadBasicData } from "./web3/funcs";
import { getPlanData } from "./web3/funcs/plans";
import { getAllTokensInfo } from "./web3/funcs/tokens";

const AmbarContext = React.createContext(null);

export const AmbarProvider = (props) => {
    // State Variables
    const [wallet, setWallet] = React.useState(null);
    const [chainID, setChainID] = React.useState(null);
    const [bnbPrice, setBnbPrice] = React.useState(null);
    const [ERC20, setERC20] = React.useState(null);
    const [Ambar, setAmbar] = React.useState(null);
    const [PAIR, setPAIR] = React.useState(null);
    const [ContractRouter, setContractRouter] = React.useState(null);
    const [BeginnerPlan, setBeginnerPlan] = React.useState(null);
    const [StandarPlan, setStandardrPlan] = React.useState(null);
    const [ExpertPlan, setExpertPlan] = React.useState(null);
    const [BusinessPlan, setBusinessPlan] = React.useState(null);
    const [PremiumPlan, setPremiumPlan] = React.useState(null);
    const [ExecutivePlan, setExecutivePlan] = React.useState(null);
    const [planSelected, setPlanSelected] = React.useState(0);
    const [actual_timestamp, setActualTimestamp] = React.useState(null);

    // Functions
    const setBasicData = (data) => {
        setWallet(data.wallet);
        setChainID(data.chainID);
        setAmbar(data.Ambar);
        setBeginnerPlan(data.BeginnerPlan);
        setStandardrPlan(data.StandarPlan);
        setExpertPlan(data.ExpertPlan);
        setBusinessPlan(data.BusinessPlan);
        setPremiumPlan(data.PremiumPlan);
        setExecutivePlan(data.ExecutivePlan);
        setERC20(data.ERC20);
        setPAIR(data.PAIR);
        setActualTimestamp(data.actual_timestamp);
        setContractRouter(data.ContractRouter);
        setBnbPrice(data.bnbPrice);
    };

    const loadContractData = async () => {
        const basicData = await loadBasicData();
        setBasicData(basicData);
    };

    // Updates
    const update_plan = async (idx, Plan) => {
        switch (idx) {
            case 0:
                const beginner = await getPlanData(
                    Plan.contract,
                    Plan.address,
                    wallet,
                    Beginner
                );
                setBeginnerPlan(beginner);
                break;
            case 1:
                const standard = await getPlanData(
                    StandarPlan.contract,
                    StandarPlan.address,
                    wallet,
                    Standar
                );
                setStandardPlan(standard);
                break;
            case 2:
                const expert = await getPlanData(
                    ExpertPlan.contract,
                    ExpertPlan.address,
                    wallet,
                    Beginner
                );
                setExpertPlan(expert);
                break;
            case 3:
                const business = await getPlanData(
                    BusinessPlan.contract,
                    BusinessPlan.address,
                    wallet,
                    Business
                );
                setBusinessPlanPlan(business);
                break;
            case 4:
                const premium = await getPlanData(
                    PremiumPlan.contract,
                    PremiumPlan.address,
                    wallet,
                    Premium
                );
                setPremiumPlan(premium);
                break;
            case 5:
                const executive = await getPlanData(
                    ExecutivePlan.contract,
                    ExecutivePlan.address,
                    wallet,
                    Executive
                );
                setExecutivePlan(executive);
                break;
        }
    };

    const update_balances = async () => {
        const erc20 = await getAllTokensInfo(ERC20.BUSD.contract, ERC20.USDT.contract, ERC20.AMBAR.contract, wallet, 'ether');
        setERC20(erc20);
    };

    // Values
    const values = {
        wallet,
        chainID,
        ERC20,
        bnbPrice,
        Ambar,
        BeginnerPlan,
        StandarPlan,
        ExpertPlan,
        BusinessPlan,
        PremiumPlan,
        ExecutivePlan,
        planSelected,
        actual_timestamp,
        PAIR,
        ContractRouter,
        setPlanSelected,
        loadContractData,
        update_plan,
        update_balances,
        setBnbPrice,
        setPAIR
    };

    return <AmbarContext.Provider value={values} {...props} />
};

export const useProvider = () => {
    const context = React.useContext(AmbarContext);
    if (!context) throw new Error("useProvider have to be inside of AmbarProvider");
    return context;
};