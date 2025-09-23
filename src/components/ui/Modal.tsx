"use client";
import React from "react";
import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
}

export default function Modal({
    title,
    onClose,
    children,
    width = "600px",
    height = "auto",
}: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div
                className="bg-white rounded-lg p-8 relative flex flex-col"
                style={{ width, height }}
            >
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <Image
                            src={prefixBasePath("/x.png")}
                            alt="Close"
                            width={20}
                            height={20}
                            priority
                        />
                    </button>
                </div>

                <div className="border-b-4 border-gray-200 mb-4"></div>

                <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}
