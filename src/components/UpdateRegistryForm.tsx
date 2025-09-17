"use client";
import { useState } from "react";
import Image from "next/image";
import { prefixBasePath } from "@/utils/path";

export interface Registry {
    name: string;
    id: string;
    date: string;
    action: string;
}

interface UpdateRegistryFormProps {
    registry: Registry;
    onClose: () => void;
}

export default function UpdateRegistryForm({ registry, onClose }: UpdateRegistryFormProps) {
    const [yourName, setYourName] = useState("");
    const [yourEmail, setYourEmail] = useState("");

    const handleSave = () => {
        console.log("Updated registry:", {
            registryName: registry.name,
            registryId: registry.id,
            yourName,
            yourEmail,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[600px] p-8 relative opacity-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Update Registry</h2>
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

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Program Name</label>
                        <input
                            type="text"
                            value={registry.name}
                            disabled
                            className="mt-1 block w-full text-black rounded-md shadow-sm bg-[#D9D9D9] p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Registry ID</label>
                        <input
                            type="text"
                            value={registry.id}
                            disabled
                            className="mt-1 block w-full text-black rounded-md shadow-sm bg-[#D9D9D9] p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Name</label>
                        <input
                            type="text"
                            value={yourName}
                            onChange={(e) => setYourName(e.target.value)}
                            className="mt-1 block w-full text-black rounded-md shadow-sm bg-white p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Email ID</label>
                        <input
                            type="email"
                            value={yourEmail}
                            onChange={(e) => setYourEmail(e.target.value)}
                            className="mt-1 block w-full text-black rounded-md shadow-sm bg-white p-2"
                        />
                    </div>
                </div>

                <div className="flex justify-start gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-[#D9D9D9] text-black rounded-md cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 bg-black text-white rounded-md cursor-pointer"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
