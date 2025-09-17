import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: (process.env.NEXT_PUBLIC_LANGUAGES_SUPPORTED || "en fr tl").split(/\s+/),
    defaultLocale: "en"
});
