import { BrowserRouter as Router } from "react-router-dom";
import SiderMenu from "@components/layout/SiderMenu.jsx";
import Header from "@components/layout/Header.jsx";
import Footer from "@components/layout/Footer.jsx";
import {useState, useEffect, useRef} from "react";
import AppRoutes from "@/routes/Routes.jsx";
import { AuthProvider } from "@/context/AuthContext.jsx";

export default function App() {
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const mapInstance = useRef(false);

    const toggleMenu = () => {
        setMenuCollapsed(prev => !prev);
    };

    // Загрузка скрипта Яндекс.Карт при монтировании App
    useEffect(() => {
        if (!mapInstance.current){
            mapInstance.current = true;
            if (!window.ymaps) {
                const script = document.createElement('script');
                script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=566c2dbc-3aaa-4b07-bca9-46cd5ef2da5e';
                script.async = true;
                document.body.appendChild(script);
            }
        }
    }, []);

    return (
        <AuthProvider>
            <Router>
                <div className="app-layout flex flex-col min-h-screen">
                    <Header menuCollapsed={menuCollapsed} toggleMenu={toggleMenu} />
                    <div className="flex flex-grow">
                        <SiderMenu collapsed={menuCollapsed} setCollapsed={setMenuCollapsed} />
                        <div style={{ marginLeft: menuCollapsed ? "0" : "180px", transition: "margin-left 0.3s ease" }}>
                            <AppRoutes />
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}