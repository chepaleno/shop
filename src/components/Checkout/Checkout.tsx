import { type Dispatch, type SetStateAction } from "react";
import "./Checkout.css";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckOutFromData } from "../../validation";
import { useMutation } from "@tanstack/react-query";
interface CheckOutInterface {
  finalPrice: string;
  setIsOpenCheckout: Dispatch<SetStateAction<boolean>>;
}

const Checkout = (props: CheckOutInterface) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });
  const { setCart } = useShop();
  const { finalPrice, setIsOpenCheckout } = props;

  const onSubmit = async (formData: CheckOutFromData) => {
    const payload = {
      name: formData.name,
      phone: formData.phone,
      total: finalPrice,
    };
    console.log("Отправка на сервер:", payload);

    mutate(payload);
  };

  const sendOrder = async (formData: CheckOutFromData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { success: true, orderId: Date.now() };
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: sendOrder,
    onSuccess: () => {},
  });

  const navigate = useNavigate();
  const onClick = () => {
    setIsOpenCheckout(false);
  };

  return isSuccess ? (
    <div className="container isVisible">
      <div className="checkDiv">
        <h2 className="h2">Успешно! 🎉</h2>
        <p>
          Заказ на сумму <strong>{finalPrice}$</strong> оформлен.
        </p>
        <p>Ваш заказ уже собирают на складе.</p>

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
          <input type="text" className="input-checkout" {...register("name")} />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </div>
        <div className="telephone-checkout">
          Телефон:
          <input
            type="text"
            className="input-checkout"
            {...register("phone")}
          />
          {errors.phone && (
            <span style={{ color: "red" }}>{errors.phone.message}</span>
          )}
        </div>
        <span className="autor">made by: Микро Ивашка</span>
        <div
          className={`PayButton ${isPending ? "disabled" : ""}`}
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? `Пожалуйста подождите` : `Оплатить ${finalPrice} $`}
        </div>
        <div onClick={onClick} className="close-button">
          Закрыть
        </div>
      </div>
    </div>
  );
};

export default Checkout;
