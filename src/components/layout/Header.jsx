import { Avatar, Layout, Input, Button, Badge } from "antd";
import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "@/hooks/useAuth.jsx"; // ✅ Исправили путь
import { motion } from "framer-motion";
import UserService from "@/service/UserService.jsx"; // ✅ Добавили анимацию

const { Search } = Input;

export default function Header({ menuCollapsed, toggleMenu }) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    async function handleLogout (){
        await UserService.logout();
        logout(); // Очищаем состояние пользователя в контексте
    }

    function handleClick(){
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.role === "OWNER") {
            navigate("/vendor/profile");
        } else if (user.role === "CUSTOMER") {
            navigate("/buyer/profile");
        }
    }

    function onclickToHome() {
        navigate("/");
    }

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <Layout className="mx-auto px-4 py-3 w-full">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-grow">
                        <Button
                            type="text"
                            icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={toggleMenu}
                            className="lg:hidden"
                            aria-label={menuCollapsed ? "Развернуть меню" : "Свернуть меню"}
                        />
                        <img
                            src="/img/logo/favicon.ico"
                            width={28}
                            height={28}
                            alt="Fast-food search logo"
                            onClick={onclickToHome}
                        />
                        <Search placeholder="Поиск еды" className="w-full max-w-[350px]" allowClear />
                    </div>
                    <div className="flex gap-3">
                        {!user ? (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex gap-3"
                            >
                                <Link to="/login">
                                    <Button type="default" className="hidden sm:inline-block">Вход</Button>
                                </Link>
                                <Link to="/register">
                                    <Button type="primary" className="hidden sm:inline-block">Регистрация</Button>
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3"
                            >
                                {user.role === 'CUSTOMER' && (
                                    <Link to="/cart" className="relative">
                                        <Badge size="small" offset={[10, -5]}>
                                            <ShoppingCartOutlined className="text-2xl hover:text-yellow-400" />
                                        </Badge>
                                    </Link>
                                )}
                                <Avatar
                                    size={28}
                                    src={user?.avatarUrl || "/img/default-avatar.png"} // ✅ Аватар по умолчанию
                                    icon={!user?.avatarUrl && <UserOutlined />}
                                    className="hidden sm:inline-block"
                                    onClick={handleClick}
                                />
                                <Button type="link" onClick={handleLogout} className="hidden sm:inline-block">Выйти</Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
}

Header.propTypes = {
    menuCollapsed: PropTypes.bool,
    toggleMenu: PropTypes.func,
};
