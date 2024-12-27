import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Layout</h1>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
