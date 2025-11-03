"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";

interface Action {
    slug: string;
    label: string;
}

interface Props {
    actions: Action[];
    onActionSelect: (action: string) => void;
}

export default function ActionDropdown({ actions, onActionSelect }: Props) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (actionSlug: string) => {
        setOpen(false);
        onActionSelect(actionSlug);
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div className="relative flex justify-center">
                <button
                    className="px-2 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center"
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
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 z-20"></div>
                )}
            </div>

            {open && (
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-md z-10 w-max whitespace-nowrap">
                    {actions.map((action) => (
                        <button
                            key={action.slug}
                            onClick={() => handleSelect(action.slug)}
                            className="group w-full flex items-center gap-2 text-[14px] text-left px-3 py-2 text-[#3399FF] font-[400]"
                        >
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#3399FF]"></span>
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
