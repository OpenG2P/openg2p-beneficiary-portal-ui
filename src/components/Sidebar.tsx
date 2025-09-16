"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { getMenuItems, getRouteToIndex } from "@/utils/navigation";
import { prefixBasePath } from "@/utils/path";


interface SidebarProps {
    onItemClick?: (index: number, href: string) => void;
}

export default function Sidebar({ onItemClick }: SidebarProps) {
    const [expanded, setExpanded] = useState(false);
    const locale = useLocale();
    const pathname = usePathname();

    const menuItems = getMenuItems(locale);
    const routeToIndex = getRouteToIndex(locale);

    const activeItem =
        Object.entries(routeToIndex).find(([href]) =>
            pathname.startsWith(href)
        )?.[1] ?? 0;

    const handleItemClick = (index: number, href: string) => {
        if (onItemClick) {
            onItemClick(index, href);
        }
    };

    return (
        <div
            className={`bg-[#D9D9D9] border-r border-gray-100 fixed top-[70px] left-0 bottom-0 transition-all duration-300 ease-in-out ${expanded ? "w-[250px]" : "w-[60px]"
                } z-10`}
        >
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
                {!expanded ? (
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        onClick={() => setExpanded(true)}
                    >
                        <Image
                            src={prefixBasePath("/bar.png")}
                            alt="Menu"
                            width={24}
                            height={24}
                            priority
                            style={{ objectFit: "contain" }}
                        />
                    </button>
                ) : (
                    <div className="flex items-center justify-between w-full px-4">
                        <span className="font-semibold text-gray-800">Menu</span>
                        <button
                            className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                            onClick={() => setExpanded(false)}
                        >
                            <Image
                                src={prefixBasePath("/x.png")}
                                alt="Close"
                                width={20}
                                height={20}
                                priority
                                style={{ objectFit: "contain" }}
                            />
                        </button>
                    </div>
                )}
            </div>

            <div className="py-4">
                {menuItems.map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.href}
                        className={`flex items-center cursor-pointer transition-all duration-200 mx-2 mr-1 my-3 rounded-lg ${activeItem === idx
                            ? "bg-gray-100 text-black font-bold"
                            : "text-black hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        onClick={() => handleItemClick(idx, item.href)}
                    >
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                            <div className="bg-gray-400 rounded-full w-8 h-8 p-1"></div>
                        </div>

                        <span
                            className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${expanded
                                ? "opacity-100 max-w-full ml-2"
                                : "opacity-0 max-w-0 ml-0"
                                }`}
                        >
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
