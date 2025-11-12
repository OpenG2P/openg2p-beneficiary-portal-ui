"use client";

import { useEffect, useState } from "react";
import { getAllPrograms, getMyPrograms } from "@/features/program/utils/programsApi";
import type { Program } from "@/features/program/types/program";

export function usePrograms(type: "all" | "my", currentPage: number, pageSize = 8) {
    const PBMS_BASE = "http://0.0.0.0:8000";
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        let isMounted = true;

        async function fetchPrograms() {
            console.log("Fetching page:", currentPage);

            try {
                setPrograms([]);
                setLoading(true);

                const params = {
                    currentPage,
                    pageSize,
                };

                const result =
                    type === "my"
                        ? await getMyPrograms(PBMS_BASE, params)
                        : await getAllPrograms(PBMS_BASE, params);

                const list = result?.response_body?.response_payload ?? [];
                const pagination = result?.response_body?.pagination_response ?? {};

                if (isMounted) {
                    setPrograms(Array.isArray(list) ? list : []);
                    setTotalPages(pagination.number_of_pages || 1);
                    setTotalItems(pagination.number_of_items || 0);
                }
            } catch (err) {
                console.error("Failed to fetch programs:", err);
                if (isMounted) {
                    setPrograms([]);
                    setTotalPages(1);
                    setTotalItems(0);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchPrograms();
        return () => {
            isMounted = false;
        };
    }, [type, currentPage, pageSize]);

    return { programs, loading, totalPages, totalItems };
}
