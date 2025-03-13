import {Descriptions, Spin} from "antd";
import {useBuyerData} from "@/utils/BuyerProfileUtil.jsx";

export default function BuyerDataProfile() {
    const { buyerData, isLoading, error } = useBuyerData();

    if (isLoading) return <div className="flex items-center justify-center h-screen"><Spin/></div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            {buyerData && (
                <Descriptions title="Информация о пользователе" bordered column={1}>
                    <Descriptions.Item label="Имя">{buyerData.name}</Descriptions.Item>
                    <Descriptions.Item label="mail">{buyerData.email}</Descriptions.Item>
                    <Descriptions.Item label="Телефон">{buyerData.phone}</Descriptions.Item>
                </Descriptions>
            )}
        </div>
    );
}