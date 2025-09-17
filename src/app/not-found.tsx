import type { Metadata } from "next";

import { prefixBasePath } from "@/utils/path";
import { NotFoundClient } from "@/components";

export const metadata: Metadata = {
    title: "Page Not Found - Beneficiary Portal",
    description: "The page you are looking for does not exist in the OpenG2P Beneficiary Portal.",
    icons: {
        icon: prefixBasePath("/logo.png"),
    },
};

export default function NotFound() {
    return <NotFoundClient />;
}
