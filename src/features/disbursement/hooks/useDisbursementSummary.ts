"use client";

import { useEffect, useState } from "react";
import { getDisbursementSummaryTillDate } from "@/features/disbursement/utils/disbursementApi";
import {
    BenefitCardData,
    DisbursementItem,
    DisbursementSummary
} from "@/features/disbursement/types/disbursementTypes";

const BASE_URL = "http://localhost:8082";

function transformDisbursementSummary(list: DisbursementItem[] = []): DisbursementSummary {
    const summary: DisbursementSummary = {
        digital_cash: 0,
        physical_cash: 0,
        commodity: 0,
        service: 0,
    };

    list.forEach((item) => {
        switch (item.benefit_type) {
            case "CASH_DIGITAL":
                summary.digital_cash += item.total_quantity_received ?? 0;
                break;
            case "CASH_PHYSICAL":
                summary.physical_cash += item.total_quantity_received ?? 0;
                break;
            case "COMMODITY":
                summary.commodity += item.total_quantity_received ?? 0;
                break;
            case "SERVICE":
                summary.service += item.total_quantity_received ?? 0;
                break;
        }
    });

    return summary;
}

export function useDisbursementSummary() {
    const [benefits, setBenefits] = useState<BenefitCardData[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchSummary() {
        try {
            setLoading(true);

            const result = await getDisbursementSummaryTillDate(BASE_URL);
            const list: DisbursementItem[] = result?.g2p_response_body?.g2p_response_payload ?? [];

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
        fetchSummary();
    }, []);

    return {
        benefits,
        loading,
        refetch: fetchSummary
    };
}
