import React from "react";
import { Modal, Descriptions } from "antd";
import { ethers } from "ethers";

const CompletedRequestModal = (props) => {
  const { visible, data, onClose } = props;
  const { id, title, description, value, owner, recipient } = data;

  const { Item: DescriptionItem } = Descriptions;
  return (
    <Modal
      title="Completed Request"
      visible={visible}
      centered
      onOk={onClose}
      onCancel={onClose}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Descriptions column={1}>
        <DescriptionItem label="Id">{id?.toNumber() ?? ''}</DescriptionItem>
        <DescriptionItem label="Title">{title}</DescriptionItem>
        <DescriptionItem label="Description">{description}</DescriptionItem>
        <DescriptionItem label="Value">
          {value?.toNumber() ? ethers.utils.formatEther(value.toNumber()) : 0}{" "}
          ETH
        </DescriptionItem>
        <DescriptionItem label="Owner">{owner}</DescriptionItem>
        <DescriptionItem label="Recipient">{recipient}</DescriptionItem>
      </Descriptions>
    </Modal>
  );
};

export default CompletedRequestModal;
