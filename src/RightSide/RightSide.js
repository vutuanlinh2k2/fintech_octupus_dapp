import React from "react";

import TotalClubBudget from "./TotalClubBudget";
import SendMoney from "./SendMoney";

const RightSide = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 8 }}>
      <TotalClubBudget />
      <SendMoney />
    </div>
  );
};

export default RightSide;
