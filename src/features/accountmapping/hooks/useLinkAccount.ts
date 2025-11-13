"use client";

import { useState } from "react";
import { linkAccount } from "@/features/accountmapping/utils/accountApi";
import { extractResolvedData } from "@/features/accountmapping/utils/extractResolvedData";

export function useLinkAccount(baseUrl: string) {
    const [linking, setLinking] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleLink(name: string, faData: any) {
        try {
            setLinking(true);
            setError(null);
            setResult(null);

            const linkRequest = [
                {
                    reference_id: "ref-" + Date.now(),
                    timestamp: new Date().toISOString(),
                    id: "",
                    fa: faData,
                    name,
                    phone_number: "",
                    additional_info: [],
                    locale: "en",
                },
            ];

            const response = await linkAccount(baseUrl, "txn-" + Date.now(), linkRequest);
            const parsed = extractResolvedData(response);
            setResult(parsed);
        } catch (err: any) {
            setError(err.message || "Failed to link account");
        } finally {
            setLinking(false);
        }
    }

    return { handleLink, linking, result, error };
}
