import { Menu } from "antd";
import { HomeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// eslint-disable-next-line react/prop-types
export default function SiderMenu({ collapsed, setCollapsed }) {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    useEffect(() => {
        if (isMobile) {
            setCollapsed(true); // Автоматическое скрытие на мобильных устройствах
        } else setCollapsed(false)
    }, [isMobile, setCollapsed]);

    const menuItems = [
        { key: "1", icon: <HomeOutlined />, label: <Link to="/">Главная</Link> },
        { key: "2", icon: <SearchOutlined />, label: <Link to="/search">Поиск</Link> },
        { key: "3", icon: <UserOutlined />, label: <Link to="/profile">Профиль</Link> },
    ];

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
