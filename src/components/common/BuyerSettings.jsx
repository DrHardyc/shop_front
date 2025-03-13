import {Button, Form, Input, message, Spin} from "antd";
import {useEffect} from "react";
import {useBuyerData} from "@/utils/BuyerProfileUtil.jsx";
import {updateBuyer} from "@/service/BuyerService.jsx";


export default function BuyerSettings() {
    const { buyerData, isLoading, error } = useBuyerData();
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            if (!buyerData.id) {
                throw new Error('ID вендора не определен');
            }
            await updateBuyer({ ...values, id: buyerData.id });
            message.success('Данные успешно обновлены');
        } catch (err) {
            message.error('Произошла ошибка при обновлении данных');
            console.error('Ошибка обновления:', err);
        }
    };

    useEffect(() => {
        if (buyerData) {
            form.setFieldsValue(buyerData);
        }
    }, [buyerData, form]);

    if (isLoading) return <div className="flex items-center justify-center h-screen"><Spin/></div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Имя"
                name="name"
                rules={[{ required: true, message: 'Пожалуйста, введите наименование' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="E-mail"
                name="email"
                rules={[{ required: true, message: 'Пожалуйста, введите имя владельца' }]}
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                label="Телефон"
                name="phone"
                rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};
