"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTelegramPlane, FaYoutube, FaUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";

export default function Header() {
  const [lang, setLang] = useState("RU");
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const roleValue = getCookie("role");
    setRole(typeof roleValue === "string" ? roleValue : null);
  }, [pathname]);

  function handleLogout() {
    deleteCookie("email");
    deleteCookie("password");
    deleteCookie("role");
    deleteCookie("name");
    deleteCookie("surname");
    deleteCookie("patronymic");
    setRole(null);
    router.refresh();
    router.push("/");
  }

  if (pathname === "/auth") {
    return null;
  }

  return (
    <header className="w-full">
      {/* Верхний светло-синий хедер */}
      <div className="bg-[#083759] text-white flex justify-end items-center p-4 px-6 md:px-16 lg:px-[230px] space-x-4">
        {/* Кнопка смены языка */}
        <button
          className="ml-[10px] w-8 h-8 bg-[#072c42] text-white rounded-full flex items-center justify-center text-xs font-semibold hover:bg-[#061f2e] transition"
          onClick={() => setLang(lang === "RU" ? "KAZ" : "RU")}
        >
          {lang}
        </button>

        {/* Иконка пользователя и "Вход" */}
        <div className="ml-[10px] flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-2">
            <FaUser className="text-lg" />
            {role ? (
              role === "admin" ? (
                pathname === "/dashboard" ? (
                  <button onClick={handleLogout} className="underline hover:text-gray-300 transition">
                    Выход
                  </button>
                ) : (
                  <Link href="/dashboard" className="underline hover:text-gray-300 transition">
                    Админпанель
                  </Link>
                )
              ) : (
                <button onClick={handleLogout} className="underline hover:text-gray-300 transition">
                  Выход
                </button>
              )
            ) : (
              <Link href="/auth" className="underline hover:text-gray-300 transition">
                Вход
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Основной темно-синий хедер */}
      <div className="bg-[#1F3C88] text-white">
        <div className="flex justify-between items-center py-6 px-6 md:px-16 lg:px-[270px]">
          {/* Логотип и название */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Image
                src="/tjm.png"
                alt="Логотип"
                width={60}
                height={60}
                className="w-16 h-16 cursor-pointer"
              />
            </Link>
            <Link href="/" className="text-xl font-bold hover:text-gray-300 transition">
              <div>Домашний пожарный контроль</div>
              <div className="text-lg">Республики Казахстан</div>
            </Link>
          </div>

          {/* Соцсети */}
          <div className="flex space-x-4 text-xl">
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram className="hover:text-gray-300 transition" />
            </Link>
            <Link href="https://www.facebook.com/qrtjm" target="_blank">
              <FaFacebookF className="hover:text-gray-300 transition" />
            </Link>
            <Link href="https://t.me/qr_tjm" target="_blank">
              <FaTelegramPlane className="hover:text-gray-300 transition" />
            </Link>
            <Link href="https://www.youtube.com/channel/UC9Lk8S70ytRKyV2zahIHUSg" target="_blank">
              <FaYoutube className="hover:text-gray-300 transition" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}