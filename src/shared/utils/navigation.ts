import { MenuItem } from "@/shared/types/menuitem";

export const getMenuItems = (locale: string): MenuItem[] => [
    { name: "Dashboard", href: `/${locale}/dashboard`, icon: "/dashboard.png" },
    { name: "My Programs", href: `/${locale}/programs`, icon: "/programs.png" },
    { name: "Total Benefits", href: `/${locale}/benefits`, icon: "/benefits.png" },
    { name: "Bank Accounts", href: `/${locale}/accounts`, icon: "/account.png" },
    { name: "My Registries", href: `/${locale}/registries`, icon: "/registries.png" },
    { name: "Applicable Schemes", href: `/${locale}/schemes`, icon: "/scheme.png" },
    { name: "Notifications", href: `/${locale}/notifications`, icon: "/notifications.png" },
    { name: "Complaints", href: `/${locale}/complaints`, icon: "/complaints.png" },
];

export const getRouteToIndex = (locale: string): Record<string, number> =>
    getMenuItems(locale).reduce((acc, item, index) => {
        acc[item.href] = index;
        return acc;
    }, {} as Record<string, number>);
