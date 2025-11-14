import { useState } from "react";
import { unlinkAccount } from "@/features/accountmapping/utils/accountApi";

export function useUnlinkAccount(baseUrl: string) {
    const [unlinking, setUnlinking] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleUnlink() {
        try {
            setUnlinking(true);
            setError(null);

            const unlinkRequest = [
                {
                    reference_id: "ref-" + Date.now(),
                    timestamp: new Date().toISOString(),
                    id: "",
                    fa: "",
                    name: "",
                    phone_number: "",
                    additional_info: [],
                    locale: "en",
                },
            ];

            const response = await unlinkAccount(baseUrl, "txn-" + Date.now(), unlinkRequest);
            setResult(response);
            return response;
        } catch (err: any) {
            setError(err.message || "Failed to unlink account");
            throw err;
        } finally {
            setUnlinking(false);
        }
    }

    return { handleUnlink, unlinking, result, error };
}
