"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

import { AuthUtil } from '@/features/auth/components';
import { Programs } from '@/features/program/components';
import { Program } from "@/features/program/types/program";

const allPrograms: Program[] = [
    {
        name: "Social Safety Net Program",
        status: "Applied",
        id: "1010101010",
        appliedDate: "2025-09-01 10:30 AM",
        benefits: ["Money", "Rice", "Oil", "Books"],
    },
    {
        name: "Pension Yojana",
        status: "Apply",
        id: "2025202501",
        appliedDate: "2025-08-15 09:10 AM",
        benefits: ["Money"],
    },
    {
        name: "PM-KISAN Farmer Support",
        status: "Enrolled",
        id: "3030303030",
        appliedDate: "2025-08-10 02:15 PM",
        benefits: ["Money", "Rice", "Oil"],
    },
    {
        name: "Ayushman Bharat Health Scheme",
        status: "Applied",
        id: "4040404040",
        appliedDate: "2025-08-20 11:45 AM",
        benefits: ["Money", "Home"],
    },
    {
        name: "Pradhan Mantri Awas Yojana",
        status: "Enrolled",
        id: "6060606060",
        appliedDate: "2025-07-25 03:30 PM",
        benefits: ["Home", "Money"],
    },
    {
        name: "Skill Development Program",
        status: "Enrolled",
        id: "8080808080",
        appliedDate: "2025-07-15 04:10 PM",
        benefits: ["Books", "Money"],
    },
    {
        name: "Digital India Initiative",
        status: "Applied",
        id: "9090909090",
        appliedDate: "2025-09-02 11:00 AM",
        benefits: ["Money", "Books", "Home"],
    },
    {
        name: "Startup India Support",
        status: "Applied",
        id: "1111111111",
        appliedDate: "2025-08-18 01:20 PM",
        benefits: ["Money", "Books"],
    },
    {
        name: "Clean Ganga Mission",
        status: "Apply",
        id: "1212121212",
        appliedDate: "2025-08-28 03:15 PM",
        benefits: ["Money", "Rice", "Oil"],
    },
    {
        name: "Swachh Bharat Abhiyan",
        status: "Enrolled",
        id: "1313131313",
        appliedDate: "2025-08-12 04:45 PM",
        benefits: ["Money", "Rice"],
    },
    {
        name: "National Health Mission",
        status: "Applied",
        id: "1414141414",
        appliedDate: "2025-08-22 09:40 AM",
        benefits: ["Money", "Home", "Oil"],
    },
    {
        name: "Housing for All",
        status: "Enrolled",
        id: "1515151515",
        appliedDate: "2025-07-28 02:30 PM",
        benefits: ["Home", "Money"],
    },
    {
        name: "Rural Skill Training",
        status: "Apply",
        id: "1616161616",
        appliedDate: "2025-08-06 10:10 AM",
        benefits: ["Books", "Money"],
    },
    {
        name: "Women Empowerment Program",
        status: "Enrolled",
        id: "1717171717",
        appliedDate: "2025-07-17 05:00 PM",
        benefits: ["Money", "Books", "Rice"],
    },
    {
        name: "LPG Subsidy",
        status: "Pending",
        id: "5050505050",
        appliedDate: "2025-08-25 05:45 PM",
        benefits: ["Money", "Oil"],
    },
    {
        name: "National Rural Employment Guarantee",
        status: "Apply",
        id: "7070707070",
        appliedDate: "2025-08-05 09:20 AM",
        benefits: ["Money", "Rice", "Books"],
    },
];

const myPrograms: Program[] = [
    {
        name: "Social Safety Net Program",
        status: "Applied",
        id: "1010101010",
        appliedDate: "2025-09-01",
        benefits: ["Money", "Rice", "Oil", "Books"],
    },
    {
        name: "Pension Yojana",
        status: "Applied",
        id: "2025202501",
        appliedDate: "2025-08-15",
        benefits: ["Money"],
    },
    {
        name: "PM-KISAN Farmer Support",
        status: "Applied",
        id: "3030303030",
        appliedDate: "2025-08-10",
        benefits: ["Money", "Rice", "Oil"],
    },
    {
        name: "Ayushman Bharat Health Scheme",
        status: "Applied",
        id: "4040404040",
        appliedDate: "2025-08-20",
        benefits: ["Money", "Home"],
    },
    {
        name: "Pradhan Mantri Awas Yojana",
        status: "Applied",
        id: "6060606060",
        appliedDate: "2025-07-25",
        benefits: ["Home", "Money"],
    },
    {
        name: "Skill Development Program",
        status: "Applied",
        id: "8080808080",
        appliedDate: "2025-07-15",
        benefits: ["Books", "Money"],
    },
    {
        name: "Digital India Initiative",
        status: "Applied",
        id: "9090909090",
        appliedDate: "2025-09-02",
        benefits: ["Money", "Books", "Home"],
    },
    {
        name: "Startup India Support",
        status: "Applied",
        id: "1111111111",
        appliedDate: "2025-08-18",
        benefits: ["Money", "Books"],
    },
    {
        name: "Clean Ganga Mission",
        status: "Applied",
        id: "1212121212",
        appliedDate: "2025-08-28",
        benefits: ["Money", "Rice", "Oil"],
    },
    {
        name: "Swachh Bharat Abhiyan",
        status: "Applied",
        id: "1313131313",
        appliedDate: "2025-08-12",
        benefits: ["Money", "Rice"],
    },
    {
        name: "National Health Mission",
        status: "Applied",
        id: "1414141414",
        appliedDate: "2025-08-22",
        benefits: ["Money", "Home", "Oil"],
    },
    {
        name: "Housing for All",
        status: "Applied",
        id: "1515151515",
        appliedDate: "2025-07-28",
        benefits: ["Home", "Money"],
    },
    {
        name: "Rural Skill Training",
        status: "Applied",
        id: "1616161616",
        appliedDate: "2025-08-06",
        benefits: ["Books", "Money"],
    },
    {
        name: "Women Empowerment Program",
        status: "Applied",
        id: "1717171717",
        appliedDate: "2025-07-17",
        benefits: ["Money", "Books", "Rice"],
    },
    {
        name: "LPG Subsidy",
        status: "Applied",
        id: "5050505050",
        appliedDate: "2025-08-25",
        benefits: ["Money", "Oil"],
    },
    {
        name: "National Rural Employment Guarantee",
        status: "Applied",
        id: "7070707070",
        appliedDate: "2025-08-05",
        benefits: ["Money", "Rice", "Books"],
    },
];

export default function ProgramsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [activeTab, setActiveTab] = useState<"all" | "my">("all");

    const programsToShow = activeTab === "all" ? allPrograms : myPrograms;

    return (
        <div className="px-10 py-4 min-h-screen bg-white">
            <h1 className="text-xl font-bold text-gray-800 mb-4">Programs</h1>

            <Programs
                programs={programsToShow}
                showMyPrograms={activeTab === "my"}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
}
