"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VisitForm() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [officerName] = useState("Иванов Иван Иванович");

  const [formData, setFormData] = useState({
    address: "",
    family: "",
    category: "",
    traineeName: "",
  });

  const [errors, setErrors] = useState({
    address: "",
    family: "",
    category: "",
    traineeName: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.address.trim()) newErrors.address = "Введите адрес объекта";
    if (!formData.family.trim()) newErrors.family = "Введите состав семьи";
    if (!formData.category.trim()) newErrors.category = "Выберите категорию";
    if (!formData.traineeName.trim()) newErrors.traineeName = "Введите Ф.И.О инструктируемого";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("/api/visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          ...formData,
          officerName,
        }),
      });

      if (!response.ok) throw new Error("Ошибка при отправке данных");

      console.log("Форма успешно отправлена");
      router.push("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Форма посещения
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Дата посещения
          </label>
          <input
            type="date"
            value={date}
            readOnly
            className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Адрес объекта
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Введите адрес"
            className={`w-full border p-2 rounded-lg ${errors.address ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Состав семьи (из них дети)
          </label>
          <input
            type="text"
            name="family"
            value={formData.family}
            onChange={handleChange}
            placeholder="Например: 5 (из них 2 детей)"
            className={`w-full border p-2 rounded-lg ${errors.family ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.family && <p className="text-red-500 text-sm">{errors.family}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Категория граждан
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full border p-2 rounded-lg ${errors.category ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Выберите категорию</option>
            <option value="многодетные">Многодетная семья</option>
            <option value="малоимущие">Малоимущая семья</option>
            <option value="пенсионеры">Пенсионеры</option>
            <option value="инвалиды">Инвалиды</option>
            <option value="одинокие">Одиноко проживающие</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ф.И.О инструктируемого
          </label>
          <input
            type="text"
            name="traineeName"
            value={formData.traineeName}
            onChange={handleChange}
            placeholder="Введите Ф.И.О"
            className={`w-full border p-2 rounded-lg ${errors.traineeName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.traineeName && <p className="text-red-500 text-sm">{errors.traineeName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ф.И.О должностного лица
          </label>
          <input
            type="text"
            value={officerName}
            readOnly
            className="w-full border border-gray-300 p-2 rounded-lg bg-gray-100 text-gray-800"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-lg"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}
