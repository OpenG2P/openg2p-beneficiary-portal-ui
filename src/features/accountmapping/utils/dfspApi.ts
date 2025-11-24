import { apiRequest } from "@/shared/utils/apiRequest";
import { buildStandardPayload } from "@/shared/utils/payloadBuilder";

export function getAllBanks(baseUrl: string) {
    return apiRequest(
        baseUrl,
        "/dfsp/fetch-banks",
        buildStandardPayload({ pageSize: 100 })
    );
}

export function getBranchesByBankId(baseUrl: string, bankId: number) {
    return apiRequest(
        baseUrl,
        "/dfsp/fetch-branches",
        buildStandardPayload({
            pageSize: 100,
            extraPayload: { bank_id: bankId }
        })
    );
}

export function getAllWalletProviders(baseUrl: string) {
    return apiRequest(
        baseUrl,
        "/dfsp/fetch-wallet-service-providers",
        buildStandardPayload({ pageSize: 100 })
    );
}