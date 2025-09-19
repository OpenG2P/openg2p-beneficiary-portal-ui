"use client";
import { Suspense } from "react";
import Image from "next/image";
import { Loading, UpdateFaBox } from "@/components";
import { prefixBasePath } from "@/utils/path";

export default function AccountsUpdatePage() {
    return (
        <div className="flex flex-row bg-white min-h-screen">
            <div className="2xl:h-screen bg-gray-100 basis-1/2 flex items-center justify-center">
                <div className="pl-6 mt-6 relative w-[500px] h-[500px] lg:w-[400px] lg:h-[400px]">
                    <Image
                        src={prefixBasePath("/infographic_01.png")}
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
                        <UpdateFaBox />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
