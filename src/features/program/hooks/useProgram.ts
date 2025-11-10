"use client";
import { useEffect, useState } from "react";
import { getProgramById } from "@/features/program/utils/programsApi"

export function useProgram(programId: string) {
    const PBMS_BASE = "http://0.0.0.0:8000";
    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!programId) return;
        const fetchProgram = async () => {
            setLoading(true);
            const result = await getProgramById(PBMS_BASE, programId);
            setProgram(result?.response_body?.data ?? null);
            setLoading(false);
        };

        fetchProgram();
    }, [programId]);

    return { program, loading };
}
