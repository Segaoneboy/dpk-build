"use client"
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import {usePathname} from "next/navigation";

export default function Footer() {

  const pathname = usePathname()
  if(pathname === "/auth"){
    return null
  }

  return (
    <footer className="bg-[#1F3C88] text-white">
      {/* Основной контент футера */}
      <div className="py-10 px-[calc(16px+9px)] md:px-[calc(16px+18px)] lg:px-[calc(16px+259px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Колонка 1: Государственные ресурсы */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Государственные ресурсы</h3>
          <ul className="space-y-2">
            <li>
              <Link href="https://www.akorda.kz/ru" target="_blank" className="hover:text-gray-300">
                Сайт Президента РК
              </Link>
            </li>
            <li>
              <Link href="https://primeminister.kz/ru" target="_blank" className="hover:text-gray-300">
                Сайт Премьер-Министра РК
              </Link>
            </li>
            <li>
              <Link href="https://www.parlam.kz/ru" target="_blank" className="hover:text-gray-300">
                Сайт Парламента РК
              </Link>
            </li>
            <li>
              <Link href="https://www.gov.kz/article/128915?lang=ru" target="_blank" className="hover:text-gray-300">
                Гос. символы РК
              </Link>
            </li>
            <li>
              <Link href="https://www.akorda.kz/ru/addresses" target="_blank" className="hover:text-gray-300">
                Послания Президента РК
              </Link>
            </li>
            <li>
              <Link href="https://www.gov.kz/memleket/entities/mam/documents/details/474854" target="_blank" className="hover:text-gray-300">
                Нац. стандарт РК
              </Link>
            </li>
            <li>
              <Link href="https://ortcom.kz/ru/" target="_blank" className="hover:text-gray-300">
                Служба цент. комм.
              </Link>
            </li>
          </ul>
        </div>

        {/* Колонка 2: Полезные ссылки */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Полезные ссылки</h3>
          <ul className="space-y-2">
            <li>
              <Link href="https://www.gov.kz/article/41788?lang=ru" target="_blank" className="hover:text-gray-300">
                Жизненные ситуации
              </Link>
            </li>
            <li>
              <Link href="https://t.me/govkz_news" target="_blank" className="hover:text-gray-300">
                Новостной канал гос. органов
              </Link>
            </li>
            <li>
              <Link href="https://adilet.zan.kz/rus/docs/P2300000269" target="_blank" className="hover:text-gray-300">
                Цифровая трансформация
              </Link>
            </li>
            <li>
              <Link href="https://stat.gov.kz/ru/sustainable-development-goals/goal/" target="_blank" className="hover:text-gray-300">
                Цели устойчивого развития
              </Link>
            </li>
            <li>
              <Link href="https://www.gov.kz/article/terms" target="_blank" className="hover:text-gray-300">
                Термины и обозначения
              </Link>
            </li>
            <li>
              <Link href="https://screenreader.tilqazyna.kz/#download" target="_blank" className="hover:text-gray-300">
                Экранный диктор
              </Link>
            </li>
          </ul>
        </div>

        {/* Колонка 3: Подписка и соцсети */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Подписаться на обновления</h3>
          <input
            type="email"
            placeholder="Введите ваш email"
            className="w-full p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#083759]"
          />
          <button className="w-full mt-2 bg-[#083759] text-white p-2 rounded hover:bg-[#072c42] transition">
            Подписаться
          </button>

          <h3 className="text-lg font-semibold mt-6 mb-4">Социальные сети</h3>
          <div className="flex space-x-4">
            <Link href="https://www.instagram.com/qaz.tjm/" target="_blank" aria-label="Instagram">
              <FaInstagram className="text-2xl hover:text-gray-300 transition" />
            </Link>
            <Link href="https://www.facebook.com/qrtjm" target="_blank" aria-label="Facebook">
              <FaFacebookF className="text-2xl hover:text-gray-300 transition" />
            </Link>
            <Link href="https://t.me/qr_tjm" target="_blank" aria-label="Telegram">
              <FaTelegramPlane className="text-2xl hover:text-gray-300 transition" />
            </Link>
            <Link href="https://www.youtube.com/@qrtjm" target="_blank" aria-label="YouTube">
              <FaYoutube className="text-2xl hover:text-gray-300 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="bg-[#1E3A5F] text-white py-4 text-sm">
        <div className="px-[calc(16px+9px)] md:px-[calc(16px+18px)] lg:px-[calc(16px+259px)]">
          <p className="text-center md:text-left">2025 © Все права защищены</p>
        </div>
      </div>
    </footer>
  );
}