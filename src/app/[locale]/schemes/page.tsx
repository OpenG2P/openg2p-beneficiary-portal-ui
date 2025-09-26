"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import Image from "next/image";

import { prefixBasePath } from '@/shared/utils/path';

import { AuthUtil } from '@/features/auth/components';
import { Pagination, SearchInput } from '@/components/shared';
import { ApplySchemeForm } from '@/features/program/components';

import { Scheme } from "@/features/program/types/scheme";

import { usePagination } from "@/shared/hooks/usePagination";

const schemes: Scheme[] = [
    {
        id: 1042504101,
        image: "/scheme_card.png",
        title: "OpenG2P Social Safety Net Program",
        date: "15/08/2025",
        action: "Apply",
        description: "This program provides social safety net support to vulnerable individuals, offering financial assistance and essential services to improve their quality of life. It aims to ensure that beneficiaries have access to healthcare, food, education, and other critical resources, empowering them to meet their basic needs and achieve stability."
    },
    {
        id: 1042504102,
        image: "/scheme_card.png",
        title: "Healthcare Support Program",
        date: "05/08/2025",
        action: "Apply",
        description: "Designed to improve access to quality healthcare services, this program offers financial and logistical support for medical treatment, preventive care, and wellness programs. Beneficiaries can receive assistance for consultations, medications, and hospital care, helping them maintain good health and reduce the burden of medical expenses."
    },
    {
        id: 1042504103,
        image: "/scheme_card.png",
        title: "Education Grant Scheme",
        date: "22/07/2025",
        action: "Apply",
        description: "This scheme supports students and learners by providing financial grants for tuition, books, and educational resources. Its goal is to make education accessible to all eligible participants, encouraging skill development and academic growth while reducing financial barriers that may prevent individuals from pursuing learning opportunities."
    },
    {
        id: 1042504104,
        image: "/scheme_card.png",
        title: "Housing Assistance Program",
        date: "10/07/2025",
        action: "Apply",
        description: "Aimed at providing secure and affordable housing, this program helps beneficiaries access rental support, home repairs, and emergency shelter. The initiative promotes safe living conditions, stability, and dignity for individuals and families, ensuring that everyone has access to suitable housing."
    },
    {
        id: 1042504105,
        image: "/scheme_card.png",
        title: "Pension Support Scheme",
        date: "28/06/2025",
        action: "Apply",
        description: "This scheme provides financial assistance to senior citizens through pension support, ensuring a stable income for retirees. It helps meet daily living expenses, medical needs, and other necessities, enhancing the overall quality of life and promoting security during old age."
    },
    {
        id: 1042504106,
        image: "/scheme_card.png",
        title: "Food Security Program",
        date: "15/06/2025",
        action: "Apply",
        description: "Focused on ensuring access to nutritious food, this program provides assistance to low-income families and vulnerable groups. Beneficiaries receive support for food purchases, nutritional guidance, and food distribution services, reducing hunger and promoting health and well-being."
    },
    {
        id: 1042504107,
        image: "/scheme_card.png",
        title: "Skill Development Scheme",
        date: "05/06/2025",
        action: "Apply",
        description: "This scheme helps participants gain vocational and professional skills through training, workshops, and mentoring programs. Its goal is to improve employability, career growth, and self-reliance by equipping individuals with the knowledge and tools to succeed in the workforce."
    },
    {
        id: 1042504108,
        image: "/scheme_card.png",
        title: "Social Welfare Program",
        date: "25/05/2025",
        action: "Apply",
        description: "This program provides comprehensive social support services, including access to financial aid, counseling, and community development initiatives. It aims to enhance overall welfare, reduce social inequalities, and improve the living conditions of disadvantaged groups."
    },
    {
        id: 1042504109,
        image: "/scheme_card.png",
        title: "Transportation Subsidy Scheme",
        date: "20/05/2025",
        action: "Apply",
        description: "This scheme provides subsidies for public transportation and commuting expenses for eligible individuals. It ensures easier access to workplaces, educational institutions, and essential services, reducing transportation costs and promoting mobility and economic participation."
    },
    {
        id: 1042504110,
        image: "/scheme_card.png",
        title: "Energy Subsidy Program",
        date: "15/05/2025",
        action: "Apply",
        description: "Designed to reduce energy costs for households, this program offers financial support for electricity, gas, and renewable energy installations. Beneficiaries can maintain access to essential energy services, promoting comfort, sustainability, and cost savings."
    },
    {
        id: 1042504111,
        image: "/scheme_card.png",
        title: "Housing Development Grant",
        date: "10/05/2025",
        action: "Apply",
        description: "This grant supports individuals and families in constructing or improving homes. By providing financial assistance for materials, labor, and construction costs, it promotes safe, stable, and adequate housing for eligible beneficiaries."
    },
    {
        id: 1042504112,
        image: "/scheme_card.png",
        title: "Education Aid Program",
        date: "05/05/2025",
        action: "Apply",
        description: "Providing financial support for educational expenses, this program helps cover tuition, books, and learning materials. Its goal is to ensure that learners have equal access to quality education, fostering academic achievement and personal growth."
    },
    {
        id: 1042504113,
        image: "/scheme_card.png",
        title: "Pension Relief Scheme",
        date: "01/05/2025",
        action: "Apply",
        description: "This scheme provides additional pension support for retired individuals facing financial difficulties. It ensures a secure income, helping beneficiaries meet essential living expenses and maintain dignity in their later years."
    },
    {
        id: 1042504114,
        image: "/scheme_card.png",
        title: "Food Aid Scheme",
        date: "25/04/2025",
        action: "Apply",
        description: "This initiative provides emergency and ongoing food support to vulnerable populations. Beneficiaries receive nutritious meals, groceries, and guidance on proper nutrition to improve health outcomes and reduce food insecurity."
    },
    {
        id: 1042504115,
        image: "/scheme_card.png",
        title: "Skill Training Program",
        date: "15/04/2025",
        action: "Apply",
        description: "Focused on professional and vocational development, this program provides workshops, certifications, and hands-on training. Participants gain marketable skills that enhance employability and career growth opportunities."
    },
    {
        id: 1042504116,
        image: "/scheme_card.png",
        title: "Social Welfare Support Program",
        date: "05/04/2025",
        action: "Apply",
        description: "This program provides integrated social services, including financial aid, counseling, and community engagement initiatives. Its goal is to strengthen social protection, improve living conditions, and promote inclusivity for all beneficiaries."
    },
];

export default function SchemePage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [openForm, setOpenForm] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(schemes, 8);

    return (
        <div className="px-4 sm:px-10 py-4 min-h-screen bg-white">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Applicable Schemes</h1>
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-black/20">
                <div className="flex justify-between items-center px-6 py-4">
                    <span className="text-lg font-semibold text-[#ED7C22]">List of Schemes</span>
                    <div className="w-23/100">
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search"
                            className="w-50"
                            bgColor="bg-gray-100"
                            onIconClick={() => console.log("Search triggered:", searchQuery)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse min-w-[700px]">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-black text-left py-4 px-6">Name of the Schemes</th>
                                <th className="text-black text-left py-4 px-6">Schemes ID</th>
                                <th className="text-black text-left py-4 px-6">
                                    Date
                                    <Image
                                        src={prefixBasePath("/updown_arrow.png")}
                                        alt="Sort"
                                        width={20}
                                        height={20}
                                        className="inline-block cursor-pointer opacity-40"
                                    />
                                </th>
                                <th className="text-black text-left py-4 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((scheme, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{scheme.title}</td>
                                    <td className="px-6 py-4 font-mono text-gray-900 text-sm">{scheme.id}</td>
                                    <td className="px-6 py-4 text-gray-900 text-sm">{scheme.date}</td>
                                    <td className="px-6 py-4 ">
                                        <span
                                            onClick={() => {
                                                setSelectedScheme(scheme);
                                                setOpenForm(true);
                                            }}
                                            className="px-2 py-1 text-sm text-[#3399FF] bg-[#3399FF1F] rounded-full font-medium cursor-pointer"
                                        >
                                            {scheme.action}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {openForm && selectedScheme && (
                <ApplySchemeForm
                    schemeName={selectedScheme.title}
                    date={selectedScheme.date}
                    description={selectedScheme.description}
                    onClose={() => setOpenForm(false)}
                />
            )}
        </div>
    );
}
