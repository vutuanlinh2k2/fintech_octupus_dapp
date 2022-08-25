import React from "react";
import { Input } from "antd";

const AddRequestInput = ({ label, placeholder, setOnChange, isPayable }) => {
  const onChangeFunc = (e) => {
    setOnChange(e.target.value);
  };
  return (
    <div style={{ marginBottom: "8px" }}>
      <p style={{ marginBottom: "4px" }}>{label}</p>
      <Input
        placeholder={placeholder}
        onChange={onChangeFunc}
        addonAfter={isPayable ? "ETH" : null}
      />
    </div>
  );
};

export default AddRequestInput;
