"use client";

import Image from "next/image";

import { prefixBasePath } from '@/shared/utils/path';


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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[800px] h-[600px] p-6 relative flex flex-col justify-between">
                <div>
                    <div className="w-full flex justify-between items-center mb-1">
                        <h2 className="text-xl font-bold text-gray-800">{schemeName}</h2>
                        <button onClick={onClose} className="cursor-pointer">
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
            </div>
        </div>
    );
}
