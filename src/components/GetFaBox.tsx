"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Loading } from "@/components";
import { prefixBasePath } from "@/utils/path";

export default function GetFaBox() {
    const router = useRouter();
    const [renderState, setRenderState] = useState(2);
    const [getFaResult, setGetFaResult] = useState<any>({
        fa_type: "BANK_ACCOUNT",
        bank_name: "HDFC Bank Ltd. (HDFC)",
        branch_name: "Main HDFC Mumbai Central Branch",
        branch_code: "HDFC0000522",
        account_number: "123456789",
    });
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleConfirm = () => {
        router.push(`/accounts/delete`);
    };

    return (
        <div className="container 2xl:m-24">
            {renderState === 1 && <Loading />}

            {renderState === 2 && getFaResult && (
                <>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-transparent" />
                            </TransitionChild>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <TransitionChild
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to remove your account?
                                                </p>
                                            </div>

                                            <div className="flex flex-row justify-between mt-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md border border-transparent bg-blue-400 px-6 py-2 text-sm font-medium text-blue-900 hover:bg-blue-800"
                                                    onClick={handleConfirm}
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    type="button"
                                                    className="rounded-md border border-transparent bg-red-400 px-6 py-2 text-sm font-medium text-blue-900 hover:bg-red-800"
                                                    onClick={closeModal}
                                                >
                                                    No
                                                </button>
                                            </div>
                                        </DialogPanel>
                                    </TransitionChild>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                    <ul className="w-full">
                        <div className="flex flex-col mb-6">
                            <div className="text-orange-500 text-3xl font-semibold">Your account information</div>
                            <div className="w-full border-b-3 border-orange-200 mt-2"></div>
                        </div>

                        {getFaResult.fa_type === "BANK_ACCOUNT" && (
                            <>
                                <li className="border-b-3 border-orange-200 p-4 flex items-start space-x-6">
                                    <div className="flex-shrink-0 w-[70px]">
                                        <Image
                                            className="rounded-lg"
                                            src={prefixBasePath("/Bank.png")}
                                            alt="bank"
                                            width={70}
                                            height={70}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="text-md font-medium text-gray-600">Bank</div>
                                        <p className="text-lg text-black font-semibold">
                                            {getFaResult.bank_name}
                                        </p>
                                    </div>
                                </li>

                                <li className="border-b-3 border-orange-200 p-4 flex items-start space-x-6">
                                    <div className="flex-shrink-0 w-[70px]"></div>
                                    <div className="flex flex-col justify-center">
                                        <div className="text-md font-medium text-gray-600">Branch</div>
                                        <p className="text-lg text-black font-semibold">
                                            {getFaResult.branch_name} ({getFaResult.branch_code})
                                        </p>
                                    </div>
                                </li>

                                <li className="border-b-3 border-orange-200 p-4 flex items-start space-x-6">
                                    <div className="flex-shrink-0 w-[70px]"></div>
                                    <div className="flex flex-col justify-center">
                                        <div className="text-md font-medium text-gray-600">Account</div>
                                        <p className="text-lg text-black font-semibold">
                                            {getFaResult.account_number}
                                        </p>
                                    </div>
                                </li>
                            </>

                        )}
                    </ul>

                    <div className="flex justify-center mt-8 space-x-6">
                        <Link
                            href={`/accounts/update`}
                            className="text-blue-700 text-base font-medium hover:underline"
                        >
                            Modify Account Details
                        </Link>
                        <button
                            onClick={openModal}
                            className="text-blue-700 text-base font-medium hover:underline"
                        >
                            Remove Account
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
