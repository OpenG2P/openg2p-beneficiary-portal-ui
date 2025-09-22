"use client";
import { useState } from "react";
import Image from "next/image";
import { prefixBasePath } from "@/utils/path";

interface FileComplaintModalProps {
    onClose: () => void;
}

export default function FileComplaint({ onClose }: FileComplaintModalProps) {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [complaintText, setComplaintText] = useState("");

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[600px] p-8 relative flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-800">File a Complaint</h2>
                    <button onClick={onClose}>
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

                <div className="space-y-4 flex-1 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">To</label>
                        <input
                            type="text"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black"
                        >
                            <option value="">Select subject</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Employment">Employment</option>
                            <option value="Housing">Housing</option>
                            <option value="Education">Education</option>
                            <option value="Pension">Pension</option>
                            <option value="Food Security">Food Security</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Complaints</label>
                        <textarea
                            value={complaintText}
                            onChange={(e) => setComplaintText(e.target.value)}
                            rows={5}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black"
                        />
                    </div>
                </div>

                <div className="flex justify-start gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
