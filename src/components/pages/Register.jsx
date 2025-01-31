import { useState } from "react";
import { Button, Input, Card, Form } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log("Registration Success:", values);
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center"
        >
            <div
                // className="fixed inset-0 bg-gray-50 flex items-center justify-center"
                style={{ paddingTop: '4rem', paddingBottom: '4rem' }} // Компенсация для фиксированного Header/Footer
            >
                <Card
                    className="w-full max-w-sm shadow-xl p-6 bg-white rounded-xl"
                    style={{maxWidth: '400px'}} // Фиксируем максимальную ширину
                >
                    <h2 className="text-center text-2xl font-bold mb-6">Регистрация</h2>
                    <Form onFinish={onFinish} className="space-y-4">
                        <Form.Item name="username" rules={[{required: true, message: "Введите имя пользователя!"}]}>
                            <Input placeholder="Имя пользователя"/>
                        </Form.Item>
                        <Form.Item name="email" rules={[{required: true, message: "Введите email!", type: "email"}]}>
                            <Input placeholder="Email"/>
                        </Form.Item>
                        <Form.Item name="password" rules={[{required: true, message: "Введите пароль!"}]}>
                            <Input.Password placeholder="Пароль"/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Зарегистрироваться
                        </Button>
                        <p className="text-sm text-gray-600 text-center">
                            Уже есть аккаунт? <Link to="/login">Войти</Link>
                        </p>
                    </Form>
                </Card>
            </div>
        </motion.div>
    );
}
