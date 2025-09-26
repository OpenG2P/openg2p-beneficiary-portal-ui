"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { AuthUtil } from "@/features/auth/components";
import { Programs, SchemeCarousel } from '@/features/program/components';
import { TotalBenefitsCard } from '@/features/disbursement/components';
import { NotificationCard } from "@/features/notification/components";
import { RegistryCard } from "@/features/registry/components";

import { ViewAll } from '@/components/shared';

import { prefixBasePath } from "@/shared/utils/path";
import { benefitsData } from '@/features/disbursement/utils/benefits';

import { Notification } from "@/features/notification/types/notification";

const previewRegistries = [
    { name: "My Healthcare Registry" },
    { name: "My Employment Registry" },
    { name: "My Housing Registry" },
    { name: "My Housing Registry" },
    { name: "My Housing Registry" },
];

const dashboardNotifications: Notification[] = [
    {
        id: "1",
        title: "Healthcare Registry Update",
        description:
            "Your healthcare registry has been successfully updated with the latest medical records.",
        image: "/logo.png",
    },
    {
        id: "2",
        title: "Employment Registry Alert",
        description:
            "Please review the changes to your employment registry details.",
        image: "/logo.png",
    },
    {
        id: "3",
        title: "Employment Registry Alert",
        description:
            "Please review the changes to your employment registry details.",
        image: "/logo.png",
    },
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
                    <Programs preview title="My Programs" />
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 h-full">
                    <div className="flex-1 rounded-xl shadow-xl">
                        <TotalBenefitsCard
                            totalAmount={totalAwaitedFunds}
                            receivedAmount={totalReceivedFunds}
                        />
                    </div>

                    <div className="bg-white rounded-xl p-4 sm:p-6 border border-black/20 shadow-xl">
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
                        <ViewAll href="/accounts" label="Edit Account Details" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                <RegistryCard registries={previewRegistries} />
                <SchemeCarousel />
                <div className="bg-white rounded-xl border border-black/20 flex-1 shadow-xl">
                    <div className="flex items-center justify-between h-16 px-6">
                        <h3 className="text-xl sm:text-xl font-bold text-gray-800">
                            Notifications / Broadcast
                        </h3>
                        <button className="p-1 rounded-full hover:bg-gray-200">
                            <Image
                                src={prefixBasePath("/menu-dots.png")}
                                alt="menu"
                                width={18}
                                height={18}
                            />
                        </button>
                    </div>

                    <div className="space-y-2 px-4 sm:px-6 py-2 max-h-[350px] overflow-y-auto">
                        {dashboardNotifications.map((n, idx) => (
                            <NotificationCard key={n.id} notification={n} compact />
                        ))}
                    </div>

                    <div className="px-4 sm:px-6 py-3">
                        <ViewAll href="/notifications" label="View More" />
                    </div>
                </div>
            </div>
        </div>
    );
}
