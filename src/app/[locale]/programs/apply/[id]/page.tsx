"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";

import { AuthUtil } from "@/features/auth/components";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/global";
import { Program } from "@/features/program/types/program";
import { Loading } from "@/components/shared";

const allPrograms: Program[] = [
    {
        name: "Social Safety Net Program",
        status: "Applied",
        id: "1",
        appliedDate: "2025-09-01 10:30 AM",
        benefits: ["Money", "Rice", "Oil", "Books"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Pension Yojana",
        status: "Apply",
        id: "2",
        appliedDate: "2025-08-15 09:10 AM",
        benefits: ["Money"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "PM-KISAN Farmer Support",
        status: "Enrolled",
        id: "3",
        appliedDate: "2025-08-10 02:15 PM",
        benefits: ["Money", "Rice", "Oil"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Ayushman Bharat Health Scheme",
        status: "Applied",
        id: "4",
        appliedDate: "2025-08-20 11:45 AM",
        benefits: ["Money", "Home"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Pradhan Mantri Awas Yojana",
        status: "Enrolled",
        id: "5",
        appliedDate: "2025-07-25 03:30 PM",
        benefits: ["Home", "Money"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Skill Development Program",
        status: "Enrolled",
        id: "6",
        appliedDate: "2025-07-15 04:10 PM",
        benefits: ["Books", "Money"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Digital India Initiative",
        status: "Applied",
        id: "7",
        appliedDate: "2025-09-02 11:00 AM",
        benefits: ["Money", "Books", "Home"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Startup India Support",
        status: "Apply",
        id: "8",
        appliedDate: "2025-08-18 01:20 PM",
        benefits: ["Money", "Books"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Clean Ganga Mission",
        status: "Apply",
        id: "9",
        appliedDate: "2025-08-28 03:15 PM",
        benefits: ["Money", "Rice", "Oil"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Swachh Bharat Abhiyan",
        status: "Enrolled",
        id: "10",
        appliedDate: "2025-08-12 04:45 PM",
        benefits: ["Money", "Rice"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "National Health Mission",
        status: "Applied",
        id: "11",
        appliedDate: "2025-08-22 09:40 AM",
        benefits: ["Money", "Home", "Oil"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Housing for All",
        status: "Enrolled",
        id: "12",
        appliedDate: "2025-07-28 02:30 PM",
        benefits: ["Home", "Money"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Rural Skill Training",
        status: "Apply",
        id: "13",
        appliedDate: "2025-08-06 10:10 AM",
        benefits: ["Books", "Money"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "Women Empowerment Program",
        status: "Enrolled",
        id: "14",
        appliedDate: "2025-07-17 05:00 PM",
        benefits: ["Money", "Books", "Rice"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "LPG Subsidy",
        status: "Pending",
        id: "15",
        appliedDate: "2025-08-25 05:45 PM",
        benefits: ["Money", "Oil"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
    {
        name: "National Rural Employment Guarantee",
        status: "Apply",
        id: "16",
        appliedDate: "2025-08-05 09:20 AM",
        benefits: ["Money", "Rice", "Books"],
        description: "The Social Safety Net Program aims to provide financial and material assistance to vulnerable families and individuals across the country. It ensures access to essential resources such as food, monetary support, and educational materials. The program is designed to reduce poverty, enhance social welfare, and promote equitable growth by helping those who are most in need. Eligible households can benefit from a combination of direct cash transfers and in-kind support, which helps them manage emergencies and maintain a minimum standard of living. Continuous monitoring and community-based evaluation ensure the program reaches the intended beneficiaries effectively.",
    },
];

export default function ApplyProgramPage() {
    const lang = useLocale();
    const router = useRouter();
    const params = useParams();
    const programId = params.id;

    AuthUtil({ failedRedirectUrl: `/${lang}/login` });


    const [program, setProgram] = useState<Program | null>(null);
    const { profile } = useAuth();
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (profile) {
            setName(profile.name || "");
            setUserId(profile.provider_unique_id || "");
        }
    }, [profile]);

    useEffect(() => {
        const selectedProgram = allPrograms.find(p => p.id === programId) || null;
        setProgram(selectedProgram);
    }, [programId]);

    if (!program) return <Loading />

    return (
        <div className="px-10 py-8 bg-white min-h-screen">
            <h1 className="text-[18px] font-[600] text-gray-800 mb-2">Program Application</h1>

            <div className="flex flex-row gap-0 rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="w-[70%] bg-white p-8">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-4">
                        Program Application Form
                    </h2>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="flex-1 max-w-[50%]">
                                <label className="block text-[16px] font-[500] text-black mb-1">
                                    Program Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 rounded-md px-4 py-2 text-[16px] text-black/50 focus:outline-none"
                                    value={program.name}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-[16px] font-[500] text-black mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 rounded-md px-4 py-2 text-[16px] text-black/50 focus:outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[16px] font-[500] text-black mb-1">
                                    ID
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 rounded-md px-4 py-2 text-[16px] text-black/50 focus:outline-none"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-[16px] font-[500] text-black mb-1">
                                    Whether Worker is Registered
                                </label>
                                <div className="relative">
                                    <select
                                        className="appearance-none w-full bg-gray-100 rounded-md px-4 py-2 text-[16px] text-black/50 cursor-pointer border-0 focus:outline-none focus:ring-0"
                                    >
                                        <option value="">Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-5 top-1/2 transform -translate-y-1/2">
                                        <Image
                                            src={prefixBasePath("/arrow_02.png")}
                                            alt="Dropdown arrow"
                                            width={20}
                                            height={20}
                                            className="w-4 h-4"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <label className="block text-[16px] font-[500] text-black mb-1">
                                    Member of any other State Welfare Board?
                                </label>
                                <div className="relative">
                                    <select
                                        className="appearance-none w-full bg-gray-100 rounded-md px-4 py-2 text-[16px] text-black/50 cursor-pointer border-0 focus:outline-none focus:ring-0"
                                    >
                                        <option value="">Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-5 top-1/2 transform -translate-y-1/2">
                                        <Image
                                            src={prefixBasePath("/arrow_02.png")}
                                            alt="Dropdown arrow"
                                            width={20}
                                            height={20}
                                            className="w-4 h-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-[16px] font-[500] text-black mb-1">
                                    Registration Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-gray-100 rounded-md px-4 py-2 text-[16px] text-black/50 focus:outline-none"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[16px] font-[500] text-black mb-1">
                                    Time
                                </label>
                                <input
                                    type="time"
                                    className="w-full bg-gray-100 rounded-md px-4 py-2 text-[16px] text-black/50 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-[16px] font-[500] text-black mb-1">
                                    Do you agree with the terms?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-black">
                                        <input type="radio" name="agree" value="yes" />
                                        Yes
                                    </label>
                                    <label className="flex items-center gap-2 text-black">
                                        <input type="radio" name="agree" value="no" />
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[30%] bg-gray-100 p-8 flex flex-col gap-4 justify-between">
                    <div>
                        <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-6">Program Details</h2>

                        <div className="mb-4">
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">
                                Program Name
                            </label>
                            <div className="text-[16px] text-black font-[500]">{program.name}</div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[16px] font-[500] text-black/50 mb-1">
                                Program Date
                            </label>
                            <div className="text-[16px] text-black font-[500]">{program.appliedDate}</div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-[500] text-black mb-1">
                                Description
                            </label>
                            <p className="text-[16px] text-black font-[500] leading-relaxed">
                                {program.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-2 bg-gray-200 text-gray-800 font-[500] rounded-md w-full"
                        >
                            Back
                        </button>
                        <button
                            className="px-6 py-2 bg-[#3399FF] text-white font-[500] rounded-md w-full"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
