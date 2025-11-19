"use client";

import { useEffect, useState } from "react";
import { getDisbursementSummaryTillDate } from "@/features/disbursement/utils/disbursementApi";
import {
    BenefitCardData,
    DisbursementItem,
    DisbursementSummary
} from "@/features/disbursement/types/disbursementTypes";
import { useDepartment } from "@/context/GlobalContext";

function transformDisbursementSummary(list: DisbursementItem[] = []): DisbursementSummary {
    return {
        digital_cash: list
            .filter(i => i.benefit_type === "CASH_DIGITAL")
            .reduce((sum, i) => sum + (i.total_quantity_received ?? 0), 0),

        physical_cash: list
            .filter(i => i.benefit_type === "CASH_PHYSICAL")
            .reduce((sum, i) => sum + (i.total_quantity_received ?? 0), 0),

        commodity: list
            .filter(i => i.benefit_type === "COMMODITY")
            .reduce((sum, i) => sum + (i.total_quantity_received ?? 0), 0),

        service: list
            .filter(i => i.benefit_type === "SERVICE")
            .reduce((sum, i) => sum + (i.total_quantity_received ?? 0), 0),
    };
}

export function useDisbursementSummary() {
    const { currentDepartment } = useDepartment();
    const departmentBridgeUrl = currentDepartment?.bridge_url;

    const [benefits, setBenefits] = useState<BenefitCardData[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchSummary(baseUrl: string) {
        try {
            setLoading(true);

            const result = await getDisbursementSummaryTillDate(baseUrl);
            const list: DisbursementItem[] =
                result?.g2p_response_body?.g2p_response_payload ?? [];

            const summary = transformDisbursementSummary(list);

            setBenefits([
                { icon: "/digital_cash.png", value: summary.digital_cash, label: "Digital Cash" },
                { icon: "/physical_cash.png", value: summary.physical_cash, label: "Physical Cash" },
                { icon: "/commodity.png", value: summary.commodity, label: "Commodity" },
                { icon: "/service.png", value: summary.service, label: "Service" },
            ]);

        } catch (err) {
            console.error("Failed to fetch summary:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!departmentBridgeUrl) return;
        fetchSummary(departmentBridgeUrl);
    }, [departmentBridgeUrl]);

    return {
        benefits,
        loading,
    };
}
