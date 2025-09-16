"use client";
import React from "react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            <p className="mt-4 text-black text-lg font-medium animate-pulse">
                Loading...
            </p>
        </div>
    );
}
