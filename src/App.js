import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Customers from "./Pages/Customers";
import Payments from "./Pages/Payments";
import FunctionsDetails from "./Pages/FunctionDetails";
import AuthPage from "./Pages/Signup";
import { useAuth } from "./hooks";





function App() {
    const { authInfo } = useAuth();
    console.log(authInfo)
    return (
        <>
            <div className="app-container">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<AuthPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/customers" element={<Dashboard ><Customers/>
                     </Dashboard>} />
                        <Route path="/payments/:customerId" element={<Dashboard></Dashboard>} /> {/* Updated route */}
                        <Route path="/functionDetail" element={<Dashboard><FunctionsDetails/></Dashboard>} /> {/* Updated route */}
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;