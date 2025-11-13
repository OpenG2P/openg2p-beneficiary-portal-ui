"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { prefixBasePath } from "@/shared/utils/path";
import { AuthUtil } from "@/features/auth/components";
import { useAuth } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { useResolveAccount } from "@/features/accountmapping/hooks/useResolveAccount";
import { useUnlinkAccount } from "@/features/accountmapping/hooks/useUnlinkAccount";
import { Loading } from "@/components";
import AccountRemoveModal from "@/features/accountmapping/components/AccountRemoveModal";
export default function AccountsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const { profile } = useAuth();
    const router = useRouter();

    const BASE_URL = "http://localhost:8080/mapper";
    const { handleResolve, resolving, result, error } = useResolveAccount(BASE_URL);
    const { handleUnlink, unlinking } = useUnlinkAccount(BASE_URL);

    const [showRemoveModal, setShowRemoveModal] = useState(false);

    useEffect(() => {
        handleResolve("");
    }, []);

    const profileImage = profile?.picture || prefixBasePath("/user_image.png");

    const confirmRemoveHandler = async () => {
        try {
            await handleUnlink("");
            setShowRemoveModal(false);
            await handleResolve("");
        } catch (err) {
            console.error("❌ Failed to unlink account:", err);
        }
    };

    if (resolving) {
        return (
            <div className="px-[50px] py-4 min-h-screen bg-white flex flex-col justify-center items-center text-center">
                <Loading />
            </div>
        );
    }

    if (result?.type === "unknown") {
        return (
            <div className="px-[50px] py-4 min-h-screen bg-white flex flex-col justify-center items-center text-center">
                <h1 className="text-[22px] font-[600] text-gray-800 mb-4">
                    No Linked Account Found
                </h1>
                <p className="text-[16px] text-gray-600 mb-6 max-w-[400px]">
                    You currently don’t have any linked account or wallet. Please link an account to proceed.
                </p>
                <button
                    onClick={() => router.push(`/${lang}/accounts/update`)}
                    className="px-6 py-2 bg-[#3399FF] text-white font-[500] rounded-full hover:bg-[#2780D7] transition-all"
                >
                    Link Account
                </button>
            </div>
        );
    }

    const renderAccountUI = () => {
        switch (result.type) {
            case "bank":
                return (
                    <>
                        <Field label="Bank Name" value={result.bankName} />
                        <Field label="Account Number" value={result.accountNumber} />
                        <Field label="Branch Name" value={result.branchName} />
                        <Field label="Branch Code" value={result.branchCode} />
                    </>
                );
            case "email":
                return (
                    <>
                        <Field label="Email Address" value={result.emailAddress} />
                        <Field label="Wallet Provider" value={result.walletProvider} />
                        <Field label="Provider Code" value={result.providerCode} />
                    </>
                );
            case "phone":
                return (
                    <>
                        <Field label="Mobile Number" value={result.mobileNumber} />
                        <Field label="Wallet Provider" value={result.walletProvider} />
                        <Field label="Provider Code" value={result.providerCode} />
                    </>
                );
        }
    };

    return (
        <>
            <div className="px-[50px] py-4 min-h-screen bg-white">
                <h1 className="text-[18px] font-[600] text-gray-800 mb-4">Account / Wallet</h1>

                <div className="flex flex-row gap-0 rounded-[10px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden">
                    <div className="w-[70%] bg-white p-8">
                        <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-6">
                            Account Information
                        </h2>

                        <div className="flex flex-row gap-10 items-start">
                            <Image
                                src={profileImage}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="object-cover rounded-full"
                            />

                            <div className="flex flex-col justify-start w-full space-y-4">
                                <Field label="Name" value={profile?.name} highlight />
                                {renderAccountUI()}
                            </div>
                        </div>

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

                    <div className="w-[30%] bg-gray-100 p-8 flex flex-col justify-between gap-4">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-2">
                                Information
                            </h2>
                            <p className="text-[16px] text-black/70 leading-relaxed">
                                Status: {result.status || "Unknown"} <br />
                                Reason: {result.statusReason || "—"}
                            </p>
                        </div>

                        <div className="flex-1"></div>

                        <div className="flex flex-col items-start gap-3 mt-6">
                            <button
                                onClick={() => router.push(`/${lang}/accounts/update`)}
                                className="px-4 py-1 bg-[#3399FF] text-white font-[500] rounded-full w-auto"
                            >
                                Edit Account
                            </button>

                            <button
                                disabled={unlinking}
                                onClick={() => setShowRemoveModal(true)} // ✅ opens modal
                                className="px-4 py-1 bg-red-500 text-white font-[500] rounded-full w-auto hover:bg-red-600 transition-all"
                            >
                                {unlinking ? "Removing..." : "Remove Account"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showRemoveModal && (
                <AccountRemoveModal
                    onClose={() => setShowRemoveModal(false)}
                    onConfirm={confirmRemoveHandler}
                />
            )}
        </>
    );
}

function Field({
    label,
    value,
    highlight,
}: {
    label: string;
    value: string | undefined;
    highlight?: boolean;
}) {
    return (
        <div>
            <label className="block text-[16px] font-[500] text-black/50 mb-1">{label}</label>
            <div
                className={`text-[16px] font-[500] ${highlight ? "text-[#3399FF]" : "text-black"
                    }`}
            >
                {value || "—"}
            </div>
        </div>
    );
}

