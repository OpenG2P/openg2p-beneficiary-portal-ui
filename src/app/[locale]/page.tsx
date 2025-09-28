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
        <main
            className="relative min-h-screen w-full overflow-hidden"
            style={{
                background: 'linear-gradient(114.12deg, #000000 0%, #202020 70.19%, #939292 100%)'
            }}
        >
            <div className="absolute inset-0">
                <div className="absolute top-[320px] left-[557px]">
                    <Image
                        src={prefixBasePath("/top_left.png")}
                        alt="Decoration"
                        width={185}
                        height={156}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="absolute top-[507px] left-[772px]">
                    <Image
                        src={prefixBasePath("/bottom_mid.png")}
                        alt="Decoration"
                        width={135}
                        height={145}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="absolute top-[520px] left-[457px]">
                    <Image
                        src={prefixBasePath("/bottom_left.png")}
                        alt="Decoration"
                        width={275}
                        height={181}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="absolute top-[49px] left-[782px]">
                    <Image
                        src={prefixBasePath("/top_mid.png")}
                        alt="Decoration"
                        width={370}
                        height={353}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="absolute top-[232px] left-[1192px]">
                    <Image
                        src={prefixBasePath("/top_right.png")}
                        alt="Decoration"
                        width={135}
                        height={130}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="absolute top-[420px] left-[947px]">
                    <Image
                        src={prefixBasePath("/bottom_right.png")}
                        alt="Decoration"
                        width={275}
                        height={197}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="absolute top-[627px] left-[1232px]">
                    <Image
                        src={prefixBasePath("/logo_1.png")}
                        alt="Logo"
                        width={115}
                        height={115}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
            </div>

            <div className="relative z-10 flex flex-col justify-center min-h-screen">
                <div
                    className="absolute"
                    style={{
                        top: '252px',
                        left: '100px',
                        width: '504px',
                        height: '208px'
                    }}
                >
                    <div className="mb-6">
                        <h1 className="text-white text-5xl font-bold leading-tight">
                            Welcome to OpenG2P<br />
                            <span className="text-[#ED7C22] text-4xl">Beneficiary Portal</span>
                        </h1>
                    </div>

                    <button
                        onClick={handleGetStarted}
                        className="bg-white text-black py-2 px-4 rounded-[30px] font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                        GET STARTED
                        <Image
                            src={prefixBasePath("/right_arrow.png")}
                            alt="Right Arrow"
                            width={18}
                            height={18}
                        />
                    </button>

                </div>
            </div>

        </main>
    );
}