import React, { useState } from "react";
import { ethers } from "ethers";
import { Card, Button, notification } from "antd";
import getContract from "../ethereum/ethereum";

import AddRequestInput from "./AddRequestInput";
import { boxComponentStyles } from "../styles";

const AddNewRequest = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addNewRequest = async () => {
    const contract = getContract();
    setIsLoading(true);
    try {
      let tx = await contract.createRequest(
        title,
        description,
        recipient,
        ethers.utils.parseEther(value)
      );
      await tx.wait().then(() => {
        notification["success"]({
          message: "Success!",
          description: "Creating request successfully!",
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
    setIsLoading(false);
  };

  return (
    <div style={{ flex: 1 }}>
      <Card
        style={{ ...boxComponentStyles }}
        title="Add New Request"
        headStyle={{ color: "#708090" }}
      >
        <AddRequestInput label="Title" placeholder="" setOnChange={setTitle} />
        <AddRequestInput
          label="Description"
          placeholder=""
          setOnChange={setDescription}
        />
        <AddRequestInput
          label="Recipient Address"
          placeholder=""
          setOnChange={setRecipient}
        />
        <AddRequestInput
          label="Value"
          placeholder=""
          setOnChange={setValue}
          isPayable
        />
        <Button
          style={{ marginTop: "10px" }}
          type="primary"
          shape="round"
          onClick={addNewRequest}
          loading={isLoading}
        >
          {isLoading ? "Adding New Request" : "Add New Request"}
        </Button>
      </Card>
    </div>
  );
};

export default AddNewRequest;
