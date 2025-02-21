import {BrowserRouter as Router} from "react-router-dom";
import SiderMenu from "@components/common/SiderMenu.jsx";
import Header from "@components/layout/Header.jsx";
import Footer from "@components/layout/Footer.jsx";
import {useState} from "react";
import AppRoutes from "@/routes/Routes.jsx";
import {AuthProvider} from "@/context/AuthContext.jsx";

export default function App() {
    const [menuCollapsed, setMenuCollapsed] = useState(false);

    const toggleMenu = () => {
        setMenuCollapsed(prev => !prev);
    };
    return (
        <AuthProvider>
            <Router>
                <div className="app-layout flex flex-col min-h-screen">
                    <Header menuCollapsed={menuCollapsed} toggleMenu={toggleMenu} />
                    <div className="flex flex-grow">
                        <SiderMenu collapsed={menuCollapsed} setCollapsed={setMenuCollapsed} />
                        <div style={{ marginLeft: menuCollapsed ? "0" : "180px", transition: "margin-left 0.3s ease" }}>
                            <AppRoutes/>
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}
