"use client";

import { useState } from "react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        phone: "",
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Данные формы регистрации:", formData);
    };

    return (
        <div className="w-[600px] md:ml-[-100px] p-6 bg-white rounded-lg shadow-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Регистрация</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Фамилия</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Введите фамилию"
                        className="w-full border p-2 rounded-lg border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Имя</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Введите имя"
                        className="w-full border p-2 rounded-lg border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Номер телефона</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full border p-2 rounded-lg border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                        className="w-full border p-2 rounded-lg border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Пароль</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                        className="w-full border p-2 rounded-lg border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Роль</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg border-gray-300"
                    >
                        <option value="user">Пользователь</option>
                        <option value="admin">Администратор</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-lg"
                >
                    Зарегистрировать
                </button>
            </form>

            <style jsx>{`
                @media (max-width: 768px) {
                    .w-\[600px\] {
                        width: 90%;
                        margin-left: 5%;
                    }
                }
            `}</style>
        </div>
    );
};

export default RegisterForm;