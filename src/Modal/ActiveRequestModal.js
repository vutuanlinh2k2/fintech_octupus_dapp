import React, { useState, useEffect } from "react";
import { Modal, Descriptions, Button, notification, message } from "antd";
import { ethers } from "ethers";
import { LoadingOutlined } from "@ant-design/icons";

import getContract from "../ethereum/ethereum";

const ActiveRequestModal = (props) => {
  const { visible, data, onClose } = props;
  const { id, title, description, value, owner, recipient, approvalsCount } =
    data;

  const [totalMember, setTotalMember] = useState();
  const [isApproving, setIsApproving] = useState(false);

  const approveRequest = async () => {
    const contract = getContract();
    setIsApproving(true);

    try {
      const tx = await contract.approveRequest(id.toNumber());
      await tx.wait().then(() => {
        notification["success"]({
          message: "Success!",
          description: "Approving request successfully!",
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
    setIsApproving(false);
  };

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
        <DescriptionItem label="Id">{id?.toNumber() ?? ""}</DescriptionItem>
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
        style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
        type="primary"
        onClick={approveRequest}
        loading={isApproving}
      >
        Approve
      </Button>
    </Modal>
  );
};

export default ActiveRequestModal;
