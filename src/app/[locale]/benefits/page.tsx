"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

import { prefixBasePath } from '@/shared/utils/path';
import { AuthUtil } from '@/features/auth/components';
import { Pagination } from '@/components/shared';
import { TransferHistory } from '@/features/disbursement/components';

import { Benefit } from "@/features/disbursement/types/benefit";

import { usePagination } from "@/shared/hooks/usePagination";

export const benefitsData: Benefit[] = [
    {
        programName: "Openg2p-Safety-Net-Program",
        entitlementRefNumber: "983789327978",
        awaitedFunds: 45000,
        receivedFunds: 30000,
        dateApproved: "01/09/2025",
    },
    {
        programName: "PM-KISAN Farmer Support",
        entitlementRefNumber: "875643219876",
        awaitedFunds: 15000,
        receivedFunds: 15000,
        dateApproved: "15/08/2025",
    },
    {
        programName: "LPG Subsidy",
        entitlementRefNumber: "546372819045",
        awaitedFunds: 2400,
        receivedFunds: 800,
        dateApproved: "25/08/2025",
    },
    {
        programName: "Direct Benefit Transfer Scheme",
        entitlementRefNumber: "729384756102",
        awaitedFunds: 8500,
        receivedFunds: 0,
        dateApproved: "30/08/2025",
    },
    {
        programName: "Pradhan Mantri Awas Yojana",
        entitlementRefNumber: "392847561829",
        awaitedFunds: 120000,
        receivedFunds: 60000,
        dateApproved: "25/07/2025",
    },
    {
        programName: "National Rural Employment Guarantee",
        entitlementRefNumber: "928374651092",
        awaitedFunds: 30000,
        receivedFunds: 15000,
        dateApproved: "05/08/2025",
    },
    {
        programName: "Skill Development Program",
        entitlementRefNumber: "837465920384",
        awaitedFunds: 10000,
        receivedFunds: 5000,
        dateApproved: "15/07/2025",
    },
    {
        programName: "Ayushman Bharat Health Scheme",
        entitlementRefNumber: "465738291056",
        awaitedFunds: 25000,
        receivedFunds: 12000,
        dateApproved: "20/08/2025",
    },
    {
        programName: "Digital India Initiative",
        entitlementRefNumber: "102938475610",
        awaitedFunds: 5000,
        receivedFunds: 2500,
        dateApproved: "02/09/2025",
    },
    {
        programName: "Startup India Support",
        entitlementRefNumber: "112233445566",
        awaitedFunds: 12000,
        receivedFunds: 12000,
        dateApproved: "18/08/2025",
    },
    {
        programName: "Clean Ganga Mission",
        entitlementRefNumber: "121212121212",
        awaitedFunds: 8000,
        receivedFunds: 2000,
        dateApproved: "28/08/2025",
    },
    {
        programName: "Swachh Bharat Abhiyan",
        entitlementRefNumber: "131313131313",
        awaitedFunds: 15000,
        receivedFunds: 10000,
        dateApproved: "12/08/2025",
    },
    {
        programName: "National Health Mission",
        entitlementRefNumber: "141414141414",
        awaitedFunds: 20000,
        receivedFunds: 15000,
        dateApproved: "22/08/2025",
    },
    {
        programName: "Housing for All",
        entitlementRefNumber: "151515151515",
        awaitedFunds: 40000,
        receivedFunds: 25000,
        dateApproved: "28/07/2025",
    },
    {
        programName: "Rural Skill Training",
        entitlementRefNumber: "161616161616",
        awaitedFunds: 7000,
        receivedFunds: 3000,
        dateApproved: "06/08/2025",
    },
    {
        programName: "Women Empowerment Program",
        entitlementRefNumber: "171717171717",
        awaitedFunds: 10000,
        receivedFunds: 5000,
        dateApproved: "17/07/2025",
    },
];


export default function BenefitsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
    const [showTransferHistory, setShowTransferHistory] = useState(false);

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(benefitsData, 8);

    const [searchText, setSearchText] = useState("");
    const [filterText, setFilterText] = useState("");

    const filteredBenefits = benefitsData.filter((benefit) =>
        benefit.programName.toLowerCase().includes(searchText.toLowerCase()) &&
        benefit.entitlementRefNumber.toLowerCase().includes(filterText.toLowerCase())
    );

    const totalAwaitedFunds = benefitsData.reduce(
        (sum, b) => sum + b.awaitedFunds,
        0
    );
    const totalReceivedFunds = benefitsData.reduce(
        (sum, b) => sum + b.receivedFunds,
        0
    );

    const handleTransferHistoryClick = (benefit: Benefit) => {
        setSelectedBenefit(benefit);
        setShowTransferHistory(true);
    };

    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-2">
                <h1 className="text-2xl font-bold text-gray-800">Total Benefits</h1>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-black/20 p-4">
                <div className="overflow-x-auto px-4">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="border-b-3 border-gray-200">
                            <tr className="border-b-4 border-gray-300">
                                <th className="py-4 text-lg font-semibold text-black tracking-wider">Benefits (Transfer History)</th>
                                <th className="py-4 text-sm font-semibold text-gray-700 tracking-wider">Total Amount: {totalAwaitedFunds} $</th>
                                <th className="py-4 text-sm font-semibold text-gray-700 tracking-wider">Awaited Fund: {totalAwaitedFunds - totalReceivedFunds} $</th>
                                <th className="py-4 text-sm font-semibold text-gray-700 tracking-wider">Received Fund: {totalReceivedFunds} $</th>
                            </tr>
                            <tr className="border-b-3 border-gray-300">
                                <th colSpan={6}>
                                    <div className="flex justify-end gap-4 p-2">
                                        <div className="relative w-50">
                                            <input
                                                type="text"
                                                placeholder="Filter"
                                                value={filterText}
                                                onChange={(e) => setFilterText(e.target.value)}
                                                className="w-full p-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <img src={prefixBasePath("/filter.png")} alt="Filter" className="w-4 h-4 cursor-pointer" />
                                            </span>
                                        </div>

                                        <div className="relative w-50">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                className="w-full p-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <img src={prefixBasePath("/search.png")} alt="Search" className="w-4 h-4 cursor-pointer" />
                                            </span>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="py-4 text-sm font-semibold text-black tracking-wider">Program Name</th>
                                <th className="py-4 text-sm font-semibold text-black tracking-wider">Beneficiary ID</th>
                                <th className="py-4 text-sm font-semibold text-black tracking-wider">Awaited Funds ($)</th>
                                <th className="py-4 text-sm font-semibold text-black tracking-wider">Received Funds ($)</th>
                                <th className="py-4 text-sm font-semibold text-black tracking-wider">Date Approved</th>
                                <th className="py-4 text-sm font-semibold text-black tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((benefit, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150 border-b-3 border-gray-300">
                                    <td className="py-4 text-gray-900 font-medium">{benefit.programName}</td>
                                    <td className="py-4 font-mono text-gray-900 text-sm">{benefit.entitlementRefNumber}</td>
                                    <td className="py-4 text-black">{benefit.awaitedFunds.toFixed(2)}</td>
                                    <td className="py-4 text-black">{benefit.receivedFunds.toFixed(2)}</td>
                                    <td className="py-4 text-black text-sm">{benefit.dateApproved}</td>
                                    <td className="py-4">
                                        <span
                                            onClick={() => handleTransferHistoryClick(benefit)}
                                            className="text-black text-sm font-medium underline cursor-pointer hover:text-blue-600 transition-colors"
                                        >
                                            Transfer History
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {showTransferHistory && selectedBenefit && (
                <TransferHistory
                    benefit={selectedBenefit}
                    onClose={() => setShowTransferHistory(false)}
                />
            )}
        </div>
    );
}