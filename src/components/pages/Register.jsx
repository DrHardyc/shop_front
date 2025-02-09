import { useState } from "react";
import {Button, Input, Card, Form, message} from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserService from "@/service/UserService.jsx";

export default function Register() {
    // const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    // const [formData, setFormData] = useState({
    //     email: '',
    //     firstName: '',
    //     lastName: '',
    //     phone: '',
    //     password: '',
    //
    // });

    const handleSubmit = async () => {
        try {
            const values = form.getFieldsValue();
            await UserService.register(values);

            form.resetFields();
            message.success('Пользователь успешно зарегистрирован!');
        } catch (error) {
            console.error('Error registering user:', error);
            message.error('Ошибка при регистрации пользователя');
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
                        form={form}
                        name="register"
                        onFinish={handleSubmit}
                        style={{ maxWidth: 400 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            rules={[{required: true, message: "Введите адрес электронной почты!", type: "email"}]}>
                            <Input placeholder="эл. почта" />
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
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Повторите пароль' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароли не совпадают!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Повторите пароль" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <p className="text-sm text-gray-600 text-center">
                            Уже есть аккаунт? <Link to="/login">Войти</Link>
                        </p>
                    </Form>
                </Card>
            </div>
        </motion.div>
    );
}
