import React, { useState } from "react";
import { Modal, Input, message, notification } from "antd";
import getContract from "../ethereum/ethereum";

const AddMemberModal = ({ visible, onCancel }) => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event) => {
    setAddress(event.target.value);
  };

  const addMember = async () => {
    const contract = getContract();
    setIsLoading(true);
    try {
      const tx = await contract.addMember(address);
      await tx.wait().then(() => {
        notification["success"]({
          message: "Success!",
          description: "Adding member successfully!",
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
    <Modal
      title="Adding New Member"
      centered
      visible={visible}
      onCancel={onCancel}
      okText="Add"
      onOk={addMember}
      confirmLoading={isLoading}
    >
      <Input onChange={onChange} placeholder="Address" />
    </Modal>
  );
};

export default AddMemberModal;
