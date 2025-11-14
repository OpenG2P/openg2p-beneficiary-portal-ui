"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import { AuthUtil } from "@/features/auth/components";
import { ProgramTable, ApplicationCard } from '@/features/program/components';
import { TotalBenefitsCard } from '@/features/disbursement/components';
import { RegistryCard } from "@/features/registry/components";
import { NewsCard } from "@/features/news/components";
import { News } from "@/features/news/types";

import { Application } from "@/features/program/types";
import { Registry } from "@/features/registry/types/registry";
import { BankCard } from "@/features/accountmapping/components";
import { getNews } from "@/features/news/utils";
import { usePrograms } from "@/features/program/hooks/usePrograms";
import { useResolveAccount } from "@/features/accountmapping/hooks/useResolveAccount";


export const previewRegistries: Registry[] = [
    { name: "Education Registry", id: "SW001", date: "15/08/2025", action: "Apply", description: "Tracks citizens under social welfare schemes." },
    { name: "Social Registry", id: "SW002", date: "05/08/2025", action: "Applied", description: "Tracks income tax records of citizens." },
    { name: "Income Tax Registry", id: "SW003", date: "22/07/2025", action: "Apply", description: "Records caste certificates issued to citizens." },
    { name: "Caste Certificate Registry", id: "SW004", date: "10/07/2025", action: "Apply", description: "Tracks electricity connections and usage." },
    { name: "Electricity Registry", id: "SW005", date: "28/06/2025", action: "Apply", description: "Maintains voter registration records." },
];

export const dashboardApplications: Application[] = [
    { name: "Social Registry", status: "Applied" },
    { name: "Income Tax Assistance", status: "Applied" },
    { name: "Caste Certificate Issuance", status: "Enrolled" },
    { name: "Electricity Subsidy Program", status: "Pending" },
];

export const benefits = [
    { icon: "/digital_cash.png", value: "15400", label: "Digital Cash" },
    { icon: "/physical_cash.png", value: "10000", label: "Physical Cash" },
    { icon: "/commodity.png", value: "420", label: "Commodity" },
    { icon: "/service.png", value: "250", label: "Service" },
];


export default function Dashboard() {

    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [news, setNews] = useState<News[]>([]);

    const { programs, loading } = usePrograms("my", 1, 5);

    const BASE_URL = "http://localhost:8080/mapper";
    const { handleResolve, resolving, result } = useResolveAccount(BASE_URL);


    useEffect(() => {
        getNews(1, 3)
            .then(({ data }) => setNews(data))
            .catch(console.error);

        handleResolve();
    }, []);

    return (
        <div className="pl-[50px] py-4 min-h-screen bg-white">
            <h1 className="text-[18px] font-[600] text-gray-800 mb-4">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 xl:grid-cols-3">
                <div className="xl:col-span-2 pr-[50px] pb-[50px]">
                    <ProgramTable programs={programs} loading={loading} />
                </div>

                <div className="flex flex-col gap-4 sm:gap-6 h-full pb-[50px] pr-[50px]">
                    <TotalBenefitsCard benefits={benefits} />
                    <BankCard result={result} resolving={resolving} />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 ">
                <RegistryCard registries={previewRegistries} />
                <ApplicationCard applications={dashboardApplications} />
                <NewsCard news={news} />
            </div>
        </div>
    );
}
