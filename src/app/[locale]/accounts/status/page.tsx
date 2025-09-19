"use client";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { Loading } from "@/components";
import { prefixBasePath } from "@/utils/path";

export default function AccountsStatusPage() {
    return (
        <div className="flex flex-row bg-white">
            <div className="2xl:h-screen bg-gray-100 basis-1/2 flex items-center justify-center">
                <div className="pl-6 mt-28 relative w-[400px] h-[400px]">
                    <Image
                        src={prefixBasePath("/infographic_01.png")}
                        alt="person"
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>

            <div className="w-full max-w-sm m-20 basis-1/2">
                <div className="2xl:mt-52 m-5 mt-12">
                    <Suspense fallback={<Loading />}>
                        <div className="items-center m-4 p-6 transition duration-300 transform hover:shadow-sky-200 hover:shadow-lg border-dashed border-gray-400 border-2 rounded-2xl">
                            <div className="flex flex-col m-3 flex-wrap">
                                <Image
                                    src={prefixBasePath("/green_tick.png")}
                                    alt="success"
                                    width={60}
                                    height={60}
                                />
                                <p className="text-3xl text-customGreen mt-2">{("thankyou")}</p>
                                <p className="font-roboto-light text-xl text-wrap">{("status_message")}</p>

                                <Link href={`/accounts`}>
                                    <Image
                                        className="ml-48 mt-4"
                                        src={prefixBasePath("/arrow_02.png")}
                                        alt="arrow"
                                        width={40}
                                        height={40}
                                    />
                                </Link>
                            </div>
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
