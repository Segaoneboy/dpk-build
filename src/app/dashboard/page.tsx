"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import EventCard from "@/components/EventCard";
import EventForm from "@/components/forms/EventForm";
import RegisterForm from "@/components/RegisterForm";
import { FaCalendarAlt, FaPlus, FaUser, FaMap, FaFileExcel } from "react-icons/fa";
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

    const handleExportToExcel = async () => {
        try {
            const email = Cookies.get("email");
            const password = Cookies.get("password");

            if (!email || !password) {
                throw new Error("Ошибка: отсутствуют email или password в куках");
            }

            const response = await axios.post("http://89.46.33.136:3000/report/getxlsx", {
                email,
                password
            },
                { responseType: "blob" }
                );

            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "report.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                throw new Error("Ошибка сервера");
            }
        } catch (error) {
            console.error("Ошибка при выгрузке в Excel", error);
        }
    };

    return (
        <div className="flex flex-col w-full gap-6 mt-6 px-4 md:px-8 mb-8">
            {/* Блок переключения вкладок */}
            <div className="grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-6">
                <button
                    onClick={() => setActiveTab("events")}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-lg font-semibold transition-all ${
                        activeTab === "events" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    <FaCalendarAlt /> Мероприятия
                </button>
                <button
                    onClick={() => setActiveTab("form")}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-lg font-semibold transition-all ${
                        activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    <FaPlus /> Форма
                </button>
                <button
                    onClick={() => setActiveTab("register")}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-lg font-semibold transition-all ${
                        activeTab === "register" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    <FaUser /> Регистрация
                </button>
                <button
                    onClick={() => setActiveTab("socialCard")}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-lg font-semibold transition-all ${
                        activeTab === "socialCard" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    <FaMap /> Социальная карта
                </button>
            </div>

            {/* Контентная часть */}
            <div className="flex flex-col items-center w-full mt-6">
                {activeTab === "events" ? (
                    <>
                        <button
                            onClick={handleExportToExcel}
                            className="flex items-center gap-2 px-4 py-2 mb-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                        >
                            <FaFileExcel /> Выгрузка в Excel
                        </button>
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
                    </>
                ) : activeTab === "form" ? (
                    <div className="w-full sm:w-[400px]">
                        <EventForm />
                    </div>
                ) : activeTab === "register" ? (
                    <div className="w-full sm:w-[400px]">
                        <RegisterForm />
                    </div>
                ) : (
                    <div className="w-full sm:w-[600px] p-4 border rounded-lg shadow">
                        <MapComponent />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashBoard;