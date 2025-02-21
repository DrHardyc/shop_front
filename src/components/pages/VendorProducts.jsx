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

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await fetchVendorProducts();
            setProducts(data);
        } catch (error) {
            message.error("Ошибка загрузки товаров");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            message.success("Товар удалён");
            loadProducts();
        } catch (error) {
            message.error("Ошибка удаления товара");
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
                <h2 className="text-xl font-bold">Мои товары</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    Добавить товар
                </Button>
            </div>
            <Table dataSource={products} columns={columns} loading={loading} rowKey="id" />

            <Modal
                title={editingProduct ? "Редактировать товар" : "Добавить товар"}
                open={isModalOpen}
                onCancel={() => { setIsModalOpen(false); setEditingProduct(null); }}
                footer={null}
            >
                <ProductForm product={editingProduct} onSuccess={() => { setIsModalOpen(false); setEditingProduct(null); loadProducts(); }} />
            </Modal>
        </div>
    );
}
