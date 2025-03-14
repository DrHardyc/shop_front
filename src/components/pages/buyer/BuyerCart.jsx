import { Table, Button, Popconfirm, InputNumber, Select, Typography } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";
import {fetchCart} from "@/service/CartService.jsx";
import {render} from "@testing-library/react"; // путь к вашему сервису

const { Option } = Select;

export default function Cart(){
    const [cart, setCart] = useState();
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    // Функции обработки данных
    const handleQuantityChange = (index, value) => {
        // Логика изменения количества
    };

    const handleRemoveItem = (index) => {
        // Логика удаления товара
    };

    const handleCreateOrder = () => {
        // Логика оформления заказа
    };

    // Расчет общей суммы
    useEffect(() => {
        const calculateTotal = () => {
            if (Array.isArray(cart)) {
                const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                setTotalPrice(total);
            } else {
                setTotalPrice(0);
            }
        };
        calculateTotal();
    }, [cart]); // Важно: зависимость только от cart

    // Загрузка данных из сервиса
    useEffect(() => {
        const loadCart = async () => {
            try {
                const response = await fetchCart();
                setCart(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    });

    // Настройка колонок таблицы
    const columns = [  // Добавлен массив
        {
            title: 'Товар',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <p className="text-base font-medium">{text}</p>
                    <p className="text-sm text-gray-500">Цена: {record.price} ₽</p>
                </div>
            )
        },
        {
            title: 'Количество',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record, index) => (
                <InputNumber
                    min={1}
                    value={text}
                    onChange={(value) => handleQuantityChange(index, value)}
                />
            )
        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, record, index) => (
                <Popconfirm
                    title={`Удалить "${record.name}" из корзины?`}
                    onConfirm={() => handleRemoveItem(index)}
                    okText="Да"
                    cancelText="Отмена"
                >
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm>
            )
        }
    ];

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка при загрузке корзины: {error}</div>;

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
            <Typography level={3}>
                <ShoppingCartOutlined className="mr-2" /> Корзина
            </Typography>

            <Table
                dataSource={cart || []} // Предохранитель на случай пустого cart
                columns={columns}
                pagination={false}
                rowKey={(record) => record.id}
                locale={{
                    emptyText: 'Корзина пуста'
                }}
            />

            <div className="flex items-center justify-between font-semibold text-lg mt-6">
                <span>Итого:</span>
                <span>{totalPrice} ₽</span>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <span className="text-gray-600">Способ оплаты:</span>
                <Select
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    className="min-w-150px"
                >
                    <Option value="cash">Наличные</Option>
                    <Option value="card">Карта</Option>
                    <Option value="qr">QR</Option>
                </Select>
            </div>

            <Button
                type="primary"
                onClick={handleCreateOrder}
                loading={loading}
                className="w-full mt-6"
            >
                Оформить заказ
            </Button>
        </div>
    );
};
