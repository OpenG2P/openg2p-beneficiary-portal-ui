"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { usePagination } from "@/shared/hooks/usePagination";
import { AuthUtil } from '@/features/auth/components';
import { prefixBasePath } from "@/shared/utils/path";
import { Pagination, SearchInput } from "@/components/shared";
import { Notification } from "@/features/notification/types";

const myNotifications: Notification[] = [
    {
        id: "1",
        title: "Healthcare Registry Update",
        description: "Your healthcare registry has been successfully updated with the latest medical records.",
        date: "20/09/2025 10:30 AM",
        image: "/logo.png",
    },
    {
        id: "2",
        title: "Employment Registry Alert",
        description: "Please review the recent changes to your employment registry details for accuracy.",
        date: "18/09/2025 02:15 PM",
        image: "/logo.png",
    },
    {
        id: "3",
        title: "Housing Registry Notification",
        description: "A new housing scheme has been added to your housing registry profile. Check your eligibility.",
        date: "15/09/2025 09:45 AM",
        image: "/logo.png",
    },
    {
        id: "4",
        title: "Education Registry Update",
        description: "Your education qualifications have been successfully verified and updated in the registry.",
        date: "12/09/2025 11:00 AM",
        image: "/logo.png",
    },
    {
        id: "5",
        title: "Pension Registry Reminder",
        description: "Please update your pension account details before the due date to avoid delays in disbursement.",
        date: "10/09/2025 03:20 PM",
        image: "/logo.png",
    },
    {
        id: "6",
        title: "Food Security Registry Alert",
        description: "Your ration card details have been validated and updated in the system.",
        date: "08/09/2025 08:50 AM",
        image: "/logo.png",
    },
    {
        id: "7",
        title: "Skill Development Registry Notice",
        description: "You have been enrolled in a new skill training program. Please check the schedule and materials.",
        date: "05/09/2025 10:15 AM",
        image: "/logo.png",
    },
    {
        id: "8",
        title: "Social Welfare Registry Update",
        description: "Your social welfare application status has been updated. Please review the latest changes.",
        date: "03/09/2025 09:30 AM",
        image: "/logo.png",
    },
    {
        id: "9",
        title: "Transport Registry Alert",
        description: "Your driving license renewal request has been processed. Check your registry for confirmation.",
        date: "01/09/2025 11:45 AM",
        image: "/logo.png",
    },
    {
        id: "10",
        title: "Energy Registry Notification",
        description: "Your electricity connection details have been updated successfully in the energy registry.",
        date: "30/08/2025 02:00 PM",
        image: "/logo.png",
    },
];



export default function NotificationsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotifications = myNotifications.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(filteredNotifications, 5);

    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-lg text-black font-bold">Notifications</h1>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-black/20 shadow-[0_4px_20px_0_rgba(0,0,0,0.25)]">
                <div className="mb-4 px-6 pt-4 flex items-center justify-between">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-2">
                        All Notifications
                    </h2>
                    <SearchInput
                        onSearch={(val) => {
                            setCurrentPage(1);
                            setSearchQuery(val);
                        }}
                        placeholder="Search"
                        className="w-[200px]"
                    />
                </div>

                <div className="flex flex-col divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                    {currentItems.map((notification, idx) => (
                        <div
                            key={notification.id}
                            className={`${idx % 2 === 0 ? "bg-gray-100" : "bg-white"} w-full`}
                        >
                            <div className="flex gap-3 px-6 py-3">
                                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16">
                                    <img
                                        src={prefixBasePath(notification.image)}
                                        alt={notification.title}
                                        className="w-full h-full object-contain rounded-md bg-white"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[18px] font-[500] text-black truncate">
                                        {notification.title}
                                    </h3>
                                    {notification.date && (
                                        <span className="text-[14px] text-[#3399FF] block mt-0.5">
                                            {notification.date}
                                        </span>
                                    )}
                                    <p className="text-xs sm:text-sm text-gray-700 mt-1 line-clamp-2">
                                        {notification.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-6 px-8 py-4 text-sm text-black">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                    <div className="text-gray-600">
                        Showing{" "}
                        {Math.min((currentPage - 1) * 5 + 1, filteredNotifications.length)}–
                        {Math.min(currentPage * 5, filteredNotifications.length)} of {filteredNotifications.length} notifications
                    </div>
                </div>
            </div>
        </div>
    );
}