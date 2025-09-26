"use client";

import { Program } from "@/features/program/types/program";
import Modal from "@/components/ui/Modal";

interface ApplyProgramFormProps {
    program: Program;
    onClose: () => void;
}

export default function ApplyProgramForm({ program, onClose }: ApplyProgramFormProps) {
    return (
        <Modal
            title={<span className="text-[#ED7C22] text-2xl">Apply Program</span>}
            onClose={onClose}
            width="800px"
            height="600px"
            sidebarWidth="30%"
            sidebarImage="/apply_program.png"
        >
            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-bold text-black">
                        Program Name
                    </label>
                    <input
                        type="text"
                        value={program.name}
                        disabled
                        className="mt-1 block w-full text-gray-600 rounded-md bg-gray-100 py-2 px-4"
                    />
                </div>
                <div>
                    <label
                        htmlFor="workerRegistered"
                        className="block text-sm font-bold text-black"
                    >
                        Whether Worker Registered
                    </label>
                    <select
                        id="workerRegistered"
                        className="block w-full py-2 px-4 mt-1 text-sm text-gray-600 rounded-md bg-gray-100 focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="stateWelfareMember"
                        className="block text-sm font-bold text-black"
                    >
                        Whether Member of any State Welfare Board
                    </label>
                    <select
                        id="stateWelfareMember"
                        className="block w-full py-2 px-4 mt-1 text-sm text-gray-600  rounded-md bg-gray-100 focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-black">
                        Registration Date
                    </label>
                    <input
                        type="date"
                        className="mt-1 block w-full text-gray-600  rounded-md bg-gray-100 py-2 px-4 focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex justify-start gap-4 w-full mt-16">
                <button
                    onClick={onClose}
                    className="px-8 py-1 bg-gray-100 text-black rounded-[20px] cursor-pointer"
                >
                    CANCEL
                </button>
                <button
                    className="px-8 py-1 bg-black text-white rounded-[20px] cursor-pointer"
                >
                    APPLY
                </button>
            </div>
        </Modal>
    );
}
