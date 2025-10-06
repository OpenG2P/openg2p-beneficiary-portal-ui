"use client";

import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";
import { useState } from "react";
import { Scheme } from "@/features/program/types/scheme";

interface SchemeCardProps {
    schemes: Scheme[];
}

export default function SchemeCard({ schemes }: SchemeCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDotClick = (index: number) => setCurrentIndex(index);

    return (
        <div className="bg-white rounded-xl border border-black/20 flex-1 shadow-xl">
            <div className="flex items-center justify-between h-16 px-8">
                <h3 className="text-xl sm:text-xl font-bold text-gray-800">
                    Potential Applicable Schemes
                </h3>
                <button className="p-1 rounded-full hover:bg-gray-200">
                    <Image
                        src={prefixBasePath("/more.png")}
                        alt="menu"
                        width={18}
                        height={18}
                    />
                </button>
            </div>

            <div className="relative w-full bg-gray-100">
                <div className="flex flex-col items-start w-full px-8 py-4">
                    <div className="relative w-[120px] h-[130px] mb-3">
                        <Image
                            src={prefixBasePath(schemes[currentIndex].image)}
                            alt={schemes[currentIndex].title}
                            width={120}
                            height={130}
                            className="rounded-md"
                        />
                    </div>
                    <h4 className="font-bold text-gray-800 text-base mb-2 w-full">
                        {schemes[currentIndex].title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 w-full line-clamp-3">
                        {schemes[currentIndex].description}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-center w-full px-4 m-4 max-w-sm">
                <button className="px-3 py-1 bg-gray-100 text-black rounded-[20px] flex items-center text-base font-semibold cursor-pointer">
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
                    {schemes.map((_, dotIndex) => (
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