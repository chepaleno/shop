import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Имя должно быть не короче 2 символов"),
//   email: z.string().email("Введите корректный email"),
//   addres: z.string().min(10, "Введите корректный адрес"),
  phone: z.string().min(10, "Введите номер телефона"),
});

export type CheckOutFromData = z.infer<typeof checkoutSchema>;
