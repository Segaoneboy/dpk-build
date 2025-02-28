"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import checkUpdateReport from "@/utils/checkUpdateReport";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [id, setId] = useState("");
  const [instructorEmail, setInstructorEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [purpose_member, setPurpose_member] = useState("");
  const [members, setMembers] = useState("");
  const [typeof_members, setTypeof_members] = useState("");

  useEffect(() => {
    if (searchParams) {
      setId(searchParams.get("id") || "");
      setInstructorEmail(searchParams.get("instructorEmail") || "");
      setDescription(searchParams.get("description") || "");
      setAddress(searchParams.get("address") || "");
      setCreatedAt(searchParams.get("createdAt") || "Неизвестная дата");
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    const email = instructorEmail;
    const password = getCookie("password");

    const result = await checkUpdateReport(
        email,
        password,
        id,
        address,
        purpose_member,
        members,
        typeof_members,
        true
    );

    if (result.success) {
      alert("Данные успешно отправлены!");
      router.push("/");
    } else {
      alert("Ошибка при отправке данных.");
    }
  };

  return (
      <Suspense fallback={<div>Загрузка деталей события...</div>}>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Детали события</h1>
          <form className="space-y-5">
            <input type="hidden" value={id} />
            <div>
              <label className="block text-sm font-medium text-gray-700">Ф.И.О организатора</label>
              <input
                  type="text"
                  value={instructorEmail}
                  onChange={(e) => setInstructorEmail(e.target.value)}
                  className="w-full border p-2 rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Дата создания</label>
              <input
                  type="text"
                  value={createdAt}
                  readOnly
                  className="w-full border p-2 rounded-lg border-gray-300 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Описание</label>
              <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-2 rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Адрес</label>
              <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border p-2 rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ф.И.О инструктируемого</label>
              <input
                  type="text"
                  value={purpose_member}
                  onChange={(e) => setPurpose_member(e.target.value)}
                  className="w-full border p-2 rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Состав семьи</label>
              <input
                  type="text"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  className="w-full border p-2 rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Категория граждан</label>
              <select
                  value={typeof_members}
                  onChange={(e) => setTypeof_members(e.target.value)}
                  className="w-full border p-2 rounded-lg border-gray-300"
              >
                <option value="">Выберите категорию</option>
                <option value="многодетные">Многодетная семья</option>
                <option value="малоимущие">Малоимущая семья</option>
                <option value="пенсионеры">Пенсионеры</option>
                <option value="инвалиды">Инвалиды</option>
                <option value="одинокопроживающие">Одиноко проживающие</option>
              </select>
            </div>
            <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Отправить
            </button>
          </form>
        </div>
      </Suspense>
  );
}