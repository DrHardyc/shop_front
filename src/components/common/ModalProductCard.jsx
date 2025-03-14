import PropTypes from "prop-types";
import {Avatar, Button, Collapse, Modal, Rate, Image} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";

export default function ModalProductCard({ vendorName, description, vendorLogo, image, price, rating, isVisible, onClose }) {
    const defaultImage = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
    const defaultCompanyLogo = "https://api.dicebear.com/7.x/miniavs/svg?seed=company";

    const collapseItems = [
        {
            key: "1",
            label: "Описание",
            children: <p>{description || "Описание отсутствует."}</p>,
        },
    ];

    return (
        <Modal open={isVisible} onCancel={onClose} footer={null} centered className="custom-modal">
            <div className="space-y-4">
                <div className="relative">
                    <Image
                        alt={vendorName}
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
                        {vendorName}
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
                        В корзину
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
    );
}

ModalProductCard.propTypes = {
    vendorName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    vendorLogo: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};