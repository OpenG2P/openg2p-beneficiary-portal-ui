"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { prefixBasePath } from "@/shared/utils/path";

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

export default function SchemeCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDotClick = (index: number) => setCurrentIndex(index);

    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex justify-start items-start h-[300px] w-full bg-[#F5F5F5]">
                <div className="flex flex-col items-start w-full max-w-sm">
                    <div className="relative w-[120px] h-[120px] mb-3">
                        <Image
                            src={prefixBasePath(dashboardSchemes[currentIndex].image)}
                            alt={dashboardSchemes[currentIndex].title}
                            fill
                            style={{ objectFit: "contain" }}
                            className="rounded-md"
                        />
                    </div>

                    <h4 className="font-bold text-gray-800 text-base mb-2 text-left w-full">
                        {dashboardSchemes[currentIndex].title}
                    </h4>

                    <p className="text-gray-600 text-sm mb-4 text-left w-full line-clamp-3">
                        {dashboardSchemes[currentIndex].description}
                    </p>
                </div>
            </div>

            {/* Dots and Button in the same line */}
            <div className="flex justify-between items-center w-full mt-2 max-w-sm">
                <button className="px-4 py-2 bg-gray-100 text-black rounded-[20px] text-sm font-semibold cursor-pointer">
                    Check Your Eligibility
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
