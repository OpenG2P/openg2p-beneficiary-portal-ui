import { useEffect, useState } from "react";
import {
    getAllBanks,
    getBranchesByBankId,
    getAllWalletProviders,
} from "@/features/accountmapping/utils/dfspApi";
import type { Bank, Branch, WalletProvider } from "@/features/accountmapping/types";

export function useAccountData(baseUrl: string) {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [walletProviders, setWalletProviders] = useState<WalletProvider[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [banksRes, walletsRes] = await Promise.all([
                    getAllBanks(baseUrl),
                    getAllWalletProviders(baseUrl),
                ]);

                const banks = banksRes?.response_body?.response_payload?.banks || [];
                const wallets =
                    walletsRes?.response_body?.response_payload?.wallet_service_providers || [];

                setBanks(banks);
                setWalletProviders(wallets);
            } catch (err) {
                console.error("❌ Error fetching DFSP data:", err);
                setError(err instanceof Error ? err : new Error("Failed to fetch data"));
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [baseUrl]);

    return { banks, walletProviders, loading, error };
}

export function useBranches(baseUrl: string, bankName: string, banks: Bank[]) {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!bankName) {
            setBranches([]);
            return;
        }

        const selectedBank = banks.find((b) => b.bank_name === bankName);
        if (!selectedBank) {
            setBranches([]);
            return;
        }

        setLoading(true);
        getBranchesByBankId(baseUrl, selectedBank.id)
            .then((res) => {
                const branches = res?.response_body?.response_payload?.branches || [];
                setBranches(branches);
            })
            .catch((err) => {
                console.error("❌ Branch fetch failed:", err);
                setBranches([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [bankName, banks, baseUrl]);

    return { branches, loading };
}