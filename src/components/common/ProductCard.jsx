import {Avatar, Button, Card, Image, Rate, Tooltip} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import {useState} from "react";
import ModalProductCard from "@components/common/ModalProductCard.jsx";
import {setToCart} from "@/service/CartService.jsx";

const { Meta } = Card;

export default function ProductCard({ name, price, image, description, vendorLogo, vendorName, rating, id }) {
    const defaultImage = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
    const defaultCompanyLogo = "https://api.dicebear.com/7.x/miniavs/svg?seed=company";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClose = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);
    const [error, setError] = useState(null); // Для обработки ошибок
    const [isAddingToCart, setIsAddingToCart] = useState(false); // Состояние загрузки

    const handleAddToCart = async () => {
        try {
            setIsAddingToCart(true);
            const data = {
                id,
                name,
                price,
                image,
            };

            await setToCart(data);

            // Можно добавить уведомление об успешном добавлении
            console.log("Товар успешно добавлен в корзину");
        } catch (err) {
            setError(err.message);
            console.error("Ошибка при добавлении в корзину:", err);
        } finally {
            setIsAddingToCart(false);
        }
    };

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
                                    loading={isAddingToCart}
                                    onClick={handleAddToCart}
                                >
                                    {/*В корзину*/}
                                </Button>
                            </div>
                        </div>
                    }
                />
            </Card>

            {/* Модалка */}
            <ModalProductCard
                vendorName={vendorName}
                description={description}
                vendorLogo={vendorLogo}
                image={image}
                price={price}
                rating={rating}
                isVisible={isModalOpen}
                onClose={handleClose}
            />
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
