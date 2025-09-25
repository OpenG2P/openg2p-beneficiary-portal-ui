"use client";

import Image from "next/image";
import { ViewAll } from '@/components/shared';
import { prefixBasePath } from "@/shared/utils/path";

interface TotalBenefitsCardProps {
    totalAmount: number;
    receivedAmount: number;
}

export default function TotalBenefitsCard({ totalAmount, receivedAmount }: TotalBenefitsCardProps) {
    return (
        <div className="rounded-xl shadow-xl overflow-hidden bg-gradient-to-b from-[#FCBE00] to-[#ED7C22] p-4 sm:p-6 flex flex-col justify-between h-full text-white">

            <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-black m-0">
                    Total Benefit Amount
                </h3>

                <div className="bg-white text-black px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer shadow">
                    <span>Service</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div className="flex flex-col flex-1 pr-4">
                    <div className="text-2xl text-black font-bold mb-1">
                        {receivedAmount.toLocaleString()} $
                    </div>
                    <p className="text-lg text-white mb-4">
                        Disbursed till Date
                    </p>
                    <ViewAll href="/benefits" label="View Amount Details" />
                </div>

                <div className="flex items-end pr-10">
                    <Image
                        src={prefixBasePath("/dollar.png")}
                        alt="Dollar Icon"
                        width={68}
                        height={100}
                        className="opacity-30"
                    />
                </div>
            </div>
        </div>
    );
}
