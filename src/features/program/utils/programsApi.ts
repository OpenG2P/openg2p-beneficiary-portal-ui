import { apiRequest } from "@/shared/utils/apiRequest";

function buildPayload(overrides = {}) {
    return {
        request_header: {
            sender_app_mnemonic: "BENEFICIARY_PORTAL",
            sender_app_url: window?.location?.origin ?? "",
            request_id: "web-client",
            request_timestamp: new Date().toISOString(),
            instance_id: "portal-ui"
        },
        request_body: {
            pagination_request: {
                current_page: 1,
                page_size: 8,
                sort_by: "",
                filter_by: "",
                search_text: ""
            },
            request_payload: {},
            ...overrides
        }
    };
}

export function getAllPrograms(baseUrl: string, params = {}) {
    return apiRequest(
        baseUrl,
        "/benefit_program/get_all_programs",
        buildPayload(params)
    );
}

export function getMyPrograms(baseUrl: string, params = {}) {
    return apiRequest(
        baseUrl,
        "/benefit_program/get_my_programs",
        buildPayload(params)
    );
}

export function getProgramById(baseUrl: string, programId: string) {
    return apiRequest(
        baseUrl,
        "/benefit_program/get_program",
        buildPayload({
            request_payload: { program_id: programId }
        })
    );
}
