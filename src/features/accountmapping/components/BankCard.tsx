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
        <div className="flex flex-col text-white rounded-[10px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="rounded-xl shadow-xl overflow-hidden relative">
                <div className="bg-[#ffcb30] px-8 pt-[30px] pb-[7px] flex justify-between items-end">
                    <div>
                        <h3 className="text-[20px]/[23px] font-[600] text-black">
                            Account/Wallet
                        </h3>
                    </div>

                    <div className="pr-10">
                        <Image
                            src={prefixBasePath("/spar_card.png")}
                            alt="SPAR Card"
                            width={81}
                            height={22}
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="bg-gradient-to-b from-[#ffbf00] to-[#ED7C22]  pt-[39px] pb-[18px] relative">
                    <div className=" px-[30px] pb-[12px]">
                        <div className="text-[16px]/[19px] font-[600] text-black">
                            {account.name}
                        </div>
                        <div className="text-[16px]/[19px] font-[600] text-black">
                            {account.number}
                        </div>
                    </div>

                    <ViewAll
                        href="/accounts"
                        label="View Account Details"
                        bgColor="bg-white/40"
                    />

                    <div className="absolute right-12 bottom-0 opacity-20 " >
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