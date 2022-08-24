import React from "react";
import CardTemplate from "./CardTemplate";

import getContract from "../ethereum/ethereum";

const NumActiveRequests = () => {
  const getActiveRequests = async () => {
    const contract = getContract();
    const activeRequests = await contract.getRequestCount();
    return activeRequests.toNumber();
  };

  return (
    <CardTemplate title="Total members" getDataFunction={getActiveRequests} />
  );
};

export default NumActiveRequests;
