import React from "react";
import { ethers } from "ethers";
import CardTemplate from "./CardTemplate";

import getContract from "../ethereum/ethereum";

const Manager = () => {
  const getBudget = async () => {
    const contract = getContract();
    let currentBudget = await contract.getCurrentBudget();
    currentBudget = ethers.utils.formatEther(currentBudget.toNumber());
    return currentBudget;
  };

  return <CardTemplate title="Current Club Budget (ETH)" getDataFunction={getBudget} />;
};

export default Manager;
