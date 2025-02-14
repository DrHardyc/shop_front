import { Avatar, Layout, Input, Button } from "antd";
import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";

const { Search } = Input;

// eslint-disable-next-line react/prop-types
export default function Header({ menuCollapsed, toggleMenu }) {
    const { isAuthenticated, logout, isLoading, user } = useAuth(); // Добавлен user из контекста

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <Layout className="mx-auto px-4 py-3 w-full">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-grow">
                        <Button
                            type="text"
                            icon={menuCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={toggleMenu}
                            className="lg:hidden"
                            aria-label={menuCollapsed ? "Развернуть меню" : "Свернуть меню"}
                        />
                        <img
                            src="/img/logo/favicon.ico"
                            width={28} // Уменьшили размер логотипа
                            height={28}
                            alt="Fast-food search logo"
                        />
                        <Search placeholder="Поиск еды" className="w-full max-w-[350px]"
                                allowClear/>
                    </div>

                    <div className="flex gap-3">
                        {!isAuthenticated && (
                            <>
                                <Link to="/login">
                                    <Button type="default" className="hidden sm:inline-block">Вход</Button>
                                </Link>
                                <Link to="/register">
                                    <Button type="primary" className="hidden sm:inline-block">Регистрация</Button>
                                </Link>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <Avatar
                                    size={28}
                                    src={user?.avatarUrl} // Используем аватар пользователя, если он есть
                                    icon={!user?.avatarUrl && <UserOutlined />} // Иконка по умолчанию, если аватара нет
                                    className="hidden sm:inline-block"
                                />
                                <Button type="link" onClick={logout} className="hidden sm:inline-block">Выйти</Button>
                            </>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
}