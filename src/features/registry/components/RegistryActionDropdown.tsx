import { useState, Fragment } from "react";
import Image from "next/image";
import { prefixBasePath } from '@/shared/utils/path';
import { Registry } from "@/features/registry/types";


export default function RegistryActionDropdown({ registry, onSelect }: { registry: Registry; onSelect: (option: string) => void }) {
    const [open, setOpen] = useState(false);

    const options = [
        "View Details",
        "Request For Address Change",
        "Request For Change Phone Number",
        "Request For Location Change",
    ];

    return (
        <div className="relative">
            <div className="py-1">
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
            </div>


            {open && (
                <div className="absolute right-0 mt-2 w-65 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {options.map((option) => (
                        <button
                            key={option}
                            className="w-full flex items-center gap-2 text-[14px] text-left px-2 py-2 text-[#3399FF] font-[400]"
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
