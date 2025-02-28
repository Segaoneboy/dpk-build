import { validationResult } from "@/types/validationResult";
import axios from "axios";
import { setCookie } from "cookies-next";

const API_URL = "http://89.46.33.136:3000/auth/login";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function checkAuthData(email: string, password: string): Promise<validationResult> {
    if (!email && !password) {
        return { success: false, message: "Введите логин и пароль" };
    }
    if (!email) {
        return { success: false, message: "Введите логин" };
    }
    if (!emailRegex.test(email)) {
        return { success: false, message: "Некорректный email" };
    }
    if (!password) {
        return { success: false, message: "Введите пароль" };
    }

    try {
        const response = await axios.get(`${API_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {});

        if (response.status === 200 && response.data) {
            const { role, name, surname, patronymic } = response.data;
            setCookie("email", email, { maxAge: 600 });
            setCookie("password", password, { maxAge: 600 });
            setCookie("role", role, { maxAge: 600 });
            setCookie("name", name, { maxAge: 600 });
            setCookie("surname", surname, { maxAge: 600 });
            setCookie("patronymic", patronymic, { maxAge: 600 });

            return { success: true };
        } else {
            return { success: false, message: "Ошибка сервера" };
        }
    } catch (error) {
        return { success: false, message: "Ошибка авторизации" };
    }
}
