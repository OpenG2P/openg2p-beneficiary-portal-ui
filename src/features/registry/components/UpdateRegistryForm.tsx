"use client";
import { useState } from "react";

import { Registry } from "@/features/registry/types/registry";
import Modal from "@/components/ui/Modal";

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
        <Modal title="Update Registry" onClose={onClose} width="600px">
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
        </Modal>
    );
}
