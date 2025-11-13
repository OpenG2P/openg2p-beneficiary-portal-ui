"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { prefixBasePath } from "@/shared/utils/path";
import { AuthUtil } from "@/features/auth/components";
import { useAuth } from "@/context/GlobalContext";
import { useEffect, useState } from "react";
import {
    AccountSuccessModal,
    AccountErrorModal,
    AccountRemoveModal,
} from "@/features/accountmapping/components";
import {
    getAllBanks,
    getBranchesByBankId,
    getAllWalletProviders,
} from "@/features/accountmapping/utils/dfspApi";

import { useLinkAccount } from "@/features/accountmapping/hooks/useLinkAccount";
import { useUpdateAccount } from "@/features/accountmapping/hooks/useUpdateAccount";
import { useResolveAccount } from "@/features/accountmapping/hooks/useResolveAccount";
import { STRATEGIES } from "@/features/accountmapping/utils/strategyMap";

export default function AccountUpdatePage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });
    const { profile } = useAuth();

    const profileImage = profile?.picture || prefixBasePath("/user_image.png");
    const baseUrl = "http://localhost:8080";
    const baseUrl1 = "http://localhost:8080/mapper";

    const [accountType, setAccountType] = useState("bank");
    const [banks, setBanks] = useState<any[]>([]);
    const [branches, setBranches] = useState<any[]>([]);
    const [walletProviders, setWalletProviders] = useState<any[]>([]);
    const [bank, setBank] = useState("");
    const [branch, setBranch] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [mobile, setMobile] = useState(profile?.phone_number || "");
    const [email, setEmail] = useState(profile?.email || "");
    const [walletProvider, setWalletProvider] = useState("");
    const [walletType, setWalletType] = useState("Mobile Wallet");

    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);

    const { handleResolve, resolving, result: resolveResult, error: resolveError } = useResolveAccount(baseUrl1);
    const { handleLink, linking, result: linkResult, error: linkError } = useLinkAccount(baseUrl1);
    const { handleUpdate, updating, result: updateResult, error: updateError } = useUpdateAccount(baseUrl1);

    useEffect(() => {
        async function fetchData() {
            try {
                const [banksRes, walletsRes] = await Promise.all([
                    getAllBanks(baseUrl),
                    getAllWalletProviders(baseUrl),
                ]);

                const banks = banksRes?.response_body?.response_payload?.banks || [];
                const wallets = walletsRes?.response_body?.response_payload?.wallet_service_providers || [];

                setBanks(banks);
                setWalletProviders(wallets);
            } catch (err) {
                console.error("❌ Error fetching DFSP data:", err);
            }
        }

        fetchData();
    }, [baseUrl]);

    useEffect(() => {
        if (!bank) {
            setBranches([]);
            setBranch("");
            return;
        }

        const selectedBank = banks.find((b) => b.bank_name === bank);
        if (!selectedBank) {
            setBranches([]);
            setBranch("");
            return;
        }

        getBranchesByBankId(baseUrl, selectedBank.id)
            .then((res) => {
                const branches = res?.response_body?.response_payload?.branches || [];
                setBranches(branches);
                setBranch("");
            })
            .catch((err) => {
                console.error("❌ Branch fetch failed:", err);
                setBranches([]);
                setBranch("");
            });
    }, [bank, banks, baseUrl]);


    useEffect(() => {
        if (!profile?.name) return;
        handleResolve(profile.name);
    }, []);

    useEffect(() => {
        setWalletProvider("");
    }, [walletType]);

    const buildFaData = () => {
        if (accountType === "bank") {
            return {
                strategy_id: STRATEGIES.BANK.id,
                fa_type: STRATEGIES.BANK.type,
                bank_name: bank,
                bank_code: banks.find((b) => b.bank_name === bank)?.bank_code,
                branch_name: branch,
                branch_code: branches.find((br) => br.branch_name === branch)?.branch_code,
                account_number: accountNumber,
            };
        } else if (accountType === "wallet" && walletType === "Mobile Wallet") {
            return {
                strategy_id: STRATEGIES.MOBILE_WALLET.id,
                fa_type: STRATEGIES.MOBILE_WALLET.type,
                wallet_provider_name: walletProvider,
                wallet_provider_code: walletProviders.find((w) => w.sp_name === walletProvider)?.sp_code,
                mobile_number: mobile,
            };
        } else if (accountType === "wallet" && walletType === "Email Wallet") {
            return {
                strategy_id: STRATEGIES.EMAIL_WALLET.id,
                fa_type: STRATEGIES.EMAIL_WALLET.type,
                wallet_provider_name: walletProvider,
                wallet_provider_code: walletProviders.find((w) => w.sp_name === walletProvider)?.sp_code,
                email_address: email,
            };
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const faData = buildFaData();
        const name = profile?.name || "";
        handleUpdate(name, faData);
    };

    return (
        <div className="relative px-[50px] py-4 bg-white min-h-screen">
            <h1 className="text-[18px] font-[600] text-gray-800 mb-4">Update Account</h1>
            <div className="flex flex-row gap-0 rounded-[10px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] overflow-hidden">
                <div className="w-[70%] bg-white p-8">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-6">
                        Edit Account Information
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-row gap-10 items-start">
                        <Image
                            src={profileImage}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover rounded-full"
                        />

                        <div className="flex flex-col justify-start w-full space-y-4">
                            <div>
                                <div className="text-[16px] font-[500] text-black">Name</div>
                                <div className="text-[20px] text-[#3399FF] font-[500]">
                                    {profile?.name}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[16px] text-black font-[500] mb-1">
                                    Select Account Type
                                </label>
                                <select
                                    value={accountType}
                                    onChange={(e) => setAccountType(e.target.value)}
                                    className="w-1/2 bg-gray-100 rounded-lg px-3 py-2 text-[16px] font-[500] text-black focus:outline-none"
                                >
                                    <option value="bank">Bank</option>
                                    <option value="wallet">Wallet</option>
                                </select>
                            </div>

                            {accountType === "bank" && (
                                <>
                                    <SelectInput
                                        label="Bank Name"
                                        value={bank}
                                        options={banks.map((b) => b.bank_name)}
                                        onChange={setBank}
                                    />
                                    <SelectInput
                                        label="Branch"
                                        value={branch}
                                        options={branches.map((br) => br.branch_name)}
                                        onChange={setBranch}
                                    />
                                    <TextInput
                                        label="Account Number"
                                        value={accountNumber}
                                        onChange={setAccountNumber}
                                    />
                                </>
                            )}

                            {accountType === "wallet" && (
                                <>
                                    <SelectInput
                                        label="Wallet Type"
                                        value={walletType}
                                        options={[...new Set(walletProviders.map((w) => w.wallet_type))]}
                                        onChange={setWalletType}
                                    />

                                    <SelectInput
                                        label="Wallet Provider"
                                        value={walletProvider}
                                        options={
                                            walletProviders
                                                .filter((w) => w.wallet_type === walletType)
                                                .map((w) => w.sp_name)
                                        }
                                        onChange={setWalletProvider}
                                    />

                                    {walletType === "Mobile Wallet" ? (
                                        <TextInput
                                            label="Mobile Number"
                                            value={mobile}
                                            onChange={setMobile}
                                        />
                                    ) : (
                                        <TextInput
                                            label="Email Address"
                                            type="email"
                                            value={email}
                                            onChange={setEmail}
                                        />
                                    )}
                                </>
                            )}

                            <div className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-6 py-2 bg-[#D9D9D999] text-black font-[500] rounded-full"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white font-[500] rounded-full"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-10 pl-20">
                        <label className="block text-[16px] text-black/50 font-[500] mb-1">
                            Powered By
                        </label>
                        <Image
                            src={prefixBasePath("/spar_acc.png")}
                            alt="SPAR Logo"
                            width={100}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="w-[30%] bg-gray-100 p-8 flex flex-col justify-start gap-4">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-4">Information</h2>

                    {accountType === "bank" && (
                        <>
                            <Info label="Bank Name" value={bank} />
                            <Info label="Branch" value={branch} />
                            <Info label="Account Number" value={accountNumber} />
                        </>
                    )}
                    {accountType === "wallet" && (
                        <>
                            <Info label="Wallet Provider" value={walletProvider} />
                            <Info label="Mobile Number" value={mobile} />
                        </>
                    )}
                    {accountType === "other" && (
                        <Info label="Email Address" value={email} />
                    )}

                    <Info label="Account Linked Date" value="01 October 2025" />

                    <div className="mt-6 flex flex-col items-start gap-3">
                        <button
                            disabled
                            className="px-4 py-1 bg-gray-300 text-white font-[500] rounded-full w-auto cursor-not-allowed"
                        >
                            Edit Account Information
                        </button>
                        <button
                            onClick={() => setShowRemoveModal(true)}
                            className="px-4 py-1 bg-[#3399FF] text-white font-[500] rounded-full w-auto"
                        >
                            Remove Account
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <AccountSuccessModal
                    onClose={() => setShowModal(false)}
                    onBack={() => window.history.back()}
                />
            )}
            {showErrorModal && <AccountErrorModal onClose={() => setShowErrorModal(false)} />}
            {showRemoveModal && (
                <AccountRemoveModal
                    onClose={() => setShowRemoveModal(false)}
                    onConfirm={() => setShowRemoveModal(false)}
                />
            )}
        </div>
    );
}

function Info({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <label className="block text-[16px] font-[500] text-black/50 mb-1">{label}</label>
            <div className="text-[16px] text-black font-[500]">{value || "-"}</div>
        </div>
    );
}

function TextInput({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
}) {
    return (
        <div>
            <label className="block text-[16px] text-black font-[500] mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-1/2 bg-gray-100 rounded-lg px-3 py-2 text-[16px] font-[500] text-black focus:outline-none"
            />
        </div>
    );
}

function SelectInput({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="block text-[16px] text-black font-[500] mb-1">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-1/2 bg-gray-100 rounded-lg px-3 py-2 text-[16px] font-[500] text-black focus:outline-none"
            >
                <option value="">-- Select --</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

