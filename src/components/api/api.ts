export const getProducts = async () => {
  try {
    const url = `https://fakestoreapi.com/products`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    // console.log("qwe");
  }
};
