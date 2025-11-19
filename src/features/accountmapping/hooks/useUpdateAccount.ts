"use client";

import { useState } from "react";
import { updateAccount } from "@/features/accountmapping/utils/accountApi";

export function useUpdateAccount(baseUrl: string) {
    const [updating, setUpdating] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleUpdate(faData: any) {
        try {
            setUpdating(true);
            setError(null);
            setResult(null);

            const updateRequest = [
                {
                    reference_id: "ref-" + Date.now(),
                    timestamp: new Date().toISOString(),
                    id: "",
                    fa: faData,
                    name: "",
                    phone_number: "",
                    additional_info: [],
                    locale: "en",
                },
            ];

            const response = await updateAccount(baseUrl, "txn-" + Date.now(), updateRequest);
            const { status } = response?.response_body?.response_payload?.update_response?.[0];
            setResult(status);
            return response;
        } catch (err: any) {
            setError(err.message || "Failed to update account");
            throw err;
        } finally {
            setUpdating(false);
        }
    }

    return { handleUpdate, updating, result, error };
}
