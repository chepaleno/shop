import type { CartItem } from "../../types";

export const getProducts = async (): Promise<CartItem[]> => {
  // try {
  //   const url = `https://fakestoreapi.com/products`;

  //   const response = await fetch(url);
  //   const data = await response.json();
  //   // console.log(data);

  //   return data;
  // } catch (error) {
  //   // console.log("qwe");
  // }
  const response = await fetch(`https://fakestoreapi.com/products`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить товары");
  }

  return response.json();
};
