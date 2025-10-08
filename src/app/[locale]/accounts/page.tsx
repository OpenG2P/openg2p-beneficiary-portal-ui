"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { prefixBasePath } from "@/shared/utils/path";
import { AuthUtil } from "@/features/auth/components";

export default function AccountsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    return (
        <div className="px-10 py-8 bg-white min-h-screen">
            <h1 className="text-[18px] font-[600] text-gray-800 mb-2">Account/Wallet</h1>

            <div className="flex flex-row gap-0 rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="w-[70%] bg-white p-8">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-6">
                        Account Information
                    </h2>

                    <div className="flex flex-row gap-10 items-start">
                        <Image
                            src={prefixBasePath("/user_image.png")}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover"
                        />

                        <div className="flex flex-col justify-start w-full space-y-4">
                            <div>
                                <div className="text-[16px] font-[500] text-black/50">Name</div>
                                <div className="text-[20px] text-[#3399FF] font-[500]">John Doe</div>
                            </div>

                            <div>
                                <label className="block text-[16px] font-[500] text-black/50 mb-1">
                                    Bank Name
                                </label>
                                <div className="text-[16px] text-black font-[500]">
                                    State Bank of India
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-start mb-1">
                                    <label className="text-[16px] text-black/50 font-[600]">
                                        Account Number
                                    </label>
                                    <span className="ml-3 px-3 py-1 bg-green-100 text-[#00B765] rounded-full text-[14px] font-[400]">
                                        Verified
                                    </span>
                                </div>
                                <div className="text-[16px] text-black font-[500]">
                                    1234 5678 9012
                                </div>
                            </div>


                            <div>
                                <label className="block text-[16px] text-black/50 font-[500] mb-1">
                                    Branch
                                </label>
                                <div className="text-[16px] text-black font-[500]">
                                    Andheri West
                                </div>
                            </div>

                            <div>
                                <label className="block text-[16px] text-black/50 font-[500] mb-1">
                                    Address
                                </label>
                                <p className="text-[16px] text-black font-[500] leading-relaxed">
                                    102 Sunrise Apartments, JP Road, Andheri West, Mumbai - 400053
                                </p>
                            </div>
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

                <div className="w-[30%] bg-gray-100 p-8 flex flex-col justify-start gap-4">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-6">Information</h2>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Bank Name
                        </label>
                        <div className="text-[16px] text-black font-[500]">State Bank of India</div>
                    </div>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Bank Location
                        </label>
                        <div className="text-[16px] text-black font-[500]">Mumbai, Maharashtra</div>
                    </div>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Email ID
                        </label>
                        <div className="text-[16px] text-black font-[500]">john.doe@email.com</div>
                    </div>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Phone Number
                        </label>
                        <div className="text-[16px] text-black font-[500]">+91 98765 43210</div>
                    </div>

                    <div>
                        <label className="block text-[16px] font-[500] text-black/50 mb-1">
                            Account Linked Date
                        </label>
                        <div className="text-[16px] text-black font-[500]">01 October 2025</div>
                    </div>

                    <div className="mt-6 flex flex-col items-start gap-3">
                        <button className="px-4 py-1 bg-[#3399FF]/10 text-[#3399FF] font-[500] rounded-full w-auto">
                            Edit Account Information
                        </button>
                        <button className="px-4 py-1 bg-[#3399FF]/10 text-[#3399FF] font-[500] rounded-full w-auto">
                            Remove Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
