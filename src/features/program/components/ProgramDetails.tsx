"use client";

import { Program } from "@/features/program/types/program";
import Modal from "@/components/ui/Modal";

interface ProgramDetailsProps {
    program: Program;
    onClose: () => void;
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
            return { bg: "bg-gray-100", text: "text-gray-800" };
    }
};

export default function ProgramDetails({ program, onClose }: ProgramDetailsProps) {
    return (
        <Modal
            title={<span className="text-[#ED7C22] text-[24px]">Program Details</span>}
            onClose={onClose}
            width="900px"
            height="650px"
            sidebarWidth="25%"
            sidebarImage="/program_details.png"
        >
            <div className="space-y-5 px-10">
                <div>
                    <label className="block text-[16px] text-black/50 font-[600] mb-1">Program Name</label>
                    <div className="text-[16px] text-black font-[600]">{program.name}</div>
                </div>

                <div className="flex gap-8">
                    <div>
                        <label className="block text-[16px] text-black/50 font-[600] mb-1">Date</label>
                        <div className="text-[16px] text-black font-[600]">{program.appliedDate}</div>
                    </div>
                    <div>
                        <label className="block text-[16px] text-black/50 font-[600] mb-1">Application ID</label>
                        <div className="text-[16px] text-black font-[600]">{program.id}</div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-black mb-1">Benefits</label>
                    <div className="flex flex-wrap gap-2">
                        {program.benefits.map((b) => {
                            const { bg, text } = getBenefitClasses(b);
                            return (
                                <span
                                    key={b}
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}
                                >
                                    {b}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <p className="text-[16px] text-black font-normal leading-relaxed">
                        {program.description}
                    </p>
                </div>
            </div>
            <div className="flex justify-start gap-4 w-full my-8 px-10">
                <button
                    onClick={onClose}
                    className="px-8 py-2 bg-gray-100 text-black rounded-[20px]"
                >
                    CLOSE
                </button>
            </div>
        </Modal>
    );
}
