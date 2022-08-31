import React, { useState, useEffect } from "react";
import { Modal, Descriptions, Tag, Button, notification } from "antd";
import { ethers } from "ethers";
import { LoadingOutlined } from "@ant-design/icons";

import getContract from "../ethereum/ethereum";

const MyRequestModal = (props) => {
  const { visible, data, onClose } = props;
  const { id, title, description, value, recipient, complete, approvalsCount } =
    data;

  const [totalMember, setTotalMember] = useState();
  const [isFinalizing, setIsFinalizing] = useState(false);

  useEffect(() => {
    const getMemNumber = async () => {
      const contract = getContract();
      const membersNumber = await contract.getMemberCount();
      setTotalMember(membersNumber.toNumber());
    };
    getMemNumber();
  }, []);

  const finalizeRequest = async () => {
    const contract = getContract();
    setIsFinalizing(true);
    try {
      const tx = await contract.finalizeRequest(id.toNumber());
      await tx.wait().then(() => {
        // message.success("Finalizing request successfully!");
        notification["success"]({
          message: "Success!",
          description: "Finalizing request successfully!",
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
    setIsFinalizing(false);
  };

  const { Item: DescriptionItem } = Descriptions;
  return (
    <Modal
      title="My Request"
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
        <DescriptionItem label="Recipient">{recipient}</DescriptionItem>
        <DescriptionItem label="Status">
          {complete ? (
            <Tag color="green">Completed</Tag>
          ) : (
            <Tag color="blue">Active</Tag>
          )}
        </DescriptionItem>
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
        onClick={finalizeRequest}
        loading={isFinalizing}
        disabled={
          complete ||
          !approvalsCount ||
          approvalsCount.toNumber() / totalMember <= 0.5
        }
      >
        Finalize
      </Button>
    </Modal>
  );
};

export default MyRequestModal;
