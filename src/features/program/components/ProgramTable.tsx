"use client";
import { Program } from "@/features/program/types/program";
import { prefixBasePath } from "@/shared/utils/path";
import Image from "next/image";
import { ViewAll } from '@/components/shared';

interface ProgramTableProps {
    programs: Program[];
}

const getBenefitClasses = (benefit: string) => {
    let bgClass = "";
    let textClass = "";

    switch (benefit.toLowerCase()) {
        case "money":
            bgClass = "bg-[rgba(0,183,101,0.2)]";
            textClass = "text-[#00B765]";
            break;
        case "rice":
            bgClass = "bg-[rgba(237,124,34,0.2)]";
            textClass = "text-[#ED7C22]";
            break;
        case "oil":
            bgClass = "bg-[rgba(51,153,255,0.2)]";
            textClass = "text-[#3399FF]";
            break;
        case "books":
            bgClass = "bg-[rgba(252,190,0,0.2)]";
            textClass = "text-[#FCBE00]";
            break;
        case "home":
            bgClass = "bg-[rgba(165,84,236,0.2)]";
            textClass = "text-[#A554EC]";
            break;
        default:
            bgClass = "bg-gray-100";
            textClass = "text-gray-800";
            break;
    }

    return { bgClass, textClass };
};

export default function ProgramTable({ programs }: ProgramTableProps) {
    return (
        <div className="bg-white rounded-[10px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] w-full  overflow-hidden">
            <div className="flex justify-between items-center px-8 pt-[37px] pb-[12px]">
                <h2 className="text-[20px]/[20px] font-[600] text-[#ED7C22]">My Programs</h2>
                <button className="hover:bg-gray-100 rounded-full transition">
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
                                <td className="px-[30px] text-[16px] font-[400] text-black">{program.name}</td>
                                <td className="px-[30px] text-[16px] font-[400] text-black">{program.appliedDate}</td>
                                <td className="py-[10px] text-[16px] font-[400] flex flex-wrap gap-2">
                                    {(program.benefits || []).map((benefit, idx) => {
                                        const { bgClass, textClass } = getBenefitClasses(benefit);
                                        return (
                                            <span
                                                key={idx}
                                                className={`px-3 py-1 rounded-full text-[14px] font-medium ${bgClass} ${textClass}`}
                                            >
                                                {benefit}
                                            </span>
                                        );
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="h-3 bg-[#F5F5F5] w-full"></div>
            </div>

            <div className="px-8 pb-[18px]">
                <ViewAll href="/programs" label="View all Programs" bgColor="bg-[#F5F5F5]" />
            </div>
        </div>
    );
}
