"use client";

import { useEffect, useState } from "react";
import { getAllDisbursements } from "@/features/disbursement/utils/disbursementApi";
import { DisbursementRecord } from "@/features/disbursement/types/disbursementTypes";
import { useDepartment } from "@/context/GlobalContext";

export function useDisbursementList(currentPage: number, pageSize = 8) {
    const { currentDepartment } = useDepartment();
    const departmentBridgeUrl = currentDepartment?.bridge_url;

    const [disbursements, setDisbursements] = useState<DisbursementRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    async function fetchDisbursements(baseUrl: string) {
        try {
            setLoading(true);

            const result = await getAllDisbursements(baseUrl, { currentPage, pageSize });

            const list = result?.g2p_response_body?.g2p_response_payload ?? [];
            const pagination = result?.g2p_response_body?.g2p_pagination_response ?? {};

            setDisbursements(Array.isArray(list) ? list : []);
            setTotalPages(pagination.number_of_pages || 1);
            setTotalItems(pagination.number_of_items || 0);

        } catch (err) {
            setDisbursements([]);
            setTotalPages(1);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!departmentBridgeUrl) return;
        fetchDisbursements(departmentBridgeUrl);
    }, [currentPage, pageSize, departmentBridgeUrl]);

    return {
        disbursements,
        loading,
        totalPages,
        totalItems,
    };
}
