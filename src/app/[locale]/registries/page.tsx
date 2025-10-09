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
    { name: "Pension Registry", id: "38475619283", date: "28/06/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Social Services Registry", id: "19283746501", date: "12/06/2025", action: "Applied", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Transport Registry", id: "91827364502", date: "03/06/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Energy Registry", id: "56473829103", date: "25/05/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Water Supply Registry", id: "84756392014", date: "15/05/2025", action: "Applied", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Telecom Registry", id: "29384756104", date: "02/05/2025", action: "Apply", description: "This registry serves as a comprehensive platform for tracking and managing citizen-related programs and services. It maintains detailed records of program applications, eligibility criteria, enrollment status, and benefit distribution. The registry ensures transparency and accountability by recording all actions, changes, and updates related to each program. It helps government and administrative agencies monitor resource allocation, plan initiatives effectively, and provide timely support to citizens. Through this system, users can access program details, submit applications, request updates" },
    { name: "Public Safety Registry", id: "38475619284", date: "28/04/2025", action: "Apply", description: "Includes police and public safety records." },
    { name: "Environment Registry", id: "93847561030", date: "18/04/2025", action: "Apply", description: "Tracks environmental compliance and programs." },
    { name: "Housing Welfare Registry", id: "12938475640", date: "10/04/2025", action: "Apply", description: "Monitors housing welfare and subsidies." },
    { name: "Job Training Registry", id: "84756392015", date: "01/04/2025", action: "Applied", description: "Keeps track of vocational training programs." },
    { name: "Childcare Registry", id: "56473829105", date: "22/03/2025", action: "Apply", description: "Manages childcare services and enrollments." },
    { name: "Elderly Care Registry", id: "93847561031", date: "15/03/2025", action: "Apply", description: "Tracks elderly care programs and support." },
];

const myRegistries: Registry[] = [
    {
        name: "Healthcare Registry",
        id: "12938475639",
        date: "15/08/2025",
        action: "Request for Update",
        description: "This registry serves as a comprehensive platform for tracking and managing all aspects of citizen healthcare programs. It maintains detailed records of medical history, immunizations, hospital visits, treatment plans, insurance coverage, and eligibility for healthcare benefits. The system ensures transparency and accountability by recording every update, application, and action taken within healthcare programs. Government agencies and healthcare providers can use this data to monitor public health trends, allocate resources effectively, and design initiatives that address community needs. Citizens can submit new applications for programs, request updates to existing records, monitor their eligibility, and receive notifications about benefit disbursement or changes. The registry also facilitates reporting, auditing, and strategic planning for health initiatives, ensuring that services reach the intended populations in a timely and efficient manner."
    },
    {
        name: "Employment Registry",
        id: "84756392013",
        date: "05/08/2025",
        action: "Request for Update",
        description: "The Employment Registry provides a centralized platform for managing citizen employment records and workforce participation. It tracks job applications, placements, unemployment benefits, vocational training participation, and professional certifications. This registry helps government and administrative agencies monitor labor market trends, identify skill gaps, plan workforce development programs, and ensure fair distribution of employment opportunities. Every update, application, and verification is logged to ensure accountability. Users can update personal employment information, submit applications for job assistance programs, and track the progress of their submissions. The system also generates insights and analytics to support decision-making, policy development, and effective allocation of resources to optimize employment outcomes across various sectors."
    },
    {
        name: "Housing Registry",
        id: "56473829102",
        date: "22/07/2025",
        action: "Request for Update",
        description: "This registry is dedicated to managing citizen housing information, including public housing allocations, rental assistance programs, housing subsidies, property ownership records, and eligibility verification. It allows government agencies to track occupancy, monitor housing demand, ensure fair distribution of housing benefits, and plan urban development projects. Citizens can update their housing information, submit applications for housing programs, and track approval status. Every action, change, or update in the registry is recorded to maintain transparency and accountability. The registry also provides comprehensive reporting, helping policymakers evaluate program effectiveness, plan future initiatives, and respond to housing crises efficiently. Through this platform, citizens gain a clear understanding of their housing benefits and eligibility while authorities can optimize resource allocation."
    },
    {
        name: "Education Registry",
        id: "93847561029",
        date: "10/07/2025",
        action: "Request for Update",
        description: "The Education Registry provides a detailed and structured platform for tracking educational enrollment, academic performance, scholarship programs, training opportunities, and participation in educational initiatives. It ensures that every student's information, from primary school enrollment to higher education records, is accurately maintained. Government agencies, schools, and educational institutions can monitor student progress, allocate resources efficiently, and design policies to improve learning outcomes. Users can submit updates to their records, apply for scholarships or educational benefits, and track the status of their applications. All updates and actions are logged for transparency and accountability. Additionally, the registry supports strategic planning for educational initiatives, reporting on program success, and ensuring that benefits reach eligible students in a timely manner."
    },
    {
        name: "Pension Registry",
        id: "38475619283",
        date: "28/06/2025",
        action: "Request for Update",
        description: "The Pension Registry manages citizen retirement and pension-related records, including eligibility verification, contribution history, disbursement schedules, and beneficiary information. It ensures that retirees receive timely benefits and allows authorities to monitor compliance, detect discrepancies, and optimize resource allocation. Citizens can update their personal information, request adjustments to pension disbursements, and track payment schedules. Every application, record change, and action is logged to maintain accountability. The registry also provides analytical insights to support policymaking, reporting, and program evaluation. By centralizing pension information, it helps streamline operations, reduce errors, and ensure retirees’ financial security."
    },
    {
        name: "Social Services Registry",
        id: "19283746501",
        date: "12/06/2025",
        action: "Request for Update",
        description: "The Social Services Registry maintains records of citizen participation in welfare and assistance programs, including food aid, housing support, emergency relief, and other social benefits. It allows agencies to track applications, verify eligibility, monitor benefit distribution, and assess program effectiveness. Users can update their personal information, apply for assistance programs, and track the status of requests. Every update and action is recorded to ensure transparency and accountability. This registry supports data-driven policy decisions, reporting, and program planning, enabling social services to reach vulnerable populations efficiently while providing detailed insights into community needs and program performance."
    },
    {
        name: "Transport Registry",
        id: "91827364502",
        date: "03/06/2025",
        action: "Request for Update",
        description: "The Transport Registry tracks all citizen-related transportation services, including vehicle registrations, driving licenses, permits, public transport access, and road safety programs. It allows government authorities to monitor transport infrastructure usage, enforce compliance, allocate resources, and improve service delivery. Citizens can submit updates to their transport records, apply for permits, and track application progress. All updates, applications, and actions are logged for transparency and accountability. The registry also provides reporting and analytical capabilities, helping policymakers optimize traffic management, plan infrastructure projects, and ensure safe and equitable access to transport services for all citizens."
    },
    {
        name: "Energy Registry",
        id: "56473829103",
        date: "25/05/2025",
        action: "Request for Update",
        description: "The Energy Registry provides a comprehensive system for tracking electricity, gas, and renewable energy services for citizens. It maintains detailed records of service subscriptions, usage patterns, billing, subsidies, and eligibility for energy assistance programs. Authorities can monitor consumption trends, manage energy distribution, and plan initiatives for sustainable energy use. Citizens can update their service information, apply for new programs, and track requests. Every update and action is logged to maintain transparency and accountability. The registry also provides data-driven insights to support energy policy, optimize resource allocation, and ensure that energy services reach eligible households efficiently."
    },
    {
        name: "Water Supply Registry",
        id: "84756392014",
        date: "15/05/2025",
        action: "Request for Update",
        description: "The Water Supply Registry manages citizen records related to water connections, usage, billing, and eligibility for subsidies or assistance programs. It enables authorities to monitor water consumption, plan infrastructure projects, manage resources, and ensure equitable distribution of services. Citizens can update their water supply records, request new connections, and track the progress of their applications. Every change and action is logged for accountability and transparency. The registry also supports reporting, analysis, and planning of water services, ensuring that programs are efficient, effective, and responsive to community needs."
    },
    {
        name: "Telecom Registry",
        id: "29384756104",
        date: "02/05/2025",
        action: "Request for Update",
        description: "The Telecom Registry tracks all citizen-related telecommunications services, including phone subscriptions, internet connections, service providers, and eligibility for subsidized programs. It allows regulatory authorities to monitor service coverage, ensure compliance, allocate resources, and support digital inclusion initiatives. Citizens can update their telecom information, request new services, and track application status. All actions and updates are logged for transparency and accountability. The registry also provides analytical insights, enabling policymakers to plan initiatives for enhanced connectivity and to ensure equitable access to telecom services across communities."
    },
    {
        name: "Public Safety Registry",
        id: "38475619284",
        date: "28/04/2025",
        action: "Request for Update",
        description: "This registry includes detailed records of citizen interactions with public safety authorities, including police reports, emergency services, safety programs, and community policing initiatives. It allows authorities to monitor safety trends, allocate resources effectively, and ensure timely response to incidents. Citizens can request updates to their records, submit applications for safety programs, and track requests. Every update and action is logged for transparency and accountability. The system supports planning, reporting, and analysis of public safety programs, ensuring community protection and effective service delivery."
    },
    {
        name: "Environment Registry",
        id: "93847561030",
        date: "18/04/2025",
        action: "Request for Update",
        description: "The Environment Registry tracks citizen participation in environmental programs, compliance with regulations, conservation initiatives, pollution monitoring, and sustainability projects. It allows agencies to monitor environmental trends, enforce regulations, and plan sustainable initiatives. Citizens can update their participation records, apply for environmental programs, and track progress. All updates and actions are logged to maintain transparency and accountability. The registry supports reporting, planning, and analytical insights, ensuring that environmental initiatives are effective, measurable, and beneficial for the community."
    },
    {
        name: "Housing Welfare Registry",
        id: "12938475640",
        date: "10/04/2025",
        action: "Request for Update",
        description: "This registry monitors housing welfare programs, subsidies, and citizen eligibility for affordable housing schemes. It allows authorities to track allocations, verify eligibility, and monitor outcomes of welfare programs. Citizens can update their personal and housing information, submit applications for assistance, and track program status. All actions and updates are recorded for transparency and accountability. The registry also provides analytical insights for planning, reporting, and program evaluation, ensuring that housing assistance reaches intended populations efficiently."
    },
    {
        name: "Job Training Registry",
        id: "84756392015",
        date: "01/04/2025",
        action: "Request for Update",
        description: "The Job Training Registry keeps records of citizen participation in vocational training, skill development programs, apprenticeships, and employment readiness initiatives. It allows government agencies to monitor program effectiveness, track participant progress, and allocate resources efficiently. Users can update their training records, apply for new programs, and track progress. Every update and action is logged for accountability. The registry provides data-driven insights, supporting planning, reporting, and evaluation of training programs to enhance workforce capabilities and employability."
    },
    {
        name: "Childcare Registry",
        id: "56473829105",
        date: "22/03/2025",
        action: "Request for Update",
        description: "This registry manages citizen participation in childcare programs, early childhood education, and related support services. It tracks enrollments, eligibility, subsidies, and program outcomes. Authorities can monitor childcare availability, plan initiatives, and allocate resources effectively. Citizens can update personal and child information, apply for programs, and track requests. Every action is logged to ensure transparency and accountability. The registry also supports reporting, analysis, and planning for childcare services to ensure accessibility, quality, and equitable delivery."
    },
    {
        name: "Elderly Care Registry",
        id: "93847561031",
        date: "15/03/2025",
        action: "Request for Update",
        description: "The Elderly Care Registry tracks citizen participation in senior care programs, including healthcare, social support, pensions, and assisted living services. It allows authorities to monitor the well-being of elderly populations, allocate resources, and plan targeted interventions. Citizens can update personal information, request program support, and track their applications. All updates and actions are recorded to maintain transparency and accountability. The registry also provides analytical insights to support planning, reporting, and evaluation of elderly care programs, ensuring effective and timely delivery of services."
    }
];


export default function RegistriesPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

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
    const handleActionSelect = (option: string, registry: Registry) => {
        if (option === "View Details") {
            setSelectedRegistry(registry);
            setOpenDetails(true);
        } else if (option === "Request for Update") {
            alert(`Requesting update for ${registry.name}`);
        } else if (option === "Apply") {
            alert(`Applying to ${registry.name}`);
        }
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
                                                onSelect={(option) => handleActionSelect(option, r)}
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
