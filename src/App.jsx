import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiderMenu from "@components/common/SiderMenu.jsx";
import Header from "@components/layout/Header.jsx";
import Footer from "@components/layout/Footer.jsx";
import Body from "@components/pages/Body.jsx";
import Login from "@components/pages/Login.jsx";
import Register from "@components/pages/Register.jsx";
import { AuthProvider } from "/src/context/AuthContext.jsx";
import { useState } from "react";

export default function App() {
    const [menuCollapsed, setMenuCollapsed] = useState(false);

    return (
        <AuthProvider>
            <Router>
                <div className="app-layout flex flex-col min-h-screen">
                    <Header />
                    <div className="flex flex-grow">
                        <SiderMenu onCollapse={setMenuCollapsed} />
                        <div style={{ marginLeft: menuCollapsed ? "70px" : "180px", transition: "margin-left 0.3s ease" }}>
                            <Routes>
                                <Route path="/" element={<Body />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Routes>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}
