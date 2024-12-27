import React, { useEffect, useState, createContext } from "react";
import { CheckerAuth, signInUser } from "../ApiService/auth";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../components/Notification"; // Adjust the path as necessary

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const showAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleLogin = async (email, password) => {
    setAuthInfo((prev) => ({ ...prev, isPending: true }));
    const { error, user, access } = await signInUser({ email, password });
    if (error) {
      setAuthInfo({ ...defaultAuthInfo, isPending: false, error });
      showAlert("error", "Invalid Credentials");
      return;
    }
    localStorage.setItem("auth-token", access);
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
    navigate("/dashboard", { replace: true });
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.log("Not token");
      setAuthInfo(defaultAuthInfo); // Ensure to reset if no token is found
      return;
    }

    setAuthInfo((prev) => ({ ...prev, isPending: true }));
    const { user, error } = await CheckerAuth(token);
    console.log(error);
    if (error) {
      console.log("yes");
      setAuthInfo({ ...defaultAuthInfo, isPending: false, error });
      showAlert("error", error); // Show error from auth check
      return;
    }

    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
  };

  useEffect(() => {
    isAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
  };

  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, handleLogout, isAuth }}>
      {children}
      <AlertComponent
        open={alertOpen}
        handleClose={handleAlertClose}
        severity={alertSeverity}
        message={alertMessage}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
