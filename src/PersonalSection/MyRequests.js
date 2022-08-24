import React from "react";
import { Card } from "antd";

import { boxComponentStyles } from "../styles";

const AddNewRequest = () => {
  return (
    <div style={{ gridColumn: "1 / span 2" }}>
      <Card
        style={{ ...boxComponentStyles }}
        title="My Requests"
        headStyle={{ color: "#708090" }}
      ></Card>
    </div>
  );
};

export default AddNewRequest;
