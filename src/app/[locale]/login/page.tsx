"use client";
import { useLocale } from "next-intl";
import Image from "next/image";

import { AuthUtil, LoginForm } from '@/features/auth/components';
import { prefixBasePath } from '@/shared/utils/path';

export default function LoginPage() {
    const lang = useLocale();
    return (
        <div className="relative min-h-screen bg-white items-center justify-center overflow-hidden">
            <AuthUtil successRedirectUrl={`/${lang}/dashboard`} />

            <div className="absolute z-10 top-[130px] left-[650px]">
                <LoginForm />
            </div>

            {/* Left side images - exact positioning */}
            <Image
                src={prefixBasePath("/left_top.png")}
                alt="Decoration"
                width={200}
                height={200}
                className="absolute top-[203px] left-[360px] rounded-xl shadow-lg"
            />
            <Image
                src={prefixBasePath("/left_mid.png")}
                alt="Decoration"
                width={110}
                height={115}
                className="absolute top-[336px] left-[220px] rounded-xl shadow-lg"
            />
            <Image
                src={prefixBasePath("/left_bottom.png")}
                alt="Decoration"
                width={260}
                height={159}
                className="absolute top-[427px] left-[340px] rounded-xl shadow-lg"
            />

            {/* Right side images - exact positioning */}
            <Image
                src={prefixBasePath("/right_top.png")}
                alt="Decoration"
                width={200}
                height={210}
                className="absolute top-[193px] left-[1120px] rounded-xl shadow-lg"
            />
            <Image
                src={prefixBasePath("/right_mid.png")}
                alt="Decoration"
                width={120}
                height={120}
                className="absolute top-[321px] left-[1340px] rounded-xl shadow-lg"
            />
            <Image
                src={prefixBasePath("/right_bottom.png")}
                alt="Decoration"
                width={260}
                height={150}
                className="absolute top-[436px] left-[1170px] rounded-xl shadow-lg"
            />
        </div>
    );
}
