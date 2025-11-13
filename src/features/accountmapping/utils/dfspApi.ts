import { apiRequest } from "@/shared/utils/apiRequest";

function buildPayload(extraPayload = {}) {
    return {
        request_header: {
            sender_app_mnemonic: "BENEFICIARY_PORTAL",
            sender_app_url: typeof window !== "undefined" ? window.location.origin : "",
            request_id: "web-client",
            request_timestamp: new Date().toISOString(),
            instance_id: "portal-ui",
        },
        request_body: {
            pagination_request: {
                current_page: 1,
                page_size: 100,
                sort_by: "",
                filter_by: "",
                search_text: "",
            },
            request_payload: extraPayload,
        },
    };
}

export function getAllBanks(baseUrl: string) {
    return apiRequest(baseUrl, "/dfsp/fetch-banks", buildPayload());
}

export function getBranchesByBankId(baseUrl: string, bankId: number) {
    return apiRequest(baseUrl, "/dfsp/fetch-branches", buildPayload({ bank_id: bankId }));
}

export function getAllWalletProviders(baseUrl: string) {
    return apiRequest(baseUrl, "/dfsp/fetch-wallet-service-providers", buildPayload());
}
