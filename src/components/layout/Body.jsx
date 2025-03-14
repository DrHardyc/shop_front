import { Layout, Spin } from "antd";
import ProductCard from "../common/ProductCard.jsx";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "@/service/ProductService.jsx";

export default function Body() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { Content } = Layout;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchAllProducts();
                setProducts(data);
            } catch (error) {
                setError("Произошла ошибка при загрузке продуктов");
                console.error("Ошибка при загрузке продуктов:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spin size="large"/>
    </div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <Layout className="bg-white w-full">
            <Content className="bg-white p-5">
                <div className="rounded-2xl shadow-md p-4">
                    <div
                        className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                        aria-label="Список товаров"
                    >
                        {products.map((item) => (
                            <ProductCard
                                id={item.id}
                                key={item.id}
                                name={item.name}
                                price={item.price}
                                image={"http://localhost:8080/" + item.image}
                                description={item.description}
                                vendorLogo={"http://localhost:8080/" + item.vendorLogo}
                                vendorName={item.vendorName}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                 </div>
            </Content>
        </Layout>
    );
}
