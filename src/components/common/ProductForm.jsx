import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import PropTypes from "prop-types"; // ✅ Импорт PropTypes
import { createProduct, updateProduct } from "../../service/ProductService.jsx";

export default function ProductForm({ product, onSuccess }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
        } else {
            form.resetFields();
        }
    }, [product, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (product) {
                await updateProduct(product.id, values);
                message.success("Товар успешно обновлён!");
            } else {
                await createProduct(values);
                message.success("Товар добавлен!");
            }
            onSuccess();
        } catch (error) {
            console.error("Ошибка сохранения товара", error);
            message.error("Не удалось сохранить товар. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Название" rules={[{ required: true, message: "Введите название" }]}>
                <Input />
            </Form.Item>
            <Form.Item name="price" label="Цена" rules={[{ required: true, message: "Введите цену" }]}>
                <InputNumber min={1} className="w-full" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                {product ? "Сохранить изменения" : "Добавить товар"}
            </Button>
        </Form>
    );
}

// ✅ Добавляем валидацию пропсов
ProductForm.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number, // Или PropTypes.string, если ID строковый
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }),
    onSuccess: PropTypes.func.isRequired,
};
