"use client";
import React from "react";
import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="w-24 h-24 relative">
                <Image
                    src={prefixBasePath("/loader_02.gif")}
                    alt="Loading"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}
