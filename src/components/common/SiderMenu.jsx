import { Button, Menu } from "antd";
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function SiderMenu({ onCollapse }) {
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    useEffect(() => {
        setCollapsed(isMobile);
    }, [isMobile]);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        onCollapse(!collapsed); // Передаем новое состояние
    };

    const menuItems = [
        { key: "1", icon: <HomeOutlined />, label: <Link to="/">Главная</Link> },
        { key: "2", icon: <SearchOutlined />, label: <Link to="/search">Поиск</Link> },
        { key: "3", icon: <UserOutlined />, label: <Link to="/profile">Профиль</Link> },
    ];

    return (
        <motion.div
            animate={{width: collapsed ? 70 : 180}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            className="fixed top-16 left-0 z-10"
        >
            <div className="h-[calc(100vh-4rem)] bg-white shadow-md overflow-auto">
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    onClick={toggleCollapse}
                    className="m-2"
                    aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
                />
                <Menu
                    mode="inline"
                    items={menuItems}
                    className="rounded-md"
                    style={{backgroundColor: "#ffffff"}}
                />
            </div>
        </motion.div>

    );
}
