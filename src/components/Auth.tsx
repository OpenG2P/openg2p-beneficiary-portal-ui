"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/global";
import { prefixBaseApiPath } from "@/utils/path";

export function AuthUtil(params: { successRedirectUrl?: string; failedRedirectUrl?: string }) {
    const auth = useAuth();
    const { push } = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
    const checkAuth = async () => {
        setIsCheckingAuth(true);
        try {
            const res = await fetch(prefixBaseApiPath("/auth/profile"));
            if (res.ok) {
                const resJson = await res.json();
                auth.setProfile(resJson);
            } else {
                auth.setProfile(null);
            }
        } catch (err) {
            console.error("Error checking authentication:", err);
        } finally {
            setIsCheckingAuth(false);
            setHasCheckedAuth(true);
        }
    };

    useEffect(() => {
        checkAuth();

        const intervalId = setInterval(checkAuth, 1 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (isCheckingAuth || !hasCheckedAuth) return;

        if (params.successRedirectUrl && auth.profile) {
            push(params.successRedirectUrl);
        } else if (params.failedRedirectUrl && !auth.profile) {
            push(params.failedRedirectUrl);
        }
    }, [
        auth.profile,
        isCheckingAuth,
        hasCheckedAuth,
        params.failedRedirectUrl,
        params.successRedirectUrl,
        push,
    ]);

    return <></>;
}