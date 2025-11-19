"use client";

import { useDepartment } from "@/context/GlobalContext";

const MULTI_DEPT_ENABLED =
    process.env.NEXT_PUBLIC_MULTI_DEPARTMENT === "true";

const DEFAULT_PBMS_URL =
    process.env.NEXT_PUBLIC_PBMS_API_PATH ?? "";

export function usePbmsUrl() {
    const { currentDepartment } = useDepartment();

    const pbmsUrl = MULTI_DEPT_ENABLED
        ? currentDepartment?.pbms_url
        : DEFAULT_PBMS_URL;

    return pbmsUrl;
}
