"use client";

import { useEffect, useState } from "react";
import { resolveAccount } from "@/features/accountmapping/utils/accountApi";
import { extractResolvedData } from "@/features/accountmapping/utils/extractResolvedData";

export function useResolveAccount(baseUrl: string) {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchResolve() {
        try {
            setLoading(true);
            setError(null);

            const request = [
                {
                    reference_id: "ref-" + Date.now(),
                    timestamp: new Date().toISOString(),
                    fa: "",
                    id: "",
                    name: "",
                    scope: "details",
                    additional_info: [],
                    locale: "en",
                },
            ];

            const response = await resolveAccount(baseUrl, "txn-" + Date.now(), request);
            setResult(extractResolvedData(response));
        } catch (err: any) {
            setError(err.message || "Failed to resolve account");
            setResult(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (baseUrl) {
            fetchResolve();
        }
    }, [baseUrl]);

    return { result, loading, error };
}

