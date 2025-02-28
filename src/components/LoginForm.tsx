"use client";
import React, { useState } from "react";
import checkAuthData from "@/utils/checkAuthData";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | false>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await checkAuthData(email, password);

    if (result.success) {
      setError(false);
      router.replace("/");
    } else {
      setError(result.message as string);
    }
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="w-[400px] bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Вход</h2>
          <form className="flex flex-col space-y-6 w-full items-center" onSubmit={handleSubmit}>
            <input
                className="w-[350px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:scale-105"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="w-[350px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:scale-105"
                type="password"
                placeholder="Пароль"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="w-[350px] bg-gradient-to-r from-blue-400 to-blue-700 text-white p-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-transform"
            >
              Войти
            </button>


          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
  );
}