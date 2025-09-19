"use client";

import { Suspense } from "react";
import Image from "next/image";
import { Loading, GetFaBox } from "@/components";
import { prefixBasePath } from "@/utils/path";

export default function AccountsPage() {
    return (
        <div className="px-10 py-4 flex flex-col bg-white min-h-screen">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Bank Account</h1>
            </div>

            <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">

                <div className="text-black font-bold mt-1">
                    Current Linked Bank Account (From SPAR)
                </div>
                <div className="border-b-4 border-gray-200 mt-1"></div>
                <div className="flex flex-row mt-6">
                    <div className="2xl:h-screen bg-gray-100 basis-1/2 flex items-center justify-center">
                        <div className="pl-6 mt-6 relative w-[500px] h-[500px] lg:w-[400px] lg:h-[400px]">
                            <Image
                                src={prefixBasePath("/infographic_02.png")}
                                alt="person"
                                fill
                                style={{ objectFit: "contain" }}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    <div className="max-w-md flex flex-col m-6 basis-1/2">
                        <div className="2xl:max-w-md mx-auto m-5 mt-12">
                            <Suspense fallback={<Loading />}>
                                <GetFaBox />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
