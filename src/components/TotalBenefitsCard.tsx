"use client";

import Link from "next/link";
import Image from "next/image";
import { prefixBasePath } from "@/utils/path";

interface TotalBenefitsCardProps {
    totalAmount: number;
    receivedAmount: number;
    link?: string;
}

export default function TotalBenefitsCard({ totalAmount, receivedAmount, link }: TotalBenefitsCardProps) {
    return (
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-black/20 transition-shadow duration-300 flex flex-col justify-between h-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                Total Benefit Amount
            </h3>

            <div className="border-b-4 border-gray-300 mb-3 sm:mb-4"></div>

            <div className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">
                {receivedAmount.toLocaleString()} $
            </div>

            <p className="text-sm sm:text-base text-gray-600 mb-4">
                Disbursed till Date
            </p>

            {link && (
                <div className="flex justify-start px-0 sm:px-0 py-2 sm:py-3">
                    <Link href={link} className="flex items-center text-black font-bold text-md">
                        View Amount Details
                        <Image
                            src={prefixBasePath("/right_arrow.png")}
                            alt="arrow"
                            width={12}
                            height={12}
                            className="ml-1.5 mt-0.5"
                        />
                    </Link>
                </div>
            )}
        </div>
    );
}

