import { useEffect, useState } from "react";
import { getProducts } from "../components/api/api";
import ProductCard from "../components/ProductCard/ProductCard";
import "./Catalog.css";
// import { useShop } from "../components/context/ShopContext";
// import type { CartItem } from "../types";

const Catalog = () => {
  // const { cart } = useShop();
  // console.log(cart);
  

  const [products, setProducts] = useState<
    {
      id: number;
      title: string;
      price: number;
      description: string;
      category: string;
      image: string;
      rating: { count: number; rate: number };
    }[]
  >([]);

  const getData = async () => {
    const data = await getProducts();
    setProducts(data);
  };
  // console.log(products);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Все товары</h1>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            image={product.image}
            id={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
