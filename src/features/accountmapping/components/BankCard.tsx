import React from 'react';
import Image from "next/image";
import { ViewAll } from '@/components/shared';
import { prefixBasePath } from "@/shared/utils/path";

interface BankAccount {
    name: string;
    number: string;
}

interface BankCardProps {
    account: BankAccount;
}

export default function BankCard({ account }: BankCardProps) {
    return (
        <div className="flex flex-col text-white">
            <div className="rounded-xl shadow-xl overflow-hidden relative">
                <div className="bg-[#ffcb30] px-8 pt-8 pb-2 flex justify-between items-end">
                    <div>
                        <h3 className="text-[20px] font-[600] text-black">
                            Account/Wallet
                        </h3>
                    </div>

                    <div className="pb-1 pr-10">
                        <Image
                            src={prefixBasePath("/spar_card.png")}
                            alt="SPAR Card"
                            width={81}
                            height={22}
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="bg-gradient-to-b from-[#ffbf00] to-[#ED7C22] px-8 pt-6 pb-8 relative">
                    <div className="mb-6">
                        <div className="text-[16px] font-[600] text-black mb-2">
                            {account.name}
                        </div>
                        <div className="text-[16px] font-[600] text-black">
                            {account.number}
                        </div>
                    </div>

                    <ViewAll
                        href="/accounts"
                        label="View Account Details"
                        bgColor="bg-white/40"
                    />

                    <div className="absolute right-12 bottom-0 opacity-20">
                        <Image
                            src={prefixBasePath("/account_01.png")}
                            alt="User"
                            width={108}
                            height={102}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}