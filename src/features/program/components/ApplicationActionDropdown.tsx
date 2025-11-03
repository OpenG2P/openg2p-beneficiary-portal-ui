"use client";
import ActionDropdown from "@/components/ui/ActionDropdown";

interface Props {
    onActionSelect: (action: string) => void;
}

const applicationoptions = [
    { slug: "view-details", label: "View Details" },
    { slug: "progress", label: "Progress" },
];

export default function ApplicationActionDropdown({ onActionSelect }: Props) {
    return <ActionDropdown actions={applicationoptions} onActionSelect={onActionSelect} />;
}
