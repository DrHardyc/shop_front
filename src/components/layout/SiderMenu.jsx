import {Menu} from "antd";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {useAuth} from "@/hooks/UseAuth.jsx";
import {ProtectedRoute} from "@/routes/ProtectedRoute.jsx";
import PropTypes from "prop-types";


export default function SiderMenu({ collapsed, setCollapsed }) {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const { user } = useAuth();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if (isMobile) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [isMobile, setCollapsed]);

    useEffect(() => {
        const baseMenu = [
            { key: "1", icon: <HomeOutlined />, label: <Link to="/">Главная</Link> },
            // { key: "2", icon: <SearchOutlined />, label: <Link to="/search">Поиск</Link> },

        ];

        if (user){
            switch (user.role) {
                case "OWNER":
                    setMenuItems([
                        ...baseMenu,
                        { key: "3", icon: <UserOutlined />, label: <Link to="/vendor/profile">Профиль</Link> },
                    ]);
                    break;
                case "CUSTOMER":
                    setMenuItems([
                        ...baseMenu,
                        { key: "6", icon: <UserOutlined />, label: <Link to="/buyer/profile">Профиль</Link> },
                    ]);
                    break;
                default:
                    setMenuItems(baseMenu);
            }
        } else {
            setMenuItems(baseMenu);
        }

    }, [user]);

    return (
        <motion.div
            animate={{ width: collapsed ? 0 : 180, opacity: collapsed ? 0 : 1 }}
            initial={{ width: 180, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 z-10 bg-white shadow-md h-[calc(100vh-64px)] overflow-hidden"
        >
            {!collapsed && (
                <Menu
                    mode="inline"
                    items={menuItems}
                    className="rounded-md"
                    style={{ backgroundColor: "#ffffff" }}
                     />
            )}
                
        </motion.div>
    );
}

ProtectedRoute.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
}