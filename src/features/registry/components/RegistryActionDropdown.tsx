"use client";

import { ActionDropdown } from "@/components/ui";

interface Props {
    onActionSelect: (action: string) => void;
}

const registryActions = [
    { slug: "request-registry-details", label: "Registry Details" },
    { slug: "request-address-change", label: "Request for Change Address" },
];

export default function RegistryActionsDropdown({ onActionSelect }: Props) {
    return <ActionDropdown actions={registryActions} onActionSelect={onActionSelect} />;
}
