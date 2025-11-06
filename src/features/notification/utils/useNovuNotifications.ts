"use client";

import { useEffect, useState, useRef } from "react";
import { Novu } from "@novu/js";
import { Notification } from "@/features/notification/types";

export function useNovuNotifications(
    subscriberId: string,
    applicationIdentifier: string,
    limit: number = 10
) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const novuRef = useRef<Novu | null>(null);

    useEffect(() => {
        if (!subscriberId) return;

        if (!novuRef.current) {
            console.log(subscriberId, applicationIdentifier)
            novuRef.current = new Novu({ subscriberId, applicationIdentifier });
        }

        const novu = novuRef.current;

        const fetchNotifications = async () => {
            try {
                const listResponse = await novu.notifications.list({ limit });
                const raw = listResponse?.data?.notifications ?? [];

                const formatted: Notification[] = raw.map((n: any) => ({
                    id: n.id,
                    subject: n.subject,
                    body: n.body,
                    createdAt: n.createdAt,
                    isRead: n.isRead,
                    isSeen: n.isSeen,
                    isArchived: n.isArchived,
                    avatar: n.avatar,
                }));

                setNotifications(formatted);

                const countResponse = await novu.notifications.count({ read: false });
                setUnreadCount(countResponse?.data?.count ?? 0);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        const handleNewNotification = (event: any) => {
            const n = event?.result;
            if (!n) return;

            const newNotification: Notification = {
                id: n.id,
                subject: n.subject,
                body: n.body,
                createdAt: n.createdAt,
                isRead: n.isRead,
                isSeen: n.isSeen,
                isArchived: n.isArchived,
                avatar: n.avatar,
            };

            setNotifications(prev => {
                if (prev.some(x => x.id === newNotification.id)) return prev;
                return [newNotification, ...prev].slice(0, limit);
            });

            setUnreadCount(prev => prev + 1);
        };

        const unsubscribeReceived = novu.on(
            "notifications.notification_received",
            handleNewNotification
        );

        fetchNotifications();
        return () => unsubscribeReceived();
    }, [subscriberId, applicationIdentifier, limit]);

    return { notifications, unreadCount };
}
