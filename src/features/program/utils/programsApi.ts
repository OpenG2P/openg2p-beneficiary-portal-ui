import { PaginationParams } from "@/shared/utils/payloadBuilder";
import { portalApi } from "@/shared/utils/apiClient";

export const getAllPrograms = (pbmsUrl: string, params: PaginationParams = {}) =>
    portalApi("/api/programs", {
        pbmsUrl,
        params
    });

export const getMyPrograms = (pbmsUrl: string, params: PaginationParams = {}) =>
    portalApi("/api/programs/enrolled", {
        pbmsUrl,
        params
    });

export const getProgramById = (pbmsUrl: string, programId: string) =>
    portalApi("/api/programs/by-id", {
        pbmsUrl,
        extraPayload: {
            program_id: programId,
        },
    });
