import React from "react";
import CardTemplate from "./CardTemplate";

import getContract from "../ethereum/ethereum";

const Manager = () => {
  const getManager = async () => {
    const contract = getContract();
    const manager = await contract.manager();
    return manager;
  };

  return <CardTemplate title="Manager Address" getDataFunction={getManager} />;
};

export default Manager;
