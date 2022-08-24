import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { boxComponentStyles } from "../styles";

const CardTemplate = ({ title, getDataFunction }) => {
  const [body, setBody] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataFunction();
      setBody(result);
    };
    fetchData();
  }, [getDataFunction]);

  return (
    <Card
      style={{ ...boxComponentStyles }}
      title={title}
      headStyle={{ color: "#708090" }}
    >
      {body === null ? (
        <LoadingOutlined />
      ) : (
        <h3 style={{ lineBreak: "anywhere" }}>{body}</h3>
      )}
    </Card>
  );
};

export default CardTemplate;

