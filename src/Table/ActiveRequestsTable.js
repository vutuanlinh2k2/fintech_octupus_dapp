import React, { useState, useEffect, useMemo } from "react";
import { Table, Card } from "antd";
import { ethers } from "ethers";
import { LoadingOutlined } from "@ant-design/icons";

import ActiveRequestModal from "../Modal/ActiveRequestModal";
import getContract from "../ethereum/ethereum";
import { boxComponentStyles } from "../styles";

const ActiveRequestsTable = () => {
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

    for (let i = 0; i < numRequests; i++) {
      const request = await contract.requests(i);
      if (!request.complete) {
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
        title: "Owner",
        dataIndex: "owner",
        render: (owner) => owner.substring(0, 5) + "..." + owner.slice(-3),
      },
      {
        title: "Recipient",
        dataIndex: "recipient",
        render: (recipient) =>
          recipient.substring(0, 5) + "..." + recipient.slice(-3),
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

  return (
    <Card
      style={{ ...boxComponentStyles, height: "100%" }}
      title="Active Requests"
      headStyle={{ color: "#708090" }}
    >
      {isLoading ? (
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
      ) : (
        <Table
          columns={columns}
          dataSource={requests}
          pagination={{
            pageSize: 3,
            position: ["bottomCenter"],
          }}
          bordered
          onRow={(record, index) => {
            return {
              onClick: () => {
                setModalData(record);
                setIsOpenModal(true);
              },
            };
          }}
        />
      )}
      <ActiveRequestModal
        visible={isOpenModal}
        data={modalData}
        onClose={() => {
          setIsOpenModal(false);
        }}
      />
    </Card>
  );
};

export default ActiveRequestsTable;
