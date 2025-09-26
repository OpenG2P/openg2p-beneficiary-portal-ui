"use client";

import { useLocale } from "next-intl";

import { AuthUtil } from '@/features/auth/components';
import { Programs } from '@/features/program/components';
import { Program } from "@/features/program/types/program";

const programsData: Program[] = [
    { name: "Social Safety Net Program", status: "Applied", id: "1010101010", appliedDate: "2025-09-01 10:30 AM" },
    { name: "Pension Yojana", status: "Apply", id: "2025202501", appliedDate: "2025-08-15 09:10 AM" },
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

export default function ProgramsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });
    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-2">
                <h1 className="text-xl font-bold text-gray-800">My Programs</h1>
            </div>
            <Programs programs={programsData} title="All Programs" />
        </div >
    );
}
