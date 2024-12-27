import React from "react";
import AuthProvider from "./AuthProvider";


function ContextProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ContextProvider;
