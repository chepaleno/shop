import { useState, type Dispatch, type SetStateAction } from "react";
import "./Checkout.css";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckOutFromData } from "../../validation";
// import { useShop } from "../context/ShopContext";
interface CheckOutInterface {
  finalPrice: string;
  setIsOpenCheckout: Dispatch<SetStateAction<boolean>>;
}

const Checkout = (props: CheckOutInterface) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });
  const { setCart } = useShop();
  const { finalPrice, setIsOpenCheckout } = props;
  //   console.log(typeof finalPrice);

  const onSubmit = async (data: CheckOutFromData) => {
    if (isSubmitting) return;
    // setIsLoading(true);
    const payload = {
      name: data.name,
      phone: data.phone,
      total: finalPrice,
    };
    console.log("Отправка на сервер:", payload);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("qwe");
    setIsSuccess(true);
    // setCart([]);
  };

  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const onClick = () => {
    setIsOpenCheckout(false);
  };
  // const [nameInput, setNameInput] = useState<string>("");
  // const [telephoneInput, setTelephoneInput] = useState<string>("");
  // const [loading, setIsLoading] = useState<boolean>(false);
  //   console.log(nameInput);
  //   console.log(telephoneInput);
  // const isValid =
  // nameInput.trim().length > 0 && telephoneInput.trim().length > 0;
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
            navigate("/");
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
            // value={nameInput}
            // onChange={(e) => setNameInput(e.target.value)}
            {...register("name")}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>
        <div className="telephone-checkout">
          Телефон:
          <input
            type="text"
            className="input-checkout"
            // value={telephoneInput}
            // onChange={(e) => setTelephoneInput(e.target.value)}
            {...register("phone")}
          />
          {errors.phone && (
            <span style={{ color: "red" }}>{errors.phone.message}</span>
          )}
        </div>
        <span className="autor">made by: Микро Ивашка</span>
        <div
          //   className={` PayButton ${isValid ? "" : "disabled"}`}
          className={`PayButton ${isSubmitting ? "disabled" : ""}`}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? `Пожалуйста подождите` : `Оплатить ${finalPrice} $`}
        </div>
        <div onClick={onClick} className="close-button">
          Закрыть
        </div>
      </div>
    </div>
  );
};

export default Checkout;
