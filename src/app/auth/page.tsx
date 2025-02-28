"use client"
import { motion } from "framer-motion";
import LoginForm from "@/components/LoginForm";

export default function AuthPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="p-10 w-96">
                <motion.div
                    initial={{opacity: 0, x: 50}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: -50}}
                    transition={{duration: 0.3}}
                    className=''
                >
                    <LoginForm/>
                </motion.div>


            </div>
        </div>
    );
}