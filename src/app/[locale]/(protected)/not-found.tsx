"use client";

import Image from "next/image";
import { prefixBasePath } from "@/shared/utils/path";

export default function NotFound() {
    return (
        <div className="px-[50px] py-6 min-h-screen bg-white">
            <h1 className="text-[18px] font-[600] text-black mb-2 invisible">404</h1>

            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center text-center rounded-[10px] bg-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] px-10 py-40 w-full">
                    <Image
                        src={prefixBasePath("/404.png")}
                        alt="404 Not Found"
                        width={150}
                        height={150}
                        className="mb-6"
                    />

                    <h2 className="text-[50px] font-[500] text-[#ED7C22] mb-2">
                        Oops!
                    </h2>

                    <p className="text-gray-600 text-[15px] leading-6 mb-6">
                        404 Error, sorry we couldn’t find that page.
                    </p>

                    <button
                        onClick={() => window.history.back()}
                        className="bg-black text-white px-6 py-2 rounded-[20px]"
                    >
                        GO BACK
                    </button>
                </div>
            </div>
        </div>
    );
}
