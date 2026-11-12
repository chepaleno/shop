import type { CartItem } from "../../types";
import { useShop } from "../context/ShopContext";
import "./CartCard.css";
// import type { CartItem } from "../../types";

interface CartProps {
  title: string;
  price: number;
  image: string;
  category: string;
  id: number;
  quantity: number;
}

const CartCard = (props: CartProps) => {
  const {
    cart,
    setCart
  } = useShop();
  const { title, price, image, category, quantity, id } = props;

  // const onClick = () => {
  //   let isNew = cart.find((value: CartItem) => value.id === id);
  //   if (isNew !== undefined) {
  //     setCart((prevCart) =>
  //       prevCart.map((item) =>
  //         item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
  //       ),
  //     );
  //   } else {
  //     setCart((prevCart) => [
  //       ...prevCart,
  //       {
  //         title: title,
  //         price: price,
  //         image: image,
  //         category: category,
  //         quantity: 1,
  //         id: id,
  //       },
  //     ]);
  //   }
  // };

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

  // console.log(cart);

  return quantity > 0 ? (
    <div className="cart-card">
      <div className="cart-image-wrapper">
        <img src={image} alt={title} className="cart-image" />
      </div>
      <div className="cart-info">
        <span className="cart-category">{category}</span>
        <h3 className="cart-title">{title}</h3>
        <div className="cart-bottom">
          <span className="cart-price">${price}</span>
          <div className="add-to-cart-in-cart-btn">
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
  ) : null;
};

export default CartCard;
