import { apiRequest } from "@/shared/utils/apiRequest";
import { buildStandardPayload } from "@/shared/utils/payloadBuilder";

function createMapperRequest(
    baseUrl: string,
    endpoint: string,
    transactionId: string,
    requestData: any[],
    requestKey: string
) {
    const payload = buildStandardPayload({
        currentPage: 1,
        pageSize: 1,
        sortBy: "",
        filterBy: "",
        searchText: "",
        extraPayload: {
            transaction_id: transactionId,
            [requestKey]: requestData
        }
    });
    return apiRequest(baseUrl, endpoint, payload);
}

export function linkAccount(baseUrl: string, transactionId: string, linkRequest: any[]) {
    return createMapperRequest(baseUrl, "/mapper/link", transactionId, linkRequest, "link_request");
}

export function resolveAccount(baseUrl: string, transactionId: string, resolveRequest: any[]) {
    return createMapperRequest(baseUrl, "/mapper/resolve", transactionId, resolveRequest, "resolve_request");
}

export function unlinkAccount(baseUrl: string, transactionId: string, unlinkRequest: any[]) {
    return createMapperRequest(baseUrl, "/mapper/unlink", transactionId, unlinkRequest, "unlink_request");
}

export function updateAccount(baseUrl: string, transactionId: string, updateRequest: any[]) {
    return createMapperRequest(baseUrl, "/mapper/update", transactionId, updateRequest, "update_request");
}