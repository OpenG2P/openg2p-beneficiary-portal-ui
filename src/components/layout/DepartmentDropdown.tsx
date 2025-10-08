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
            <div
                className="flex justify-between items-center bg-[#F5F5F5] rounded-[15px] px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-[#EBEBEB]"
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
                    className={`ml-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </div>

            <div
                className={`absolute top-0 left-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 min-w-[200px] transition-all duration-300 ease-in-out ${open
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
            >
                <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-black font-semibold text-sm">
                        Departments
                    </span>
                    <button
                        onClick={toggleDropdown}
                        className="p-1 rounded-full transition-colors duration-200 hover:bg-gray-100"
                    >
                        <Image
                            src={prefixBasePath("/arrow_02.png")}
                            alt="Close"
                            width={14}
                            height={14}
                            className="rotate-180 transition-transform duration-300"
                        />
                    </button>
                </div>

                <div className="py-2 px-2">
                    {departments.map((dept, idx) => (
                        <div
                            key={idx}
                            onClick={() => selectDepartment(dept)}
                            className={`flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-orange-50 group ${selected === dept ? "bg-orange-50" : ""
                                }`}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></span>
                            <span
                                className={`text-sm transition-colors duration-300 ${selected === dept
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
        </div>
    );
}