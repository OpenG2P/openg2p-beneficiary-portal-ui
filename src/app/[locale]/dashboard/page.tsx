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

export const programsData: Program[] = [
    {
        id: "1010101010",
        name: "Social Safety Net Program",
        appliedDate: "2025-09-01",
        benefits: ["Money", "Home", "Rice", "Oil", "Books"],
        status: "Applied",
    },
    {
        id: "2025202501",
        name: "Pension Yojana",
        appliedDate: "2025-08-15",
        benefits: ["Money", "Rice", "Oil"],
        status: "Applied",
    },
    {
        id: "3030303030",
        name: "PM-KISAN Farmer Support",
        appliedDate: "2025-08-10",
        benefits: ["Money", "Rice", "Oil", "Books"],
        status: "Enrolled",
    },
    {
        id: "4040404040",
        name: "Ayushman Bharat Health Scheme",
        appliedDate: "2025-08-20",
        benefits: ["Money", "Books"],
        status: "Applied",
    },
    {
        id: "6060606060",
        name: "Pradhan Mantri Awas Yojana",
        appliedDate: "2025-07-25",
        benefits: ["Home"],
        status: "Enrolled",
    },
];

const bankAccount = { name: "John Smith", number: "xxxx xxxx xxxx 1234" };


const previewRegistries: Registry[] = [
    { name: "Healthcare Registry", id: "12938475639", date: "15/08/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Employment Registry", id: "84756392013", date: "05/08/2025", action: "Applied", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Housing Registry", id: "56473829102", date: "22/07/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Education Registry", id: "93847561029", date: "10/07/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Pension Registry", id: "38475619283", date: "28/06/2025", action: "Apply", description: "Records pension plans and disbursement details." },
];

const dashboardApplications: Application[] = [
    { name: "Social Safety Net Program", status: "Applied" },
    { name: "Pension Yojana", status: "Applied" },
    { name: "PM-KISAN Farmer Support", status: "Enrolled" },
    { name: "Ayushman Bharat Health Scheme", status: "Pending" },
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
];

const benefits = [
    { icon: "/money.png", value: "15400", label: "Money" },
    { icon: "/rice.png", value: "42 Kg", label: "Rice" },
    { icon: "/oil.png", value: "30 L", label: "Oil" },
    { icon: "/book.png", value: "12 No", label: "Books" },
];

export default function Dashboard() {

    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

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
