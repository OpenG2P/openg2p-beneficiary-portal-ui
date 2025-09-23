"use client";
import Image from "next/image";

import { prefixBasePath } from '@/shared/utils/path';
import { LanguageDropdown, ProfileDropdown } from '@/components/layout';

export default function Header() {
    return (
        <header className="w-full bg-[#D9D9D9] flex items-center justify-between px-3 py-3 fixed top-0 left-0 right-0 z-20 h-[70px] border-b border-gray-300">
            <div className="flex items-center gap-3">
                <Image
                    src={prefixBasePath("/header.png")}
                    alt="Logo"
                    width={40}
                    height={40}
                />
                <span className="text-xl font-semibold text-gray-800">
                    Beneficiary Portal
                </span>
            </div>

            <div className="flex items-center gap-4">
                <button
                    className="text-lg text-black hover:underline"
                    onClick={() => alert("Redirect to Help page")}
                >
                    Help
                </button>
                <LanguageDropdown />
                <button className="relative">
                    <Image
                        src={prefixBasePath("/notification.png")}
                        alt="Notifications"
                        width={24}
                        height={24}
                    />
                </button>
                <ProfileDropdown />
            </div>
        </header>
    );
}
