import { useShop } from "../context/ShopContext";
import "./ProductCard.css";
import type { CartItem } from "../../types";

interface ProductProps {
  title: string;
  price: number;
  image: string;
  category: string;
  id: number;
}

const ProductCard = (props: ProductProps) => {
  const { cart, setCart } = useShop();
  const { title, price, image, category, id } = props;

  const onClick = () => {
    if (
      cart.find((value: CartItem) => value.id === id)?.quantity === undefined ||
      cart.find((value: CartItem) => value.id === id)?.quantity === 0
    ) {
      let isNew = cart.find((value: CartItem) => value.id === id);
      if (isNew !== undefined) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        );
      } else {
        setCart((prevCart) => [
          ...prevCart,
          {
            title: title,
            price: price,
            image: image,
            category: category,
            quantity: 1,
            id: id,
          },
        ]);
      }
    }
  };
  const onClickMinus = () => {
    let isNew = cart.find((value: CartItem) => value.id === id);
    if (isNew !== undefined) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          title: title,
          price: price,
          image: image,
          category: category,
          quantity: 1,
          id: id,
        },
      ]);
    }
  };

  const onClickPlus = () => {
    let isNew = cart.find((value: CartItem) => value.id === id);
    if (isNew !== undefined) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          title: title,
          price: price,
          image: image,
          category: category,
          quantity: 1,
          id: id,
        },
      ]);
    }
  };
  // console.log(cart)
  // console.log(cart.find((value: CartItem) => value.id === id)?.quantity);
  // console.log(cart);

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-title">{title}</h3>
        <div className="product-bottom">
          <span className="product-price">${price}</span>
          <div className="add-to-cart-btn" onClick={onClick}>
            {cart.find((value: CartItem) => value.id === id)?.quantity ===
              undefined ||
            cart.find((value: CartItem) => value.id === id)?.quantity === 0 ? (
              "В корзину"
            ) : (
              <div className="cool-Button">
                <div className="minus" onClick={onClickMinus}>
                  -
                </div>
                <div>
                  {cart.find((value: CartItem) => value.id === id)?.quantity}
                </div>
                <div className="plus" onClick={onClickPlus}>
                  +
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
