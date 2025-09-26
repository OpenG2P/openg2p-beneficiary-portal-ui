"use client";

import Image from "next/image";

import { prefixBasePath } from '@/shared/utils/path';
import Modal from "@/components/ui/Modal";

interface ApplySchemeFormProps {
    schemeName: string;
    description?: string;
    date?: string;
    onClose: () => void;
}

export default function ApplySchemeForm({ schemeName, date, description, onClose }: ApplySchemeFormProps) {
    const handleApply = () => {
        alert(`Application submitted for ${schemeName}`);
        onClose();
    };

    return (
        <Modal title={schemeName} onClose={onClose} width="800px" height="600px">
            <div>
                <div className="relative w-full h-[120px] mb-4">
                    <Image
                        src={prefixBasePath("/schemes.png")}
                        alt="Scheme"
                        fill
                        style={{ objectFit: "contain", objectPosition: "left" }}
                        priority
                    />
                </div>


                <div className="w-full text-black font-bold text-sm mb-4 text-left">
                    Date: {date}
                </div>

                <p className="text-gray-700 mb-6">
                    {description} <br />
                    {description}
                </p>
            </div>

            <div className="flex justify-start gap-4 w-full">
                <button
                    onClick={onClose}
                    className="px-5 py-2 bg-gray-300 text-black rounded-md cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleApply}
                    className="px-5 py-2 bg-black text-white rounded-md cursor-pointer"
                >
                    Apply
                </button>
            </div>
        </Modal>
    );
}
