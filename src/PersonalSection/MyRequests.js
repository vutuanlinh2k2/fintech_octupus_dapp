import React from "react";
import { Card } from "antd";

import MyRequestsTable from "../Table/MyRequestsTable";
import { boxComponentStyles } from "../styles";

const AddNewRequest = () => {

  return (
    <div style={{ gridColumn: "1 / span 2" }}>
      <Card
        style={{ ...boxComponentStyles, height: "100%" }}
        title="My Requests"
        headStyle={{ color: "#708090" }}
      >
        <MyRequestsTable />
      </Card>
    </div>
  );
};

export default AddNewRequest;
