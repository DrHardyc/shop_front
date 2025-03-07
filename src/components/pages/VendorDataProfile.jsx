import {Descriptions, Image, Rate, Spin} from "antd";
import {useVendorData} from "@/utils/VendorDataProfileUtils.jsx";
import VendorMap from "@components/common/VendorMap.jsx";

export default function VendorDataProfile() {
    const { companyData, isLoading, error, logo } = useVendorData();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            {companyData && (
                <Descriptions title="Информация о компании" bordered column={1}>
                    <Descriptions.Item label="Логотип">
                        {isLoading ? (
                            <Spin />
                        ) : logo ? (
                            <Image
                                width={100}
                                src={logo}
                                alt="Логотип компании"
                            />
                        ) : error ? (
                            <div>Ошибка загрузки логотипа</div>
                        ) : (
                            <div>Логотип не доступен</div>
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