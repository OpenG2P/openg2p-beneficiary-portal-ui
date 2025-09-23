"use client";

import Image from "next/image";
import Link from "next/link";

import { prefixBasePath } from "@/shared/utils/path";

interface ViewAllProps {
    href: string;
    label?: string;
}

export default function ViewAll({ href, label = "View All" }: ViewAllProps) {
    return (
        <div className="flex justify-start mt-4">
            <Link
                href={href}
                className="flex items-center text-black font-bold text-sm sm:text-base"
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
