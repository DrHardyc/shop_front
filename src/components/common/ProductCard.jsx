import {Avatar, Button, Card, Collapse, Image, Modal, Rate, Tooltip} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import {useState} from "react";

const { Meta } = Card;

export default function ProductCard({ name, price, image, description, vendorLogo, vendorName, rating }) {
    const defaultImage = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
    const defaultCompanyLogo = "https://api.dicebear.com/7.x/miniavs/svg?seed=company";
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const collapseItems = [
        {
            key: "1",
            label: "Описание",
            children: <p>{description || "Описание отсутствует."}</p>,
        },
    ];
    return (
        <>
            <Card
                className="w-full h-full bg-white hover:shadow-lg transition-shadow rounded-xl"
                cover={
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                        <Image
                            alt={name}
                            src={image || defaultImage}
                            className="w-full h-full object-cover"
                            preview={false}
                            onClick={showModal}
                        />
                        <div className="absolute top-4 right-4">
                            <Avatar src={vendorLogo || defaultCompanyLogo}/>
                        </div>
                    </div>
                }
            >
                <Meta
                    title={
                        <div
                            className="text-lg font-bold break-all truncate"
                        >
                            {name}
                        </div>
                    }
                    description={
                        <div className="flex flex-col gap-1 mt-1">
                            <div className="text-sm text-gray-500">{vendorName}</div>
                            <Tooltip title={`${rating || 0} / 5`}>
                                <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={rating || 0}
                                    className="text-yellow-400"
                                />
                            </Tooltip>

                            <div className="flex justify-between items-center mt-1">
                                <span className="text-lg font-semibold">
                                    {new Intl.NumberFormat("ru-RU").format(price)} ₽
                                </span>
                                <Button
                                    type="primary"
                                    icon={<ShoppingCartOutlined/>}
                                    className="mt-3"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/*В корзину*/}
                                </Button>
                            </div>
                        </div>
                    }
                />
            </Card>

            {/* Модалка */}
            <Modal open={isModalOpen} onCancel={handleClose} footer={null} centered className="custom-modal">
                <div className="space-y-4">
                    <div className="relative">
                        <Image
                            alt={name}
                            src={image || defaultImage}
                            className="w-full object-cover rounded-lg"
                            preview={false}
                        />
                        <div className="absolute top-4 left-4">
                            <Avatar src={vendorLogo || defaultCompanyLogo}/>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold break-all">
                            {name}
                        </h2>
                    </div>
                    <Collapse items={collapseItems} bordered={false} className="mt-4"/>

                    <div className="flex justify-between items-center mt-1">
                                <span className="text-lg font-semibold">
                                    {new Intl.NumberFormat("ru-RU").format(price)} ₽
                                </span>
                        <Button
                            type="primary"
                            icon={<ShoppingCartOutlined/>}
                            className="mt-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/*В корзину*/}
                        </Button>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <p className="text-gray-600">{vendorName}</p>
                        <Rate
                            disabled
                            allowHalf
                            defaultValue={rating || 0}
                            className="text-yellow-400"
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    vendorLogo: PropTypes.string,
    rating: PropTypes.number,
    vendorName: PropTypes.string.isRequired,
};
