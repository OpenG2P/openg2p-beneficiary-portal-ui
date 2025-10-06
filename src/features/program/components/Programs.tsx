"use client";
import { useState } from "react";
import Image from "next/image";

import ApplyProgramForm from '@/features/program/components/ApplyProgramForm';
import { ProgramStatus, Program } from "@/features/program/types/program";

import { Pagination, ViewAll, SearchInput } from '@/components/shared';
import { usePagination } from "@/shared/hooks/usePagination";
import { prefixBasePath } from "@/shared/utils/path"

interface ProgramsProps {
    programs: Program[];
    preview?: boolean;
    title?: string;
}

export default function Programs({ programs, preview = false, title = "All Programs" }: ProgramsProps) {
    const [openForm, setOpenForm] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

    const total = programs.length;
    const applied = programs.filter((p) => p.status === "Applied").length;
    const enrolled = programs.filter((p) => p.status === "Enrolled").length;

    const itemsPerPage = preview ? 6 : 8;
    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(programs, itemsPerPage);

    const [searchQuery, setSearchQuery] = useState("");

    const getStatusBadge = (status: ProgramStatus, program: Program) => {
        const baseClasses = "inline-flex px-2 py-1 text-sm rounded-full cursor-pointer";

        switch (status) {
            case "Apply":
                return (
                    <span
                        onClick={() => {
                            setSelectedProgram(program);
                            setOpenForm(true);
                        }}
                        className={`${baseClasses} font-bold text-[#3399FF] bg-[#3399FF1F]`}
                    >
                        Apply
                    </span>
                );
            case "Applied":
                return (
                    <span className={`${baseClasses} font-medium text-[#ED7C22] bg-[#ED7C221F]`}>
                        Applied
                    </span>
                );
            case "Enrolled":
                return (
                    <span className={`${baseClasses} font-medium text-[#00B765] bg-[#00B7651F]`}>
                        Enrolled
                    </span>
                );
            case "Pending":
                return <span className={`${baseClasses} text-gray-500 bg-gray-100`}>Pending</span>;
            default:
                return <span className={`${baseClasses} text-gray-500 bg-gray-100`}>Unknown</span>;
        }

    };

    return (
        <div className="bg-white rounded-xl shadow-xl w-full border border-black/20">
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse table-fixed">
                    <colgroup>
                        <col className="w-3/10" />
                        <col className="w-2.5/10" />
                        <col className="w-2.5/10" />
                        <col className="w-2/10" />
                    </colgroup>

                    {preview ? (
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-xl font-semibold text-[#ED7C22] text-left">
                                    {title}
                                </th>
                                <th className="px-6 py-4 text-gray-900 font-normal text-left">
                                    Total: <span className="font-bold text-black">{total}</span>
                                </th>
                                <th className="px-6 py-4 text-gray-900 font-normal text-left">
                                    Applied: <span className="font-bold text-[#ED7C22]">{applied}</span>
                                </th>
                                <th className="px-6 py-4 text-gray-900 font-normal text-left">
                                    Enrolled: <span className="font-bold text-[#00B765]">{enrolled}</span>
                                </th>
                            </tr>
                        </thead>
                    ) : (
                        <thead>
                            <tr className="relative">
                                <th className="px-6 py-4 text-left relative">
                                    <span className="text-xl font-semibold text-[#ED7C22]">{title}</span>

                                    <span
                                        className="absolute left-3/5 mt-1 text-md font-light text-black"
                                    >
                                        Total: <span className={`font-bold ${!preview ? "text-[#3399FF]" : "text-black"}`}>{total}</span>
                                    </span>
                                </th>

                                <th className="px-6 py-4 text-gray-900 font-normal text-left">
                                    Applied: <span className="font-bold text-[#ED7C22]">{applied}</span>
                                </th>

                                <th className="px-6 py-4 text-gray-900 font-normal text-left">
                                    Enrolled: <span className="font-bold text-[#00B765]">{enrolled}</span>
                                </th>

                                <th className="px-3 py-4 text-left relative">
                                    <SearchInput
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                        placeholder="Search"
                                        className="w-50"
                                        onIconClick={() => console.log("Search triggered:", searchQuery)}
                                    />
                                </th>
                            </tr>
                        </thead>
                    )}

                    <thead className="text-gray-900 bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-sm font-bold w-full">Program Name</th>
                            <th className="px-6 py-3 text-sm font-bold w-full flex items-center">
                                Application Status
                                <Image
                                    src={prefixBasePath("/updown_arrow.png")}
                                    alt="Sort"
                                    width={20}
                                    height={20}
                                    className="inline-block cursor-pointer opacity-40"
                                />
                            </th>
                            <th className="px-6 py-3 text-sm font-bold w-full">Application ID</th>
                            <th className="px-6 py-3 text-sm font-bold w-full flex items-center">
                                {preview ? "Applied Date" : "Applied Date & Time"}
                                <Image
                                    src={prefixBasePath("/updown_arrow.png")}
                                    alt="Sort"
                                    width={20}
                                    height={20}
                                    className="inline-block cursor-pointer opacity-40"
                                />
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.map((program, index) => (
                            <tr
                                key={index}
                                className={`transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                            >
                                <td className="px-6 py-3 text-gray-900 font-medium w-full">{program.name}</td>
                                <td className="px-6 py-3 w-full">{getStatusBadge(program.status, program)}</td>
                                <td className="px-6 py-3 font-mono text-gray-700 text-sm w-full">
                                    {program.status === "Apply" ? "--" : program.id}
                                </td>
                                <td className="px-6 py-3 text-gray-700 text-sm w-full">
                                    {program.status === "Apply"
                                        ? "---"
                                        : preview
                                            ? program.appliedDate.split(" ")[0]
                                            : program.appliedDate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="m-4">
                {preview ? (
                    <ViewAll href="/programs" label="View All Programs" bgColor="bg-gray-100" />
                ) : (
                    <div className="px-2">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                )}
            </div>

            {openForm && selectedProgram && (
                <ApplyProgramForm program={selectedProgram} onClose={() => setOpenForm(false)} />
            )}
        </div>
    );
}
