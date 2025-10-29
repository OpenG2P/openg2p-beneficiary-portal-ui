"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Department } from "@/shared/types/department";
import { prefixBaseApiPath } from "@/shared/utils/path";

interface DepartmentContextType {
    departments: Department[];
    currentDepartment: Department | null;
    setDepartment: (mnemonic: string) => void;
    getServiceUrl: (key: keyof Department) => string | null;
}

const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);

export const DepartmentContextProvider = ({ children }: { children: ReactNode }) => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);

    const loadDepartments = async () => {
        const res = await fetch(prefixBaseApiPath("/departments"), { method: "POST" });
        const list: Department[] = await res.json();

        setDepartments(list);
        const stored = localStorage.getItem("currentDepartment");

        if (stored) {
            setCurrentDepartment(JSON.parse(stored));
        } else {
            setCurrentDepartment(list[0]);
            localStorage.setItem("currentDepartment", JSON.stringify(list[0]));
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") loadDepartments();
    }, []);

    const setDepartment = (mnemonic: string) => {
        const dept = departments.find((d) => d.department_mnemonic === mnemonic);
        if (!dept) return;
        setCurrentDepartment(dept);
        localStorage.setItem("currentDepartment", JSON.stringify(dept));
        window.location.reload();
    };

    const getServiceUrl = (key: keyof Department) =>
        currentDepartment ? currentDepartment.base_url + (currentDepartment[key] || "") : null;

    return (
        <DepartmentContext.Provider
            value={{
                departments,
                currentDepartment,
                setDepartment,
                getServiceUrl,
            }}
        >
            {children}
        </DepartmentContext.Provider>
    );
};

export const useDepartmentContext = () => {
    const ctx = useContext(DepartmentContext);
    if (!ctx) throw new Error("useDepartmentContext must be used inside DepartmentContextProvider");
    return ctx;
};

export const useDepartment = () => {
    const { departments, currentDepartment, setDepartment, getServiceUrl } = useDepartmentContext();
    return { departments, currentDepartment, setDepartment, getServiceUrl };
};