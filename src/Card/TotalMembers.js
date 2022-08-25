import React from "react";
import CardTemplate from "./CardTemplate";

import getContract from "../ethereum/ethereum";

const NumActiveRequests = () => {
  const getMemNumber = async () => {
    const contract = getContract();
    const membersNumber = await contract.getMemberCount();
    return membersNumber.toNumber();
  };

  return (
    <CardTemplate title="Total Members" getDataFunction={getMemNumber} />
  );
};

export default NumActiveRequests;
