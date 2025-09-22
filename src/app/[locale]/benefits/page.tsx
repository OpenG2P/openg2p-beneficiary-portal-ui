"use client";
import { useState } from "react";
import { benefitsData, Benefit, getTotalAwaitedFunds, getTotalReceivedFunds } from '@/features/disbursement';
import { AuthUtil } from '@/features/auth';
import { Pagination } from '@/components';
import { TransferHistory } from '@/features/disbursement';
import { useLocale } from "next-intl";

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
                <div className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <table className="w-full text-sm font-medium text-gray-700 table-fixed">
                        <tbody className="bg-white">
                            <tr>
                                <td colSpan={1} className="px-4 py-2">
                                    <h2 className="text-base font-semibold text-gray-800">
                                        Benefits (Transfer History)
                                    </h2>
                                </td>
                                <td colSpan={5} className="py-2">
                                    <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-28 mt-0 mr-4">
                                        <span className="text-gray-600 text-sm sm:text-base">
                                            Total Amount: <span className="font-bold text-black">{getTotalAwaitedFunds().toFixed(2)} $</span>
                                        </span>
                                        <span className="text-gray-600 text-sm sm:text-base">
                                            Awaited Fund: <span className="font-bold text-black">{(getTotalAwaitedFunds() - getTotalReceivedFunds()).toFixed(2)} $</span>
                                        </span>
                                        <span className="text-gray-600 text-sm sm:text-base">
                                            Received Fund: <span className="font-bold text-black">{getTotalReceivedFunds().toFixed(2)} $</span>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mx-4 border-t-4 border-gray-300"></div>

                <div className="overflow-x-auto px-4">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="border-b-3 border-gray-200">
                            <tr>
                                <th className="py-4 text-sm font-semibold text-black tracking-wider">Program Name</th>
                                <th className="py-4 text-sm font-semibold text-black tracking-wider">Entitlement Reference Number</th>
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