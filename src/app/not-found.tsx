"use client"; 

import { useEffect, useState } from "react";

export default function NotFound() {
  const [show, setShow] = useState(false); 
  const [rotate, setRotate] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
      setTimeout(() => setRotate(false), 1000); 
    }, 100);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className={`flex items-center space-x-6 transition-opacity duration-700 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative">
          <div
            className={`w-20 h-20 rounded-full bg-red-600 flex justify-center items-center ${
              rotate ? "animate-spin-slow" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={2}
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="white"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

      
        <div>
          <h1 className="text-4xl font-bold text-gray-800">404</h1>
          <p className="text-lg text-gray-600">Страница не найдена</p>
        </div>
      </div>

      
      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
