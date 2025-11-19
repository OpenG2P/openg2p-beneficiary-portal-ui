import { apiRequest } from "@/shared/utils/apiRequest";

function buildPayload({
    currentPage = 1,
    pageSize = 8,
    sortBy = "",
    filterBy = "",
    searchText = "",
    extraPayload = {}
} = {}) {
    return {
        request_header: {
            sender_app_mnemonic: "BENEFICIARY_PORTAL",
            sender_app_url: typeof window !== "undefined" ? window.location.origin : "",
            request_id: "web-client",
            request_timestamp: new Date().toISOString(),
            instance_id: "portal-ui"
        },
        request_body: {
            pagination_request: {
                current_page: currentPage,
                page_size: pageSize,
                sort_by: sortBy,
                filter_by: filterBy,
                search_text: searchText
            },
            request_payload: extraPayload
        }
    };
}

export function getAllPrograms(
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
        "/benefit_program/get_all_programs",
        buildPayload({ currentPage, pageSize, sortBy, filterBy, searchText })
    );
}

export function getMyPrograms(
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
        "/benefit_program/get_my_programs",
        buildPayload({ currentPage, pageSize, sortBy, filterBy, searchText })
    );
}

export function getProgramById(baseUrl: string, programId: string) {
    return apiRequest(
        baseUrl,
        "/benefit_program/get_program",
        buildPayload({
            extraPayload: { program_id: programId }
        })
    );
}
