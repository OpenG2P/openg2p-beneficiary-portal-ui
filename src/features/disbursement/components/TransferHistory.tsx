"use client";
import React from "react";
import Image from "next/image";

import { prefixBasePath } from '@/shared/utils/path';

import { Benefit } from "@/features/disbursement/types/benefit";

interface TransferHistoryProps {
    benefit: Benefit;
    onClose: () => void;
}

const TransferHistory = ({ benefit, onClose }: TransferHistoryProps) => {
    const transferHistory = [
        { transferId: "2389009856", receivedFund: 300.0, refNum: "3456677800", dateApproved: "25-06-2025", dateReceived: "27-06-2025" },
        { transferId: "2389009857", receivedFund: 500.0, refNum: "3456677801", dateApproved: "01-07-2025", dateReceived: "03-07-2025" },
        { transferId: "2389009858", receivedFund: 250.0, refNum: "3456677802", dateApproved: "05-07-2025", dateReceived: "07-07-2025" },
        { transferId: "2389009859", receivedFund: 400.0, refNum: "3456677803", dateApproved: "10-07-2025", dateReceived: "12-07-2025" },
        { transferId: "2389009860", receivedFund: 350.0, refNum: "3456677804", dateApproved: "15-07-2025", dateReceived: "17-07-2025" },
        { transferId: "2389009861", receivedFund: 450.0, refNum: "3456677805", dateApproved: "20-07-2025", dateReceived: "22-07-2025" },
        { transferId: "2389009862", receivedFund: 600.0, refNum: "3456677806", dateApproved: "25-07-2025", dateReceived: "27-07-2025" },
        { transferId: "2389009863", receivedFund: 700.0, refNum: "3456677807", dateApproved: "30-07-2025", dateReceived: "01-08-2025" },
    ];

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[800px] h-[600px] p-8 relative flex flex-col">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-bold text-gray-800">
                        {benefit.programName} Transfer History
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <Image
                            src={prefixBasePath("/x.png")}
                            alt="Close"
                            width={20}
                            height={20}
                            priority
                        />
                    </button>
                </div>
                <div className="border-b-4 border-gray-200 mb-4"></div>

                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-gray-700 border-b border-gray-300 bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold">Transfer ID</th>
                                <th className="px-4 py-3 text-sm font-semibold">Received Fund</th>
                                <th className="px-4 py-3 text-sm font-semibold">Reference Number</th>
                                <th className="px-4 py-3 text-sm font-semibold">Date of Approval</th>
                                <th className="px-4 py-3 text-sm font-semibold">Date of Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {transferHistory.map((transfer, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-900">{transfer.transferId}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{transfer.receivedFund.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{transfer.refNum}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{transfer.dateApproved}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{transfer.dateReceived}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-start gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-[#D9D9D9] text-black rounded-md cursor-pointer"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferHistory;
