import { Button, Input, Card, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import UserService from "@/service/UserService.jsx";
import {useAuth} from "@/hooks/UseAuth.jsx";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { login } = useAuth(); // Получаем метод login из контекста

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const userData = await UserService.login(form.getFieldsValue());
            if (userData.token && userData.refreshToken) {
                // Создаем объект пользователя для контекста
                const authUser = {
                    id: userData.id, // Если есть ID пользователя
                    name: userData.name, // Если есть имя
                    role: userData.role,
                    token: userData.token,
                    refreshToken: userData.refreshToken,
                };
                localStorage.clear(); // на всякий чистим локалсторадж
                localStorage.setItem("user", JSON.stringify(authUser)); // Сохраняем в localStorage
                login(authUser); // Обновляем контекст авторизации
                navigate("/");
            } else {
                setError(userData.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center"
        >
            <div>
                <Card
                    className="w-full ml-10 max-w-sm shadow-xl p-6 bg-white rounded-xl"
                    style={{ maxWidth: '400px' }} // Фиксируем максимальную ширину
                >
                    <h2 className="text-center text-2xl font-bold mb-6">Вход</h2>
                    {error && <p className="error-message">{error}</p>}
                    <Form
                        onFinish={handleSubmit}
                        className="space-y-4"
                        form={form}
                    >
                        <Form.Item name="email" rules={[{ required: true, message: "Введите имя пользователя!" }]}>
                            <Input
                                placeholder="Имя пользователя"
                                className="hover:border-blue-500 focus:border-blue-500" // Кастомные стили инпута
                            />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Введите пароль!" }]}>
                            <Input.Password
                                placeholder="Пароль"
                                className="hover:border-blue-500 focus:border-blue-500"
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            className="bg-blue-600 hover:bg-blue-700" // Переопределение стилей Ant Design
                        >
                            Войти
                        </Button>
                        <p className="text-sm text-gray-600 text-center mt-4">
                            Нет аккаунта? <Link to="/register" className="text-blue-600 hover:text-blue-800">Зарегистрироваться</Link>
                        </p>
                    </Form>
                </Card>
            </div>
        </motion.div>
    );
}