"use client";

import { prefixBasePath } from "@/shared/utils/path";
import { Notification } from "@/features/notification/types/notification";

interface NotificationProps {
    notification: Notification;
    compact?: boolean;
}

export default function NotificationCard({ notification, compact = false }: NotificationProps) {
    return (
        <div
            className={`flex items-start gap-3 border rounded-lg p-3 bg-gray-50 ${!compact ? "shadow-sm bg-white" : ""
                }`}
        >
            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16">
                <img
                    src={prefixBasePath(notification.image)}
                    alt={notification.title}
                    className="w-full h-full object-contain rounded-md border bg-white"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3
                    className={`${compact ? "text-sm sm:text-base" : "text-lg"
                        } font-semibold text-gray-900 truncate`}
                >
                    {notification.title}
                </h3>

                {notification.date && (
                    <span className="text-xs sm:text-sm text-gray-500 block mt-0.5">
                        {notification.date}
                    </span>
                )}

                <p
                    className={`${compact ? "text-xs sm:text-sm line-clamp-2" : "text-sm"
                        } text-gray-700 mt-1`}
                >
                    {notification.description}
                </p>
            </div>
        </div>
    );
}
