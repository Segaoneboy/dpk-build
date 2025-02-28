"use client";

import { useState } from "react";
import checkEventData from "@/utils/checkEventData";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
const MapAdress = dynamic(() => import("@/components/MapAdress"), { ssr: false });

export default function UpdateEventForm() {
  const [eventData, setEventData] = useState({ name: "", description: "", address: "" });
  const [error, setError] = useState<string | false>(false);
  const email = getCookie("email") || "";
  const password = getCookie("password") || "";
  const [coordinates, setCoordinates] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (address: string, lat: number, lng: number) => {
    setEventData((prev) => ({ ...prev, address }));
    setCoordinates({ latitude: lat, longitude: lng });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await checkEventData( email, password, eventData.name, eventData.description, eventData.address, coordinates.latitude, coordinates.longitude);

    if (result.success) {
      setError("Форма успешно создана");
    } else {
      setError(result.message as string);
    }
  };

  return (
      <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg mt-10 w-full md:w-[600px] mx-auto md:ml-[-60px]">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Создать задание</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Кому назначено</label>
            <input
                type="text"
                name="name"
                placeholder="Введите название"
                className="w-full border p-2 rounded-lg border-gray-300"
                value={eventData.name}
                onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Описание</label>
            <textarea
                name="description"
                placeholder="Введите описание"
                className="w-full border p-2 rounded-lg border-gray-300"
                value={eventData.description}
                rows={6}
                onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Адрес</label>
            <input
                type="text"
                name="address"
                placeholder="Введите адрес"
                className="w-full border p-2 rounded-lg border-gray-300"
                value={eventData.address}
                onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Выберите местоположение</label>
            <div className="w-full h-[270px]">
              <MapAdress onLocationSelect={handleLocationSelect} />
            </div>
          </div>

          <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-lg mt-2"
          >
            Создать задание
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <style jsx>{`
        @media (max-width: 768px) {
          .max-w-2xl {
            width: 90%;
            margin-left: 5%;
            margin-right: 0;
          }
          .md\:ml-[-60px] {
            margin-left: 0;
          }
        }
      `}</style>
      </div>
  );
}
