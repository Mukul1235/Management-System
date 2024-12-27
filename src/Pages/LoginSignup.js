import React from "react";
import { useAuth } from "../Context/AuthContext";

const LoginSignup = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // Perform your login logic here (e.g., API call)
    // For demonstration, we'll just call the login function directly
    login();
  };

  return (
    <div>
      <h1>Login/Signup</h1>
      <button onClick={handleLogin}>Login</button>
      {/* Add more fields for signup/login as needed */}
    </div>
  );
};

export default LoginSignup;
