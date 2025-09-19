"use client";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { Loading } from "@/components";
import { prefixBasePath } from "@/utils/path";

export default function AccountsDeletePage() {
    return (
        <div className="flex flex-row bg-white min-h-screen">
            <div className="2xl:h-screen bg-gray-100 basis-1/2 flex items-center justify-center">
                <div className="relative w-[500px] h-[500px] lg:w-[400px] lg:h-[400px]">
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

            <div className="basis-1/2 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <Suspense fallback={<Loading />}>
                        <div className="flex flex-col items-center m-6 p-6 transition duration-300 transform hover:shadow-sky-200 hover:shadow-lg border-dashed border-gray-400 border-2 rounded-2xl">
                            <Image
                                src={prefixBasePath("/remove.png")}
                                alt="remove"
                                width={60}
                                height={60}
                            />
                            <p className="text-3xl text-sky-500 mt-3">{("delete")}</p>
                            <p className="font-roboto-light text-xl text-center mt-2">{("status_message")}</p>

                            <Link href={`/accounts`} className="mt-6">
                                <Image
                                    src={prefixBasePath("/arrow_02.png")}
                                    alt="arrow back"
                                    width={40}
                                    height={40}
                                />
                            </Link>
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
