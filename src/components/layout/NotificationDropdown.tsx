"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";
import { Notification } from "@/features/notification/types/notification";
import { ViewAll } from '@/components/shared';


interface NotificationDropdownProps {
    notifications: Notification[];
    unreadCount?: number;
}

export default function NotificationDropdown({
    notifications,
    unreadCount = 0,
}: NotificationDropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="relative p-1"
            >
                <Image
                    src={prefixBasePath("/notification.png")}
                    alt="Notifications"
                    width={24}
                    height={24}
                />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-2 h-2 flex items-center justify-center rounded-full">
                        {/* {unreadCount} */}
                    </span>
                )}
            </button>

            {open && (
                <div
                    className="absolute -right-16.5 top-10 mt-3 w-[340px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col"
                >
                    <div className="absolute -top-2.5 right-[70px] w-5 h-5 bg-white border-l border-t border-gray-200 rotate-45"></div>

                    <div className="px-6 pb-2 pt-3 text-[18px] font-[500] text-[#ED7C22]">
                        Notifications
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                        {notifications.slice(0, 4).map((n, index) => (
                            <div
                                key={n.id}
                                className={`px-2 flex items-start ${index % 2 === 0 ? "bg-[#F5F5F5]" : ""}`}
                            >
                                <div className="flex gap-3 p-3 w-full">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-[#FFF4EB]">
                                        <Image
                                            src={prefixBasePath("/notification_img.png")}
                                            alt="Notification Icon"
                                            width={20}
                                            height={20}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-[16px] font-[500] text-black">{n.title}</h3>
                                        <p className="text-[13px] font-[400] text-black/60 mt-0.5 line-clamp-2">
                                            {n.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-b-12 border-gray-100"></div>

                    <div className="mt-auto pb-4">
                        <ViewAll
                            href="/notifications"
                            label="View All Notifications"
                            bgColor="bg-[#F5F5F5]"
                            hoverBgColor="#ED7C22"
                            hoverTextColor="#FFFFFF"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
