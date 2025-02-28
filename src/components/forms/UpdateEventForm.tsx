"use client";

import { useState } from "react";
import checkEventData from "@/utils/checkEventData";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapAdress = dynamic(() => import("@/components/MapAdress"), { ssr: false });

export default function UpdateEventForm({ onCreateEvent }) {
    const [eventData, setEventData] = useState({ name: "", description: "", address: "" });
    const [error, setError] = useState<string | false>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLocationSelect = (address: string) => {
        setEventData((prev) => ({ ...prev, address }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = checkEventData(eventData.name, eventData.description);

        if (result.success) {
            setError(false);
            onCreateEvent?.({
                name: eventData.name,
                details: eventData.description,
                address: eventData.address,
            });
        } else {
            setError(result.message as string);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 m-4 bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Редактировать мероприятие</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Название мероприятия</label>
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
                    <MapAdress onLocationSelect={handleLocationSelect} />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-lg"
                >
                    Сохранить изменения
                </button>

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    );
}
