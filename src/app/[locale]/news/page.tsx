"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { usePagination } from "@/shared/hooks/usePagination";
import { AuthUtil } from '@/features/auth/components';
import { prefixBasePath } from "@/shared/utils/path";
import { Pagination, SearchInput } from "@/components/shared";
import { Notification } from "@/features/notification/types";

const newsData: Notification[] = [
    {
        id: "1",
        title: "Healthcare Registry Expansion Announced",
        description: "The Ministry of Health has expanded the Healthcare Registry to include additional wellness programs and vaccination records. Citizens can now update their profiles to access new benefits.",
        date: "20/09/2025 10:30 AM",
        image: "/logo.png",
    },
    {
        id: "2",
        title: "Employment Opportunities Portal Integrated",
        description: "The Employment Registry now connects directly to the National Job Portal, enabling registered users to apply for verified government and private job openings.",
        date: "18/09/2025 09:45 AM",
        image: "/logo.png",
    },
    {
        id: "3",
        title: "Affordable Housing Scheme Launched",
        description: "A new low-cost housing program has been launched under the Housing Registry. Eligible applicants can now apply online through their registry dashboard.",
        date: "15/09/2025 02:10 PM",
        image: "/logo.png",
    },
    {
        id: "4",
        title: "Education Registry Now Supports Scholarships",
        description: "Students registered under the Education Registry can now apply for government-funded scholarships and educational grants using their registry ID.",
        date: "12/09/2025 11:00 AM",
        image: "/logo.png",
    },
    {
        id: "5",
        title: "Social Welfare Benefits Updated",
        description: "The Social Welfare Registry has revised benefit eligibility for the 2025 cycle. Ensure your profile is updated to continue receiving support.",
        date: "10/09/2025 04:20 PM",
        image: "/logo.png",
    }
];

export default function NewsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotifications = newsData.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(filteredNotifications, 5);

    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-lg text-black font-bold">Latest News</h1>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-black/20">
                <div className="mb-4 px-6 pt-4 flex items-center justify-between">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-2">
                        All News
                    </h2>
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
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
                                    <h3 className="text-[18px] font-[600] text-black truncate">
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
                        {Math.min(currentPage * 5, filteredNotifications.length)} of {filteredNotifications.length} news
                    </div>
                </div>
            </div>
        </div>
    );
}