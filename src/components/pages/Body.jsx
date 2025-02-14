import {Layout} from "antd";
import ProductCard from "../common/ProductCard.jsx";

const { Content } = Layout;

const testArr = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `Заголовок ${i}`,
    name: `Имя ${i}`,
    price: String(i + 100),
}));

export default function Body({ menuCollapsed }) {

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
        <div className="flex-grow z-0 bg-white">
            <div className="flex gap-5 w-full">
                <Content>
                    <div className="bg-white p-5 rounded-2xl shadow-md">
                        <div
                            className={`grid gap-4 ${
                                menuCollapsed
                                    ? "grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
                                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
                            }`}
                            aria-label="Список товаров"
                        >
                            {renderedCards}
                        </div>
                    </div>
                </Content>
            </div>
        </div>
    );
}
