"use client";

import { Program } from "@/features/program/types/program";
import Modal from "@/components/ui/Modal";

interface ApplyProgramFormProps {
    program: Program;
    onClose: () => void;
}

export default function ApplyProgramForm({ program, onClose }: ApplyProgramFormProps) {
    return (
        <Modal title="Apply Program" onClose={onClose} width="800px" height="500px">

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

            <div className="flex justify-start gap-4 w-full mt-4">
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
        </Modal>
    );
}

