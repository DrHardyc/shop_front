import { Button, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Meta } = Card;

export default function ProductCard({ title, name, price, image }) {
    const defaultImage =
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

    return (
        <Card
            className="w-full bg-white hover:shadow-lg transition-shadow rounded-xl"
            cover={
                <img
                    alt={title}
                    className="rounded-t-xl object-cover h-48 w-full"
                    src={image || defaultImage}
                />
            }
        >
            <Meta
                title={<div className="text-lg font-bold">{title}</div>}
                description={
                <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-500">{name}</div>
                    <div className="flex justify-between items-center mt-2 flex-wrap">
                  <span className="text-lg font-semibold">
                    {new Intl.NumberFormat("ru-RU").format(price)}₽
                  </span>
                        <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            className="bg-blue-500 hover:bg-blue-600 mt-2 md:mt-0"
                        >
                            В корзину
                        </Button>
                    </div>
                </div>
                }
            />
        </Card>
    );
}

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
};
