"use client";
import { useLocale } from "next-intl";

import { AuthUtil, LoginForm } from '@/features/auth/components';

export default function LoginPage() {
    const lang = useLocale();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center gap-4">
                <AuthUtil successRedirectUrl={`/${lang}/dashboard`} />
                <LoginForm />
            </div>
        </div>
    );
}
