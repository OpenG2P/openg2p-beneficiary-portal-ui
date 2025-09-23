"use client";
import { useState } from "react";

import { Pagination } from "@/components/shared";
import { FileComplaintForm } from "@/features/complaint/components";

import { Complaint } from "@/features/complaint/types/complaint";

import { usePagination } from "@/shared/hooks/usePagination";

const myComplaints: Complaint[] = [
    {
        id: "1",
        number: "C-1001",
        status: "Open",
        subject: "Healthcare Service Issue",
        description: "Delay in updating medical records in the healthcare registry.",
        date: "2025-09-20 10:30 AM",
    },
    {
        id: "2",
        number: "C-1002",
        status: "Closed",
        subject: "Employment Registry Error",
        description: "Incorrect designation shown in the employment registry.",
        date: "2025-09-18 02:15 PM",
    },
    {
        id: "3",
        number: "C-1003",
        status: "In Progress",
        subject: "Housing Registry Complaint",
        description: "Unable to apply for the new housing scheme online.",
        date: "2025-09-19 09:45 AM",
    },
    {
        id: "4",
        number: "C-1004",
        status: "Open",
        subject: "Education Registry",
        description: "My degree verification request is still pending.",
        date: "2025-09-17 11:00 AM",
    },
    {
        id: "5",
        number: "C-1005",
        status: "Closed",
        subject: "Pension Registry",
        description: "Mismatch in my pension account details after update.",
        date: "2025-09-16 03:20 PM",
    },
    {
        id: "6",
        number: "C-1006",
        status: "Open",
        subject: "Food Security Registry",
        description: "Ration card details not reflecting after verification.",
        date: "2025-09-15 08:50 AM",
    },
];


export default function ComplaintsPage() {
    const [showModal, setShowModal] = useState(false);

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(myComplaints, 3);

    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-lg text-black font-bold">Complaints</h1>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-black/20 p-4">
                <div className="mb-4 px-4">
                    <div className="flex justify-between items-center border-b-4 border-gray-200 pb-2">
                        <span className="text-lg font-semibold text-black">All Complaints</span>
                        <button
                            className="bg-black text-white px-3 py-1 rounded shadow hover:bg-gray-900 cursor-pointer"
                            onClick={() => setShowModal(true)}
                        >
                            File a Complaint
                        </button>
                    </div>
                </div>


                <div className="grid gap-4 px-4">
                    {currentItems.map((complaint) => (
                        <div
                            key={complaint.id}
                            className="border rounded-lg p-4 shadow-sm bg-white"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-black font-black text-lg">
                                    Complaint Number: {complaint.number}
                                </span>

                                <div className="flex items-center gap-1">
                                    <span className="text-black font-black text-lg px-3 py-1">
                                        Status:
                                    </span>
                                    <span
                                        className="px-2 py-0.5 text-xs font-black text-black bg-gray-400 rounded"
                                    >
                                        {complaint.status}
                                    </span>
                                </div>

                                <button className="px-2 py-0.5 text-xs font-medium bg-black text-white hover:bg-gray-800 rounded">
                                    Reopen
                                </button>
                            </div>

                            <div className="flex justify-start items-center gap-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Subject: {complaint.subject}
                                </h3>
                                <span className="text-lg text-gray-500">
                                    {complaint.date}
                                </span>
                            </div>

                            <p className="text-sm text-gray-700 mt-2">{complaint.description}</p>
                        </div>
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
            {showModal && <FileComplaintForm onClose={() => setShowModal(false)} />}
        </div>
    );
}
