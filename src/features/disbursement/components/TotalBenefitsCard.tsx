"use client";

import { ViewAll } from '@/components/shared';

interface TotalBenefitsCardProps {
    totalAmount: number;
    receivedAmount: number;
}

export default function TotalBenefitsCard({ totalAmount, receivedAmount }: TotalBenefitsCardProps) {
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

            <ViewAll href="/benefits" label="View Amount Details" />
        </div>
    );
}

