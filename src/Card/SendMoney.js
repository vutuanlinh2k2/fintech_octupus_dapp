import React, { useState } from "react";
import { ethers } from "ethers";
import { Card, Input, Button, notification } from "antd";

import { boxComponentStyles } from "../styles";
import getContract from "../ethereum/ethereum";

const SendMoney = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  const sendMoney = async () => {
    const contract = getContract();
    setIsLoading(true);
    try {
      let tx = await contract.sendMoneyToBudget({
        value: ethers.utils.parseEther(value),
      });
      await tx.wait().then(() => {
        notification["success"]({
          message: "Success!",
          description: "Send money successfully!",
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 3000);
      });
    } catch (err) {
      notification.error({
        message: "Oops! There was error occur!",
      });
      console.log("err :", err);
    }
  };

  return (
    <Card
      title="Send Money To Club's Budget"
      bordered={false}
      style={{ ...boxComponentStyles, width: "100%", flex: 1 }}
      headStyle={{ color: "#708090" }}
    >
      <Input
        addonAfter="ETH"
        onChange={onChangeValue}
        style={{ marginBottom: "1rem" }}
      />
      <Button
        type="primary"
        shape="round"
        onClick={sendMoney}
        loading={isLoading}
      >
        Send Money
      </Button>
    </Card>
  );
};

export default SendMoney;
