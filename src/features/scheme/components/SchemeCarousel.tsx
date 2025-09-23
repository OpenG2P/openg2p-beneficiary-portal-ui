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
        image: "/schemes.png",
    },
    {
        id: 2,
        title: "Education Grant",
        description:
            "Supports students with financial grants for tuition, books, and resources. The grant also covers skill development programs, training workshops, and online courses to enhance career opportunities.",
        image: "/schemes.png",
    },
    {
        id: 3,
        title: "Healthcare Support",
        description:
            "Offers assistance for consultations, medications, and hospital care. The scheme covers preventive health checkups, vaccination drives, and emergency treatments for low-income households.",
        image: "/schemes.png",
    },
    {
        id: 4,
        title: "Housing Assistance Program",
        description:
            "Provides secure and affordable housing with rental support and home repairs. Families can also avail renovation grants, disaster relief housing, and eco-friendly construction subsidies.",
        image: "/schemes.png",
    },
];

export default function SchemeCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDotClick = (index: number) => setCurrentIndex(index);

    const visibleSchemes = dashboardSchemes.slice(0, 3);
    const showRedirect = currentIndex === 3;

    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex justify-start items-start h-[300px] w-full">
                {showRedirect ? (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <p className="text-gray-700 mb-4 font-medium">
                            View all applicable schemes for you
                        </p>
                        <Link
                            href="/schemes"
                            className="px-4 py-2 bg-black text-white rounded-md text-sm font-semibold cursor-pointer"
                        >
                            View All Schemes
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col items-start w-full max-w-sm">
                        <div className="relative w-[120px] h-[120px] mb-3">
                            <Image
                                src={prefixBasePath(visibleSchemes[currentIndex].image)}
                                alt={visibleSchemes[currentIndex].title}
                                fill
                                style={{ objectFit: "contain" }}
                                className="rounded-md"
                            />
                        </div>

                        <h4 className="font-bold text-gray-800 text-base mb-2 text-left w-full">
                            {visibleSchemes[currentIndex].title}
                        </h4>

                        <p className="text-gray-600 text-sm mb-4 text-left w-full line-clamp-3">
                            {visibleSchemes[currentIndex].description}
                        </p>

                        <button className="px-4 py-2 bg-black text-white rounded-md text-sm font-semibold cursor-pointer">
                            Check Your Eligibility
                        </button>
                    </div>
                )}
            </div>

            <div className="flex justify-center w-full mt-1 space-x-2">
                {[0, 1, 2, 3].map((dotIndex) => (
                    <button
                        key={dotIndex}
                        onClick={() => handleDotClick(dotIndex)}
                        className={`w-3 h-3 rounded-full ${currentIndex === dotIndex ? "bg-black" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
