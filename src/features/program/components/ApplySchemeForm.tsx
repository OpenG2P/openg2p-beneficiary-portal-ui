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
        <Modal
            title={<span className="text-[#ED7C22] text-2xl">{schemeName}</span>}
            onClose={onClose}
            width="800px"
            height="600px"
            sidebarWidth="10%"
        >
            <div className="px-10">
                <div className="relative w-full h-[120px] mb-4">
                    <Image
                        src={prefixBasePath("/scheme_new.png")}
                        alt="Scheme"
                        fill
                        style={{ objectFit: "contain", objectPosition: "left" }}
                        priority
                    />
                </div>


                <div className="w-full text-[#3399FF] font-bold text-sm mb-4 text-left">
                    Date: {date}
                </div>

                <p className="text-gray-700 mb-6">
                    {description} <br />
                    {description}
                </p>
            </div>

            <div className="flex justify-start gap-4 w-full my-10 px-10">
                <button
                    onClick={onClose}
                    className="px-8 py-2 bg-gray-100 text-black rounded-[20px]"
                >
                    CANCEL
                </button>
                <button
                    className="px-8 py-2 bg-black text-white rounded-[20px]"
                >
                    APPLY
                </button>
            </div>
        </Modal>
    );
}
