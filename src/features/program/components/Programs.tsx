"use client";

import { useState } from "react";
import { Program } from "@/features/program/types/program";
import { SearchInput, Pagination } from "@/components/shared";
import { ApplyProgramForm, ProgramActionsDropdown, ProgramDetails } from "@/features/program/components";
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

export const BENEFIT_COLORS = [
    { bg: "bg-[#E3F9E5]", text: "text-[#1F8A70]" },
    { bg: "bg-[#FFF4E5]", text: "text-[#E67E22]" },
    { bg: "bg-[#E6F2FF]", text: "text-[#2980B9]" },
    { bg: "bg-[#FFF9E5]", text: "text-[#D4A017]" },
    { bg: "bg-[#F3E8FD]", text: "text-[#9B59B6]" },
    { bg: "bg-[#FFE5E5]", text: "text-[#C0392B]" },
    { bg: "bg-[#E5FFE8]", text: "text-[#27AE60]" },
    { bg: "bg-[#E5F7FF]", text: "text-[#3498DB]" },
    { bg: "bg-[#FDEDEC]", text: "text-[#E74C3C]" },
    { bg: "bg-[#F9EBEA]", text: "text-[#8E44AD]" },
    { bg: "bg-[#EAF2F8]", text: "text-[#21618C]" },
    { bg: "bg-[#FEF5E7]", text: "text-[#CA6F1E]" },
    { bg: "bg-[#E8F8F5]", text: "text-[#148F77]" },
    { bg: "bg-[#F6DDCC]", text: "text-[#A04000]" },
    { bg: "bg-[#FDEBD0]", text: "text-[#B9770E]" },
    { bg: "bg-[#E8DAEF]", text: "text-[#7D3C98]" },
    { bg: "bg-[#D6EAF8]", text: "text-[#1B4F72]" },
    { bg: "bg-[#D4EFDF]", text: "text-[#1E8449]" },
    { bg: "bg-[#FADBD8]", text: "text-[#922B21]" },
    { bg: "bg-[#EBDEF0]", text: "text-[#633974]" },
    { bg: "bg-[#D5DBDB]", text: "text-[#424949]" },
    { bg: "bg-[#F2F4F4]", text: "text-[#707B7C]" },
    { bg: "bg-[#FEF9E7]", text: "text-[#A04000]" },
    { bg: "bg-[#E8EAF6]", text: "text-[#283593]" },
];

const benefitColorMap = new Map<string, { bg: string; text: string }>();

export function getColorForBenefit(benefitMnemonic: string) {
    if (!benefitColorMap.has(benefitMnemonic)) {
        const index = benefitColorMap.size % BENEFIT_COLORS.length;
        benefitColorMap.set(benefitMnemonic, BENEFIT_COLORS[index]);
    }
    return benefitColorMap.get(benefitMnemonic)!;
}

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
        p.program_description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
    const currentItems = filteredPrograms.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

    const handleProgramActionSelect = (action: string, program: Program) => {
        switch (action) {
            case "view-details":
                setSelectedProgram(program);
                setOpenDetails(true);
                break;

            case "details-submited":
                console.log("Redirect to details submitted")
                break;

            case "progress":
                console.log("Redirect to progress")
                break;

            case "disbursement-history":
                console.log("Redirect to disbursement history")
                break;

            default:
                console.warn("Unknown program action:", action);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_0_rgba(0,0,0,0.25)] w-full border border-gray-200">
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
                            onSearch={(val) => {
                                setCurrentPage(1);
                                setSearchQuery(val);
                            }}
                            placeholder="Search"
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
                                    <th className="pl-7 pr-8 py-3 text-left">
                                        Action
                                    </th>
                                </>
                            ) : (
                                <th className="pl-9 pr-8 py-3 text-left">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((p, idx) => (
                            <tr
                                key={p.id}
                                className={`text-sm ${idx % 2 === 0 ? "bg-white" : "bg-black/5"}`}
                            >
                                <td className="px-8 py-3 text-[16px] font-[400] text-black">{p.program_mnemonic}</td>
                                <td className="px-7 py-3 flex flex-wrap gap-2">
                                    {p.benefit_codes.map((b) => {
                                        const { bg, text } = getColorForBenefit(b.benefit_code_mnemonic);
                                        return (
                                            <span
                                                key={b.id}
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}
                                            >
                                                {b.benefit_code_mnemonic}
                                            </span>
                                        );
                                    })}
                                </td>
                                {showMyPrograms ? (
                                    <>
                                        <td className="px-8 py-3 text-[16px] font-[400] text-black">{p.enrolment_date}</td>
                                        <td className="px-7 py-2 text-[16px] font-[400] text-black">
                                            <ProgramActionsDropdown
                                                onActionSelect={(action) => handleProgramActionSelect(action, p)}
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <td className="px-8 py-3">{getActionButton(p.am_i_enrolled ? "YES" : "NO", p)}</td>
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