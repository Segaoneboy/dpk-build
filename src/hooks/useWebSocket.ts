import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Установи: npm install uuid

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  name: string;
}

export const useWebSocket = (wsUrl: string) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log("✅ WebSocket подключен");

    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        console.log("📩 WebSocket данные:", response);

        if (!Array.isArray(response.msg)) {
          console.error("❌ WebSocket прислал не массив:", response);
          return;
        }

        const newMarkers = response.msg.map((item: any) => ({
          id: uuidv4(), // Генерация уникального ID
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
          name: item.address,
        }));

        setMarkers((prevMarkers) => {
          // Фильтруем, чтобы не дублировать одни и те же координаты
          const uniqueMarkers = [...prevMarkers, ...newMarkers].reduce<MarkerData[]>((acc, marker) => {
            if (!acc.find((m) => m.lat === marker.lat && m.lng === marker.lng)) {
              acc.push(marker);
            }
            return acc;
          }, []);
          return uniqueMarkers;
        });
      } catch (error) {
        console.error("❌ Ошибка обработки WebSocket:", error);
      }
    };

    ws.onclose = () => console.log("❌ WebSocket отключен");

    return () => ws.close();
  }, [wsUrl]);

  return { markers };
};