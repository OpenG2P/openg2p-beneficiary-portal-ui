"use client";

import { useDepartment } from "@/context/GlobalContext";

const MULTI_DEPT_ENABLED =
    process.env.NEXT_PUBLIC_MULTI_DEPARTMENT === "true";

const DEFAULT_SPAR_URL =
    process.env.NEXT_PUBLIC_SPAR_API_PATH ?? "";

export function useSparUrl() {
    const { currentDepartment } = useDepartment();

    const sparUrl = MULTI_DEPT_ENABLED
        ? currentDepartment?.spar_url
        : DEFAULT_SPAR_URL;

    return sparUrl;
}
