import axios from "axios";
import {CookieValueTypes} from "cookies-next";


export default async function checkUpdateReport(email: string,
                                                password: string | undefined | Promise<CookieValueTypes>,
                                                id: string,
                                                address: string,
                                                purpose_member: string,
                                                members: string,
                                                typeof_members: string,
                                                completed: boolean) {
    if (!address || !purpose_member || !members || !typeof_members) {
        return {success: false, message: "Заполните все поля"};
    }
    if (!address) {
        return {success: false, message: "Введите адрес"};
    }
    if (!purpose_member) {
        return {success: false, message: "Введите Ф.И.О инструктируемого"};
    }
    if (!members) {
        return {success: false, message: "Введите количество людей "};
    }
    if (!typeof_members) {
        return {success: false, message: "Введите категорию граждан"};
    }
    try {
        const reportData = {
            email,
            password,
            id,
            address,
            purpose_member,
            members,
            typeof_members,
        }
        await axios.put("http://89.46.33.136:3000/report/update", reportData);
        return {success: true};
    } catch (error) {
        console.error("Ошибка запроса:", error);
        return {success: false, message: "Ошибка создания задания"};
    }
}