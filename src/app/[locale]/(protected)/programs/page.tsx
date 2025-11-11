"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

import { AuthUtil } from '@/features/auth/components';
import { Programs } from '@/features/program/components';
import { usePrograms } from "@/features/program/hooks/usePrograms";
import { Loading } from "@/components";


export default function ProgramsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [activeTab, setActiveTab] = useState<"all" | "my">("all");

    const { programs, loading } = usePrograms(activeTab);

    return (
        <div className="px-[50px] py-4 min-h-screen bg-white">
            <h1 className="text-[18px] font-[600] text-gray-800 mb-4">
                Programs
            </h1>

            <Programs
                programs={programs}
                loading={loading}
                showMyPrograms={activeTab === "my"}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
}
