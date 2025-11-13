import qs from "qs";

export async function getAccountInformation(id: string) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_PATH ?? "http://localhost:1337";
    const path = `/api/account-informations/${id}`;
    const url = new URL(path, baseUrl);

    url.search = qs.stringify(
        {
            populate: "*",
        },
        { encodeValuesOnly: true }
    );

    const res = await fetch(url.toString(), { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed to fetch account information");

    const json = await res.json();

    return {
        id: json.data.id,
        AccountInfo: json.data.account_info,
    };
}
