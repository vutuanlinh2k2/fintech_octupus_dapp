import React from "react";

import getContract from "../ethereum/ethereum";
import LeftSideCard from "./LeftSideCard";

const LeftSide = () => {
  const getMemNumber = async () => {
    const contract = getContract();
    const membersNumber = await contract.getMemberCount();
    return membersNumber.toNumber();
  };
  const getManager = async () => {
    const contract = getContract();
    let manager = await contract.manager();
    return manager;
  };
  const getActiveRequests = async () => {
    const contract = getContract();
    const activeRequests = await contract.getRequestCount();
    return activeRequests.toNumber();
  };
  const getCompletedRequests = async () => {
    const contract = getContract();
    const completedRequests = await contract.completeRequestsCount();
    return completedRequests.toNumber();
  };

  return (
    <div
      style={{
        flex: 16,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "1rem",
      }}
    >
      <LeftSideCard
        title="Total members"
        getDataFunction={getMemNumber}
      ></LeftSideCard>
      <LeftSideCard
        title="Manager Address"
        getDataFunction={getManager}
      ></LeftSideCard>
      <LeftSideCard
        title="Total active requests"
        getDataFunction={getActiveRequests}
      ></LeftSideCard>
      <LeftSideCard
        title="Total completed requests"
        getDataFunction={getCompletedRequests}
      ></LeftSideCard>
    </div>
  );
};

export default LeftSide;
