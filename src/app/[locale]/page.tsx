"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { prefixBasePath } from '@/shared/utils/path';


export default function HomePage() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("homePage");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleGetStarted = () => {
        if (isLoggedIn) {
            router.push(`/${locale}/dashboard`);
        } else {
            router.push(`/${locale}/login`);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
            <div className="flex flex-col items-center text-center">
                <Image
                    src={prefixBasePath("/logo.png")}
                    alt="Logo Image"
                    width={100}
                    height={100}
                    priority
                    className="rounded-xl shadow-md mb-6"
                />
                <div className="max-w-[739px] mb-2">
                    <p className="text-3xl font-bold text-black w-full">
                        {t("welcome")}
                    </p>
                </div>

                <div className="max-w-[600px] mb-4">
                    <p className="text-lg text-black w-full text-center leading-relaxed">
                        {t("description")}
                    </p>
                </div>
            </div>

            <button
                onClick={handleGetStarted}
                className="w-[200px] h-[40px] bg-black text-white text-xl font-semibold rounded-md shadow 
                   transition hover:bg-gray-950 flex items-center justify-center cursor-pointer"
            >
                {t("getStarted")}
            </button>
        </main>
    );
}
