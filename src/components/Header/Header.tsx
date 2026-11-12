import { Link } from "react-router-dom";
import "./Header.css";
import { useShop } from "../context/ShopContext";

const Header = () => {
  const { cart } = useShop();
  let arr = cart.map((value) => value.quantity);
  let fin = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  // console.log(cart);
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🛒 MyStore
        </Link>

        <nav className="nav-links">
          <Link to="/">Каталог</Link>
          <Link to="/cart">Корзина ({fin})</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
