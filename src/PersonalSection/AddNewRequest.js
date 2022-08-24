import React from "react";
import { Card } from "antd";

import { boxComponentStyles } from "../styles";

const AddNewRequest = () => {
  return (
    <div style={{flex: 1}}>
      <Card
        style={{ ...boxComponentStyles }}
        title="Add New Request"
        headStyle={{ color: "#708090" }}
      ></Card>
    </div>
  );
};

export default AddNewRequest;
