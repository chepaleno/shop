import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { CartItem } from "../../types";

interface ProductContext {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
}

export const ShopContext = createContext<ProductContext | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("Ошибка: useShop используется вне ShopProvider!");
  }

  return context;
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  // const initional = JSON.parse<CartItem[]>(localStorage.getItem('shopSave')) || undefined
  // useEffect(() => {
  //   console.log(cart);
  //   localStorage.getItem("shopSave");
  // }, []);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("shopSave");
      
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Ошибка чтения корзины");

      return [];
    }
  });

  const value: ProductContext = {
    cart,
    setCart,
  };

  useEffect(() => {
    // console.log(cart);
    localStorage.setItem("shopSave", JSON.stringify(cart));
  }, [cart]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
