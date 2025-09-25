"use client";

import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";
import { useState } from "react";
import { ViewAll } from "@/components/shared";

const dashboardSchemes = [
    {
        id: 1,
        title: "Agriculture Subsidy",
        description:
            "Eligible for agricultural input support to improve productivity and sustainability. This includes subsidies on seeds, fertilizers, machinery, and irrigation equipment to help farmers boost crop yield while reducing costs.",
        image: "/scheme_card.png",
    },
    {
        id: 2,
        title: "Education Grant",
        description:
            "Supports students with financial grants for tuition, books, and resources. The grant also covers skill development programs, training workshops, and online courses to enhance career opportunities.",
        image: "/scheme_card.png",
    },
    {
        id: 3,
        title: "Healthcare Support",
        description:
            "Offers assistance for consultations, medications, and hospital care. The scheme covers preventive health checkups, vaccination drives, and emergency treatments for low-income households.",
        image: "/scheme_card.png",
    },
];

export default function SchemeCard() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDotClick = (index: number) => setCurrentIndex(index);

    return (
        <div className="bg-white rounded-xl border border-black/20 flex-1 shadow-xl">
            <div className="flex items-center justify-between h-16 px-6">
                <h3 className="text-xl sm:text-xl font-bold text-gray-800">
                    Potential Applicable Schemes
                </h3>
                <button className="p-1 rounded-full hover:bg-gray-200">
                    <Image
                        src={prefixBasePath("/menu-dots.png")}
                        alt="menu"
                        width={18}
                        height={18}
                    />
                </button>
            </div>

            <div className="relative w-full bg-gray-100">
                <div className="flex flex-col items-start w-full px-6 py-4">
                    <div className="relative w-[120px] h-[120px] mb-3">
                        <Image
                            src={prefixBasePath(dashboardSchemes[currentIndex].image)}
                            alt={dashboardSchemes[currentIndex].title}
                            fill
                            style={{ objectFit: "contain" }}
                            className="rounded-md"
                        />
                    </div>
                    <h4 className="font-bold text-gray-800 text-base mb-2 w-full">
                        {dashboardSchemes[currentIndex].title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 w-full line-clamp-3">
                        {dashboardSchemes[currentIndex].description}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center w-full px-6 my-4 max-w-sm">
                <button className="px-4 py-2 bg-gray-100 text-black rounded-[20px] flex items-center text-sm font-semibold cursor-pointer">
                    Check Your Eligibility
                    <Image
                        src={prefixBasePath("/right_arrow.png")}
                        alt="arrow"
                        width={12}
                        height={12}
                        className="ml-1.5"
                    />
                </button>
                <div className="flex space-x-2">
                    {[0, 1, 2].map((dotIndex) => (
                        <button
                            key={dotIndex}
                            onClick={() => handleDotClick(dotIndex)}
                            className={`w-3 h-3 rounded-full ${currentIndex === dotIndex ? "bg-gray-500" : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}
