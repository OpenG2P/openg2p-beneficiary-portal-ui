"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ApplyProgramForm, Pagination } from "@/components";
import { prefixBasePath } from "@/utils/path";


type ProgramStatus = "Apply" | "Applied" | "Pending" | "Enrolled";

interface Program {
    name: string;
    status: ProgramStatus;
    id: string;
    appliedDate: string;
}

const programsData: Program[] = [
    { name: "Social Safety Net Program", status: "Apply", id: "1010101010", appliedDate: "2025-09-01 10:30 AM" },
    { name: "Pension Yojana", status: "Applied", id: "2025202501", appliedDate: "2025-08-15 09:10 AM" },
    { name: "LPG Subsidy", status: "Pending", id: "5050505050", appliedDate: "2025-08-25 05:45 PM" },
    { name: "PM-KISAN Farmer Support", status: "Enrolled", id: "3030303030", appliedDate: "2025-08-10 02:15 PM" },
    { name: "Ayushman Bharat Health Scheme", status: "Applied", id: "4040404040", appliedDate: "2025-08-20 11:45 AM" },
    { name: "Pradhan Mantri Awas Yojana", status: "Enrolled", id: "6060606060", appliedDate: "2025-07-25 03:30 PM" },
    { name: "National Rural Employment Guarantee", status: "Apply", id: "7070707070", appliedDate: "2025-08-05 09:20 AM" },
    { name: "Skill Development Program", status: "Enrolled", id: "8080808080", appliedDate: "2025-07-15 04:10 PM" },
    { name: "Digital India Initiative", status: "Apply", id: "9090909090", appliedDate: "2025-09-02 11:00 AM" },
    { name: "Startup India Support", status: "Applied", id: "1111111111", appliedDate: "2025-08-18 01:20 PM" },
    { name: "Clean Ganga Mission", status: "Pending", id: "1212121212", appliedDate: "2025-08-28 03:15 PM" },
    { name: "Swachh Bharat Abhiyan", status: "Enrolled", id: "1313131313", appliedDate: "2025-08-12 04:45 PM" },
    { name: "National Health Mission", status: "Applied", id: "1414141414", appliedDate: "2025-08-22 09:40 AM" },
    { name: "Housing for All", status: "Enrolled", id: "1515151515", appliedDate: "2025-07-28 02:30 PM" },
    { name: "Rural Skill Training", status: "Apply", id: "1616161616", appliedDate: "2025-08-06 10:10 AM" },
    { name: "Women Empowerment Program", status: "Enrolled", id: "1717171717", appliedDate: "2025-07-17 05:00 PM" },
];

export default function Programs({ preview = false }: { preview?: boolean }) {
    const [openForm, setOpenForm] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

    const total = programsData.length;
    const applied = programsData.filter((p) => p.status === "Applied").length;
    const enrolled = programsData.filter((p) => p.status === "Enrolled").length;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = preview ? 6 : 8;
    const totalPages = Math.ceil(programsData.length / itemsPerPage);

    const displayedPrograms = programsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusBadge = (status: ProgramStatus, program: Program) => {
        const baseClasses =
            "inline-flex px-2 py-1 text-sm font-medium rounded-full cursor-pointer";

        switch (status) {
            case "Apply":
                return (
                    <span
                        onClick={() => {
                            setSelectedProgram(program);
                            setOpenForm(true);
                        }}
                        className={`${baseClasses} font-bold text-black`}
                    >
                        Apply
                    </span>
                );
            case "Applied":
                return <span className={`${baseClasses} text-gray-500`}>Applied</span>;
            case "Enrolled":
                return <span className={`${baseClasses} text-gray-500`}>Enrolled</span>;
            case "Pending":
                return <span className={`${baseClasses} text-gray-500`}>Pending</span>;
            default:
                return <span className={`${baseClasses} text-gray-500`}>Unknown</span>;
        }
    };

    return (
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-black/20 transition-shadow duration-300">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed">
                    <colgroup>
                        <col style={{ width: "33.33%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "25%" }} />
                        <col style={{ width: "16.67%" }} />
                    </colgroup>

                    <thead className="border-b-4 border-gray-300">
                        <tr>
                            <th className="py-2 text-xl font-semibold text-gray-800 text-left">
                                My Programs
                            </th>
                            <th className="py-2 px-1 text-gray-600 font-normal text-left">
                                Total Programs:{" "}
                                <span className="font-bold text-black">{total}</span>
                            </th>
                            <th className="py-2 text-gray-600 font-normal text-left">
                                Applied:{" "}
                                <span className="font-bold text-black">{applied}</span>
                            </th>
                            <th className="py-2 text-gray-600 font-normal text-left">
                                Enrolled:{" "}
                                <span className="font-bold text-black">{enrolled}</span>
                            </th>
                        </tr>
                    </thead>

                    <thead className="text-gray-700 border-b-3 border-gray-200">
                        <tr>
                            <th className="py-3 text-sm font-semibold">Program Name</th>
                            <th className="py-3 px-2 text-sm font-semibold">Application Status</th>
                            <th className="py-3 text-sm font-semibold">Application ID</th>
                            <th className="py-3 text-sm font-semibold">Applied Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {displayedPrograms.map((program, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition-colors duration-150 border-b-3 border-gray-300"
                            >
                                <td className="py-3 text-gray-900 font-medium">
                                    {program.name}
                                </td>
                                <td className="py-3">
                                    {getStatusBadge(program.status, program)}
                                </td>
                                <td className="py-3 font-mono text-gray-700 text-sm">
                                    {program.id}
                                </td>
                                <td className="py-3 text-gray-600 text-sm">
                                    {preview
                                        ? program.appliedDate.split(" ")[0]
                                        : program.appliedDate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {preview ? (
                <div className="flex justify-start py-3">
                    <Link
                        href="/programs"
                        className="flex items-center text-black font-bold text-md"
                    >
                        View All
                        <Image
                            src={prefixBasePath("/right_arrow.png")}
                            alt="arrow"
                            width={12}
                            height={12}
                            className="ml-1.5 mt-0.45"
                        />
                    </Link>
                </div>
            ) : (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {openForm && selectedProgram && (
                <ApplyProgramForm
                    program={selectedProgram}
                    onClose={() => setOpenForm(false)}
                />
            )}
        </div>
    );
}

