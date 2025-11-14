"use client";

import { useState } from "react";
import { resolveAccount } from "@/features/accountmapping/utils/accountApi";
import { extractResolvedData } from "@/features/accountmapping/utils/extractResolvedData";

export function useResolveAccount(baseUrl: string) {
    const [resolving, setResolving] = useState(true);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleResolve() {
        try {
            setResolving(true);
            setError(null);
            setResult(null);

            const resolveRequest = [
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

            const response = await resolveAccount(baseUrl, "txn-" + Date.now(), resolveRequest);
            const parsed = extractResolvedData(response);
            setResult(parsed);
            return parsed;
        } catch (err: any) {
            setError(err.message || "Failed to resolve account");
            throw err;
        } finally {
            setResolving(false);
        }
    }

    return { handleResolve, resolving, result, error };
}

