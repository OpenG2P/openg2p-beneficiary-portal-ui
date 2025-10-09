"use client";

import Image from "next/image";
import Link from "next/link";

import { prefixBasePath } from "@/shared/utils/path";

interface ViewAllProps {
    href: string;
    label?: string;
    bgColor?: string;
}

export default function ViewAll({ href, label = "View All", bgColor }: ViewAllProps) {
    return (
        <div className="flex justify-start ml-[30px] mt-[20px]">
            <Link
                href={href}
                className={`flex items-center text-black font-semibold text-[14px] ${bgColor ? bgColor : ""} px-3 py-[1px] rounded-[15px]`}
            >
                {label}
                <Image
                    src={prefixBasePath("/right_arrow.png")}
                    alt="arrow"
                    width={12}
                    height={12}
                    className="ml-1.5"
                />
            </Link>
        </div>
    );
}
