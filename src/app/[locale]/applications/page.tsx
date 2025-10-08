"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

import { Pagination, SearchInput, FilterInput } from '@/components/shared';
import { usePagination } from "@/shared/hooks/usePagination";
import { AuthUtil } from '@/features/auth/components';
import { ApplicationActionDropdown } from "@/features/program/components";
import ApplicationDetails from "@/features/program/components/ApplicationDetails";

export interface Application {
    applicationName: string;
    applicationId: string;
    description: string;
    status: string;
    date: string;
}

export const applicationsData: Application[] = [
    { applicationName: "OpenG2P Safety Program", applicationId: "1042504100", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Pending", date: "01/10/2025" },
    { applicationName: "Food Support Program", applicationId: "1042504101", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Approved", date: "02/10/2025" },
    { applicationName: "Cash Assistance", applicationId: "1042504102", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Rejected", date: "03/10/2025" },
    { applicationName: "Education Aid", applicationId: "1042504103", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Pending", date: "04/10/2025" },
    { applicationName: "Gas Relief", applicationId: "1042504104", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Approved", date: "05/10/2025" },
    { applicationName: "Health Program", applicationId: "1042504105", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Pending", date: "06/10/2025" },
    { applicationName: "Food Support Program 2", applicationId: "1042504106", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Approved", date: "07/10/2025" },
    { applicationName: "Cash Assistance 2", applicationId: "1042504107", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Rejected", date: "08/10/2025" },
    { applicationName: "Education Aid 2", applicationId: "1042504108", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Pending", date: "09/10/2025" },
    { applicationName: "Gas Relief 2", applicationId: "1042504109", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Approved", date: "10/10/2025" },
    { applicationName: "Health Program 2", applicationId: "1042504110", description: "This program is designed to provide comprehensive safety and financial support to eligible individuals and households. It aims to ensure that beneficiaries have access to essential resources, including healthcare, food assistance, and emergency aid, to improve their overall well-being and stability. By targeting those most in need, the program helps reduce vulnerability, promote social inclusion, and enhance the quality of life for participants, while fostering sustainable community development and resilience.", status: "Pending", date: "11/10/2025" },
    { applicationName: "OpenG2P Safety Program 2", applicationId: "1042504111", description: "Second phase of safety program implementation.", status: "Approved", date: "12/10/2025" },
    { applicationName: "Food Support Program 3", applicationId: "1042504112", description: "Third phase food distribution for remote areas.", status: "Rejected", date: "13/10/2025" },
    { applicationName: "Cash Assistance 3", applicationId: "1042504113", description: "Additional cash support for emergency relief.", status: "Pending", date: "14/10/2025" },
    { applicationName: "Education Aid 3", applicationId: "1042504114", description: "Scholarship and books for students.", status: "Approved", date: "15/10/2025" },
    { applicationName: "Gas Relief 3", applicationId: "1042504115", description: "Third round of gas cylinder subsidies.", status: "Pending", date: "16/10/2025" },
];

export default function ApplicationsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(applicationsData, 8);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterText, setFilterText] = useState("");

    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleActionSelect = (option: string, application: Application) => {
        if (option === "View Details") {
            setSelectedApplication(application);
            setIsModalOpen(true);
        } else if (option === "Progress") {
            alert(`Showing progress for ${application.applicationName}`);
        }
    };

    return (
        <div className="px-10 py-4 min-h-screen bg-white">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-black">Applications</h1>
            </div>

            <div className="bg-white rounded-xl shadow-xl w-full border border-black/20 overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr>
                                <th colSpan={5}>
                                    <div className="flex justify-between items-center px-2 py-4">
                                        <span className="px-6 py-2 text-[#ED7C22] text-[20px] font-[600]">My Applications</span>
                                        <div className="flex gap-4 px-6">
                                            <FilterInput
                                                value={filterText}
                                                onChange={setFilterText}
                                                placeholder="Filter"
                                                className="w-50"
                                                bgColor="bg-[#F5F5F5]"
                                            />
                                            <SearchInput
                                                value={searchQuery}
                                                onChange={setSearchQuery}
                                                placeholder="Search"
                                                className="w-50"
                                                bgColor="bg-[#F5F5F5]"
                                            />
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr className="bg-[#F5F5F5]">
                                <th className="px-8 py-3 text-left text-black">Application Name</th>
                                <th className="px-8 py-3 text-left text-black">Application ID</th>
                                <th className="px-8 py-3 text-left text-black">Status</th>
                                <th className="px-8 py-3 text-left text-black">Date</th>
                                <th className="px-8 py-3 text-left text-black">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentItems.map((application, index) => (
                                <tr
                                    key={index}
                                    className={`transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}`}
                                >
                                    <td className="px-8 py-3 text-black font-medium">{application.applicationName}</td>
                                    <td className="px-8 py-3 text-black">{application.applicationId}</td>
                                    <td className="px-8 py-3 text-black">{application.status}</td>
                                    <td className="px-8 py-3 text-black">{application.date}</td>
                                    <td className="px-8 py-3">
                                        <ApplicationActionDropdown
                                            onSelect={(option) => handleActionSelect(option, application)}
                                        />
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
                    <div className="text-gray-600 text-sm">
                        Showing{" "}
                        {Math.min((currentPage - 1) * 8 + 1, applicationsData.length)}–
                        {Math.min(currentPage * 8, applicationsData.length)} of {applicationsData.length}
                    </div>
                </div>

                {isModalOpen && selectedApplication && (
                    <ApplicationDetails
                        application={selectedApplication}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}

            </div>
        </div>
    );
}
