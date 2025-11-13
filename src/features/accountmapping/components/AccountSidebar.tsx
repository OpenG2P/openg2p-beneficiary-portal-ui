"use client";

interface AccountSidebarProps {
    result: any;
    unlinking: boolean;
    onEdit: () => void;
    onRemove: () => void;
}

export default function AccountSidebar({ result, unlinking, onEdit, onRemove }: AccountSidebarProps) {
    return (
        <div className="w-[30%] bg-gray-100 p-8 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
                <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-2">Information</h2>
                <p className="text-[16px] text-black/70 leading-relaxed">
                    Status: {result.status || "Unknown"} <br />
                    Reason: {result.statusReason || "—"}
                </p>
            </div>

            <div className="flex-1"></div>

            <div className="flex flex-col items-start gap-3 mt-6">
                <button
                    onClick={onEdit}
                    className="px-4 py-1 bg-[#3399FF] text-white font-[500] rounded-full w-auto"
                >
                    Edit Account
                </button>

                <button
                    disabled={unlinking}
                    onClick={onRemove}
                    className="px-4 py-1 bg-red-500 text-white font-[500] rounded-full w-auto hover:bg-red-600 transition-all"
                >
                    {unlinking ? "Removing..." : "Remove Account"}
                </button>
            </div>
        </div>
    );
}
