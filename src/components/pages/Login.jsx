import { useState } from "react";
import { Button, Input, Form, message, Card } from "antd";
import { Link } from "react-router-dom";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success(`Добро пожаловать, ${values.username}!`);
        }, 1000);
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-50">
            <Card className="w-full max-w-sm shadow-xl p-6 bg-white rounded-xl">
                <h1 className="text-2xl font-bold text-center mb-6">Вход</h1>
                <Form onFinish={onFinish} className="space-y-4">
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Введите имя пользователя!" }]}
                    >
                        <Input placeholder="Имя пользователя" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Введите пароль!" }]}
                    >
                        <Input.Password placeholder="Пароль" />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                        loading={loading}
                    >
                        Войти
                    </Button>
                    <p className="text-sm text-gray-600 text-center">
                        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                    </p>
                </Form>
            </Card>
        </div>
    );
}
