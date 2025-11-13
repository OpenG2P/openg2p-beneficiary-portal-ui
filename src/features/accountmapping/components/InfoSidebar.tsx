// components/InfoSidebar.tsx - Information sidebar component

import { Info } from "./FormInputs";
import type { AccountType } from "@/features/accountmapping/types";

interface InfoSidebarProps {
    accountType: AccountType;
    bank: string;
    branch: string;
    accountNumber: string;
    walletProvider: string;
    mobile: string;
    email: string;
    onRemoveAccount: () => void;
}

export function InfoSidebar({
    accountType,
    bank,
    branch,
    accountNumber,
    walletProvider,
    mobile,
    email,
    onRemoveAccount,
}: InfoSidebarProps) {
    return (
        <div className="w-[30%] bg-gray-100 p-8 flex flex-col justify-start gap-4">
            <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-4">Information</h2>

            {accountType === "bank" && (
                <>
                    <Info label="Bank Name" value={bank} />
                    <Info label="Branch" value={branch} />
                    <Info label="Account Number" value={accountNumber} />
                </>
            )}

            {accountType === "wallet" && (
                <>
                    <Info label="Wallet Provider" value={walletProvider} />
                    <Info label="Mobile Number" value={mobile} />
                </>
            )}

            <Info label="Account Linked Date" value="01 October 2025" />

            <div className="mt-6 flex flex-col items-start gap-3">
                <button
                    disabled
                    className="px-4 py-1 bg-gray-300 text-white font-[500] rounded-full w-auto cursor-not-allowed"
                >
                    Edit Account Information
                </button>
                <button
                    onClick={onRemoveAccount}
                    className="px-4 py-1 bg-[#3399FF] text-white font-[500] rounded-full w-auto"
                >
                    Remove Account
                </button>
            </div>
        </div>
    );
}