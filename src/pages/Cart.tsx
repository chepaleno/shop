import { useShop } from "../components/context/ShopContext";
import CartCard from "../components/CartCard/CartCard";
import "./Cart.css";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout/Checkout";
import { useState } from "react";

const Cart = () => {
  const { cart } = useShop();
  // console.log(cart);
  const [isOpenCheckout, setIsOpenCheckout] = useState<boolean>(false);
  const buyButton = () => {
    // setCart([]);
    setIsOpenCheckout(true);
  };
  let arr = cart.map((value) => value.quantity);
  let fin = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  let normalArr = cart.filter((value) =>
    value.quantity > 0 ? value.image : null,
  );
  // console.log(fin);

  let arrOfPhotos = normalArr.slice(0, 5);
  // console.log(cart.slice(0,5));
  const arrOfPrice = cart.map((value) => value.price * value.quantity);
  const finalPrice = arrOfPrice
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toFixed(2);

  return fin !== 0 ? (
    <div className="cart-container">
      <h1 className="cart-title">Ваша корзина</h1>
      <div className="main-container">
        <div className="products-grid-cart">
          {cart.map((product) => (
            <CartCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              image={product.image}
              id={product.id}
              quantity={product.quantity}
            />
          ))}
        </div>
        <div className="pay-menu">
          <div className="sum-of-products">Товаров в заказе: {fin}</div>
          <div className="photo-of-products">
            {arrOfPhotos.map((product) =>
              product.quantity > 0 ? (
                <img
                  src={product.image}
                  key={product.id}
                  className="mini-photo-of-products"
                />
              ) : null,
            )}
          </div>
          {/* <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="menuButton"
          > */}
            <div className="pay-button" onClick={buyButton}>
              <span className="buy-text">Купить</span>

              <span className="buy-text">{finalPrice}$</span>
            </div>
          {/* </a> */}
        </div>
      </div>
      {isOpenCheckout ? <Checkout finalPrice={finalPrice} /> : null}
    </div>
  ) : (
    <div className="close-menu">
      <div className="empty-cart-header">В корзине пока пусто</div>
      <div className="empty-cart-main">
        Загляните на главную — собрали там товары,
        <br /> которые могут вам понравиться
      </div>
      <Link to="/" className="link-empty-cart">
        <div
          className="empty-cart-button"
          // onClick={}
        >
          Перейти на главную
        </div>
      </Link>
    </div>
  );
};

export default Cart;
