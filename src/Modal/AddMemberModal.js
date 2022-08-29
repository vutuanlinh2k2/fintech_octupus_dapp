import React, { useState } from "react";
import { Modal, Input, message } from "antd";
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
        message.success("Added new member successfully!");
        setTimeout(() => {
          window.location.reload(false);
        }, 3000);
      });
    } catch (err) {
      console.log("err :", err);
      message.error(err);
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
