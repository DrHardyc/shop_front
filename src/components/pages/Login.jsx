import { Button, Input, Card, Form } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log("Login Success:", values);
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center"
        >
            <div
                // style={{ paddingTop: '4rem', paddingBottom: '4rem' }} // Компенсация для фиксированного Header/Footer
            >
                <Card
                    className="w-full ml-10 max-w-sm shadow-xl p-6 bg-white rounded-xl"
                    style={{ maxWidth: '400px'}} // Фиксируем максимальную ширину
                >
                    <h2 className="text-center text-2xl font-bold mb-6">Вход</h2>
                    <Form onFinish={onFinish} className="space-y-4">
                        <Form.Item name="username" rules={[{ required: true, message: "Введите имя пользователя!" }]}>
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