import {Card, Spin, Tabs} from "antd";
import BuyerDataProfile from "@components/pages/buyer/BuyerDataProfile.jsx";
import BuyerSettings from "@components/common/BuyerSettings.jsx";

export default function VendorProfile() {

    const tabItems = [
        {
            key: "1",
            label: "Общие данные",
            children: <BuyerDataProfile />,
        },
        {
            key: "2",
            label: "Текущий заказы",
            children: <Spin />,
        },
        // {
        //     key: "3",
        //     label: "Аналитика",
        //     children: <Spin />,
        // },
        {
            key: "4",
            label: "Настройки",
            children: <BuyerSettings />
        },
    ];

    return (
        <Card title="Профиль покупателя" className="max-w-4xl mx-auto mt-6">
            <Tabs defaultActiveKey="1" items={tabItems} />
        </Card>
    );
}