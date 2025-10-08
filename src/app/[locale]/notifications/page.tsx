// "use client";
// import { useLocale } from "next-intl";
// import { usePagination } from "@/shared/hooks/usePagination";
// import { AuthUtil } from '@/features/auth/components';
// import { prefixBasePath } from "@/shared/utils/path";
// import { Pagination } from "@/components/shared";
// import { Notification } from "@/features/notification/types";

// const myNotifications: Notification[] = [
//     {
//         id: "1",
//         title: "Healthcare Registry Update",
//         description: "Your healthcare registry has been successfully updated with the latest medical records.",
//         date: "20/09/2025",
//         image: "/logo.png",
//     },
//     {
//         id: "2",
//         title: "Employment Registry Alert",
//         description: "Please review the changes to your employment registry details.",
//         date: "18/09/2025",
//         image: "/logo.png",
//     },
//     {
//         id: "3",
//         title: "Housing Registry Notification",
//         description: "A new housing scheme has been added to your registry profile.",
//         date: "15/09/2025",
//         image: "/logo.png",
//     },
//     {
//         id: "4",
//         title: "Education Registry Update",
//         description: "Your education qualifications have been verified successfully.",
//         date: "12/09/2025",
//         image: "/logo.png",
//     },
//     {
//         id: "5",
//         title: "Pension Registry Reminder",
//         description: "Please update your pension account details before the due date.",
//         date: "10/09/2025",
//         image: "/logo.png",
//     },
//     {
//         id: "6",
//         title: "Food Security Registry Alert",
//         description: "Your ration card details have been validated.",
//         date: "08/09/2025",
//         image: "/logo.png",
//     },
//     {
//         id: "7",
//         title: "Skill Development Registry",
//         description: "You have been enrolled in a new skill training program.",
//         date: "05/09/2025",
//         image: "/logo.png",
//     },
//     {
//         id: "8",
//         title: "Social Welfare Registry Notice",
//         description: "Your social welfare application is under review.",
//         date: "01/09/2025",
//         image: "/logo.png",
//     },
// ];

// export default function NotificationsPage() {
//     const lang = useLocale();
//     AuthUtil({ failedRedirectUrl: `/${lang}/login` });

//     const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(myNotifications, 4);

//     return (
//         <div className="px-10 py-4 min-h-screen bg-gray-50">
//             <div className="mb-4">
//                 <h1 className="text-lg text-black font-bold">Notifications</h1>
//             </div>

//             <div className="bg-white rounded-lg overflow-hidden border border-black/20">
//                 <div className="mb-4 px-6 pt-4">
//                     <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-2">All Notifications</h2>
//                 </div>

//                 <div className="flex flex-col divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
//                     {currentItems.map((notification, idx) => (
//                         <div
//                             key={notification.id}
//                             className={`${idx % 2 === 0 ? "bg-gray-100" : "bg-white"} w-full`}
//                         >
//                             <div className="flex gap-3 px-6 py-3">
//                                 <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16">
//                                     <img
//                                         src={prefixBasePath(notification.image)}
//                                         alt={notification.title}
//                                         className="w-full h-full object-contain rounded-md border bg-white"
//                                     />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                     <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
//                                         {notification.title}
//                                     </h3>
//                                     {notification.date && (
//                                         <span className="text-xs sm:text-sm text-gray-500 block mt-0.5">
//                                             {notification.date}
//                                         </span>
//                                     )}
//                                     <p className="text-xs sm:text-sm text-gray-700 mt-1 line-clamp-2">
//                                         {notification.description}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="px-6 py-3">
//                     <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={setCurrentPage}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }


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

    const [searchQuery, setSearchQuery] = useState("");

    // Filter notifications based on search query
    const filteredNotifications = myNotifications.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pass filtered list to pagination hook
    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(filteredNotifications, 5);

    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-lg text-black font-bold">Notifications</h1>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-black/20">
                <div className="mb-4 px-6 pt-4 flex items-center justify-between">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-2">
                        All Notifications
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
                                        className="w-full h-full object-contain rounded-md border bg-white"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                        {notification.title}
                                    </h3>
                                    {notification.date && (
                                        <span className="text-xs sm:text-sm text-gray-500 block mt-0.5">
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