import { Layout } from "antd";
import ProductCard from "../common/ProductCard.jsx";
import PropTypes from "prop-types";
import SiderMenu from "@components/common/SiderMenu.jsx";

const { Content, Sider } = Layout;

const testArr = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `Заголовок ${i}`,
    name: `Имя ${i}`,
    price: String(i + 100),
}));

export default function Body() {
    const renderedCards = testArr.map((item) => (
        <ProductCard
            key={item.id}
            name={item.name}
            title={item.title}
            price={item.price}
            image={item.image}
        />
    ));

    return (
        <Layout>
            {/* Основной контент */}
            <Layout>
                <Content className="bg-white p-5">
                    <div className="rounded-2xl shadow-md">
                        <div
                            className={'grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'}
                            //className={'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'}
                            aria-label="Список товаров"
                        >
                            {renderedCards}
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
