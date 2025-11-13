"use client";

import { useRouter } from "next/navigation";

export default function AccountEmptyState({ lang }: { lang: string }) {
    const router = useRouter();

    return (
        <div className="px-[50px] py-4 min-h-screen bg-white flex flex-col justify-center items-center text-center">
            <h1 className="text-[22px] font-[600] text-gray-800 mb-4">No Linked Account Found</h1>
            <p className="text-[16px] text-gray-600 mb-6 max-w-[400px]">
                You currently don’t have any linked account or wallet. Please link an account to proceed.
            </p>
            <button
                onClick={() => router.push(`/${lang}/accounts/update`)}
                className="px-6 py-2 bg-[#3399FF] text-white font-[500] rounded-full hover:bg-[#2780D7] transition-all"
            >
                Link Account
            </button>
        </div>
    );
}
