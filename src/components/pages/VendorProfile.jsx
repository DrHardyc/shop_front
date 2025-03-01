import { useState } from "react";
import { Card, Tabs, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import VendorProducts from "@components/pages/VendorProducts.jsx";
import VendorDashboard from "@components/pages/VendorDashboard.jsx";

export default function VendorProfile() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleSave = (values) => {
        console.log("Сохраненные данные:", values);
        message.success("Профиль обновлен!");
    };

    // Обработчик изменения списка файлов
    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const tabItems = [
        {
            key: "1",
            label: "Общие данные",
            children: (
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item label="Логотип">
                        <Upload
                            fileList={fileList} // Заменяем value на fileList
                            onChange={handleUploadChange} // Обновляем состояние при изменении
                            beforeUpload={() => false} // Отключаем автоматическую загрузку
                        >
                            <Button icon={<UploadOutlined />}>Загрузить</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="name" label="Название" rules={[{ required: true }]}>
                        <Input placeholder="Введите название" />
                    </Form.Item>
                    <Form.Item name="description" label="Описание">
                        <Input.TextArea rows={4} placeholder="Введите описание" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form>
            ),
        },
        {
            key: "2",
            label: "Товары",
            children: <VendorProducts/>,
        },
        {
            key: "3",
            label: "Заказы",
            children: <p>История заказов...</p>,
        },
        {
            key: "4",
            label: "Аналитика",
            children: <VendorDashboard/>,
        },
        {
            key: "5",
            label: "Настройки",
            children: <p>Редактирование профиля...</p>,
        },
    ];

    return (
        <Card title="Профиль Вендора" className="max-w-4xl mx-auto mt-6">
            <Tabs defaultActiveKey="1" items={tabItems} />
        </Card>
    );
}
