import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { boxComponentStyles } from "../styles";
import getContract from "../ethereum/ethereum";

const TotalClubBudget = () => {
  const [clubBudget, setClubBudget] = useState(null);

  const getBudget = async () => {
    const contract = getContract();
    let currentBudget = await contract.getCurrentBudget();
    currentBudget = ethers.utils.formatEther(currentBudget.toNumber());
    setClubBudget(currentBudget);
  };

  useEffect(() => {
    getBudget();
  }, []);

  return (
    <Card
      title="Current Club Budget"
      bordered={false}
      style={{ ...boxComponentStyles, width: "100%", flex: 1 }}
    >
      {clubBudget === null ? <LoadingOutlined /> : <h3>{clubBudget} ETH</h3>}
    </Card>
  );
};

export default TotalClubBudget;
