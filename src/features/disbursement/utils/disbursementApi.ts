import { apiRequest } from "@/shared/utils/apiRequest";

function buildDisbursementPayload({
    currentPage = 1,
    pageSize = 8,
    sortBy = "",
    filterBy = "",
    searchText = "",
    extraPayload = {}
} = {}) {
    return {
        g2p_request_header: {
            sender_app_mnemonic: "BENEFICIARY_PORTAL",
            sender_app_url: typeof window !== "undefined" ? window.location.origin : "",
            request_id: "web-client",
            request_timestamp: new Date().toISOString(),
            instance_id: "portal-ui"
        },
        g2p_request_body: {
            g2p_pagination_request: {
                current_page: currentPage,
                page_size: pageSize,
                sort_by: sortBy,
                filter_by: filterBy,
                search_text: searchText
            },
            g2p_request_payload: extraPayload
        }
    };
}

export function getAllDisbursements(
    baseUrl: string,
    {
        currentPage = 1,
        pageSize = 8,
        sortBy = "",
        filterBy = "",
        searchText = ""
    } = {}
) {
    return apiRequest(
        baseUrl,
        "/disbursement/get_all_disbursements",
        buildDisbursementPayload({ currentPage, pageSize, sortBy, filterBy, searchText })
    );
}

export function getDisbursementSummaryTillDate(baseUrl: string, extraPayload = {}) {
    return apiRequest(
        baseUrl,
        "/disbursement/get_disbursement_summary_till_date",
        buildDisbursementPayload({ extraPayload })
    );
}
