"use client";
import Image from "next/image";

import { prefixBasePath } from '@/shared/utils/path';
import { LanguageDropdown, ProfileDropdown, NotificationDropdown } from '@/components/layout';

import { Notification } from "@/features/notification/types/notification";

export const notifications: Notification[] = [
    {
        id: "1",
        title: "New Program Available",
        description: "You are eligible for the new Social Safety Net Program.",
        date: "Sep 20, 2025",
        image: "/logo.png",
    },
    {
        id: "2",
        title: "Application Update",
        description: "Your application has been approved.",
        date: "Sep 18, 2025",
        image: "/logo.png",
    },
    {
        id: "3",
        title: "Reminder",
        description: "Please update your contact details.",
        date: "Sep 15, 2025",
        image: "/logo.png",
    },
    {
        id: "4",
        title: "Survey",
        description: "Complete the beneficiary feedback survey.",
        date: "Sep 12, 2025",
        image: "/logo.png",
    },
    {
        id: "5",
        title: "New Payment",
        description: "Your next installment is scheduled.",
        date: "Sep 10, 2025",
        image: "/logo.png",
    },
];


export default function Header() {
    return (
        <header className="w-full bg-white flex items-center justify-between px-3 py-3 fixed top-0 left-0 right-0 z-20 h-[70px] border-b border-gray-300 shadow-md">
            <div className="flex items-center gap-3">
                <Image
                    src={prefixBasePath("/openg2p_logo.png")}
                    alt="Openg2p Logo"
                    width={40}
                    height={40}
                />
                <span className="text-[20px] font-semibold text-black">
                    Beneficiary Portal
                </span>
            </div>

            <div className="flex items-center gap-6">
                <button
                    className="text-lg text-black cursor-pointer"
                    onClick={() => console.log("Redirect to Help page")}
                >
                    Help?
                </button>
                <LanguageDropdown />
                <NotificationDropdown notifications={notifications} unreadCount={3} />
                <ProfileDropdown />
            </div>
        </header>
    );
}
