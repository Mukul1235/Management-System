import * as React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  IconButton,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

const BRANDING = {
  logo: (
    <img
      src="https://mui.com/static/logo.svg"
      alt="App logo"
      style={{ height: 24 }}
    />
  ),
  title: "Your App Name",
};

const AuthPage = () => {
  const { authInfo, handleLogin } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, isPending } = authInfo;
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      secondary: { main: "#dc004e" },
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    handleLogin(email, password);
  };

  useEffect(() => {
    if (!isPending && isLoggedIn) {
      navigate("/customers");
    }
  }, [isLoggedIn, isPending, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider branding={BRANDING} theme={theme}>
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100vh",
          }}>
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>
          <Paper
            elevation={6}
            sx={{
              padding: 3,
              borderRadius: 3,
            }}>
            <Typography
              variant="h5"
              align="center"
              sx={{ marginBottom: 2, fontWeight: "bold" }}>
              {activeTab === 0 ? "Login" : "Sign Up"}
            </Typography>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              sx={{
                marginBottom: 3,
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}>
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: 2,
                  paddingY: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                }}>
                {activeTab === 0 ? "Login" : "Sign Up"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </AppProvider>
    </ThemeProvider>
  );
};

export default AuthPage;
