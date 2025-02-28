"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "@/components/EventCard";
import EventForm from "@/components/forms/EventForm";
import RegisterForm from "@/components/RegisterForm";
import { FaCalendarAlt, FaPlus, FaUser, FaMap } from "react-icons/fa";
import MapComponent from "@/components/MapComponent";

const DashBoard = () => {
    const [activeTab, setActiveTab] = useState("events");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://89.46.33.136:3000/report/getall");
                setEvents(response.data);
            } catch (err) {
                setError("Ошибка загрузки данных");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="flex flex-col w-full gap-6 mt-6 px-4 md:px-8 mb-8">
            <div className="flex justify-center gap-3 sm:gap-6">
                <button
                    onClick={() => setActiveTab("events")}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg font-semibold transition-all ${
                        activeTab === "events" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    <FaCalendarAlt /> Мероприятия
                </button>
                <button
                    onClick={() => setActiveTab("form")}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg font-semibold transition-all ${
                        activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    <FaPlus /> Форма
                </button>
                <button
                    onClick={() => setActiveTab("register")}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg font-semibold transition-all ${
                        activeTab === "register" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    <FaUser /> Регистрация
                </button>
                <button
                    onClick={() => setActiveTab("socialCard")}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-base sm:text-lg font-semibold transition-all ${
                        activeTab === "socialCard" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    <FaMap /> Социальная карта
                </button>
            </div>

            <div className="flex flex-col items-center w-full mt-6">
                {activeTab === "events" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1270px]">
                        {loading ? (
                            <p>Загрузка...</p>
                        ) : error ? (
                            <p className="text-red-600">{error}</p>
                        ) : events.length > 0 ? (
                            events.map((event, index) => (
                                <div key={index} className="w-full sm:min-w-[250px] sm:max-w-[300px]">
                                    <EventCard
                                        instructorEmail={event.instructorEmail}
                                        description={event.description}
                                        address={event.address}
                                        date={event.updatedAt || event.createdAt}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>Нет мероприятий</p>
                        )}
                    </div>
                ) : activeTab === "form" ? (
                    <div className="w-full sm:w-[400px]">
                        <EventForm />
                    </div>
                ) : activeTab === "register" ? (
                    <div className="w-full sm:w-[400px]">
                        <RegisterForm />
                    </div>
                ) : (
                    <div className="w-full sm:w-[400px] text-center p-4 border rounded-lg shadow">
                        <MapComponent/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashBoard;
