import { Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useVendorData } from "@/utils/VendorDataProfileUtils.jsx";
import {updateVendor, updateVendorLogo} from "@/service/VendorService.jsx";
import PropTypes from "prop-types";
import {test} from "@/service/TestService.jsx";

export default function VendorSettings() {
    const { companyData, isLoading, error } = useVendorData();
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            if (!companyData.id) {
                throw new Error('ID вендора не определен');
            }

            // Добавляем данные компании как JSON
            const companyDataJson = {
                name: values.name,
                owner: values.owner,
                description: values.description,
                address: values.address,
                phone: values.phone,
                website: values.website,
            };
            await updateVendor(companyData.id, companyDataJson);

            // Отправляем файл отдельно потому что бэкенд не может их обработать одновременно
            // Отправляем файл, если он есть
            if (values.logo && values.logo.length > 0) {
                const formData = new FormData();
                formData.append('logo', values.logo[0].originFileObj);
                await updateVendorLogo(companyData.id, formData);
            }

            message.success('Данные успешно обновлены');
        } catch (err) {
            message.error('Произошла ошибка при обновлении данных');
            console.error('Ошибка обновления:', err);
        }
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={companyData}
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
                <Input />
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

VendorSettings.propTypes = {
    vendorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};