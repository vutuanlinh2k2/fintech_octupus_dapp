import React from "react";
import CardTemplate from "./CardTemplate";

import getContract from "../ethereum/ethereum";

const NumActiveRequests = () => {
  const getActiveRequests = async () => {
    const contract = getContract();
    const numRequests = await contract.getRequestCount();
    const completedRequests = await contract.completeRequestsCount();
    return numRequests.toNumber() - completedRequests.toNumber();
  };

  return (
    <CardTemplate
      title="Active Requests Number"
      getDataFunction={getActiveRequests}
    />
  );
};

export default NumActiveRequests;
