"use client";
import { Program } from "@/features/program/types/program";
import { prefixBasePath } from "@/shared/utils/path";
import Image from "next/image";
import { ViewAll } from '@/components/shared';
import { getColorForBenefit } from "@/features/program/utils/benefitColors"
import { ProgramTablePlaceholderRow, ProgramTableEmptyRow } from "@/features/program/components";

interface ProgramTableProps {
    programs: Program[];
    loading: boolean;
}

export default function ProgramTable({ programs, loading }: ProgramTableProps) {
    const emptyRowsCount = Math.max(5 - programs.length, 0);

    return (
        <div className="bg-white rounded-[10px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] w-full  overflow-hidden">
            <div className="flex justify-between items-center px-8 pt-[37px] pb-[12px]">
                <h2 className="text-[20px]/[20px] font-[600] text-[#ED7C22]">My Programs</h2>
                <button className="hover:bg-gray-100 rounded-full transition p-1">
                    <Image
                        src={prefixBasePath("/more.png")}
                        alt="More"
                        width={18}
                        height={18}
                        className="object-contain"
                    />
                </button>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse table-auto">
                    <colgroup>
                        <col className="w-3/10" />
                        <col className="w-3/10" />
                        <col className="w-4/10" />
                    </colgroup>

                    <thead className="bg-[#F5F5F5]">
                        <tr className="h-[50px]">
                            <th className="px-[30px] text-[16px] font-[700] text-black">Program Name</th>
                            <th className="px-[30px] text-[16px] font-[700] text-black">
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
                            <th className="text-[16px] font-[700] text-black">
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
                        </tr>
                    </thead>

                    <tbody>
                        {programs.map((program, index) => (
                            <tr key={program.id} className={`${index % 2 === 0 ? "bg-white h-[50px]" : "bg-[#F5F5F5] h-[50px]"}`} >
                                <td className="px-[30px] text-[16px] font-[400] text-black">{program.program_mnemonic}</td>
                                <td className="px-[30px] text-[16px] font-[400] text-black">{program.enrolment_date}</td>
                                <td className="py-[10px] text-[16px] font-[400] flex flex-wrap gap-2">
                                    {program.benefit_codes.map((b) => {
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
                            </tr>
                        ))}

                        {loading &&
                            [...Array(5)].map((_, i) => (
                                <ProgramTablePlaceholderRow key={`loading-${i}`} index={programs.length + i} />
                            ))
                        }

                        {!loading &&
                            [...Array(emptyRowsCount)].map((_, i) => (
                                <ProgramTableEmptyRow key={`empty-${i}`} index={programs.length + i} />
                            ))
                        }
                    </tbody>
                </table>
                <div className="h-2 bg-[#F5F5F5] w-full"></div>
            </div>

            <div className="pb-[18px]">
                <ViewAll
                    href="/programs"
                    label="View all Programs"
                    bgColor="#F5F5F5"
                    hoverBgColor="#ED7C22"
                    hoverTextColor="#FFFFFF"
                />
            </div>
        </div>
    );
}
