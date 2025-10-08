"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";

import { prefixBasePath } from '@/shared/utils/path';
import { Pagination, SearchInput } from '@/components/shared';
import { RegistryActionDropdown, RegistryDetails } from '@/features/registry/components';
import { AuthUtil } from '@/features/auth/components';

import { Registry } from "@/features/registry/types";
import { usePagination } from "@/shared/hooks/usePagination";
const allRegistries: Registry[] = [
    { name: "Healthcare Registry", id: "12938475639", date: "15/08/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Employment Registry", id: "84756392013", date: "05/08/2025", action: "Applied", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Housing Registry", id: "56473829102", date: "22/07/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Education Registry", id: "93847561029", date: "10/07/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Pension Registry", id: "38475619283", date: "28/06/2025", action: "Apply", description: "Records pension plans and disbursement details." },
    { name: "Social Services Registry", id: "19283746501", date: "12/06/2025", action: "Applied", description: "Manages citizen social assistance programs." },
    { name: "Transport Registry", id: "91827364502", date: "03/06/2025", action: "Apply", description: "Tracks transport licenses and vehicle registrations." },
    { name: "Energy Registry", id: "56473829103", date: "25/05/2025", action: "Apply", description: "Maintains electricity and energy service records." },
    { name: "Water Supply Registry", id: "84756392014", date: "15/05/2025", action: "Applied", description: "Manages water supply connections and usage." },
    { name: "Telecom Registry", id: "29384756104", date: "02/05/2025", action: "Apply", description: "Records telecom subscriptions and services." },
    { name: "Public Safety Registry", id: "38475619284", date: "28/04/2025", action: "Apply", description: "Includes police and public safety records." },
    { name: "Environment Registry", id: "93847561030", date: "18/04/2025", action: "Apply", description: "Tracks environmental compliance and programs." },
    { name: "Housing Welfare Registry", id: "12938475640", date: "10/04/2025", action: "Apply", description: "Monitors housing welfare and subsidies." },
    { name: "Job Training Registry", id: "84756392015", date: "01/04/2025", action: "Applied", description: "Keeps track of vocational training programs." },
    { name: "Childcare Registry", id: "56473829105", date: "22/03/2025", action: "Apply", description: "Manages childcare services and enrollments." },
    { name: "Elderly Care Registry", id: "93847561031", date: "15/03/2025", action: "Apply", description: "Tracks elderly care programs and support." },
];

const myRegistries: Registry[] = [
    { name: "Healthcare Registry", id: "12938475639", date: "15/08/2025", action: "Request for Update", description: "Tracks healthcare programs and eligibility for citizens." },
    { name: "Employment Registry", id: "84756392013", date: "05/08/2025", action: "Request for Update", description: "Contains employment records and job placement programs." },
    { name: "Housing Registry", id: "56473829102", date: "22/07/2025", action: "Request for Update", description: "Manages public housing and related services." },
    { name: "Education Registry", id: "93847561029", date: "10/07/2025", action: "Request for Update", description: "Tracks educational enrollments and scholarships." },
    { name: "Pension Registry", id: "38475619283", date: "28/06/2025", action: "Request for Update", description: "Records pension plans and disbursement details." },
    { name: "Social Services Registry", id: "19283746501", date: "12/06/2025", action: "Request for Update", description: "Manages citizen social assistance programs." },
    { name: "Transport Registry", id: "91827364502", date: "03/06/2025", action: "Request for Update", description: "Tracks transport licenses and vehicle registrations." },
    { name: "Energy Registry", id: "56473829103", date: "25/05/2025", action: "Request for Update", description: "Maintains electricity and energy service records." },
    { name: "Water Supply Registry", id: "84756392014", date: "15/05/2025", action: "Request for Update", description: "Manages water supply connections and usage." },
    { name: "Telecom Registry", id: "29384756104", date: "02/05/2025", action: "Request for Update", description: "Records telecom subscriptions and services." },
    { name: "Public Safety Registry", id: "38475619284", date: "28/04/2025", action: "Request for Update", description: "Includes police and public safety records." },
    { name: "Environment Registry", id: "93847561030", date: "18/04/2025", action: "Request for Update", description: "Tracks environmental compliance and programs." },
    { name: "Housing Welfare Registry", id: "12938475640", date: "10/04/2025", action: "Request for Update", description: "Monitors housing welfare and subsidies." },
    { name: "Job Training Registry", id: "84756392015", date: "01/04/2025", action: "Request for Update", description: "Keeps track of vocational training programs." },
    { name: "Childcare Registry", id: "56473829105", date: "22/03/2025", action: "Request for Update", description: "Manages childcare services and enrollments." },
    { name: "Elderly Care Registry", id: "93847561031", date: "15/03/2025", action: "Request for Update", description: "Tracks elderly care programs and support." },
];

export default function RegistriesPage() {
    const lang = useLocale();
    // AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [activeTab, setActiveTab] = useState<"all" | "my">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [openForm, setOpenForm] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedRegistry, setSelectedRegistry] = useState<Registry | null>(null);

    const registriesToShow = activeTab === "all" ? allRegistries : myRegistries;

    const filteredRegistries = registriesToShow.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.includes(searchQuery)
    );

    const itemsPerPage = 8;
    const totalPages = Math.ceil(filteredRegistries.length / itemsPerPage);
    const currentItems = filteredRegistries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getActionButton = (action: string, registry: Registry) => {
        if (action === "Applied") {
            return (
                <span className="px-1 py-1 text-[#3399FF] font-medium">
                    Applied
                </span>
            );
        }
        return (
            <button
                onClick={() => {
                    setSelectedRegistry(registry);
                    setOpenForm(true);
                }}
                className="bg-black text-white text-sm px-3 py-1 rounded-full font-semibold hover:bg-gray-800 transition"
            >
                Apply
            </button>
        );
    };



    return (
        <div className="px-10 py-4 min-h-screen bg-white">
            <h1 className="text-xl font-bold text-gray-800 mb-4">Registries</h1>

            <div className="bg-white rounded-2xl shadow-md w-full border border-gray-200">
                <div className="flex items-center justify-between px-8 pt-8 gap-4 flex-wrap">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-6 py-2 text-[16px] font-[600] rounded-t-xl ${activeTab === "all" ? "bg-[#ED7C22] text-white" : "bg-[#F5F5F5] text-black/50"}`}
                        >
                            All Registries
                        </button>
                        <button
                            onClick={() => setActiveTab("my")}
                            className={`px-6 py-2 text-[16px] font-[600] rounded-t-xl ${activeTab === "my" ? "bg-[#ED7C22] text-white" : "bg-[#F5F5F5] text-black/50"}`}
                        >
                            My Registries
                        </button>
                    </div>
                    <div className="flex justify-center pb-4">
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search registries"
                            className="w-[200px]"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-[#F5F5F5] text-black text-[16px] font-[700]">
                            <tr>
                                <th className="px-8 py-3 text-left w-[60%]">Registry Name</th>
                                <th className="px-8 py-3 text-left w-[24%]">
                                    <div className="flex items-center gap-0.5">
                                        {activeTab === "all" ? "Date" : "Date of Registry"}
                                        <Image
                                            src={prefixBasePath("/updown_arrow.png")}
                                            alt="Sort"
                                            width={20}
                                            height={20}
                                            className="cursor-pointer opacity-40"
                                        />
                                    </div>
                                </th>
                                <th className="px-8 py-3 text-left w-[16%]">
                                    {activeTab === "all" ? "Action" : "Request"}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((r, idx) => (
                                <tr key={r.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-black/5"}`}>
                                    <td className="px-8 py-3 text-[16px] font-[400] text-black">{r.name}</td>
                                    <td className="px-8 py-3 text-[16px] font-[400] text-black">{r.date}</td>
                                    <td className="px-8 py-3">
                                        {activeTab === "all" ? (
                                            getActionButton(r.action, r)
                                        ) : (
                                            <RegistryActionDropdown
                                                registry={r}
                                                onSelect={(option) => {
                                                    console.log(r.name, option);
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                <div className="flex items-center gap-6 px-8 py-4 text-sm text-black">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                    <div className="text-gray-600">
                        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredRegistries.length)}–
                        {Math.min(currentPage * itemsPerPage, filteredRegistries.length)} of {filteredRegistries.length}
                    </div>
                </div>

                {openDetails && selectedRegistry && (
                    <RegistryDetails
                        registry={selectedRegistry}
                        onClose={() => setOpenDetails(false)}
                    />
                )}
            </div>
        </div>
    );
}
