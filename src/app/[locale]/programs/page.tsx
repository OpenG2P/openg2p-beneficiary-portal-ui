"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

import { AuthUtil } from '@/features/auth/components';
import { Programs } from '@/features/program/components';
import { Program } from "@/features/program/types/program";

const allPrograms: Program[] = [
    {
        name: "Adult Literacy Drive",
        status: "Applied",
        id: "1",
        appliedDate: "2025-09-01 10:30 AM",
        benefits: ["Books", "Classes"],
        description: "The Adult Literacy Drive aims to provide educational support and learning resources to adults across the country. It ensures access to literacy programs, learning materials, and guidance to improve reading and writing skills. The initiative is designed to enhance social welfare and personal development by helping those who are most in need. Eligible participants can benefit from structured classes and self-learning modules, which help them improve daily life skills and employment opportunities. Continuous monitoring and community-based evaluation ensure the initiative reaches the intended beneficiaries effectively.",
    },
    {
        name: "School Supplies Initiative",
        status: "Apply",
        id: "2",
        appliedDate: "2025-08-15 09:10 AM",
        benefits: ["Books", "Uniforms"],
        description: "The School Supplies Initiative aims to provide essential educational materials to children in need. It ensures access to textbooks, uniforms, and learning tools to support school attendance and performance. The program is designed to reduce educational disparities and promote equitable growth by helping students from underprivileged backgrounds. Eligible children can benefit from in-kind support and mentorship programs, which help them stay in school and achieve better academic outcomes. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Social Registry Upgrade",
        status: "Enrolled",
        id: "3",
        appliedDate: "2025-08-10 02:15 PM",
        benefits: ["Information Access"],
        description: "The Social Registry Upgrade aims to improve the management of social welfare records across communities. It ensures access to accurate and updated beneficiary data for programs like pensions, health, and education. The initiative is designed to enhance administrative efficiency and equitable distribution of resources. Eligible households can benefit from streamlined registration and verification processes, which help ensure fair access to government schemes. Continuous monitoring and system-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Income Tax Assistance",
        status: "Applied",
        id: "4",
        appliedDate: "2025-08-20 11:45 AM",
        benefits: ["Money", "Guidance"],
        description: "The Income Tax Assistance program aims to help individuals and small businesses comply with tax regulations. It ensures access to advisory services, filing support, and financial guidance for effective tax management. The initiative is designed to reduce errors, enhance financial literacy, and promote compliance. Eligible applicants can benefit from expert consultations and simplified procedures, which help them meet legal obligations without penalties. Continuous monitoring and feedback evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Caste Certificate Facilitation",
        status: "Enrolled",
        id: "5",
        appliedDate: "2025-07-25 03:30 PM",
        benefits: ["Documentation"],
        description: "The Caste Certificate Facilitation program aims to assist citizens in obtaining caste certificates for accessing government benefits. It ensures access to proper documentation, verification processes, and guidance to simplify application. The initiative is designed to enhance social welfare and enable equitable opportunities for marginalized communities. Eligible applicants can benefit from streamlined submission and tracking systems, which help reduce delays and ensure fair access. Continuous monitoring and administrative evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Electricity Subsidy Program",
        status: "Enrolled",
        id: "6",
        appliedDate: "2025-07-15 04:10 PM",
        benefits: ["Money", "Support"],
        description: "The Electricity Subsidy Program aims to provide financial assistance to households for utility expenses. It ensures access to subsidized electricity bills, guidance, and support to reduce financial burden. The initiative is designed to enhance social welfare and ensure basic energy access for low-income families. Eligible households can benefit from direct subsidies and monitoring support, which help manage expenses and maintain essential services. Continuous monitoring and administrative evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Voter Registry Update",
        status: "Applied",
        id: "7",
        appliedDate: "2025-09-02 11:00 AM",
        benefits: ["Verification"],
        description: "The Voter Registry Update aims to maintain accurate and current electoral rolls across the country. It ensures access to registration, verification, and correction processes for eligible voters. The initiative is designed to enhance civic engagement, transparency, and electoral fairness. Eligible citizens can benefit from simplified procedures and online tools, which help ensure their voting rights are properly recorded. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Unemployment Registry Support",
        status: "Applied",
        id: "8",
        appliedDate: "2025-08-18 01:20 PM",
        benefits: ["Information Access", "Guidance"],
        description: "The Unemployment Registry Support program aims to provide assistance and guidance to job seekers. It ensures access to updated unemployment records, skill development opportunities, and placement services. The initiative is designed to enhance employment prospects, social welfare, and economic inclusion. Eligible participants can benefit from career counseling and job matching systems, which help improve livelihood opportunities. Continuous monitoring and administrative evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Disability Registry Program",
        status: "Apply",
        id: "9",
        appliedDate: "2025-08-28 03:15 PM",
        benefits: ["Documentation", "Support"],
        description: "The Disability Registry Program aims to provide accurate records and assistance for persons with disabilities. It ensures access to registration, certification, and support services to enhance inclusion and welfare. The initiative is designed to improve access to government benefits, educational opportunities, and healthcare. Eligible applicants can benefit from streamlined processes and specialized guidance, which help improve quality of life and access to resources. Continuous monitoring and administrative evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Food Security Program",
        status: "Enrolled",
        id: "10",
        appliedDate: "2025-09-03 09:00 AM",
        benefits: ["Food Supplies", "Nutrition"],
        description: "The Food Security Program ensures that low-income households have access to sufficient and nutritious food. It provides regular distribution of food items, nutritional guidance, and community support. The initiative is designed to improve public health and reduce food insecurity among vulnerable populations. Eligible families can benefit from food packages, workshops, and awareness sessions. Continuous monitoring ensures that the program effectively reaches the intended beneficiaries.",
    },
    {
        name: "Water Access Improvement",
        status: "Applied",
        id: "11",
        appliedDate: "2025-08-22 10:30 AM",
        benefits: ["Clean Water", "Infrastructure"],
        description: "The Water Access Improvement program aims to provide clean and safe water to rural and urban communities. It ensures access to improved water sources, infrastructure, and community training. The initiative is designed to promote health, hygiene, and sustainable water management. Eligible households can benefit from water filtration systems and maintenance training. Continuous monitoring ensures the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Healthcare Outreach",
        status: "Apply",
        id: "12",
        appliedDate: "2025-08-30 11:15 AM",
        benefits: ["Medical Checkups", "Medicines"],
        description: "The Healthcare Outreach program aims to provide essential medical services to underserved communities. It ensures access to health checkups, medicines, and preventive care. The initiative is designed to improve public health and reduce medical disparities. Eligible participants can benefit from mobile clinics, screenings, and health education. Continuous monitoring ensures the program effectively reaches the intended beneficiaries.",
    },
    {
        name: "Women Empowerment Workshops",
        status: "Enrolled",
        id: "13",
        appliedDate: "2025-09-05 02:00 PM",
        benefits: ["Training", "Skills Development"],
        description: "The Women Empowerment Workshops aim to provide skill development and training opportunities to women across various communities. It ensures access to workshops, mentorship, and resources to enhance employability and personal growth. The initiative is designed to reduce gender disparities and promote social welfare. Eligible participants can benefit from structured courses and support networks. Continuous monitoring ensures the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Digital Literacy Campaign",
        status: "Applied",
        id: "14",
        appliedDate: "2025-09-06 09:45 AM",
        benefits: ["Training", "Devices"],
        description: "The Digital Literacy Campaign aims to improve computer and internet skills for individuals in underserved communities. It ensures access to training sessions, devices, and educational materials. The initiative is designed to enhance employability and technological inclusion. Eligible participants can benefit from workshops and hands-on learning opportunities. Continuous monitoring ensures that the campaign reaches the intended beneficiaries effectively.",
    },
    {
        name: "Environmental Awareness Program",
        status: "Apply",
        id: "15",
        appliedDate: "2025-09-07 03:30 PM",
        benefits: ["Workshops", "Community Engagement"],
        description: "The Environmental Awareness Program aims to educate communities about sustainable practices and environmental conservation. It ensures access to workshops, awareness campaigns, and community projects. The initiative is designed to promote eco-friendly behaviors and social responsibility. Eligible participants can benefit from interactive sessions and community activities. Continuous monitoring ensures that the program effectively reaches the intended beneficiaries.",
    },
    {
        name: "Skill Development Initiative",
        status: "Enrolled",
        id: "16",
        appliedDate: "2025-09-08 10:00 AM",
        benefits: ["Training", "Certification"],
        description: "The Skill Development Initiative aims to provide vocational and professional training to youth and adults seeking employment opportunities. It ensures access to courses, mentorship, and certification programs. The initiative is designed to enhance employability and economic inclusion. Eligible participants can benefit from structured training modules and hands-on projects. Continuous monitoring ensures the initiative effectively reaches the intended beneficiaries.",
    },
];


const myPrograms: Program[] = [
    {
        name: "Adult Literacy Drive",
        status: "Applied",
        id: "1",
        appliedDate: "2025-09-01",
        benefits: ["Books", "Classes"],
        description: "The Adult Literacy Drive aims to provide educational support and learning resources to adults across the country. It ensures access to literacy programs, learning materials, and guidance to improve reading and writing skills. The initiative is designed to enhance social welfare and personal development by helping those who are most in need. Eligible participants can benefit from structured classes and self-learning modules, which help them improve daily life skills and employment opportunities. Continuous monitoring and community-based evaluation ensure the initiative reaches the intended beneficiaries effectively.",
    },
    {
        name: "School Supplies Initiative",
        status: "Applied",
        id: "2",
        appliedDate: "2025-08-15",
        benefits: ["Books", "Uniforms"],
        description: "The School Supplies Initiative aims to provide essential educational materials to children in need. It ensures access to textbooks, uniforms, and learning tools to support school attendance and performance. The program is designed to reduce educational disparities and promote equitable growth by helping students from underprivileged backgrounds. Eligible children can benefit from in-kind support and mentorship programs, which help them stay in school and achieve better academic outcomes. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Social Registry Upgrade",
        status: "Applied",
        id: "3",
        appliedDate: "2025-08-10",
        benefits: ["Information Access"],
        description: "The Social Registry Upgrade aims to improve the management of social welfare records across communities. It ensures access to accurate and updated beneficiary data for programs like pensions, health, and education. The initiative is designed to enhance administrative efficiency and equitable distribution of resources. Eligible households can benefit from streamlined registration and verification processes, which help ensure fair access to government schemes. Continuous monitoring and system-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Income Tax Assistance",
        status: "Applied",
        id: "4",
        appliedDate: "2025-08-20",
        benefits: ["Money", "Guidance"],
        description: "The Income Tax Assistance program aims to help individuals and small businesses comply with tax regulations. It ensures access to advisory services, filing support, and financial guidance for effective tax management. The initiative is designed to reduce errors, enhance financial literacy, and promote compliance. Eligible applicants can benefit from expert consultations and simplified procedures, which help them meet legal obligations without penalties. Continuous monitoring and feedback evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Caste Certificate Facilitation",
        status: "Applied",
        id: "5",
        appliedDate: "2025-07-25",
        benefits: ["Documentation"],
        description: "The Caste Certificate Facilitation program aims to assist citizens in obtaining caste certificates for accessing government benefits. It ensures access to proper documentation, verification processes, and guidance to simplify application. The initiative is designed to enhance social welfare and enable equitable opportunities for marginalized communities. Eligible applicants can benefit from streamlined submission and tracking systems, which help reduce delays and ensure fair access. Continuous monitoring and administrative evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Electricity Subsidy Program",
        status: "Applied",
        id: "6",
        appliedDate: "2025-07-15",
        benefits: ["Money", "Support"],
        description: "The Electricity Subsidy Program aims to provide financial assistance to households for utility expenses. It ensures access to subsidized electricity bills, guidance, and support to reduce financial burden. The initiative is designed to enhance social welfare and ensure basic energy access for low-income families. Eligible households can benefit from direct subsidies and monitoring support, which help manage expenses and maintain essential services. Continuous monitoring and administrative evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Voter Registry Update",
        status: "Applied",
        id: "7",
        appliedDate: "2025-09-02",
        benefits: ["Verification"],
        description: "The Voter Registry Update aims to maintain accurate and current electoral rolls across the country. It ensures access to registration, verification, and correction processes for eligible voters. The initiative is designed to enhance civic engagement, transparency, and electoral fairness. Eligible citizens can benefit from simplified procedures and online tools, which help ensure their voting rights are properly recorded. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Unemployment Registry Support",
        status: "Applied",
        id: "8",
        appliedDate: "2025-08-18",
        benefits: ["Information Access", "Guidance"],
        description: "The Unemployment Registry Support program aims to provide assistance and guidance to job seekers. It ensures access to updated unemployment records, skill development opportunities, and placement services. The initiative is designed to enhance employment prospects, social welfare, and economic inclusion. Eligible participants can benefit from career counseling and job matching systems, which help improve livelihood opportunities. Continuous monitoring and administrative evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Disability Registry Program",
        status: "Applied",
        id: "9",
        appliedDate: "2025-08-28",
        benefits: ["Documentation", "Support"],
        description: "The Disability Registry Program aims to provide accurate records and assistance for persons with disabilities. It ensures access to registration, certification, and support services to enhance inclusion and welfare. The initiative is designed to improve access to government benefits, educational opportunities, and healthcare. Eligible applicants can benefit from streamlined processes and specialized guidance, which help improve quality of life and access to resources. Continuous monitoring and administrative evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Food Security Program",
        status: "Applied",
        id: "10",
        appliedDate: "2025-09-03",
        benefits: ["Food Supplies", "Nutrition"],
        description: "The Food Security Program ensures that low-income households have access to sufficient and nutritious food. It provides regular distribution of food items, nutritional guidance, and community support. The initiative is designed to improve public health and reduce food insecurity among vulnerable populations. Eligible families can benefit from food packages, workshops, and awareness sessions. Continuous monitoring ensures that the program effectively reaches the intended beneficiaries.",
    },
    {
        name: "Water Access Improvement",
        status: "Applied",
        id: "11",
        appliedDate: "2025-08-22",
        benefits: ["Clean Water", "Infrastructure"],
        description: "The Water Access Improvement program aims to provide clean and safe water to rural and urban communities. It ensures access to improved water sources, infrastructure, and community training. The initiative is designed to promote health, hygiene, and sustainable water management. Eligible households can benefit from water filtration systems and maintenance training. Continuous monitoring ensures the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Healthcare Outreach",
        status: "Applied",
        id: "12",
        appliedDate: "2025-08-30",
        benefits: ["Medical Checkups", "Medicines"],
        description: "The Healthcare Outreach program aims to provide essential medical services to underserved communities. It ensures access to health checkups, medicines, and preventive care. The initiative is designed to improve public health and reduce medical disparities. Eligible participants can benefit from mobile clinics, screenings, and health education. Continuous monitoring ensures the program effectively reaches the intended beneficiaries.",
    },
    {
        name: "Women Empowerment Workshops",
        status: "Applied",
        id: "13",
        appliedDate: "2025-09-05",
        benefits: ["Training", "Skills Development"],
        description: "The Women Empowerment Workshops aim to provide skill development and training opportunities to women across various communities. It ensures access to workshops, mentorship, and resources to enhance employability and personal growth. The initiative is designed to reduce gender disparities and promote social welfare. Eligible participants can benefit from structured courses and support networks. Continuous monitoring ensures the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Digital Literacy Campaign",
        status: "Applied",
        id: "14",
        appliedDate: "2025-09-06",
        benefits: ["Training", "Devices"],
        description: "The Digital Literacy Campaign aims to improve computer and internet skills for individuals in underserved communities. It ensures access to training sessions, devices, and educational materials. The initiative is designed to enhance employability and technological inclusion. Eligible participants can benefit from workshops and hands-on learning opportunities. Continuous monitoring ensures that the campaign reaches the intended beneficiaries effectively.",
    },
    {
        name: "Environmental Awareness Program",
        status: "Applied",
        id: "15",
        appliedDate: "2025-09-07",
        benefits: ["Workshops", "Community Engagement"],
        description: "The Environmental Awareness Program aims to educate communities about sustainable practices and environmental conservation. It ensures access to workshops, awareness campaigns, and community projects. The initiative is designed to promote eco-friendly behaviors and social responsibility. Eligible participants can benefit from interactive sessions and community activities. Continuous monitoring ensures that the program effectively reaches the intended beneficiaries.",
    },
    {
        name: "Skill Development Initiative",
        status: "Applied",
        id: "16",
        appliedDate: "2025-09-08",
        benefits: ["Training", "Certification"],
        description: "The Skill Development Initiative aims to provide vocational and professional training to youth and adults seeking employment opportunities. It ensures access to courses, mentorship, and certification programs. The initiative is designed to enhance employability and economic inclusion. Eligible participants can benefit from structured training modules and hands-on projects. Continuous monitoring ensures the initiative effectively reaches the intended beneficiaries.",
    },
];



export default function ProgramsPage() {
    const lang = useLocale();
    // AuthUtil({ failedRedirectUrl: `/${lang}/login` });

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
