"use client";
import { useState } from "react";
import Image from "next/image";
import { prefixBasePath } from '@/shared/utils/path';

export default function ApplicationActionDropdown({ onSelect }: { onSelect: (option: string) => void }) {
    const [open, setOpen] = useState(false);
    const options = ["View Details", "Progress"];

    return (
        <div className="relative">
            <button
                className="px-2 rounded-full bg-gray-100 border border-gray-200 transition flex items-center justify-center"
                onClick={() => setOpen(!open)}
            >
                <Image
                    src={prefixBasePath("/more_h.png")}
                    alt="More"
                    width={20}
                    height={20}
                />
            </button>

            {open && (
                <div className="absolute right-15 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {options.map((option) => (
                        <button
                            key={option}
                            className="w-full flex items-center gap-2 text-[14px] text-left px-3 py-2 text-[#3399FF] font-[400]"
                            onClick={() => {
                                onSelect(option);
                                setOpen(false);
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: "rgba(51,153,255,0.2)" }}
                            />
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
