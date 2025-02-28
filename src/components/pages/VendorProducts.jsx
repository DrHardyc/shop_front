import { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ProductForm from "../common/ProductForm.jsx";
import { fetchVendorProducts, deleteProduct } from "../../service/ProductService.jsx";

export default function VendorProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // UseEffect вызывается один раз при монтировании компонента
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        if (loading) return; // Предотвращает повторный запрос, если уже идет загрузка
        setLoading(true);
        try {
            const data = await fetchVendorProducts();
            setProducts(data); // Обновляем данные
        } catch (error) {
            message.error("Ошибка загрузки товаров");
        } finally {
            setLoading(false); // Ожидание завершено
        }
    };

    const handleDelete = async (id) => {
        setLoading(true); // Показываем индикатор загрузки при удалении
        try {
            await deleteProduct(id);
            message.success("Товар удалён");
            await loadProducts(); // Перезагружаем список продуктов после удаления
        } catch (error) {
            message.error("Ошибка удаления товара");
        } finally {
            setLoading(false); // Завершаем процесс загрузки
        }
    };

    const columns = [
        { title: "Название", dataIndex: "name", key: "name" },
        { title: "Цена", dataIndex: "price", key: "price", render: (price) => `${price} ₽` },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => { setEditingProduct(record); setIsModalOpen(true); }} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </>
            ),
        },
    ];

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Наше меню</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    Добавить позицию
                </Button>
            </div>
            <Table dataSource={products} columns={columns} loading={loading} rowKey="id" />

            <Modal
                title={editingProduct ? "Редактировать позицию" : "Добавить позицию"}
                open={isModalOpen}
                onCancel={() => { setIsModalOpen(false); setEditingProduct(null); }}
                footer={null}
            >
                <ProductForm
                    product={editingProduct}
                    onSuccess={async () => {
                        setIsModalOpen(false);
                        setEditingProduct(null);
                        await loadProducts(); // Перезагружаем продукты после добавления/редактирования
                    }}
                />
            </Modal>
        </div>
    );
}
