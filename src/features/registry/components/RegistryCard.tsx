"use client";

import Image from "next/image";
import { ViewAll } from "@/components/shared";
import { prefixBasePath } from "@/shared/utils/path";

interface Registry {
    name: string;
}

interface RegistryCardProps {
    registries: Registry[];
}

export default function RegistryCard({ registries }: RegistryCardProps) {
    return (
        <div className="bg-white rounded-xl border border-black/20 flex-1 shadow-xl">
            <div className="flex items-center justify-between h-16 px-8">
                <h3 className="text-[20px] font-[600] text-black">
                    My Registries
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

            <div className="space-y-0">
                {registries.map((registry, idx) => (
                    <div
                        key={idx}
                        className={`relative ${idx % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"}`}
                    >
                        <div className="flex items-center justify-start py-4 px-8">
                            <span className="w-2.5 h-2.5 rounded-full bg-gray-400 mr-3 flex-shrink-0"></span>
                            <p className="font-[400] text-black text-[16px]">
                                {registry.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-6 m-3">
                <ViewAll
                    href="/registries"
                    label="View all Registries"
                    bgColor="bg-[#F5F5F5]"
                />
            </div>
        </div>
    );
}
