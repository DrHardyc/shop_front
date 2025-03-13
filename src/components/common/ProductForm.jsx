import {useEffect, useState} from "react";
import {Button, Form, Input, InputNumber, message, Select, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import {createProduct, updateProduct} from "@/service/VendorProductService.jsx";

const { TextArea } = Input;
const { Option } = Select;

const categories = ["Пицца", "Бургер", "Суши", "Шаурма", "Гриль", "Шашлык", "Картошка фри", "Другое"];

export default function ProductForm({ product, onSuccess }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(product?.image ? [{ url: product.image }] : []);

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
            setImage(product.image ? [{ url: "http://localhost:8080/" + product.image }] : []);
        } else {
            form.resetFields();
            setImage([]);
        }
    }, [product, form]);

    const handleUpload = ({ fileList }) => {
        setImage(fileList);
    };

    const handleSubmit = async (productData) => {
        setLoading(true);
        const formData = new FormData();

        formData.append("name", productData.name);
        formData.append("price", productData.price);
        formData.append("category", productData.price);
        formData.append("description", productData.description);
        if (image[0]?.originFileObj) {
            formData.append("image", image[0].originFileObj);
        }
        try {
            if (product) {
                formData.append('id', product.id);
                await updateProduct(formData);
                message.success("Позиция успешно обновлена!");
            } else {
                await createProduct(formData);
                message.success("Позиция добавлена!");
            }
            onSuccess();
        } catch {
            message.error("Не удалось сохранить позицию. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Название" rules={[{ required: true, message: "Введите название" }]}>
                <Input />
            </Form.Item>
            <Form.Item name="category" label="Категория" rules={[{ required: true, message: "Выберите категорию" }]}>
                <Select
                    showSearch
                    placeholder="Выберите категорию"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().startsWith(input.toLowerCase())
                    }
                >
                    {categories.map((category) => (
                        <Option key={category} value={category}>
                            {category}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="description" label="Описание">
                <TextArea />
            </Form.Item>
            <Form.Item name="price" label="Цена" rules={[{ required: true, message: "Введите цену" }]}>
                <InputNumber min={1} className="w-full" />
            </Form.Item>
            <Form.Item label="Фото">
                <Upload
                    listType="picture-card"
                    fileList={image}
                    onChange={handleUpload}
                    beforeUpload={() => false}
                >
                    {image.length < 1 && (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Загрузить</div>
                        </div>
                    )}
                </Upload>
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                {product ? "Сохранить изменения" : "Добавить позицию"}
            </Button>
        </Form>
    );
}

// ✅ Добавляем валидацию пропсов
ProductForm.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        category: PropTypes.string,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
    }),
    onSuccess: PropTypes.func.isRequired,
};
