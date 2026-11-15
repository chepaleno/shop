// import { useEffect, useState } from "react";
import { getProducts } from "../components/api/api";
import ProductCard from "../components/ProductCard/ProductCard";
import "./Catalog.css";
import { useQuery } from "@tanstack/react-query";
// import { useShop } from "../components/context/ShopContext";
// import type { CartItem } from "../types";

const Catalog = () => {
  // const { cart } = useShop();
  // console.log(cart);

  // const [products, setProducts] = useState<
  //   {
  //     id: number;
  //     title: string;
  //     price: number;
  //     description: string;
  //     category: string;
  //     image: string;
  //     rating: { count: number; rate: number };
  //   }[]
  // >([]);

  const {data: products, isLoading,error,} = 
  useQuery({queryKey: ["products"], queryFn: () => getProducts(),});

  if (isLoading) {
    return <div className="loading">Загрузка Содержимого...</div>;
  }

  if (error) {
    console.error(error.message);
    return (
      <div className="error">
        Ошибка на сервере.
        <br /> Перезагрузите страницу или попробуйте позже
      </div>
    );
  }

  console.log(products);

  // const getData = async () => {
  //   const data = await getProducts();
  //   setProducts(data);
  // };
  // console.log(products);

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Все товары</h1>

      <div className="products-grid">
        {products?.map((product) => (
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
