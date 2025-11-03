"use client";

import { ActionDropdown } from "@/components/ui";

interface Props {
    onActionSelect: (action: string) => void;
}

const benefitactions = [
    { slug: "delivery-details", label: "Delivery Details" },
    { slug: "support", label: "Support" }
];

export default function BenefitActionsDropdown({ onActionSelect }: Props) {
    return <ActionDropdown actions={benefitactions} onActionSelect={onActionSelect} />;
}
