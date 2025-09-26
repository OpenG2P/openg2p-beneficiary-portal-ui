"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { AuthUtil } from "@/features/auth/components";
import { Programs, SchemeCard } from '@/features/program/components';
import { TotalBenefitsCard } from '@/features/disbursement/components';
import { NotificationCard } from "@/features/notification/components";
import { RegistryCard } from "@/features/registry/components";

import { ViewAll } from '@/components/shared';

import { prefixBasePath } from "@/shared/utils/path";
import { benefitsData } from '@/features/disbursement/utils/benefits';

import { Notification } from "@/features/notification/types/notification";
import { Scheme } from "@/features/program/types";
import { Registry } from "@/features/registry/types";

const previewRegistries: Registry[] = [
    { name: "My Healthcare Registry", id: "12938475639", date: "15/08/2025", action: "Request for Update" },
    { name: "My Employment Registry", id: "84756392013", date: "05/08/2025", action: "Request for Update" },
    { name: "My Housing Registry", id: "56473829102", date: "22/07/2025", action: "Request for Update" },
    { name: "My Education Registry", id: "93847561029", date: "10/07/2025", action: "Request for Update" },
    { name: "My Pension Registry", id: "38475619283", date: "28/06/2025", action: "Request for Update" },
];

const dashboardSchemes: Scheme[] = [
    {
        id: 1,
        title: "Agriculture Subsidy",
        date: "01/05/2025",
        action: "Apply",
        description:
            "Eligible for agricultural input support to improve productivity and sustainability. This includes subsidies on seeds, fertilizers, machinery, and irrigation equipment to help farmers boost crop yield while reducing costs.",
        image: "/scheme_card.png",
    },
    {
        id: 2,
        title: "Education Grant",
        date: "01/05/2025",
        action: "Apply",
        description:
            "Supports students with financial grants for tuition, books, and resources. The grant also covers skill development programs, training workshops, and online courses to enhance career opportunities.",
        image: "/scheme_card.png",
    },
    {
        id: 3,
        title: "Healthcare Support",
        date: "01/05/2025",
        action: "Apply",
        description:
            "Offers assistance for consultations, medications, and hospital care. The scheme covers preventive health checkups, vaccination drives, and emergency treatments for low-income households.",
        image: "/scheme_card.png",
    },
];

const dashboardNotifications: Notification[] = [
    {
        id: "1",
        title: "Healthcare Registry Update",
        description:
            "Your healthcare registry has been successfully updated with the.",
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
    {
        id: "4",
        title: "Employment Registry Alert",
        description:
            "Please review the changes to your employment registry details.",
        image: "/logo.png",
    },
    {
        id: "5",
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
                <SchemeCard schemes={dashboardSchemes} />
                <NotificationCard notifications={dashboardNotifications} />
            </div>
        </div>
    );
}
