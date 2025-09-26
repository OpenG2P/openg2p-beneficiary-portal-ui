"use client";
import React from "react";
import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";

interface ModalProps {
    title: React.ReactNode;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
    sidebarWidth?: string;
    sidebarImage?: string;
}

export default function Modal({
    title,
    onClose,
    children,
    width = "800px",
    height = "500px",
    sidebarWidth = "25%",
    sidebarImage,
}: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div
                className="bg-white rounded-[20px] overflow-hidden flex shadow-lg"
                style={{ width, height }}
            >
                <div
                    className="bg-[#FBBF00] h-full flex items-start justify-center pt-8"
                    style={{ width: sidebarWidth }}
                >
                    {sidebarImage && (
                        <Image
                            src={prefixBasePath(sidebarImage)}
                            alt="Sidebar"
                            width={150}
                            height={150}
                            className="object-contain"
                            priority
                        />
                    )}
                </div>

                <div className="flex-1 flex flex-col p-8 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        <button onClick={onClose} className="cursor-pointer">
                            <Image
                                src={prefixBasePath("/x.png")}
                                alt="Close"
                                width={20}
                                height={20}
                                className="opacity-50"
                                priority
                            />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">{children}</div>
                </div>
            </div>
        </div>
    );
}
