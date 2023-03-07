import React from "react";
import { Beginner, Business, Executive, Premium, Standar } from "./components/Staking/data";
import { loadBasicData } from "./web3/funcs";
import { getPlanData } from "./web3/funcs/plans";

const AmbarContext = React.createContext(null);

export const AmbarProvider = (props) => {
    // State Variables
    const [wallet, setWallet] = React.useState(null);
    const [chainID, setChainID] = React.useState(null);
    const [ERC20, setERC20] = React.useState(null);
    const [Ambar, setAmbar] = React.useState(null);
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
        setActualTimestamp(data.actual_timestamp);
    };

    const loadContractData = async () => {
        const basicData = await loadBasicData();
        setBasicData(basicData);
    };

    // Updates
    const update_plan = async (idx, Plan) => {
        console.log("IDX: ", idx);
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

    // Values
    const values = {
        wallet,
        chainID,
        ERC20,
        Ambar,
        BeginnerPlan,
        StandarPlan,
        ExpertPlan,
        BusinessPlan,
        PremiumPlan,
        ExecutivePlan,
        planSelected,
        actual_timestamp,
        setPlanSelected,
        loadContractData,
        update_plan
    };

    return <AmbarContext.Provider value={values} {...props} />
};

export const useProvider = () => {
    const context = React.useContext(AmbarContext);
    if (!context) throw new Error("useProvider have to be inside of AmbarProvider");
    return context;
};