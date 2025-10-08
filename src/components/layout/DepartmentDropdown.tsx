"use client";

import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";
import { useState, useRef, useEffect } from "react";

export default function DepartmentDropdown() {
    const departments = ["Education", "Construction", "Civil Services"];
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setOpen(!open);

    const selectDepartment = (dept: string) => {
        setSelected(dept);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative w-fit select-none text-sm" ref={dropdownRef}>
            {open ? (
                <div className="absolute -top-4 left-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 min-w-[200px] animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex justify-between items-center px-4 py-2">
                        <span className="text-black font-semibold text-sm">
                            Departments
                        </span>
                        <button
                            onClick={toggleDropdown}
                            className="p-1 rounded-full transition-colors"
                        >
                            <Image
                                src={prefixBasePath("/arrow_02.png")}
                                alt="Close"
                                width={14}
                                height={14}
                                className="rotate-180"
                            />
                        </button>
                    </div>

                    <div className="py-2 px-2">
                        {departments.map((dept, idx) => (
                            <div
                                key={idx}
                                onClick={() => selectDepartment(dept)}
                                className={`flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer transition-all duration-150 hover:bg-orange-50 group ${selected === dept ? "bg-orange-50" : ""
                                    }`}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                                <span
                                    className={`text-sm ${selected === dept
                                        ? "font-medium text-orange-600"
                                        : "text-gray-700"
                                        }`}
                                >
                                    {dept}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    className="flex justify-between items-center bg-[#F5F5F5] rounded-[15px] px-4 py-2 cursor-pointer transition-all duration-200 hover:bg-[#EBEBEB]"
                    onClick={toggleDropdown}
                >
                    <span className="text-black text-[16px] font-medium whitespace-nowrap">
                        {selected || "Departments"}
                    </span>
                    <Image
                        src={prefixBasePath("/arrow_02.png")}
                        alt="Open"
                        width={14}
                        height={14}
                        className="ml-3"
                    />
                </div>
            )}
        </div>
    );
}