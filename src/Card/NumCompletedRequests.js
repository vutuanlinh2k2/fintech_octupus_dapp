import React from "react";
import CardTemplate from "./CardTemplate";

import getContract from "../ethereum/ethereum";

const NumCompletedRequests = () => {
  const getCompletedRequests = async () => {
    const contract = getContract();
    const completedRequests = await contract.completeRequestsCount();
    return completedRequests.toNumber();
  };

  return (
    <CardTemplate
      title="Total members"
      getDataFunction={getCompletedRequests}
    />
  );
};

export default NumCompletedRequests;
