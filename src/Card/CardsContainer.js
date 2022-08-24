import React from "react";

import ClubBudget from "./ClubBudget";
import Manager from "./Manager";
import NumActiveRequests from "./NumActiveRequests";
import NumCompletedRequests from "./NumCompletedRequests";
import SendMoney from "./SendMoney";
import TotalMembers from "./TotalMembers";

const CardsContainer = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1rem"
      }}
    >
      <TotalMembers />
      <Manager />
      <ClubBudget />
      <NumActiveRequests />
      <NumCompletedRequests />
      <SendMoney />
    </div>
  );
};

export default CardsContainer;
