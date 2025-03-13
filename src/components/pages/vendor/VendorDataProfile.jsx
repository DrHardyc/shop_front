import {Descriptions, Rate, Spin} from "antd";
import {useVendorData} from "@/utils/VendorProfileUtil.jsx";
import VendorMap from "@components/common/VendorMap.jsx";
import AntImageCustom from "@components/custom/AntImageCustom.jsx";

export default function VendorDataProfile() {
    const { companyData, isLoading, error } = useVendorData();

    if (isLoading) return <div className="flex items-center justify-center h-screen"><Spin/></div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            {companyData && (
                <Descriptions title="Информация о компании" bordered column={1}>
                    <Descriptions.Item label="Логотип">
                        {isLoading ? (
                            <Spin />
                        ) : (
                            <AntImageCustom
                                width={100}
                                height={100}
                                src={companyData.logoLink}
                                alt="Логотип компании"
                            />
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Наименование">{companyData.name}</Descriptions.Item>
                    <Descriptions.Item label="Владелец">{companyData.owner}</Descriptions.Item>
                    <Descriptions.Item label="Описание">{companyData.description}</Descriptions.Item>
                    <Descriptions.Item label="Адрес">{companyData.address}</Descriptions.Item>
                    <Descriptions.Item label="Телефон">{companyData.phone}</Descriptions.Item>
                    <Descriptions.Item label="Вебсайт">{companyData.website}</Descriptions.Item>
                    <Descriptions.Item label="Рейтинг">
                        <Rate disabled value={companyData.rating} />
                        ({companyData.rating})
                    </Descriptions.Item>
                    <Descriptions.Item label="Карта"><VendorMap/></Descriptions.Item>
                </Descriptions>
            )}
        </div>
    );
}