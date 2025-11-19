"use client";

import { useDepartment } from "@/context/GlobalContext";

const MULTI_DEPT_ENABLED =
    process.env.NEXT_PUBLIC_MULTI_DEPARTMENT === "true";

const DEFAULT_BRIDGE_URL =
    process.env.NEXT_PUBLIC_BRIDGE_API_PATH ?? "";

export function useBridgeUrl() {
    const { currentDepartment } = useDepartment();

    const bridgeUrl = MULTI_DEPT_ENABLED
        ? currentDepartment?.bridge_url
        : DEFAULT_BRIDGE_URL;

    return bridgeUrl;
}
