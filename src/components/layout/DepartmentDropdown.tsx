"use client";

import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";
import { useState } from "react";

export default function DepartmentDropdown() {
    const departments = ["Education", "Construction", "Engineering", "Civil Services"];
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const toggleDropdown = () => setOpen(!open);

    const selectDepartment = (dept: string) => {
        setSelected(dept);
        setOpen(false);
    };

    return (
        <div className="relative w-32 select-none text-sm">
            <div
                className="flex justify-between items-center bg-[#F5F5F5] rounded-[15px] px-3 py-1 cursor-pointer"
                onClick={toggleDropdown}
            >
                <span className="text-black text-[16px] font-[500]">
                    {selected || "Departments"}
                </span>
                <Image
                    src={prefixBasePath("/arrow_02.png")}
                    alt="Dropdown"
                    width={14}
                    height={14}
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </div>

            {open && (
                <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg z-10 overflow-hidden text-sm">
                    {departments.map((dept, idx) => (
                        <div
                            key={idx}
                            onClick={() => selectDepartment(dept)}
                            className="px-3 py-1.5 cursor-pointer text-black"
                        >
                            {dept}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
