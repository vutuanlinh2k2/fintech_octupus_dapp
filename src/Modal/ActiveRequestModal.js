import React, { useState, useEffect } from "react";
import { Modal, Descriptions, Button } from "antd";
import { ethers } from "ethers";
import { LoadingOutlined } from "@ant-design/icons";

import getContract from "../ethereum/ethereum";

const ActiveRequestModal = (props) => {
  const { visible, data, onClose } = props;
  const { title, description, value, owner, recipient, approvalsCount } = data;

  const [totalMember, setTotalMember] = useState();

  useEffect(() => {
    const getMemNumber = async () => {
      const contract = getContract();
      const membersNumber = await contract.getMemberCount();
      setTotalMember(membersNumber.toNumber());
    };
    getMemNumber();
  }, []);

  const { Item: DescriptionItem } = Descriptions;
  return (
    <Modal
      title="Active Request"
      visible={visible}
      centered
      onOk={onClose}
      onCancel={onClose}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Descriptions column={1}>
        <DescriptionItem label="Title">{title}</DescriptionItem>
        <DescriptionItem label="Description">{description}</DescriptionItem>
        <DescriptionItem label="Value">
          {value?.toNumber() ? ethers.utils.formatEther(value.toNumber()) : 0}{" "}
          ETH
        </DescriptionItem>
        <DescriptionItem label="Owner">{owner}</DescriptionItem>
        <DescriptionItem label="Recipient">{recipient}</DescriptionItem>
        <DescriptionItem label="Approvals">
          {totalMember && approvalsCount ? (
            `${approvalsCount.toNumber()}/${totalMember}`
          ) : (
            <LoadingOutlined />
          )}
        </DescriptionItem>
      </Descriptions>
      <Button
        style={{ marginTop: "0.5rem" }}
        type="primary"
        onClick={() => {}}
      >
        Approve
      </Button>
    </Modal>
  );
};

export default ActiveRequestModal;
