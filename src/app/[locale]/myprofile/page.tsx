"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/global";
import { prefixBasePath } from "@/utils/path";

export default function MyProfile() {

    const { profile } = useAuth();
    const t = useTranslations();

    const avatarSrc = profile?.picture || prefixBasePath("/user.png");

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-10 py-6">
            <div className="max-w-4xl mx-auto">
                <section className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200">
                        <Image
                            src={avatarSrc}
                            alt="User Avatar"
                            width={112}
                            height={112}
                            className="object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {profile?.name || "User"}
                        </h1>
                        {profile?.email && (
                            <p className="text-gray-500 mt-1">{profile.email}</p>
                        )}
                    </div>
                </section>

                <section className="bg-white shadow-md rounded-xl p-6 grid gap-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">
                            {t("profilePage.personalInfo")}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-600">
                            <span className="font-medium">{t("profilePage.name")}:</span>
                            <span>{profile?.name || "-"}</span>

                            <span className="font-medium">ID Type:</span>
                            <span>{profile?.provider_unique_id_type || "-"}</span>

                            <span className="font-medium">User Unique ID:</span>
                            <span>{profile?.provider_unique_id || "-"}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">
                            {t("profilePage.contactInfo")}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-600">
                            <span className="font-medium">{t("profilePage.email")}:</span>
                            <span>{profile?.email || "-"}</span>

                            <span className="font-medium">{t("profilePage.phone")}:</span>
                            <span>{profile?.phone_number || "-"}</span>

                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">
                            {t("profilePage.demographics")}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-600">
                            <span className="font-medium">{t("profilePage.gender")}:</span>
                            <span>{profile?.gender || "-"}</span>

                            <span className="font-medium">{t("profilePage.birthdate")}:</span>
                            <span>{profile?.birthdate || "-"}</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
