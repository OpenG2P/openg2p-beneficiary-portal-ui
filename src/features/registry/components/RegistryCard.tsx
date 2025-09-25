"use client";

import Image from "next/image";
import { ViewAll } from "@/components/shared";
import { prefixBasePath } from "@/shared/utils/path";

interface Registry {
    name: string;
}

interface RegistryCardProps {
    registries: Registry[];
    viewAllHref?: string;
}

export default function RegistryCard({ registries, viewAllHref = "/registries" }: RegistryCardProps) {
    return (
        <div className="bg-white rounded-xl border border-black/20 flex-1 shadow-xl">
            <div className="flex items-center justify-between h-16 px-6">
                <h3 className="text-xl sm:text-xl font-bold text-gray-800">
                    My Registries
                </h3>
                <button className="p-1 rounded-full hover:bg-gray-200">
                    <Image
                        src={prefixBasePath("/menu-dots.png")}
                        alt="menu"
                        width={18}
                        height={18}
                    />
                </button>
            </div>

            <div className="space-y-0">
                {registries.map((registry, idx) => (
                    <div
                        key={idx}
                        className={`relative ${idx % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                    >
                        <div className="flex items-center justify-start py-4 px-6">
                            <span className="w-3 h-3 rounded-full bg-gray-400 mr-3 flex-shrink-0"></span>
                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                                {registry.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-4 m-3">
                <ViewAll href={viewAllHref} label="View All" />
            </div>
        </div>
    );
}
