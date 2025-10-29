"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { prefixBasePath } from "@/shared/utils/path";
import { AuthUtil } from "@/features/auth/components";
import { useAuth } from "@/context/GlobalContext";
import { useState } from "react";
import { AccountSuccessModal, AccountErrorModal, AccountRemoveModal } from "@/features/accountmapping/components";

export default function AccountUpdatePage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });
    const { profile } = useAuth();

    const profileImage = profile?.picture || prefixBasePath("/user_image.png");

    const bankOptions = ["State Bank of India", "HDFC Bank", "ICICI Bank"];
    const branchOptions = ["Andheri West", "Bandra East", "Powai"];

    const [bank, setBank] = useState(bankOptions[0]);
    const [branch, setBranch] = useState(branchOptions[0]);
    const [accountNumber, setAccountNumber] = useState("1234 5678 9012");
    const [mobile, setMobile] = useState(profile?.phone_number || "");
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ bank, branch, accountNumber, mobile });
    };
    return (
        <div className="relative px-10 py-8 bg-white min-h-screen">
            <h1 className="text-[18px] font-[600] text-gray-800 mb-2">Update Account</h1>

            <div className="flex flex-row gap-0 rounded-lg shadow-[0_4px_20px_0_rgba(0,0,0,0.25)] overflow-hidden border border-gray-200">
                <div className="w-[70%] bg-white p-8">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-6">
                        Edit Account Information
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-row gap-10 items-start">
                        <Image
                            src={profileImage}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover rounded-full"
                        />

                        <div className="flex flex-col justify-start w-full space-y-4">
                            <div>
                                <div className="text-[16px] font-[500] text-black">Name</div>
                                <div className="text-[20px] text-[#3399FF] font-[500]">
                                    {profile?.name}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[16px] text-black font-[500] mb-1">
                                    Bank Name
                                </label>
                                <select
                                    value={bank}
                                    onChange={(e) => setBank(e.target.value)}
                                    className="w-1/2 bg-gray-100 rounded-lg px-3 py-2 text-[16px] font-[500] text-black focus:outline-none"
                                >
                                    {bankOptions.map((b) => (
                                        <option key={b} value={b}>
                                            {b}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[16px] text-black font-[500] mb-1">
                                    Branch
                                </label>
                                <select
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="w-1/2 bg-gray-100 rounded-lg px-3 py-2 text-[16px] font-[500] text-black focus:outline-none"
                                >
                                    {branchOptions.map((br) => (
                                        <option key={br} value={br}>
                                            {br}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[16px] text-black font-[500] mb-1">
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    className="w-1/2 bg-gray-100 rounded-lg px-3 py-2 text-[16px] font-[500] text-black focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[16px] text-black font-[500] mb-1">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="w-1/2 bg-gray-100 rounded-lg px-3 py-2 text-[16px] font-[500] text-black focus:outline-none"
                                />
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-6 py-2 bg-[#D9D9D999] text-black font-[500] rounded-full"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white font-[500] rounded-full"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-40 pl-20">
                        <label className="block text-[16px] text-black/50 font-[500] mb-1">
                            Powered By
                        </label>
                        <Image
                            src={prefixBasePath("/spar_acc.png")}
                            alt="SPAR Logo"
                            width={100}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="w-[30%] bg-gray-100 p-8 flex flex-col justify-start gap-4">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-4">Information</h2>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Bank Name
                        </label>
                        <div className="text-[16px] text-black font-[500]">{bank}</div>
                    </div>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Bank Location
                        </label>
                        <div className="text-[16px] text-black font-[500]">{branch}</div>
                    </div>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Email ID
                        </label>
                        <div className="text-[16px] text-black font-[500]">{profile?.email}</div>
                    </div>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Phone Number
                        </label>
                        <div className="text-[16px] text-black font-[500]">{mobile}</div>
                    </div>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Account Linked Date
                        </label>
                        <div className="text-[16px] text-black font-[500]">01 October 2025</div>
                    </div>

                    <div className="mt-6 flex flex-col items-start gap-3">
                        <button
                            disabled
                            className="px-4 py-1 bg-gray-300 text-white font-[500] rounded-full w-auto cursor-not-allowed"
                        >
                            Edit Account Information
                        </button>
                        <button className="px-4 py-1 bg-[#3399FF] text-white font-[500] rounded-full w-auto">
                            Remove Account
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <AccountSuccessModal
                    onClose={() => setShowModal(false)}
                    onBack={() => window.history.back()}
                />
            )}

            {showErrorModal && (
                <AccountErrorModal
                    onClose={() => setShowErrorModal(false)}
                />
            )}

            {showRemoveModal && (
                <AccountRemoveModal
                    onClose={() => setShowRemoveModal(false)}
                    onConfirm={() => setShowRemoveModal(false)}
                />
            )}
        </div>
    );
}
