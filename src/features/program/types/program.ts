export type ProgramStatus = "Apply" | "Applied" | "Pending" | "Enrolled";

export interface Program {
    name: string;
    status: ProgramStatus;
    id: string;
    appliedDate: string;
    description?: string;
    eligibility?: string[];
    benefits: string[];
    requirements?: string[];
    deadline?: string;
    category?: string;
}
