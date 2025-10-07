"use client";

import Image from "next/image";
import { ViewAll } from "@/components/shared";
import { prefixBasePath } from "@/shared/utils/path";

interface Application {
    name: string;
    status: string;
}

interface ApplicationCardProps {
    applications: Application[];
}

const getStatusClasses = (status: string) => {
    let bgClass = "";
    let textClass = "";

    switch (status.toLowerCase()) {
        case "applied":
            bgClass = "bg-[rgba(51,153,255,0.2)]";
            textClass = "text-[#3399FF]";
            break;
        case "progress":
            bgClass = "bg-[rgba(0,183,101,0.2)]";
            textClass = "text-[#00B765]";
            break;
        case "pending":
            bgClass = "bg-[rgba(237,124,34,0.2)]";
            textClass = "text-[#ED7C22]";
            break;
        default:
            bgClass = "bg-gray-200";
            textClass = "text-gray-600";
            break;
    }

    return { bgClass, textClass };
};

export default function ApplicationCard({ applications }: ApplicationCardProps) {
    return (
        <div className="bg-white rounded-xl border border-black/20 flex-1 shadow-xl">
            <div className="flex items-center justify-between h-16 px-8">
                <h3 className="text-[20px] font-[600] text-black">
                    My Applications
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

            <div className="flex px-8 py-4 bg-[#F5F5F5] font-[700] text-black text-[16px]">
                <span className="flex-1">Name</span>
                <span className="min-w-[90px]">Status</span>
            </div>

            <div className="space-y-0">
                {applications.map((app, idx) => {
                    const { bgClass, textClass } = getStatusClasses(app.status);
                    return (
                        <div
                            key={idx}
                            className={`flex items-center px-8 py-3 ${idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}`}
                        >
                            <p className="flex-1 truncate font-[400] text-black">{app.name}</p>
                            <p
                                className={`min-w-[90px] text-center font-[400] rounded-full px-1 py-1 ${bgClass} ${textClass}`}
                            >
                                {app.status}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="px-6 m-3">
                <ViewAll
                    href="/applications"
                    label="View all Applications"
                    bgColor="bg-[#F5F5F5]"
                />
            </div>
        </div>
    );
}
