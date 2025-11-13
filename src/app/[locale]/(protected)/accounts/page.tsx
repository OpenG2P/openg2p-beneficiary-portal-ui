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

export default function AccountsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const { profile } = useAuth();
    const router = useRouter();

    const BASE_URL = "http://localhost:8080/mapper";
    const { handleResolve, resolving, result, error } = useResolveAccount(BASE_URL);
    const { handleUnlink, unlinking } = useUnlinkAccount(BASE_URL);

    useEffect(() => {
        handleResolve("")
    }, []);

    console.log(result)

    const profileImage = profile?.picture || prefixBasePath("/user_image.png");

    if (resolving) {
        return (
            <div className="px-[50px] py-4 min-h-screen bg-white flex flex-col justify-center items-center text-center">
                <Loading />
            </div>
        );
    }

    if (!result) {
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
                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Bank Name</label>
                            <div className="text-[16px] text-black font-[500]">{result.bankName}</div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Account Number</label>
                            <div className="text-[16px] text-black font-[500]">{result.accountNumber}</div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Branch Name</label>
                            <div className="text-[16px] text-black font-[500]">{result.branchName}</div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Branch Code</label>
                            <div className="text-[16px] text-black font-[500]">{result.branchCode}</div>
                        </div>
                    </>
                );

            case "email":
                return (
                    <>
                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Email Address</label>
                            <div className="text-[16px] text-black font-[500]">{result.emailAddress}</div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Wallet Provider</label>
                            <div className="text-[16px] text-black font-[500]">{result.walletProvider}</div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Provider Code</label>
                            <div className="text-[16px] text-black font-[500]">{result.providerCode}</div>
                        </div>
                    </>
                );

            case "phone":
                return (
                    <>
                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Mobile Number</label>
                            <div className="text-[16px] text-black font-[500]">{result.mobileNumber}</div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Wallet Provider</label>
                            <div className="text-[16px] text-black font-[500]">{result.walletProvider}</div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">Provider Code</label>
                            <div className="text-[16px] text-black font-[500]">{result.providerCode}</div>
                        </div>
                    </>
                );

            // default:
            //     return <p className="text-gray-600">Unknown account type.</p>;
        }
    };

    return (
        <div className="px-[50px] py-4 min-h-screen bg-white">
            <h1 className="text-[18px] font-[600] text-gray-800 mb-4">Account / Wallet</h1>

            <div className="flex flex-row gap-0 rounded-[10px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="w-[70%] bg-white p-8">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-6">Account Information</h2>

                    <div className="flex flex-row gap-10 items-start">
                        <Image
                            src={profileImage}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover rounded-full"
                        />

                        <div className="flex flex-col justify-start w-full space-y-4">
                            <div>
                                <div className="text-[16px] font-[500] text-black/50">Name</div>
                                <div className="text-[20px] text-[#3399FF] font-[500]">{profile?.name}</div>
                            </div>

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
                        <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-2">Information</h2>
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
                            onClick={() => handleUnlink("")}
                            className="px-4 py-1 bg-red-500 text-white font-[500] rounded-full w-auto hover:bg-red-600 transition-all"
                        >
                            {unlinking ? "Removing..." : "Remove Account"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
