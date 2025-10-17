"use client";

import { useState } from "react";
import { Program } from "@/features/program/types/program";
import { SearchInput, Pagination } from "@/components/shared";
import { ApplyProgramForm, ProgramDetails } from "@/features/program/components";
import { prefixBasePath } from "@/shared/utils/path";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";


interface ProgramsProps {
    programs: Program[];
    showMyPrograms: boolean;
    activeTab: "all" | "my";
    setActiveTab: (tab: "all" | "my") => void;
}

const getBenefitClasses = (benefit: string) => {
    switch (benefit.toLowerCase()) {
        case "money":
            return { bg: "bg-[rgba(0,183,101,0.2)]", text: "text-[#00B765]" };
        case "rice":
            return { bg: "bg-[rgba(237,124,34,0.2)]", text: "text-[#ED7C22]" };
        case "oil":
            return { bg: "bg-[rgba(51,153,255,0.2)]", text: "text-[#3399FF]" };
        case "books":
            return { bg: "bg-[rgba(252,190,0,0.2)]", text: "text-[#FCBE00]" };
        case "home":
            return { bg: "bg-[rgba(165,84,236,0.2)]", text: "text-[#A554EC]" };
        default:
            return { bg: "bg-gray-200", text: "text-gray-800" };
    }
};

export default function Programs({ programs, showMyPrograms, activeTab, setActiveTab }: ProgramsProps) {
    const lang = useLocale();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [openForm, setOpenForm] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [openDetails, setOpenDetails] = useState(false);
    const router = useRouter();



    const itemsPerPage = 8;

    const filteredPrograms = programs.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
    const currentItems = filteredPrograms.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getBenefitBadge = (benefit: string) => {
        const { bg, text } = getBenefitClasses(benefit);
        return (
            <span
                key={benefit}
                className={`px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}
            >
                {benefit}
            </span>
        );
    };

    const getActionButton = (status: string, program: Program) => {
        if (status === "Applied") {
            return <span className="px-1 py-1 text-[#3399FF] font-medium cursor-default">Applied</span>;
        }
        return (
            <button
                onClick={() => router.push(`/${lang}/programs/apply/${program.id}`)}
                className="bg-black text-white text-sm px-3 py-1 rounded-full font-semibold hover:bg-gray-800 transition"
            >
                Apply
            </button>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-md w-full border border-gray-200">
            <div className="relative">
                <div className="absolute inset-x-0 bottom-0 h-[6px] bg-[#F5F5F5]" />

                <div className="flex items-center justify-between px-8 gap-4 flex-wrap relative z-10">
                    <div className="flex gap-2 pt-8">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-6 py-2 text-[18px] font-[600] rounded-t-[20px] transition-all ${activeTab === "all"
                                ? "bg-[#ED7C22] text-white"
                                : "bg-[#D9D9D999]/60 text-black/50"
                                }`}
                        >
                            All Programs
                        </button>
                        <button
                            onClick={() => setActiveTab("my")}
                            className={`px-6 py-2 text-[18px] font-[600] rounded-t-[20px] transition-all ${activeTab === "my"
                                ? "bg-[#ED7C22] text-white"
                                : "bg-[#D9D9D999]/60 text-black/50"
                                }`}
                        >
                            My Programs
                        </button>
                    </div>
                    <div className="flex justify-center py-6 pr-6">
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search programs"
                            className="w-[200px]"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-[#F5F5F5] text-black text-[16px] font-[700]">
                        <tr>
                            <th className="px-8 py-3 text-left">Program Name</th>
                            <th className="px-8 py-3 text-left">
                                <div className="flex items-center gap-0.5">
                                    Benefits
                                    <Image
                                        src={prefixBasePath("/updown_arrow.png")}
                                        alt="Sort"
                                        width={20}
                                        height={20}
                                        className="cursor-pointer opacity-40"
                                    />
                                </div>
                            </th>
                            {showMyPrograms ? (
                                <>
                                    <th className="px-8 py-3 text-left">
                                        <div className="flex items-center gap-0.5">
                                            Enrollment Date
                                            <Image
                                                src={prefixBasePath("/updown_arrow.png")}
                                                alt="Sort"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer opacity-40"
                                            />
                                        </div>
                                    </th>
                                    <th className="px-8 py-3 text-left">
                                        View
                                    </th>
                                </>
                            ) : (
                                <th className="px-8 py-3 text-left">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((p, idx) => (
                            <tr
                                key={p.id}
                                className={`text-sm ${idx % 2 === 0 ? "bg-white" : "bg-black/5"}`}
                            >
                                <td className="px-8 py-3 text-[16px] font-[400] text-black">{p.name}</td>
                                <td className="px-7 py-3 flex flex-wrap gap-2">
                                    {p.benefits.map(getBenefitBadge)}
                                </td>
                                {showMyPrograms ? (
                                    <>
                                        <td className="px-8 py-3 text-[16px] font-[400] text-black">{p.appliedDate}</td>
                                        <td className="px-7 py-2 text-[16px] font-[400] text-black">
                                            <button
                                                className="text-[#3399FF] bg-white border border-gray-200 px-3 py-1 rounded-full font-[500] shadow-sm hover:bg-[#3399FF]/10 transition"
                                                onClick={() => {
                                                    setSelectedProgram(p);
                                                    setOpenDetails(true);
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <td className="px-8 py-3">{getActionButton(p.status, p)}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center gap-6 px-8 py-4 text-sm text-black">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
                <div className="text-gray-600">
                    Showing{" "}
                    {Math.min((currentPage - 1) * itemsPerPage + 1, filteredPrograms.length)}–
                    {Math.min(currentPage * itemsPerPage, filteredPrograms.length)} of{" "}
                    {filteredPrograms.length}
                </div>
            </div>

            {openForm && selectedProgram && (
                <ApplyProgramForm
                    program={selectedProgram}
                    onClose={() => setOpenForm(false)} />
            )}

            {openDetails && selectedProgram && (
                <ProgramDetails
                    program={selectedProgram}
                    onClose={() => setOpenDetails(false)}
                />
            )}

        </div>
    );
}