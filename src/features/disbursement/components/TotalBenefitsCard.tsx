import React from 'react';
import Image from "next/image";
import { ViewAll } from '@/components/shared';
import { prefixBasePath } from "@/shared/utils/path";

interface TotalBenefitsCardProps {
    totalAmount: number;
    receivedAmount: number;
}

export default function TotalBenefitsCard({ totalAmount, receivedAmount }: TotalBenefitsCardProps) {
    return (
        <div className="flex flex-col text-white">
            <div className="rounded-xl shadow-xl overflow-hidden relative">
                <div className="bg-[#ffcb30] px-6 pt-6 pb-3 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-black">
                        Total Benefit Amount
                    </h3>

                    <div className="bg-white text-black px-3 py-1.5 mr-6 rounded-full flex items-center gap-2 text-sm font-semibold shadow-sm">
                        <span>Services</span>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div className="bg-gradient-to-b from-[#ffbf00] to-[#ED7C22] px-6 py-5 relative">
                    <div className="flex items-end justify-between">
                        <div className="flex-1">
                            <div className="text-3xl font-bold text-black mb-1 flex items-center">
                                {receivedAmount.toLocaleString()}
                                <span className="ml-2 w-6 h-7 flex items-center justify-center rounded-full bg-white text-[#ED7C22] text-xl">
                                    $
                                </span>
                            </div>

                            <p className="text-xl text-white/90 mb-4">
                                Disbursed till date
                            </p>

                            <ViewAll href="/benefits" label="View Amount Details" bgColor="bg-white/40" />
                        </div>

                        <div className="absolute right-16 bottom-0 opacity-30">
                            <Image
                                src={prefixBasePath("/dollar.png")}
                                alt="Dollar Icon"
                                width={68}
                                height={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}