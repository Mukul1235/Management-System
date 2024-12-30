import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Customers from "../Pages/Customers";
import FunctionsDetails from "../Pages/FunctionDetails";
import Payments from "../Pages/Payments";
import { useAuth } from "../hooks";
import "../styles/Dashboard.css"

const NAVIGATION = [
  {
    segment: "customers",
    title: "Customers",
    icon: <PeopleIcon />,
  },
  // {
  //   segment: "payments",
  //   title: "Payments",
  //   icon: <PaymentIcon />,
  // },
  {
    segment: "functionDetail",
    title: "Function Details",
    icon: <DashboardIcon />,
  },
];

// const theme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: "data-toolpad-color-scheme",
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DashboardContent({ pathname }) {
//   const theme = useTheme();
//   const customerId = pathname.match(/\/(\d+)/)?.[1] || "";

//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//         backgroundColor: theme.palette.background.default,
//         color: theme.palette.text.primary,
//       }}>
//       {pathname === "/customers" ? (
//         <Customers />
//       ) : pathname === "/functionDetail" ? (
//         <FunctionsDetails />
//       ) : (
//         <Payments customerId={customerId} />
//       )}
//     </Box>
//   );
// }

// DashboardContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// function DashboardWithBranding() {
//   const location = useLocation();
//   const { authInfo } = useAuth();
//   const { isLoggedIn, isPending } = authInfo;
//   const navigate = useNavigate();

//   const handleNavigation = (segment) => {
//     navigate(`/${segment}`, { replace: true }); // Use React Router navigation
//   };

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (!isPending && !isLoggedIn) {
//         navigate("/");
//       }
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, [isLoggedIn, isPending, navigate]);

//   return (
//     <AppProvider
//       navigation={NAVIGATION.map((item) => ({
//         ...item,
//         onClick: () => handleNavigation(item.segment),
//       }))}
//       branding={{
//         logo: (
//           <img
//             src="https://mui.com/static/logo.svg"
//             alt="Forever Studios Management System Logo"
//             style={{ height: 32 }}
//           />
//         ),
//         title: "Forever Studios Management System",
//         homeUrl: "/",
//       }}
//       theme={theme}>
//       <DashboardLayout>
//         <DashboardContent pathname={location.pathname} />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// export default DashboardWithBranding;

function DashboardContent({ pathname }) {
  const customerId = pathname.match(/\/(\d+)/)?.[1] || "";

  return (
    <div className="dashboard-content">
      {pathname === "/customers" ? (
        <Customers />
      ) : pathname === "/functionDetail" ? (
        <FunctionsDetails />
      ) : (
        <Payments customerId={customerId} />
      )}
    </div>
  );
}

DashboardContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardWithBranding() {
  const location = useLocation();
  const { authInfo } = useAuth();
  const { isLoggedIn, isPending } = authInfo;
  const navigate = useNavigate();

  const handleNavigation = (segment) => {
    navigate(`/${segment}`, { replace: true });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isPending && !isLoggedIn) {
        navigate("/");
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isLoggedIn, isPending, navigate]);

  return (
    <div className="app-provider">
      <header className="branding">
        <img
          src="https://mui.com/static/logo.svg"
          alt="Forever Studios Management System Logo"
          className="branding-logo"
        />
        <h1 className="branding-title">Forever Studios Management System</h1>
      </header>
      <nav className="navigation">
        {NAVIGATION.map((item) => (
          <button
            key={item.segment}
            className="navigation-item"
            onClick={() => handleNavigation(item.segment)}>
            <span className="navigation-icon">{item.icon}</span>
            {item.title}
          </button>
        ))}
      </nav>
      <main className="dashboard-layout">
        <DashboardContent pathname={location.pathname} />
      </main>
    </div>
  );
}

export default DashboardWithBranding;