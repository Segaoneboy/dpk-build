import axios from "axios";
import type { validationResult } from "@/types/validationResult";

export default async function checkRegData(
    name: string,
    surname: string,
    patronymic: string,
    role: string,
    phone: string,
    email: string,
    password: string
): Promise<validationResult> {
  if (!name || !surname || !patronymic || !phone || !email || !password) {
    return { success: false, message: "Заполните все поля" };
  }
  if (!name) return { success: false, message: "Введите имя" };
  if (!surname) return { success: false, message: "Введите фамилию" };
  if (!patronymic) return { success: false, message: "Введите отчество" };
  if (!phone) return { success: false, message: "Введите номер телефона" };
  if (!email) return { success: false, message: "Введите email" };
  if (!password) return { success: false, message: "Введите пароль" };

  const payload = { email,password, role, name, surname, patronymic, phone};

  try {
    const response = await axios.post("http://89.46.33.136:3000/auth/create", payload);
    if(response.status === 201) return { success: true };
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return { success: false, message: `Ошибка при регистрации. Попробуйте снова. ${error} ` };
  }
}
