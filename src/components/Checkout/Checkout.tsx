import { useState } from "react";
import "./Checkout.css";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
// import { useShop } from "../context/ShopContext";
interface CheckOutInterface {
  finalPrice: string;
}

const Checkout = (props: CheckOutInterface) => {
  const { setCart } = useShop();
  const { finalPrice } = props;
  //   console.log(typeof finalPrice);

  const onClick = () => {
    if (!isValid || loading) return;
    setIsLoading(true);
    const payload = {
      name: nameInput,
      phone: telephoneInput,
      total: finalPrice,
    };
    console.log("Отправка на сервер:", payload);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [telephoneInput, setTelephoneInput] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
//   console.log(nameInput);
//   console.log(telephoneInput);
  const isValid =
    nameInput.trim().length > 0 && telephoneInput.trim().length > 0;
  return isSuccess ? (
    <div className="container isVisible">
      <div className="checkDiv">
        <h2 className="h2">Успешно! 🎉</h2>
        <p>
          Заказ на сумму <strong>{finalPrice}$</strong> оформлен.
        </p>
        <p>Ваш заказ уже собирают на складе.</p>

        {/* Кнопка, которая закрывает модалку и очищает корзину */}
        <div
          className="PayButton"
          onClick={() => {
            setCart([]); 
            navigate("/")
          }}
        >
          Вернуться в каталог
        </div>
      </div>
    </div>
  ) : (
    <div className="container isVisible">
      <div className="checkDiv">
        <h2 className="h2">Пожалуйста введите данные</h2>
        <div className="name-checkout">
          Имя:
          <input
            type="text"
            className="input-checkout"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div className="telephone-checkout">
          Телефон:
          <input
            type="text"
            className="input-checkout"
            value={telephoneInput}
            onChange={(e) => setTelephoneInput(e.target.value)}
          />
        </div>
        <span className="autor">made by: Микро Ивашка</span>
        <div
          //   className={` PayButton ${isValid ? "" : "disabled"}`}
          className={`PayButton ${!isValid || loading ? "disabled" : ""}`}
          onClick={onClick}
        >
          {loading ? `Пожалуйста подождите` : `Оплатить ${finalPrice} $`}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
