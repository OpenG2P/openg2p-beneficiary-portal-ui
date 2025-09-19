"use client";

import { Programs } from "@/components";

export default function ProgramsPage() {
    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-2">
                <h1 className="text-xl font-bold text-gray-800">My Programs</h1>
            </div>
            <Programs />
        </div >
    );
}
