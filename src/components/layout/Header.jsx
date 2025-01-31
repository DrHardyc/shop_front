import { Avatar, Layout, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";

const { Search } = Input;

export default function Header() {
    const { isAuthenticated, isLoading, logout } = useAuth();

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="sticky top-0 z-10 bg-white shadow-md">
            <Layout className="mx-auto px-5 py-4 w-full">
                <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center w-full gap-5">
                        <img
                            src="/img/logo/favicon.ico"
                            width={32}
                            height={32}
                            alt="Fast-food search logo"
                        />
                        <Search placeholder="Поиск еды" className="w-full max-w-[400px]" allowClear />
                    </div>

                    <div className="flex gap-4">
                        {!isAuthenticated && (
                            <>
                                <Link to="/login">
                                    <Button type="default">Вход</Button>
                                </Link>
                                <Link to="/register">
                                    <Button type="primary">Регистрация</Button>
                                </Link>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <Avatar size={32} icon={<UserOutlined />} />
                                <Button type="link" onClick={logout}>
                                    Выйти
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
}