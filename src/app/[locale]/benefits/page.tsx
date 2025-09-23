"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

import { prefixBasePath } from '@/shared/utils/path';
import { benefitsData, getTotalAwaitedFunds, getTotalReceivedFunds } from '@/features/disbursement/utils/benefits';

import { AuthUtil } from '@/features/auth/components';
import { Pagination } from '@/components/shared';
import { TransferHistory } from '@/features/disbursement/components';

import { Benefit } from "@/features/disbursement/types/benefit";


export default function BenefitsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
    const [showTransferHistory, setShowTransferHistory] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(benefitsData.length / itemsPerPage);

    const currentBenefits = benefitsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const [searchText, setSearchText] = useState("");
    const [filterText, setFilterText] = useState("");

    const filteredBenefits = benefitsData.filter((benefit) =>
        benefit.programName.toLowerCase().includes(searchText.toLowerCase()) &&
        benefit.entitlementRefNumber.toLowerCase().includes(filterText.toLowerCase())
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
                                <th className="py-4 text-sm font-semibold text-gray-700 tracking-wider">Total Amount: {getTotalAwaitedFunds().toFixed(2)} $</th>
                                <th className="py-4 text-sm font-semibold text-gray-700 tracking-wider">Awaited Fund: {(getTotalAwaitedFunds() - getTotalReceivedFunds()).toFixed(2)} $</th>
                                <th className="py-4 text-sm font-semibold text-gray-700 tracking-wider">Received Fund: {getTotalReceivedFunds().toFixed(2)} $</th>
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
                            {currentBenefits.map((benefit, index) => (
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