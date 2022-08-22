import React from "react";
import { Empty } from "antd";

const NoEthereum = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Empty
        description={
          <>
            <h1>Ethereum environment not found!</h1>
            <h1>Please install MetaMask extension in your browser!</h1>
          </>
        }
      />
    </div>
  );
};

export default NoEthereum;
