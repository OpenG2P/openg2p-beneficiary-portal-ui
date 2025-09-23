"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

import { AuthUtil } from '@/features/auth/components';
import { Pagination } from '@/components/shared';
import { ApplySchemeForm } from '@/features/scheme/components';

import { Scheme } from "@/features/scheme/types/scheme";

import { usePagination } from "@/shared/hooks/usePagination";

const schemes: Scheme[] = [
    {
        id: 1042504101,
        title: "OpenG2P Social Safety Net Program",
        date: "15/08/2025",
        action: "Apply",
        description: "This program provides social safety net support to vulnerable individuals, offering financial assistance and essential services to improve their quality of life. It aims to ensure that beneficiaries have access to healthcare, food, education, and other critical resources, empowering them to meet their basic needs and achieve stability."
    },
    {
        id: 1042504102,
        title: "Healthcare Support Program",
        date: "05/08/2025",
        action: "Apply",
        description: "Designed to improve access to quality healthcare services, this program offers financial and logistical support for medical treatment, preventive care, and wellness programs. Beneficiaries can receive assistance for consultations, medications, and hospital care, helping them maintain good health and reduce the burden of medical expenses."
    },
    {
        id: 1042504103,
        title: "Education Grant Scheme",
        date: "22/07/2025",
        action: "Apply",
        description: "This scheme supports students and learners by providing financial grants for tuition, books, and educational resources. Its goal is to make education accessible to all eligible participants, encouraging skill development and academic growth while reducing financial barriers that may prevent individuals from pursuing learning opportunities."
    },
    {
        id: 1042504104,
        title: "Housing Assistance Program",
        date: "10/07/2025",
        action: "Apply",
        description: "Aimed at providing secure and affordable housing, this program helps beneficiaries access rental support, home repairs, and emergency shelter. The initiative promotes safe living conditions, stability, and dignity for individuals and families, ensuring that everyone has access to suitable housing."
    },
    {
        id: 1042504105,
        title: "Pension Support Scheme",
        date: "28/06/2025",
        action: "Apply",
        description: "This scheme provides financial assistance to senior citizens through pension support, ensuring a stable income for retirees. It helps meet daily living expenses, medical needs, and other necessities, enhancing the overall quality of life and promoting security during old age."
    },
    {
        id: 1042504106,
        title: "Food Security Program",
        date: "15/06/2025",
        action: "Apply",
        description: "Focused on ensuring access to nutritious food, this program provides assistance to low-income families and vulnerable groups. Beneficiaries receive support for food purchases, nutritional guidance, and food distribution services, reducing hunger and promoting health and well-being."
    },
    {
        id: 1042504107,
        title: "Skill Development Scheme",
        date: "05/06/2025",
        action: "Apply",
        description: "This scheme helps participants gain vocational and professional skills through training, workshops, and mentoring programs. Its goal is to improve employability, career growth, and self-reliance by equipping individuals with the knowledge and tools to succeed in the workforce."
    },
    {
        id: 1042504108,
        title: "Social Welfare Program",
        date: "25/05/2025",
        action: "Apply",
        description: "This program provides comprehensive social support services, including access to financial aid, counseling, and community development initiatives. It aims to enhance overall welfare, reduce social inequalities, and improve the living conditions of disadvantaged groups."
    },
    {
        id: 1042504109,
        title: "Transportation Subsidy Scheme",
        date: "20/05/2025",
        action: "Apply",
        description: "This scheme provides subsidies for public transportation and commuting expenses for eligible individuals. It ensures easier access to workplaces, educational institutions, and essential services, reducing transportation costs and promoting mobility and economic participation."
    },
    {
        id: 1042504110,
        title: "Energy Subsidy Program",
        date: "15/05/2025",
        action: "Apply",
        description: "Designed to reduce energy costs for households, this program offers financial support for electricity, gas, and renewable energy installations. Beneficiaries can maintain access to essential energy services, promoting comfort, sustainability, and cost savings."
    },
    {
        id: 1042504111,
        title: "Housing Development Grant",
        date: "10/05/2025",
        action: "Apply",
        description: "This grant supports individuals and families in constructing or improving homes. By providing financial assistance for materials, labor, and construction costs, it promotes safe, stable, and adequate housing for eligible beneficiaries."
    },
    {
        id: 1042504112,
        title: "Education Aid Program",
        date: "05/05/2025",
        action: "Apply",
        description: "Providing financial support for educational expenses, this program helps cover tuition, books, and learning materials. Its goal is to ensure that learners have equal access to quality education, fostering academic achievement and personal growth."
    },
    {
        id: 1042504113,
        title: "Pension Relief Scheme",
        date: "01/05/2025",
        action: "Apply",
        description: "This scheme provides additional pension support for retired individuals facing financial difficulties. It ensures a secure income, helping beneficiaries meet essential living expenses and maintain dignity in their later years."
    },
    {
        id: 1042504114,
        title: "Food Aid Scheme",
        date: "25/04/2025",
        action: "Apply",
        description: "This initiative provides emergency and ongoing food support to vulnerable populations. Beneficiaries receive nutritious meals, groceries, and guidance on proper nutrition to improve health outcomes and reduce food insecurity."
    },
    {
        id: 1042504115,
        title: "Skill Training Program",
        date: "15/04/2025",
        action: "Apply",
        description: "Focused on professional and vocational development, this program provides workshops, certifications, and hands-on training. Participants gain marketable skills that enhance employability and career growth opportunities."
    },
    {
        id: 1042504116,
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

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(schemes, 8);

    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Potential Applicable Schemes
                </h1>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-black/20 p-4">
                <div className="mb-2 px-4">
                    <span className="text-lg font-semibold text-black">
                        Applicable Schemes
                    </span>
                    <div className="border-b-4 border-gray-200 mt-1"></div>
                </div>

                <div className="overflow-x-auto px-4">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead className="border-b-3 border-gray-200">
                            <tr>
                                <th className="pt-4 pb-2 text-sm font-semibold text-black">Name of the Schemes</th>
                                <th className="pt-4 pb-2 text-sm font-semibold text-black">Schemes ID</th>
                                <th className="pt-4 pb-2 text-sm font-semibold text-black">Date</th>
                                <th className="pt-4 pb-2 text-sm font-semibold text-black">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((scheme) => (
                                <tr
                                    key={scheme.id}
                                    className="hover:bg-gray-50 transition-colors duration-150 border-b-3 border-gray-300"
                                >
                                    <td className="py-3 text-gray-900 font-medium">{scheme.title}</td>
                                    <td className="py-3 font-mono text-gray-900 text-sm">{scheme.id}</td>
                                    <td className="py-3 text-gray-900 text-sm">{scheme.date}</td>
                                    <td className="py-3">
                                        <span
                                            onClick={() => {
                                                setSelectedScheme(scheme);
                                                setOpenForm(true);
                                            }}
                                            className="text-black text-sm font-medium underline cursor-pointer hover:text-blue-600 transition-colors"
                                        >
                                            {scheme.action}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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
