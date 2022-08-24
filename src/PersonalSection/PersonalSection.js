import React from "react";

import AddNewRequest from "./AddNewRequest";
import MyRequest from "./MyRequests";

const PersonalSection = () => {
  return (
    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr 1fr" }}>
      <MyRequest />
      <AddNewRequest />
    </div>
  );
};

export default PersonalSection;
