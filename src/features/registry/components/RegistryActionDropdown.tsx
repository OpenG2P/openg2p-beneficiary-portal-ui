import { useState, Fragment } from "react";
import Image from "next/image";
import { prefixBasePath } from '@/shared/utils/path';
import { Registry } from "@/features/registry/types";


interface Props {
    registry: Registry;
    onActionSelect: (action: string) => void;
}

const actions = [
    { slug: "view-details", label: "View Details" },
    { slug: "request-registry-details", label: "Registry Details" },
    { slug: "request-address-change", label: "Change Address" },
];

export default function RegistryActionDropdown({ registry, onActionSelect }: Props) {
    const [open, setOpen] = useState(false);

    const handleSelect = (actionSlug: string) => {
        setOpen(false);
        onActionSelect(actionSlug);
    };

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
                <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                    {actions.map((action) => (
                        <button
                            key={action.slug}
                            onClick={() => handleSelect(action.slug)}
                            className="w-full flex items-center gap-2 text-[14px] text-left px-2 py-2 text-[#3399FF] font-[400]"
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: "rgba(51,153,255,0.2)" }}
                            />
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
