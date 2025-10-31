"use client";

import { ReactNode } from "react";
import { ProfileContextProvider, useAuth as useProfileAuth } from "@/context/AuthContext";
import { DepartmentContextProvider, useDepartment as useDeptContext } from "@/context/DepartmentContext";

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ProfileContextProvider>
            <DepartmentContextProvider>
                {children}
            </DepartmentContextProvider>
        </ProfileContextProvider>
    );
};

export const useAuth = useProfileAuth;
export const useDepartment = useDeptContext;