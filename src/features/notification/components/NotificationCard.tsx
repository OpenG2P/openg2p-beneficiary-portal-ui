"use client";

import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";
import { ViewAll } from "@/components/shared";

interface Notification {
    id: string;
    title: string;
    description: string;
}

interface NotificationCardProps {
    notifications: Notification[];
}

export default function NotificationCard({ notifications }: NotificationCardProps) {
    return (
        <div className="bg-white rounded-xl border border-black/20 flex-1 shadow-xl">
            <div className="flex items-center justify-between h-16 px-6">
                <h3 className="text-xl sm:text-xl font-bold text-gray-800">
                    Notifications / Broadcast
                </h3>
                <button className="p-1 rounded-full hover:bg-gray-200">
                    <Image
                        src={prefixBasePath("/more.png")}
                        alt="menu"
                        width={18}
                        height={18}
                    />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                {notifications.map((n, idx) => (
                    <div
                        key={n.id}
                        className={`${idx % 2 === 0 ? "bg-gray-100" : ""}`}
                    >
                        <div className="flex gap-3 px-6 py-2">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-[#FFF4EB]">
                                <Image
                                    src={prefixBasePath("/notification_img.png")}
                                    alt="Notification Icon"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-900">{n.title}</h3>
                                <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{n.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-4 m-3">
                <ViewAll
                    href="/notifications"
                    label="View More"
                    bgColor="bg-gray-100"
                />
            </div>
        </div>
    );
}
