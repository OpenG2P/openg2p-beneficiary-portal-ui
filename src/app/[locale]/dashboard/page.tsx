"use client";

import Image from "next/image";
import Link from "next/link";
import { Programs, TotalBenefitsCard } from "@/components";
import { AuthUtil } from "@/components/Auth";
import { prefixBasePath } from "@/utils/path";

import { benefitsData } from "@/utils/benefits";
import { useLocale } from "next-intl";


const previewRegistries = [
    { name: "My Healthcare Registry" },
    { name: "My Employment Registry" },
    { name: "My Housing Registry" },
];

export default function Dashboard() {

    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const totalAwaitedFunds = benefitsData.reduce(
        (sum, b) => sum + b.awaitedFunds,
        0
    );
    const totalReceivedFunds = benefitsData.reduce(
        (sum, b) => sum + b.receivedFunds,
        0
    );

    return (
        <div className="px-10 py-4 min-h-screen bg-white">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="xl:col-span-2">
                    <Programs preview />
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 h-full">
                    <div className="flex-1">
                        <TotalBenefitsCard
                            totalAmount={totalAwaitedFunds}
                            receivedAmount={totalReceivedFunds}
                            link="/benefits"
                        />
                    </div>

                    <div className="bg-white rounded-xl p-4 sm:p-6 border border-black/20 transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-0.5">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                                Bank Accounts
                            </h3>
                            <Image
                                src={prefixBasePath("/spar.png")}
                                alt="spar"
                                width={58}
                                height={24}
                            />
                        </div>

                        <p className="text-lg text-gray-600 mb-1">Current linked account</p>
                        <div className="border-b-4 border-gray-200 mb-4"></div>

                        <div className="space-y-3">
                            <div>
                                <p className="font-medium text-black">John Smith</p>
                            </div>
                            <div>
                                <p className="font-medium text-black">xxxx xxxx xxxx 1234</p>
                            </div>
                        </div>

                        <div className="flex justify-start mt-4">
                            <Link
                                href="/accounts"
                                className="flex items-center text-black font-bold text-sm sm:text-base"
                            >
                                Edit Account Details
                                <Image
                                    src={prefixBasePath("/right_arrow.png")}
                                    alt="arrow"
                                    width={12}
                                    height={12}
                                    className="ml-1.5"
                                />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl p-4 sm:p-6 border border-black/20 flex-1">
                    <h3 className="text-xl sm:text-xl font-bold text-gray-800 mb-1">
                        My Registries
                    </h3>

                    <div className="border-b-4 border-gray-300 mb-3"></div>

                    <div className="space-y-3 sm:space-y-4">
                        {previewRegistries.map((registry, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b-3 border-gray-300">
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                                        {registry.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-start mt-4">
                        <Link
                            href="/registries"
                            className="flex items-center text-black font-bold text-sm sm:text-base"
                        >
                            View All
                            <Image
                                src={prefixBasePath("/right_arrow.png")}
                                alt="arrow"
                                width={12}
                                height={12}
                                className="ml-1.5"
                            />
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 border border-black/20 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                        Potential Application Scheme
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                        <div className="p-2 sm:p-3 border-l-4 border-green-500 bg-green-50">
                            <p className="font-semibold text-green-800 text-sm sm:text-base">
                                Agriculture Subsidy
                            </p>
                            <p className="text-xs sm:text-sm text-green-600">
                                Eligible • Apply Now
                            </p>
                        </div>
                        <div className="p-2 sm:p-3 border-l-4 border-blue-500 bg-blue-50">
                            <p className="font-semibold text-blue-800 text-sm sm:text-base">
                                Education Grant
                            </p>
                            <p className="text-xs sm:text-sm text-blue-600">
                                Pending Documents
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-6 border border-black/20 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                        Notifications
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-800">
                                    Payment Received
                                </p>
                                <p className="text-xs text-gray-600">
                                    ₹2,000 credited in PM-KISAN
                                </p>
                                <p className="text-xs text-gray-400">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-yellow-50 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-800">
                                    Document Required
                                </p>
                                <p className="text-xs text-gray-600">
                                    Submit income proof for subsidy
                                </p>
                                <p className="text-xs text-gray-400">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
