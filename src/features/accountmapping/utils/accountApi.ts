import { apiRequest } from "@/shared/utils/apiRequest";

function buildAccountPayload(extraPayload: Record<string, any> = {}) {
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
                page_size: 1,
                sort_by: "",
                filter_by: "",
                search_text: "",
            },
            request_payload: extraPayload,
        },
    };
}

export function linkAccount(baseUrl: string, transaction_id: string, linkRequest: any[]) {
    const payload = buildAccountPayload({
        transaction_id: transaction_id,
        link_request: linkRequest,
    });
    return apiRequest(baseUrl, "/mapper/link", payload);
}

export function resolveAccount(baseUrl: string, transaction_id: string, resolveRequest: any[]) {
    const payload = buildAccountPayload({
        transaction_id: transaction_id,
        resolve_request: resolveRequest,
    });
    return apiRequest(baseUrl, "/mapper/resolve", payload);
}

export function unlinkAccount(baseUrl: string, transaction_id: string, unlinkRequest: any[]) {
    const payload = buildAccountPayload({
        transaction_id: transaction_id,
        unlink_request: unlinkRequest,
    });
    return apiRequest(baseUrl, "/mapper/unlink", payload);
}

export function updateAccount(baseUrl: string, transaction_id: string, updateRequest: any[]) {
    const payload = buildAccountPayload({
        transaction_id: transaction_id,
        update_request: updateRequest,
    });
    return apiRequest(baseUrl, "/mapper/update", payload);
}
