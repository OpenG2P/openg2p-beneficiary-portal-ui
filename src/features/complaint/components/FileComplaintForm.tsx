"use client";
import { useState } from "react";

import Modal from "@/components/ui/Modal";

interface FileComplaintModalProps {
    onClose: () => void;
}

export default function FileComplaintForm({ onClose }: FileComplaintModalProps) {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [complaintText, setComplaintText] = useState("");

    return (
        <Modal title="File a Complaint" onClose={onClose} width="600px">
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
                        <option value="">Select</option>
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
                    className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 cursor-pointer"
                >
                    Send
                </button>
            </div>
        </Modal>
    );
}
