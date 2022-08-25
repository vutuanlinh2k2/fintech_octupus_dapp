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
      title="Completed Requests Number"
      getDataFunction={getCompletedRequests}
    />
  );
};

export default NumCompletedRequests;
