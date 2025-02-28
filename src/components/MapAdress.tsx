"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const L = typeof window !== "undefined" ? require("leaflet") : null;

interface MapAddressProps {
    onLocationSelect: (address: string) => void;
}

export default function MapAddress({ onLocationSelect }: MapAddressProps) {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState(false);
    const [markerIcon, setMarkerIcon] = useState<any>(null);

    // Координаты центра карты (Петропавловск, Казахстан)
    const defaultCenter: [number, number] = [54.8738, 69.1408];

    useEffect(() => {
        if (L) {
            setMarkerIcon(
                L.icon({
                    iconUrl: "/marker-icon.png",
                    iconSize: [25, 41],
                })
            );
        }
    }, []);

    const fetchAddress = async (lat: number, lon: number) => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ru`
            );
            const data = await res.json();
            if (data.display_name) {
                onLocationSelect(data.display_name);
            } else {
                onLocationSelect("Адрес не найден");
            }
        } catch (error) {
            console.error("Ошибка при получении адреса:", error);
            onLocationSelect("Ошибка получения адреса");
        } finally {
            setLoading(false);
        }
    };

    function MapClickHandler() {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                fetchAddress(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    }

    return (
        <div className="w-full h-64 relative">
            <MapContainer center={defaultCenter} zoom={13} className="w-full h-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position && markerIcon && <Marker position={position} icon={markerIcon} />}
                <MapClickHandler />
            </MapContainer>
            {loading && <p className="absolute top-2 left-2 bg-white p-2 rounded-md shadow-md">Загрузка...</p>}
        </div>
    );
}
