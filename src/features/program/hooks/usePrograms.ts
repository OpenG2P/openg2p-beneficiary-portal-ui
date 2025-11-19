"use client";

import { useEffect, useState } from "react";
import { getAllPrograms, getMyPrograms } from "@/features/program/utils";
import type { Program } from "@/features/program/types";
import { usePbmsUrl } from "@/features/program/hooks";

export function usePrograms(type: "all" | "my", currentPage: number, pageSize = 8) {
    const pbmsUrl = usePbmsUrl();

    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (!pbmsUrl) return;

        async function fetchPrograms(baseUrl: string) {
            try {
                setPrograms([]);
                setLoading(true);

                const params = { currentPage, pageSize };

                const result =
                    type === "my"
                        ? await getMyPrograms(baseUrl, params)
                        : await getAllPrograms(baseUrl, params);

                const list = result?.response_body?.response_payload ?? [];
                const pagination = result?.response_body?.pagination_response ?? {};

                setPrograms(Array.isArray(list) ? list : []);
                setTotalPages(pagination.number_of_pages || 1);
                setTotalItems(pagination.number_of_items || 0);

            } catch (err) {
                console.error("Failed to fetch programs:", err);
                setPrograms([]);
                setTotalPages(1);
                setTotalItems(0);
            } finally {
                setLoading(false);
            }
        }

        fetchPrograms(pbmsUrl);
    }, [type, currentPage, pageSize, pbmsUrl]);

    return { programs, loading, totalPages, totalItems };
}
