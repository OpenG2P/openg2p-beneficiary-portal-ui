"use client";

import { useLocale } from "next-intl";

import { AuthUtil } from "@/features/auth/components";
import { ProgramTable, ApplicationCard } from '@/features/program/components';
import { TotalBenefitsCard } from '@/features/disbursement/components';
import { NotificationCard } from "@/features/notification/components";
import { RegistryCard } from "@/features/registry/components";

import { Notification } from "@/features/notification/types/notification";
import { Program, Application } from "@/features/program/types";
import { Registry } from "@/features/registry/types/registry";
import { BankCard } from "@/features/accountmapping/components";
import { useAuth } from "@/context/global";

export const programsData: Program[] = [
    { id: "1010101010", name: "Adult Literacy Drive", appliedDate: "2025-09-01", benefits: ["Books", "Classes"], status: "Applied" },
    { id: "2025202501", name: "School Supplies Initiative", appliedDate: "2025-08-15", benefits: ["Books", "Uniforms"], status: "Applied" },
    { id: "3030303030", name: "Social Registry Upgrade", appliedDate: "2025-08-10", benefits: ["Information Access"], status: "Enrolled" },
    { id: "4040404040", name: "Income Tax Assistance", appliedDate: "2025-08-20", benefits: ["Money", "Guidance"], status: "Applied" },
    { id: "6060606060", name: "Caste Certificate Facilitation", appliedDate: "2025-07-25", benefits: ["Documentation"], status: "Enrolled" },
];

export const previewRegistries: Registry[] = [
    { name: "Education Registry", id: "SW001", date: "15/08/2025", action: "Apply", description: "Tracks citizens under social welfare schemes." },
    { name: "Social Registry", id: "SW002", date: "05/08/2025", action: "Applied", description: "Tracks income tax records of citizens." },
    { name: "Income Tax Registry", id: "SW003", date: "22/07/2025", action: "Apply", description: "Records caste certificates issued to citizens." },
    { name: "Caste Certificate Registry", id: "SW004", date: "10/07/2025", action: "Apply", description: "Tracks electricity connections and usage." },
    { name: "Electricity Registry", id: "SW005", date: "28/06/2025", action: "Apply", description: "Maintains voter registration records." },
];

export const dashboardApplications: Application[] = [
    { name: "Social Registry", status: "Applied" },
    { name: "Income Tax Assistance", status: "Applied" },
    { name: "Caste Certificate Issuance", status: "Enrolled" },
    { name: "Electricity Subsidy Program", status: "Pending" },
];

export const dashboardNotifications: Notification[] = [
    {
        id: "1",
        title: "Social Welfare Programs Launched",
        description: "The government has launched new social welfare programs to support citizens across various sectors.",
        image: "/logo.png"
    },
    {
        id: "2",
        title: "Income Tax Filing Deadline Announced",
        description: "The deadline for income tax filing has been extended for this financial year. Make sure to submit your documents on time.",
        image: "/logo.png"
    },
    {
        id: "3",
        title: "Caste Certificate Issuance Updates",
        description: "New procedures have been introduced for applying and receiving caste certificates efficiently.",
        image: "/logo.png"
    },
];

export const benefits = [
    { icon: "/money.png", value: "15400", label: "Money" },
    { icon: "/rice.png", value: "42 Kg", label: "Food" },
    { icon: "/oil.png", value: "30 L", label: "Oil" },
    { icon: "/book.png", value: "12 No", label: "Books" },
];


export default function Dashboard() {

    const lang = useLocale();
    // AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const { profile } = useAuth();

    const bankAccount = { name: profile?.name || "John Smith", number: "xxxx xxxx xxxx 1234" };

    return (
        <div className="pl-[50px] py-4 min-h-screen bg-white">
            <h1 className="text-[18px] font-[600] text-gray-800 mb-2">
                Dashboard
            </h1>


            <div className="grid grid-cols-1 xl:grid-cols-3">
                <div className="xl:col-span-2 pr-[50px] pb-[50px]">
                    <ProgramTable programs={programsData} />
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 h-full pb-[50px] pr-[50px]">
                    <TotalBenefitsCard benefits={benefits} />
                    <BankCard account={bankAccount} />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 ">
                <RegistryCard registries={previewRegistries} />
                <ApplicationCard applications={dashboardApplications} />
                <NotificationCard notifications={dashboardNotifications} />
            </div>
        </div>
    );
}
