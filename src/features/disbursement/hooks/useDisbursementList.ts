"use client";

import { useEffect, useState } from "react";
import { getAllDisbursements } from "@/features/disbursement/utils/disbursementApi";
import { DisbursementRecord } from "@/features/disbursement/types/disbursementTypes";

const BASE_URL = "http://localhost:8082";

export function useDisbursementList(currentPage: number, pageSize = 8) {
    const [disbursements, setDisbursements] = useState<DisbursementRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    async function fetchDisbursements() {
        try {
            setLoading(true);

            const result = await getAllDisbursements(BASE_URL, { currentPage, pageSize });

            const list = result?.g2p_response_body?.g2p_response_payload ?? [];
            const pagination = result?.g2p_response_body?.g2p_pagination_response ?? {};

            setDisbursements(Array.isArray(list) ? list : []);
            setTotalPages(pagination.number_of_pages || 1);
            setTotalItems(pagination.number_of_items || 0);

        } catch (err) {
            console.error("Failed to fetch disbursement list:", err);
            setDisbursements([]);
            setTotalPages(1);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDisbursements();
    }, [currentPage, pageSize]);

    return {
        disbursements,
        loading,
        totalPages,
        totalItems,
        refetch: fetchDisbursements
    };
}
