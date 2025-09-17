"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/context/global";
import { prefixBasePath, prefixBaseApiPath } from "@/utils/path";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { profile, setProfile } = useAuth();
    const router = useRouter();
    const lang = useLocale();
    const t = useTranslations();

    const toggleDropdown = () => setOpen((prev) => !prev);

    const logoutHandler = async () => {
        try {
            await fetch(prefixBaseApiPath("/auth/logout"), { method: "POST" });
        } finally {
            setProfile(null);
            router.push(`/${lang}/login`);
        }
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const avatarSrc = profile?.picture || prefixBasePath("/user.png");

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-3 py-1 bg-[#D9D9D9] text-sm font-medium text-gray-800 rounded-md transition"
            >
                <span className="text-lg">{`Hi, ${profile?.given_name || "User"}`}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
                    <Image
                        src={avatarSrc}
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="object-cover"
                    />
                </div>
                <svg
                    className={`w-3 h-3 text-gray-600 transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fadeIn origin-top-right">
                    <div className="py-1">
                        <Link
                            href={`/${lang}/myprofile`}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                            {t("profileDropdown.myProfile")}
                        </Link>
                        <button
                            onClick={logoutHandler}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                            {t("profileDropdown.logout")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
