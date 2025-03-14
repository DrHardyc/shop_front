import { Spin, Typography } from 'antd';
import { useBuyerData } from '@/utils/BuyerProfileUtil.jsx';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

export default function BuyerDataProfile() {
    const { buyerData, isLoading, error } = useBuyerData();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="w-full max-w-3xl mx-auto my-5 p-6 bg-white rounded-lg shadow-md">
            <Typography.Title level={3} className="mb-6">
                Информация о пользователе
            </Typography.Title>

            {buyerData && (
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="min-w-[120px] text-gray-600 font-medium flex items-center">
                          <UserOutlined className="mr-2" />
                          Имя:
                        </span>
                        <span className="text-base font-semibold">{buyerData.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="min-w-[120px] text-gray-600 font-medium flex items-center">
                          <MailOutlined className="mr-2" />
                          Email:
                        </span >
                        <span className="text-base font-semibold">{buyerData.email}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="min-w-[120px] text-gray-600 font-medium flex items-center">
                          <PhoneOutlined className="mr-2" />
                          Телефон:
                        </span>
                        <span className="text-base font-semibold">{buyerData.phone}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
