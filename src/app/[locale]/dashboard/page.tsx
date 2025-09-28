"use client";

import { useLocale } from "next-intl";

import { AuthUtil } from "@/features/auth/components";
import { Programs, SchemeCard } from '@/features/program/components';
import { TotalBenefitsCard } from '@/features/disbursement/components';
import { NotificationCard } from "@/features/notification/components";
import { RegistryCard } from "@/features/registry/components";

import { Notification } from "@/features/notification/types/notification";
import { Program, Scheme } from "@/features/program/types";
import { Registry } from "@/features/registry/types/registry";
import { Benefit } from "@/features/disbursement/types/benefit";
import { BankCard } from "@/features/accountmapping/components";

const programsData: Program[] = [
    { name: "Social Safety Net Program", status: "Applied", id: "1010101010", appliedDate: "2025-09-01 10:30 AM" },
    { name: "Pension Yojana", status: "Applied", id: "2025202501", appliedDate: "2025-08-15 09:10 AM" },
    { name: "PM-KISAN Farmer Support", status: "Enrolled", id: "3030303030", appliedDate: "2025-08-10 02:15 PM" },
    { name: "Ayushman Bharat Health Scheme", status: "Applied", id: "4040404040", appliedDate: "2025-08-20 11:45 AM" },
    { name: "Pradhan Mantri Awas Yojana", status: "Enrolled", id: "6060606060", appliedDate: "2025-07-25 03:30 PM" },
    { name: "Skill Development Program", status: "Enrolled", id: "8080808080", appliedDate: "2025-07-15 04:10 PM" },
    { name: "Digital India Initiative", status: "Applied", id: "9090909090", appliedDate: "2025-09-02 11:00 AM" },
    { name: "Startup India Support", status: "Applied", id: "1111111111", appliedDate: "2025-08-18 01:20 PM" },
    { name: "Clean Ganga Mission", status: "Apply", id: "1212121212", appliedDate: "2025-08-28 03:15 PM" },
    { name: "Swachh Bharat Abhiyan", status: "Enrolled", id: "1313131313", appliedDate: "2025-08-12 04:45 PM" },
    { name: "National Health Mission", status: "Applied", id: "1414141414", appliedDate: "2025-08-22 09:40 AM" },
    { name: "Housing for All", status: "Enrolled", id: "1515151515", appliedDate: "2025-07-28 02:30 PM" },
    { name: "Rural Skill Training", status: "Apply", id: "1616161616", appliedDate: "2025-08-06 10:10 AM" },
    { name: "Women Empowerment Program", status: "Enrolled", id: "1717171717", appliedDate: "2025-07-17 05:00 PM" },
    { name: "LPG Subsidy", status: "Pending", id: "5050505050", appliedDate: "2025-08-25 05:45 PM" },
    { name: "National Rural Employment Guarantee", status: "Apply", id: "7070707070", appliedDate: "2025-08-05 09:20 AM" },
];


export const benefitsData: Benefit[] = [
    {
        programName: "Openg2p-Safety-Net-Program",
        entitlementRefNumber: "983789327978",
        awaitedFunds: 45000,
        receivedFunds: 30000,
        dateApproved: "01/09/2025",
    },
    {
        programName: "PM-KISAN Farmer Support",
        entitlementRefNumber: "875643219876",
        awaitedFunds: 15000,
        receivedFunds: 15000,
        dateApproved: "15/08/2025",
    },
    {
        programName: "LPG Subsidy",
        entitlementRefNumber: "546372819045",
        awaitedFunds: 2400,
        receivedFunds: 800,
        dateApproved: "25/08/2025",
    },
    {
        programName: "Direct Benefit Transfer Scheme",
        entitlementRefNumber: "729384756102",
        awaitedFunds: 8500,
        receivedFunds: 0,
        dateApproved: "30/08/2025",
    },
    {
        programName: "Pradhan Mantri Awas Yojana",
        entitlementRefNumber: "392847561829",
        awaitedFunds: 120000,
        receivedFunds: 60000,
        dateApproved: "25/07/2025",
    },
    {
        programName: "National Rural Employment Guarantee",
        entitlementRefNumber: "928374651092",
        awaitedFunds: 30000,
        receivedFunds: 15000,
        dateApproved: "05/08/2025",
    },
    {
        programName: "Skill Development Program",
        entitlementRefNumber: "837465920384",
        awaitedFunds: 10000,
        receivedFunds: 5000,
        dateApproved: "15/07/2025",
    },
    {
        programName: "Ayushman Bharat Health Scheme",
        entitlementRefNumber: "465738291056",
        awaitedFunds: 25000,
        receivedFunds: 12000,
        dateApproved: "20/08/2025",
    },
    {
        programName: "Digital India Initiative",
        entitlementRefNumber: "102938475610",
        awaitedFunds: 5000,
        receivedFunds: 2500,
        dateApproved: "02/09/2025",
    },
    {
        programName: "Startup India Support",
        entitlementRefNumber: "112233445566",
        awaitedFunds: 12000,
        receivedFunds: 12000,
        dateApproved: "18/08/2025",
    },
    {
        programName: "Clean Ganga Mission",
        entitlementRefNumber: "121212121212",
        awaitedFunds: 8000,
        receivedFunds: 2000,
        dateApproved: "28/08/2025",
    },
    {
        programName: "Swachh Bharat Abhiyan",
        entitlementRefNumber: "131313131313",
        awaitedFunds: 15000,
        receivedFunds: 10000,
        dateApproved: "12/08/2025",
    },
    {
        programName: "National Health Mission",
        entitlementRefNumber: "141414141414",
        awaitedFunds: 20000,
        receivedFunds: 15000,
        dateApproved: "22/08/2025",
    },
    {
        programName: "Housing for All",
        entitlementRefNumber: "151515151515",
        awaitedFunds: 40000,
        receivedFunds: 25000,
        dateApproved: "28/07/2025",
    },
    {
        programName: "Rural Skill Training",
        entitlementRefNumber: "161616161616",
        awaitedFunds: 7000,
        receivedFunds: 3000,
        dateApproved: "06/08/2025",
    },
    {
        programName: "Women Empowerment Program",
        entitlementRefNumber: "171717171717",
        awaitedFunds: 10000,
        receivedFunds: 5000,
        dateApproved: "17/07/2025",
    },
];

const bankAccount = { name: "John Smith", number: "xxxx xxxx xxxx 1234" };

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
                    <Programs programs={programsData} preview title="My Programs" />
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 h-full">
                    <TotalBenefitsCard
                        totalAmount={totalAwaitedFunds}
                        receivedAmount={totalReceivedFunds}
                    />
                    <BankCard account={bankAccount} />
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
