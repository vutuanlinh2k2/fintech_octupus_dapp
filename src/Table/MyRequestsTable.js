import React, { useState, useEffect, useMemo } from "react";
import { Table, Tag } from "antd";
import { ethers } from "ethers";
import { LoadingOutlined } from "@ant-design/icons";

import MyRequestModal from "../Modal/MyRequestModal";
import getContract from "../ethereum/ethereum";

const MyRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [totalMember, setTotalMember] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const getRequests = async () => {
    setIsLoading(true);
    const contract = getContract();
    const numRequests = await contract.getRequestCount();
    const myRequests = [];

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];

    for (let i = 0; i < numRequests; i++) {
      const request = await contract.requests(i);
      if (request.owner.toLowerCase() === account.toLowerCase()) {
        myRequests.push(request);
      }
    }
    setRequests(myRequests);
    setIsLoading(false);
  };

  const getMemNumber = async () => {
    const contract = getContract();
    const membersNumber = await contract.getMemberCount();
    setTotalMember(membersNumber.toNumber());
  };

  useEffect(() => {
    getMemNumber();
    getRequests();
  }, []);

  const columns = useMemo(() => {
    return [
      {
        title: "Id",
        dataIndex: "id",
        render: (id) => id.toNumber(),
        sorter: (a, b) => a.id.toNumber() > b.id.toNumber(),
        sortOrder: "descending",
        showSorterTooltip: false
      },
      {
        title: "Title",
        dataIndex: "title",
        render: (title) =>
          title.length < 15 ? title : title.slice(0, 12) + "...",
      },
      {
        title: "Description",
        dataIndex: "description",
        render: (description) =>
          description.length < 20
            ? description
            : description.slice(0, 17) + "...",
      },
      {
        title: "Value",
        dataIndex: "value",
        render: (value) => ethers.utils.formatEther(value.toNumber()),
      },
      {
        title: "Recipient",
        dataIndex: "recipient",
        render: (recipient) =>
          recipient.substring(0, 5) + "..." + recipient.slice(-3),
      },
      {
        title: "Status",
        dataIndex: "complete",
        render: (complete) =>
          complete ? (
            <Tag color="green">Completed</Tag>
          ) : (
            <Tag color="blue">Active</Tag>
          ),
      },
      {
        title: "Approvals",
        dataIndex: "approvalsCount",
        render: (approvals) =>
          totalMember ? (
            `${approvals.toNumber()}/${totalMember}`
          ) : (
            <LoadingOutlined />
          ),
      },
    ];
  }, [totalMember]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingOutlined style={{ fontSize: 50 }} />
      </div>
    );
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={requests}
        pagination={{
          pageSize: 5,
        }}
        bordered
        onRow={(record, _) => {
          return {
            onClick: () => {
              setModalData(record);
              console.log('record :', record);
              setIsOpenModal(true);
            },
          };
        }}
        showSorterTooltip={false}
      />
      <MyRequestModal
        visible={isOpenModal}
        data={modalData}
        onClose={() => {
          setIsOpenModal(false);
        }}
      />
    </>
  );
};

export default MyRequestsTable;
