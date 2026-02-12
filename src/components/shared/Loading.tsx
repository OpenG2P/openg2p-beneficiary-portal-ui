"use client";
import React from "react";
import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";

interface LoadingProps {
    title: string;
    height: string;
}

export default function Loading({ title, height = "670px" }: LoadingProps) {
    return (
        <div className="w-full min-h-screen bg-white px-[50px] py-6">
            <h1 className="text-[18px] font-[600] text-black mb-2">
                {title}
            </h1>

            <div
                className="bg-white rounded-[10px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex items-center justify-center"
                style={{ height }}
            >
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
        </div>
    );
}
