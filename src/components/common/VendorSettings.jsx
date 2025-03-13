import {Button, Form, Input, message, Spin, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useVendorData} from "@/utils/VendorProfileUtil.jsx";
import {updateVendor} from "@/service/VendorService.jsx";
import {useEffect} from "react";
import '@ant-design/v5-patch-for-react-19';


export default function VendorSettings() {
    const { companyData, isLoading, error } = useVendorData();
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            if (!companyData.id) {
                throw new Error('ID вендора не определен');
            }

            const formData = new FormData();
            formData.append("id", companyData.id);
            formData.append("name", values.name);
            formData.append("owner", values.owner);
            formData.append("description", values.description);
            formData.append("address", values.address);
            formData.append("phone", values.phone);
            formData.append("website", values.website);
            if (values.logo && values.logo.length > 0) {
                formData.append('logo', values.logo[0].originFileObj);
            }
            await updateVendor(formData);
            message.success('Данные успешно обновлены');
        } catch (err) {
            message.error('Произошла ошибка при обновлении данных');
            console.error('Ошибка обновления:', err);
        }
    };

    useEffect(() => {
        if (companyData) {
            form.setFieldsValue(companyData);
        }
    }, [companyData, form]);

    if (isLoading) return <div className="flex items-center justify-center h-screen"><Spin/></div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Наименование"
                name="name"
                rules={[{ required: true, message: 'Пожалуйста, введите наименование' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Владелец"
                name="owner"
                rules={[{ required: true, message: 'Пожалуйста, введите имя владельца' }]}
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                label="Описание"
                name="description"
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Адрес"
                name="address"
                rules={[{ required: true, message: 'Пожалуйста, введите адрес' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Телефон"
                name="phone"
                rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Вебсайт"
                name="website"
                rules={[{ required: true, message: 'Пожалуйста, введите вебсайт' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Логотип"
                name="logo"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }}
            >
                <Upload
                    name="logo"
                    listType="picture"
                    beforeUpload={() => false} // Предотвращаем автоматическую загрузку
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Загрузить логотип</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};

// VendorSettings.propTypes = {
//     vendorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// };