export type MenuItem = {
    name: string;
    href: string;
};

export const getMenuItems = (locale: string): MenuItem[] => [
    { name: "Dashboard", href: `/${locale}/dashboard` },
    { name: "My Programs", href: `/${locale}/programs` },
    { name: "Total Benefits", href: `/${locale}/benefits` },
    { name: "Bank Accounts", href: `/${locale}/accounts` },
    { name: "My Registries", href: `/${locale}/registries` },
    { name: "Applicable Schemes", href: `/${locale}/schemes` },
    { name: "Notifications", href: `/${locale}/notifications` },
    { name: "Complaints", href: `/${locale}/complaints` },
];

export const getRouteToIndex = (locale: string): Record<string, number> =>
    getMenuItems(locale).reduce((acc, item, index) => {
        acc[item.href] = index;
        return acc;
    }, {} as Record<string, number>);
