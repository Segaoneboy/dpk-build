import { validationResult } from "@/types/validationResult";
import axios from "axios";

export default async function checkEventData(
    email: string,
    password: string,
    name: string,
    description: string,
    address: string,
    latitude: number,
    longitude: number
): Promise<validationResult> {
    if (!name || !description || !address) {
        return { success: false, message: "Заполните все поля" };
    }
    if (!name) {
        return { success: false, message: "Введите назначеного пользователя" };
    }
    if (!description) {
        return { success: false, message: "Введите описание" };
    }
    if (!address) {
        return { success: false, message: "Введите адрес" };
    }

    try {
        // Создаем объект с данными для отправки
        const data = {
            email,
            password,
            address,
            latitude: String(latitude),
            longitude: String(longitude),
            description,
            instructorEmail: name,
        };

        // Отправляем POST запрос с данными
        const response = await axios.post("http://89.46.33.136:3000/report/create", data);

        // Проверяем статус и данные ответа
        if (response.status === 201) {
            return { success: true };
        } else {
            console.log(response);
            return { success: false, message: "Ошибка сервера" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Ошибка создания задания" };
    }
}
