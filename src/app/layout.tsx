import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "DPK",
  description: "Домашний пожарный контроль",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
