import { useRouter } from "next/navigation";
import {Suspense} from "react";

const EventCard = ({id, instructorEmail, description, address, createdAt }) => {
    const router = useRouter();

    const handleNavigate = () => {
        const query = new URLSearchParams({
            id: id || "",
            instructorEmail: instructorEmail || "",
            description: description || "",
            address: address || "",
            createdAt: createdAt || "",
        }).toString();

        router.push(`/events?${query}`);
    };

    return (
        <Suspense fallback={<div>Загрузка деталей события...</div>}>
            <div className="w-full sm:w-[48%] md:w-[400px] bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold">{instructorEmail || "Неизвестный организатор"}</h2>
                <p className="text-sm text-gray-600">Дата: {createdAt || "Дата не указана"}</p>
                <p className="text-lg mt-3">{description || "Описание отсутствует"}</p>
                <p className="text-sm text-gray-600">Место: {address || "Адрес не указан"}</p>

                <button
                    onClick={handleNavigate}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                    Перейти
                </button>
            </div>
        </Suspense>
    );
};
export default EventCard;