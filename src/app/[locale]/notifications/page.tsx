"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

import { Pagination } from "@/components/shared";
import { AuthUtil } from '@/features/auth/components';
import { NotificationCard } from "@/features/notification/components";

import { Notification } from "@/features/notification/types";

import { usePagination } from "@/shared/hooks/usePagination";



const myNotifications: Notification[] = [
    {
        id: "1",
        title: "Healthcare Registry Update",
        description: "Your healthcare registry has been successfully updated with the latest medical records.",
        date: "20/09/2025",
        image: "/logo.png",
    },
    {
        id: "2",
        title: "Employment Registry Alert",
        description: "Please review the changes to your employment registry details.",
        date: "18/09/2025",
        image: "/logo.png",
    },
    {
        id: "3",
        title: "Housing Registry Notification",
        description: "A new housing scheme has been added to your registry profile.",
        date: "15/09/2025",
        image: "/logo.png",
    },
    {
        id: "4",
        title: "Education Registry Update",
        description: "Your education qualifications have been verified successfully.",
        date: "12/09/2025",
        image: "/logo.png",
    },
    {
        id: "5",
        title: "Pension Registry Reminder",
        description: "Please update your pension account details before the due date.",
        date: "10/09/2025",
        image: "/logo.png",
    },
    {
        id: "6",
        title: "Food Security Registry Alert",
        description: "Your ration card details have been validated.",
        date: "08/09/2025",
        image: "/logo.png",
    },
    {
        id: "7",
        title: "Skill Development Registry",
        description: "You have been enrolled in a new skill training program.",
        date: "05/09/2025",
        image: "/logo.png",
    },
    {
        id: "8",
        title: "Social Welfare Registry Notice",
        description: "Your social welfare application is under review.",
        date: "01/09/2025",
        image: "/logo.png",
    },
];

export default function NotificationsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(myNotifications, 4);

    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-4">
                <h1 className="text-lg text-black font-bold">Notifications / Broadcast</h1>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-black/20 p-4">
                <div className="mb-4 px-4">
                    <span className="text-lg font-semibold text-black">All Notifications</span>
                    <div className="border-b-4 border-gray-200 mt-1"></div>
                </div>

                <div className="grid gap-4 px-4">
                    {currentItems.map((notification) => (
                        <NotificationCard key={notification.id} notification={notification} />
                    ))}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}
