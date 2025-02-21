import React, {useContext, useEffect, useState} from "react";
import { Table, Button, Card, Statistic, Modal, Form, Input, InputNumber } from "antd";
import { PlusOutlined, BarChartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";


export default function VendorDashboard(){
    const [menu, setMenu] = useState([
        { key: "1", name: "Бургер", price: 350 },
        { key: "2", name: "Пицца", price: 700 },
    ]);

    const [orders, setOrders] = useState([
        { key: "1", orderId: "101", total: 1050, status: "Готовится" },
        { key: "2", orderId: "102", total: 700, status: "Выполнен" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // Добавление нового товара
    const addProduct = (values) => {
        const newProduct = { key: Date.now().toString(), ...values };
        setMenu([...menu, newProduct]);
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Личный кабинет заведения</h2>

            {/* 📊 Блок статистики */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                    <Statistic title="Заказов сегодня" value={orders.length} prefix={<ShoppingCartOutlined />} />
                </Card>
                <Card>
                    <Statistic title="Выручка (₽)" value={orders.reduce((acc, o) => acc + o.total, 0)} prefix={<BarChartOutlined />} />
                </Card>
            </div>

            {/* 📦 Блок заказов */}
            <h3 className="text-xl font-semibold mb-2">Заказы</h3>
            <Table dataSource={orders} columns={[
                { title: "ID заказа", dataIndex: "orderId", key: "orderId" },
                { title: "Сумма (₽)", dataIndex: "total", key: "total" },
                { title: "Статус", dataIndex: "status", key: "status" },
            ]} pagination={false} className="mb-6" />

            {/* 🍔 Блок меню */}
            <h3 className="text-xl font-semibold mb-2">Меню</h3>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} className="mb-4">
                Добавить товар
            </Button>
            <Table dataSource={menu} columns={[
                { title: "Название", dataIndex: "name", key: "name" },
                { title: "Цена (₽)", dataIndex: "price", key: "price" },
                { title: "Действия", key: "actions", render: (_, record) => (
                        <Button danger onClick={() => setMenu(menu.filter((item) => item.key !== record.key))}>
                            Удалить
                        </Button>
                    )}
            ]} pagination={false} />

            {/* 🆕 Модальное окно для добавления блюда */}
            <Modal title="Добавить блюдо" open={isModalOpen} onCancel={() => setIsModalOpen(false)}
                   footer={[
                       <Button key="cancel" onClick={() => setIsModalOpen(false)}>Отмена</Button>,
                       <Button key="submit" type="primary" onClick={() => form.submit()}>Добавить</Button>,
                   ]}>
                <Form form={form} layout="vertical" onFinish={addProduct}>
                    <Form.Item name="name" label="Название" rules={[{ required: true, message: "Введите название!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Цена (₽)" rules={[{ required: true, message: "Введите цену!" }]}>
                        <InputNumber min={1} className="w-full" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
