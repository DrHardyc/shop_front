import {Button, Card, Collapse, Modal} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {useState} from "react";
import { motion } from "framer-motion";

const { Meta } = Card;

export default function ProductCard({ title, name, price, image,  description}) {
    const defaultImage =
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const items = [
        {
            key: '1',
            label: 'Описание',
            children: <p>{description}</p>,
        },
    ];

    return (
        <>
            <Card
                className="w-full h-full bg-white hover:shadow-lg transition-shadow rounded-xl"
                cover={
                    <img
                        alt={title}
                        className="rounded-t-xl object-cover w-full" // Уменьшили высоту изображения
                        src={image || defaultImage}
                        onClick={showModal}
                    />
                }
            >
                <Meta
                    title={<div className="text-lg font-bold">{title}</div>}
                    description={

                        <div className="flex flex-col gap-1">
                            <div className="text-sm text-gray-500">
                                {name}
                            </div>
                            <div className="flex justify-between items-center mt-1 flex-wrap">
                                    <span className="text-lg font-semibold">
                                {new Intl.NumberFormat("ru-RU").format(price)}₽
                            </span>
                                <Button
                                    type="primary"
                                    icon={<ShoppingCartOutlined/>}
                                    // className="bg-blue-500 hover:bg-blue-600 mt-1 md:mt-0"
                                    className="mt-2 w-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    {/*В корзину*/}
                                </Button>
                            </div>
                        </div>
                    }
                />
            </Card>
            {/* Модальное окно с анимацией */}
            <Modal open={isModalOpen} onCancel={handleClose} footer={null} centered>
                {/*<motion.div*/}
                {/*    initial={{opacity: 0, scale: 0.8}}*/}
                {/*    animate={{opacity: 1, scale: 1}}*/}
                {/*    exit={{opacity: 0, scale: 0.8}}*/}
                {/*    transition={{duration: 0.3, ease: "easeOut"}}*/}
                {/*    className="p-4"*/}
                {/*>*/}
                <div>
                    <img alt={name} src={image} className="w-full object-cover rounded-lg mb-4"/>
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-gray-600">{name}</p>
                    <p className="text-xl font-semibold mt-2">{price.toLocaleString("ru-RU")} ₽</p>
                    <Collapse
                        items={items}
                        bordered={false}
                        className=""
                    />
                    <Button type="primary" icon={<ShoppingCartOutlined/>}
                            className="mt-4 w-full"
                    >
                        Добавить в корзину
                    </Button>
                </div>
                {/*</motion.div>*/}
            </Modal>
        </>
    );
}

ProductCard.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
};
