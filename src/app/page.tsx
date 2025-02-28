"use client";

import { useState, useEffect, Suspense } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import EventCard from "@/components/EventCard";

export default function Page() {
    const router = useRouter();
    const [openInstruction, setOpenInstruction] = useState<number | null>(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                const email = getCookie("email");

                if (!email) {
                    setError("Не найден email в cookies");
                    router.push("/auth");
                }

                const API_URL = "http://89.46.33.136:3000/report/getByCrew";
                const response = await axios.get(`${API_URL}?instructorEmail=${encodeURIComponent(email)}`);

                setEvents(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || "Ошибка загрузки данных");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
                Мероприятия
            </h1>
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-screen-lg">
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : events.length > 0 ? (
                    events.map((event) => (
                        <EventCard
                            key={event.id}
                            id={event.id}  // Передаем id
                            instructorEmail={event.instructorEmail}
                            description={event.description}
                            address={event.address}
                            date={event.updatedAt}
                        />
                    ))
                ) : (
                    <p>Нет мероприятий</p>
                )}
            </div>
        </div>
    );
}
