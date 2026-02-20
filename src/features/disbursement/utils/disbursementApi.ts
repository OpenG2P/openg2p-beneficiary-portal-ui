import { PaginationParams } from "@/shared/utils/payloadBuilder";
import { portalApi } from "@/shared/utils/apiClient";

export const getAllDisbursements = (bridgeUrl: string, params: PaginationParams = {}) =>
    portalApi("/api/disbursements", {
        bridgeUrl,
        params
    });

export const getDisbursementSummaryTillDate = (bridgeUrl: string, extraPayload: Record<string, any> = {}) =>
    portalApi("/api/disbursements/summary", {
        bridgeUrl,
        extraPayload
    });
