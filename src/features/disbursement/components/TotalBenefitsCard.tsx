import React from 'react';
import Image from "next/image";

import { ViewAll } from '@/components/shared';
import { prefixBasePath } from "@/shared/utils/path";

interface BenefitItem {
    icon: string;
    value: string;
    label: string;
}

interface TotalBenefitsCardProps {
    benefits: BenefitItem[];
}

export default function TotalBenefitsCard({ benefits }: TotalBenefitsCardProps) {
    return (
        <div className="flex flex-col text-white">
            <div className="rounded-xl shadow-xl overflow-hidden relative">
                <div className="bg-[#ffcb30] px-8 pt-8 pb-2 flex justify-between items-end">
                    <h3 className="text-[20px] font-[600] text-black">
                        Benefits Received till date
                    </h3>
                </div>

                <div className="relative bg-gradient-to-b from-[#ffbf00] to-[#ED7C22] px-8 py-4 overflow-hidden">
                    <div className="absolute right-16 bottom-0 opacity-20 pointer-events-none select-none">
                        <Image
                            src={prefixBasePath("/dollar.png")}
                            alt="Dollar Icon"
                            width={68}
                            height={104}
                            className="object-contain"
                        />
                    </div>

                    <div className="flex justify-center gap-14 relative">
                        {benefits.map((b, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center min-w-[70px]"
                            >
                                <div className="w-[34px] h-[34px] rounded-full bg-[#FFFFFF80] flex items-center justify-center">
                                    <Image
                                        src={prefixBasePath(b.icon)}
                                        alt={b.label}
                                        width={22}
                                        height={22}
                                        className="object-contain"
                                    />
                                </div>

                                <div className="text-[20px] text-white font-[700]">{b.value}</div>
                                <div className="text-[14px] text-black font-[500]">{b.label}</div>
                            </div>
                        ))}
                    </div>

                    <ViewAll
                        href="/benefits"
                        label="View All Benefits"
                        bgColor="bg-white/40"
                    />
                </div>
            </div>
        </div>
    );
}
