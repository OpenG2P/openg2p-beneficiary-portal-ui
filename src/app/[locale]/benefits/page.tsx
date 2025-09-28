"use client";
import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

import { prefixBasePath } from '@/shared/utils/path';
import { AuthUtil } from '@/features/auth/components';
import { Pagination, SearchInput, FilterInput, DateInput } from '@/components/shared';
import { TransferHistory } from '@/features/disbursement/components';

import { Benefit } from "@/features/disbursement/types/benefit";

import { usePagination } from "@/shared/hooks/usePagination";

export const benefitsData: Benefit[] = [
    {
        programName: "Openg2p Safety Program",
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

    const [searchQuery, setSearchQuery] = useState("");
    const [filterText, setFilterText] = useState("");
    const [dateText, setDateText] = useState("");

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
        <div className="px-10 py-4 min-h-screen bg-white">
            <div className="mb-2">
                <h1 className="text-xl font-bold text-black">Total Benefits</h1>
            </div>
            <div className="bg-white rounded-xl shadow-xl w-full border border-black/20 overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-xl font-semibold text-[#ED7C22] text-left flex items-center gap-4">
                                    Benefits
                                    <div className="bg-gray-100 text-black px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                                        <span>Services</span>
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-gray-900 font-normal text-left">
                                    Total Amount: <span className="font-bold text-[#3399FF]">{totalAwaitedFunds}</span> $
                                </th>
                                <th className="px-6 py-4 text-gray-900 font-normal text-left">
                                    Awaited Fund: <span className="font-bold text-[#ED7C22]">{totalAwaitedFunds - totalReceivedFunds}</span> $
                                </th>
                                <th className="px-6 py-4 text-gray-900 font-normal text-left">
                                    Received Fund: <span className="font-bold text-[#00B765]">{totalReceivedFunds}</span> $
                                </th>
                            </tr>

                            <tr className="bg-gray-100">
                                <th colSpan={6}>
                                    <div className="flex justify-center gap-20 p-2">
                                        <FilterInput
                                            value={filterText}
                                            onChange={setFilterText}
                                            placeholder="Filter"
                                            className="w-50"
                                            bgColor="bg-white"
                                            onIconClick={() => console.log("Filter clicked")}
                                        />
                                        <DateInput
                                            value={dateText}
                                            onChange={setDateText}
                                            placeholder="Date"
                                            className="w-50"
                                            bgColor="bg-white"
                                            onIconClick={() => console.log("Date clicked")}
                                        />
                                        <SearchInput
                                            value={searchQuery}
                                            onChange={setSearchQuery}
                                            placeholder="Search"
                                            className="w-50"
                                            bgColor="bg-white"
                                            onIconClick={() => console.log("Search triggered:", searchQuery)}
                                        />
                                    </div>
                                </th>
                            </tr>

                            <tr>
                                <th className="px-6 py-3 text-sm font-bold text-black">
                                    Program Name
                                    <Image
                                        src={prefixBasePath("/updown_arrow.png")}
                                        alt="Sort"
                                        width={20}
                                        height={20}
                                        className="inline-block cursor-pointer opacity-40"
                                    />
                                </th>
                                <th className="px-6 py-3 text-sm font-bold text-black">Beneficiary ID</th>
                                <th className="px-6 py-3 text-sm font-bold text-black">Awaited Funds ($)</th>
                                <th className="px-6 py-3 text-sm font-bold text-black">Received Funds ($)</th>
                                <th className="px-6 py-3 text-sm font-bold text-black">
                                    Date Approved
                                    <Image
                                        src={prefixBasePath("/updown_arrow.png")}
                                        alt="Sort"
                                        width={20}
                                        height={20}
                                        className="inline-block cursor-pointer opacity-40"
                                    />
                                </th>
                                <th className="px-6 py-3 text-sm font-bold text-black">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentItems.map((benefit, index) => (
                                <tr
                                    key={index}
                                    className={`transition-colors duration-150 ${index % 2 === 1 ? "bg-white" : "bg-gray-100"
                                        }`}
                                >
                                    <td className="px-6 py-4 text-black font-medium">{benefit.programName}</td>
                                    <td className="px-6 py-4 font-mono text-gray-900 text-sm">{benefit.entitlementRefNumber}</td>
                                    <td className="px-6 py-4 text-black">
                                        <span className="text-[#ED7C22] font-bold">{benefit.awaitedFunds.toFixed(2)}</span> $
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                        <span className="text-[#00B765] font-bold">{benefit.receivedFunds.toFixed(2)}</span> $
                                    </td>

                                    <td className="px-6 py-4 text-black text-sm">{benefit.dateApproved}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            onClick={() => handleTransferHistoryClick(benefit)}
                                            className="px-2 py-1 text-sm text-[#3399FF] bg-[#3399FF1F] rounded-full font-medium cursor-pointer"
                                        >
                                            Transfer History
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
                {showTransferHistory && selectedBenefit && (
                    <TransferHistory
                        benefit={selectedBenefit}
                        onClose={() => setShowTransferHistory(false)}
                    />
                )}
            </div>
        </div>
    );
}