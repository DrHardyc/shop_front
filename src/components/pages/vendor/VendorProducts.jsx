import { useEffect, useRef, useState } from "react";
import { Button, message, Modal, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProductForm from "../../common/ProductForm.jsx";
import { deleteProduct, fetchVendorProducts } from "@/service/VendorProductService.jsx";
import AntImageCustom from "@components/custom/AntImageCustom.jsx";

export default function VendorProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const effectExecuted = useRef(false);

    // Загрузка продуктов при монтировании компонента
    useEffect(() => {
        if (!effectExecuted.current) {
            effectExecuted.current = true;
            loadProducts();
        }
    }, []);

    const loadProducts = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await fetchVendorProducts();
            setProducts(data);
        } catch {
            message.error("Ошибка загрузки товаров");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteProduct(id);
            message.success("Товар удалён");
            await loadProducts();
        } catch {
            message.error("Ошибка удаления товара");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "Изображение",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <div className="flex justify-center">
                    <AntImageCustom
                        width={80}
                        height={80}
                        src={"http://localhost:8080/" + image}
                        preview={false}
                        placeholder={<div style={{ height: "80px" }} />}
                        style={{ borderRadius: 8, objectFit: "cover", border: "1px solid #eee" }}
                    />
                </div>
            ),
        },
        { title: "Название", dataIndex: "name", key: "name" },
        {
            title: "Цена",
            dataIndex: "price",
            key: "price",
            render: (price) => `${price} ₽`,
        },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => (
                <div className="flex space-x-2 justify-center">
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setEditingProduct(record);
                            setIsModalOpen(true);
                        }}
                    />
                    <Button
                        size="small"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record.id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Наше меню</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2"
                >
                    Добавить
                </Button>
            </div>

            <Table
                dataSource={products}
                columns={columns}
                loading={loading}
                rowKey="id"
                className="rounded-xl border border-gray-200 shadow-sm"
            />

            <Modal
                title={editingProduct ? "Редактировать позицию" : "Добавить позицию"}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                }}
                footer={null}
                destroyOnClose
            >
                <ProductForm
                    product={editingProduct}
                    onSuccess={async () => {
                        setIsModalOpen(false);
                        setEditingProduct(null);
                        await loadProducts();
                    }}
                />
            </Modal>
        </div>
    );
}
