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
        <div className="flex justify-start mt-4">
            <Link
                href={href}
                className={`flex items-center text-black font-semibold text-base ${bgColor ? bgColor : ""} px-3 py-1 rounded-[15px]`}
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
