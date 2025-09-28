"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { prefixBasePath } from '@/shared/utils/path';
import { getSupportedLocales } from '@/shared/utils/lang';

const localeMap: Record<string, { name: string; flag: string }> = {
    en: { name: "English", flag: "/flag_en.png" },
    fr: { name: "Français", flag: "/flag_fr.png" },
    tl: { name: "Tagalog", flag: "/flag_tl.png" },
};

export default function LanguageDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLocale = useLocale();
    const supportedLocales = getSupportedLocales();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLocaleChange = (locale: string) => {
        setOpen(false);
        const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
        router.push(newPath);
    };

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1 bg-white text-sm font-medium text-gray-800 transition w-full cursor-pointer"
            >
                <Image
                    src={prefixBasePath(localeMap[currentLocale].flag)}
                    alt={localeMap[currentLocale].name}
                    width={27}
                    height={18}
                />
                <span className="capitalize text-lg">{localeMap[currentLocale].name}</span>
                <svg
                    className={`w-4 h-4 text-black transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-50">
                    <ul className="py-1">
                        {supportedLocales.map((locale) => (
                            <li key={locale}>
                                <button
                                    onClick={() => handleLocaleChange(locale)}
                                    className={`flex items-center gap-2 px-3 py-1 cursor-pointer text-sm w-full text-left transition-colors duration-150 ${currentLocale === locale
                                        ? 'bg-gray-200 text-black font-medium'
                                        : 'text-gray-700'
                                        }`}
                                >
                                    <Image
                                        src={prefixBasePath(localeMap[locale].flag)}
                                        alt={localeMap[locale].name}
                                        width={27}
                                        height={18}
                                    />
                                    <span className="capitalize">{localeMap[locale].name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
