"use client";

import { AuthUtil, Programs } from "@/components";
import { useLocale } from "next-intl";

export default function ProgramsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });
    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-2">
                <h1 className="text-xl font-bold text-gray-800">My Programs</h1>
            </div>
            <Programs />
        </div >
    );
}
