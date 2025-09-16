"use client";
import Image from "next/image";
import { prefixBasePath } from "@/utils/path";

type ProgramStatus = "Apply" | "Applied" | "Pending" | "Enrolled";

interface Program {
    name: string;
    status: ProgramStatus;
    id: string;
    appliedDate: string;
}

interface ApplyProgramFormProps {
    program: Program;
    onClose: () => void;
}

export default function ApplyProgramForm({ program, onClose }: ApplyProgramFormProps) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[800px] h-[600px] p-8 relative opacity-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Apply Program</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <Image
                            src={prefixBasePath("/x.png")}
                            alt="Close"
                            width={20}
                            height={20}
                            priority
                        />
                    </button>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Program Name
                        </label>
                        <input
                            type="text"
                            value={program.name}
                            disabled
                            className="mt-1 block w-full text-black rounded-md bg-[#D9D9D9] p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Whether Worker Registered
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full text-black rounded-md bg-[#D9D9D9] p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Whether Member of any State Welfare Board
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full text-black rounded-md bg-[#D9D9D9] p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Registration Date
                        </label>
                        <input
                            type="date"
                            className="mt-1 block w-full text-black rounded-md bg-[#D9D9D9] p-2"
                        />
                    </div>
                </div>
                <div className="flex justify-start gap-4 mt-8">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-[#D9D9D9] text-black rounded-md cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-5 py-2 bg-black text-white rounded-md cursor-pointer"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

