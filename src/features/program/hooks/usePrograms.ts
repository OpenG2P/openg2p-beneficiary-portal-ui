"use client";

import { useEffect, useState } from "react";
import { getAllPrograms, getMyPrograms } from "@/features/program/utils/programsApi";
import type { Program } from "@/features/program/types/program";

export function usePrograms(type: "all" | "my") {
    const PBMS_BASE = "http://0.0.0.0:8000";
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchPrograms() {
            try {
                setLoading(true);

                const result = type === "my"
                    ? await getMyPrograms(PBMS_BASE)
                    : await getAllPrograms(PBMS_BASE);

                const list = result?.response_body?.response_payload ?? [];

                if (isMounted) {
                    setPrograms(Array.isArray(list) ? list : []);
                }
            } catch (err) {
                console.error("Failed to fetch programs:", err);
                if (isMounted) setPrograms([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchPrograms();
        return () => { isMounted = false };
    }, [type, PBMS_BASE]);

    return { programs, loading };
}
