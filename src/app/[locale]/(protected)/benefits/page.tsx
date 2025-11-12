"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

import { AuthUtil } from '@/features/auth/components';
import { Pagination, SearchInput, FilterInput } from '@/components/shared';
import { usePagination } from "@/shared/hooks/usePagination";
import { prefixBasePath } from "@/shared/utils/path";
import { BenefitActionsDropdown, DeliveryDetails } from "@/features/disbursement/components";
import { Benefit } from "@/features/disbursement/types";

import Image from "next/image";

export const receivedBenefitsData: Benefit[] = [
    {
        programName: "Social Registry Upgrade",
        benefitCode: "Information Access",
        quantity: "1 Record",
        dateReceived: "24/09/2025",
        agent: { name: "John Doe", address: "123 Main St, City A" },
        deliveryDateTime: "24/09/2025 10:30 AM",
        address: "123 Main St, City A",
        mapImageUrl: "/map.png",
        evidenceImages: ["/e1.png", "/e2.png", "/e3.png"],
        biometricVerified: true,
        verificationType: "Fingerprint",
    },
    {
        programName: "Income Tax Assistance",
        benefitCode: "Money",
        quantity: "4500.00 $",
        dateReceived: "24/09/2025",
        agent: { name: "Alice Smith", address: "456 Market Rd, City B" },
        deliveryDateTime: "24/09/2025 11:00 AM",
        address: "456 Market Rd, City B",
        mapImageUrl: "/map.png",
        evidenceImages: ["/e1.png", "/e2.png", "/e3.png"],
        biometricVerified: false,
        verificationType: "Fingerprint",
    },
    {
        programName: "Caste Certificate Facilitation",
        benefitCode: "Documentation",
        quantity: "1 Certificate",
        dateReceived: "24/09/2025",
        agent: { name: "Bob Johnson", address: "789 Lake View, City C" },
        deliveryDateTime: "24/09/2025 09:15 AM",
        address: "789 Lake View, City C",
        mapImageUrl: "/map.png",
        evidenceImages: ["/e1.png", "/e2.png", "/e3.png"],
        biometricVerified: true,
        verificationType: "Fingerprint",
    },
    {
        programName: "Electricity Subsidy Program",
        benefitCode: "Money",
        quantity: "5000.00 $",
        dateReceived: "24/09/2025",
        agent: { name: "Charlie Lee", address: "321 Hill St, City D" },
        deliveryDateTime: "24/09/2025 02:30 PM",
        address: "321 Hill St, City D",
        mapImageUrl: "/map.png",
        evidenceImages: ["/e1.png", "/e2.png", "/e3.png"],
        biometricVerified: false,
        verificationType: "Face",
    },
    {
        programName: "Voter Registry Update",
        benefitCode: "Verification",
        quantity: "1 Record",
        dateReceived: "25/09/2025",
        agent: { name: "Diana Prince", address: "654 River Rd, City E" },
        deliveryDateTime: "25/09/2025 10:00 AM",
        address: "654 River Rd, City E",
        mapImageUrl: "/map.png",
        evidenceImages: ["/e1.png", "/e2.png", "/e3.png"],
        biometricVerified: true,
        verificationType: "Fingerprint",
    },
    {
        programName: "Unemployment Registry Support",
        benefitCode: "Guidance",
        quantity: "1 Session",
        dateReceived: "25/09/2025",
        agent: { name: "Evan White", address: "987 Sunset Blvd, City F" },
        deliveryDateTime: "25/09/2025 01:00 PM",
        address: "987 Sunset Blvd, City F",
        mapImageUrl: "/map.png",
        evidenceImages: ["/e1.png", "/e2.png", "/e3.png"],
        biometricVerified: false,
        verificationType: "Fingerprint",
    },
    {
        programName: "Disability Registry Program",
        benefitCode: "Support",
        quantity: "1 Package",
        dateReceived: "25/09/2025",
        agent: { name: "Fiona Green", address: "159 Ocean St, City G" },
        deliveryDateTime: "25/09/2025 03:30 PM",
        address: "159 Ocean St, City G",
        mapImageUrl: "/map.png",
        evidenceImages: ["/e1.png", "/e2.png", "/e3.png"],
        biometricVerified: true,
        verificationType: "Fingerprint",
    },
    {
        programName: "Adult Literacy Drive",
        benefitCode: "Books",
        quantity: "20 No.",
        dateReceived: "25/09/2025",
        agent: { name: "George Brown", address: "753 Pine Rd, City H" },
        deliveryDateTime: "25/09/2025 04:00 PM",
        address: "753 Pine Rd, City H",
        mapImageUrl: "/map.png",
        evidenceImages: ["/e1.png", "/e2.png", "/e3.png"],
        biometricVerified: false,
        verificationType: "Fingerprint",
    },
];



export default function BenefitsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(receivedBenefitsData, 8);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterText, setFilterText] = useState("");

    const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (benefit: Benefit) => {
        setSelectedBenefit(benefit);
        setIsModalOpen(true);
    };

    const handleProgramActionSelect = (action: string, benefit: Benefit) => {
        switch (action) {
            case "delivery-details":
                handleOpenModal(benefit);
                break;

            case "support":
                console.log("Redirect to support")
                break;

            default:
                console.warn("Unknown program action:", action);
        }
    };

    return (
        <>
            <div className="px-[50px] py-4 min-h-screen bg-white">
                <h1 className="text-[18px] font-[600] text-gray-800 mb-4">
                    Benefits
                </h1>

                <div className="bg-white rounded-[10px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] w-full overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr>
                                    <th colSpan={5}>
                                        <div className="flex justify-between items-center px-2 py-4">
                                            <span className="px-6 py-2 text-[#ED7C22] text-[20px] font-[600]">Benefits Received till Date</span>
                                            <div className="flex gap-4 pr-6">
                                                <FilterInput
                                                    value={filterText}
                                                    onChange={setFilterText}
                                                    placeholder="Filter"
                                                    className="w-50"
                                                    bgColor="bg-[#F5F5F5]"
                                                />
                                                <SearchInput
                                                    onSearch={(val) => {
                                                        setCurrentPage(1);
                                                        setSearchQuery(val);
                                                    }}
                                                    placeholder="Search"
                                                    className="w-[200px]"
                                                />
                                            </div>
                                        </div>
                                    </th>
                                </tr>

                                <tr className="bg-[#F5F5F5]">
                                    <th className="px-8 py-3 text-left text-black">
                                        <div className="flex items-center gap-0.5">
                                            Program Name
                                            <Image
                                                src={prefixBasePath("/updown_arrow.png")}
                                                alt="Sort"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer opacity-40"
                                            />
                                        </div>
                                    </th>
                                    <th className="px-8 py-3 text-left text-black">
                                        <div className="flex items-center gap-0.5">
                                            Benefit Code
                                            <Image
                                                src={prefixBasePath("/updown_arrow.png")}
                                                alt="Sort"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer opacity-40"
                                            />
                                        </div>
                                    </th>
                                    <th className="px-8 py-3 text-left text-black">Quantity</th>
                                    <th className="px-8 py-3 text-left text-black">
                                        <div className="flex items-center gap-0.5">
                                            Received Date
                                            <Image
                                                src={prefixBasePath("/updown_arrow.png")}
                                                alt="Sort"
                                                width={20}
                                                height={20}
                                                className="cursor-pointer opacity-40"
                                            />
                                        </div>
                                    </th>
                                    <th className="pl-7 pr-8 py-3 text-left text-black">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems.map((benefit, index) => (
                                    <tr
                                        key={index}
                                        className={`transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}`}
                                    >
                                        <td className="px-8 py-3 text-black font-medium">{benefit.programName}</td>
                                        <td className="px-8 py-3 text-black">{benefit.benefitCode}</td>
                                        <td className="px-8 py-3 text-black">{benefit.quantity}</td>
                                        <td className="px-8 py-3 text-black">{benefit.dateReceived}</td>
                                        <td className="px-7 py-2 text-[16px] font-[400] text-black">
                                            <BenefitActionsDropdown
                                                onActionSelect={(action) => handleProgramActionSelect(action, benefit)}
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
                            {Math.min((currentPage - 1) * 8 + 1, receivedBenefitsData.length)}–
                            {Math.min(currentPage * 8, receivedBenefitsData.length)} of {receivedBenefitsData.length}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && selectedBenefit && (
                <DeliveryDetails
                    benefit={selectedBenefit}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}