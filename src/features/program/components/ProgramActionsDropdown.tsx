"use client";

import { ActionDropdown } from "@/components/ui";

interface Props {
    onActionSelect: (action: string) => void;
}

const programActions = [
    { slug: "view-details", label: "View Details" },
    { slug: "details-submited", label: "Details Submitted" },
    { slug: "progress", label: "Progress" },
    { slug: "disbursement-history", label: "Disbursement History" },
];

export default function ProgramActionsDropdown({ onActionSelect }: Props) {
    return <ActionDropdown actions={programActions} onActionSelect={onActionSelect} />;
}
