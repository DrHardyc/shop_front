import { useState } from "react";
import { Button, Input, Card, Form } from "antd";
import { Link } from "react-router-dom";

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
        <div className="flex justify-center pt-16 w-full bg-gray-50 max-h-100">
            <Card className="w-full max-w-sm shadow-xl p-6 bg-white rounded-xl">
                <h2 className="text-center text-2xl font-bold mb-6">Регистрация</h2>
                <Form onFinish={onFinish} className="space-y-4">
                    <Form.Item name="username" rules={[{ required: true, message: "Введите имя пользователя!" }]}>
                        <Input placeholder="Имя пользователя" />
                    </Form.Item>
                    <Form.Item name="email" rules={[{ required: true, message: "Введите email!", type: "email" }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Введите пароль!" }]}>
                        <Input.Password placeholder="Пароль" />
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
    );
}
