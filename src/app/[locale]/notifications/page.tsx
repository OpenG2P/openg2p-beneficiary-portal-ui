"use client";
import { useState } from "react";
import { Pagination } from "@/components";
import { prefixBasePath } from "@/utils/path";

export interface Notification {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string;
}

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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(myNotifications.length / itemsPerPage);

    const currentNotifications = myNotifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-4">
                <h1 className="text-lg text-black font-bold">Notifications / Broadcast</h1>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-black/20 p-4">
                <div className="mb-2 px-4">
                    <span className="text-lg font-semibold text-black">All Notifications</span>
                    <div className="border-b-4 border-gray-200 mt-1"></div>
                </div>

                <div className="grid gap-4 px-4">
                    {currentNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-start gap-4 border rounded-lg p-4 shadow-sm bg-white"
                        >
                            <div className="flex-shrink-0 w-20 h-20">
                                <img
                                    src={prefixBasePath(notification.image)}
                                    alt={notification.title}
                                    className="w-full h-full object-contain rounded-lg border bg-gray-100"
                                />
                            </div>


                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {notification.title}
                                </h3>
                                <span className="text-sm text-gray-500 block mt-0.5">
                                    {notification.date}
                                </span>
                                <p className="text-sm text-black mt-2">
                                    {notification.description}
                                </p>
                            </div>
                        </div>
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
