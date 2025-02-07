import { useState } from "react";
import {Button, Input, Card, Form, Select} from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserService from "@/service/UserService.jsx";

export default function Register() {
    const [loading, setLoading] = useState(false);
    // const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',

    });
    // const onFinish = (values) => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //         console.log("Registration Success:", values);
    //     }, 1000);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService

            const token = localStorage.getItem('token');
            await UserService.register(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                email: '',
                firstName: '',
                lastName: '',
                phone: '',
                password: ''
            });
            alert('User registered successfully');
            // navigate('/admin/user-management');

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
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
                    <Form
                        onSubmit={handleSubmit}
                        // form={form}
                        name="register"
                        // onFinish={onFinish}
                        style={{ maxWidth: 400 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            rules={[{required: true, message: "Введите адрес электронной почты!", type: "email"}]}>
                            <Input placeholder="эл. почта"/>
                        </Form.Item>
                        <Form.Item name="firstName" rules={[{type: "string"}]}>
                            <Input placeholder="Ваше имя"/>
                        </Form.Item>
                        <Form.Item name="lastName" rules={[{type: "string"}]}>
                            <Input placeholder="Ваша фамилия"/>
                        </Form.Item>
                        <Form.Item name="phone" rules={[{ message: 'Введите номер телефона!' }]}>
                            <Input addonBefore="+7" placeholder="Номер телефона" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="password" rules={[{required: true, message: "Введите пароль"}]}>
                            <Input.Password placeholder="Введите пароль"/>
                        </Form.Item>
                        <Form.Item name="confirmPassword" rules={[{required: true, message: "Повторите пароль"}]}>
                            <Input.Password placeholder="Повторите пароль"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <p className="text-sm text-gray-600 text-center">
                            Уже есть аккаунт? <Link to="/registeralt">Войти</Link>
                        </p>
                    </Form>
                </Card>
            </div>
        </motion.div>
    );
}
