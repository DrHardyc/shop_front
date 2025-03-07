import {Card, Tabs} from "antd";
import VendorProducts from "@components/pages/VendorProducts.jsx";
import VendorDashboard from "@components/pages/VendorDashboard.jsx";
import VendorDataProfile from "@components/pages/VendorDataProfile.jsx";
import VendorSettings from "@components/common/VendorSettings.jsx";

export default function VendorProfile() {

    const tabItems = [
        {
            key: "1",
            label: "Общие данные",
            children: <VendorDataProfile />,
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
            children: <VendorSettings />
        },
    ];

    return (
        <Card title="Профиль Вендора" className="max-w-4xl mx-auto mt-6">
            <Tabs defaultActiveKey="1" items={tabItems} />
        </Card>
    );
}