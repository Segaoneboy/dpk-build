"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useWebSocket } from "@/hooks/useWebSocket";

// Динамический импорт react-leaflet, отключая SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

import "leaflet/dist/leaflet.css";

export default function MapComponent() {
    const { markers } = useWebSocket("ws://89.46.33.136:3000/?type=marker&email=admin@dpk.kz");

    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [customIcon, setCustomIcon] = useState<any>(null);
    const [userIcon, setUserIcon] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("leaflet").then((L) => {
                setCustomIcon(
                    new L.Icon({
                        iconUrl: "/marker-icon.png",
                        iconSize: [30, 40],
                        iconAnchor: [15, 40],
                        popupAnchor: [0, -35],
                    })
                );

                setUserIcon(
                    new L.Icon({
                        iconUrl: "/user-marker.png",
                        iconSize: [35, 45],
                        iconAnchor: [17, 45],
                        popupAnchor: [0, -40],
                    })
                );
            });

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation([position.coords.latitude, position.coords.longitude]);
                    },
                    (error) => {
                        console.error("Ошибка получения геопозиции:", error);
                    }
                );
            }
        }
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 p-6 min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">🌍 Карта Петропавловска</h1>
            <div className="w-full max-w-5xl h-[600px] rounded-lg overflow-hidden shadow-lg">
                {typeof window !== "undefined" && customIcon && userIcon && (
                    <MapContainer
                        center={userLocation || [54.8721, 69.1148]}
                        zoom={12}
                        className="w-full h-full"
                        maxBounds={[
                            [54.75, 68.95],
                            [55.0, 69.35],
                        ]}
                        maxBoundsViscosity={0.5}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {/* Метки из WebSocket */}
                        {markers.map((marker) => (
                            <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={customIcon}>
                                <Popup>{marker.name}</Popup>
                            </Marker>
                        ))}

                        {/* Маркер пользователя */}
                        {userLocation && (
                            <Marker position={userLocation} icon={userIcon}>
                                <Popup>Вы здесь 📍</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                )}
            </div>
        </div>
    );
}
