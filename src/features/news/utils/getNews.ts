import qs from "qs";
import { News } from "@/features/news/types";

export async function getNews(
    page: number = 1,
    pageSize: number = 5,
    search: string = ""
): Promise<{ data: News[]; total: number }> {

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_PATH ?? "http://localhost:1337";
    console.log(baseUrl)
    const path = "/api/allnews";
    const url = new URL(path, baseUrl);

    url.search = qs.stringify(
        {
            pagination: {
                page,
                pageSize,
            },
            sort: ["createdAt:desc"],
            filters: search
                ? {
                    $or: [
                        { title: { $containsi: search } },
                        { description: { $containsi: search } },
                    ],
                }
                : undefined,
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        { encodeValuesOnly: true }
    );

    const res = await fetch(url.toString(), { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed to fetch news");

    const json = await res.json();

    return {
        data: json.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            date: item.date,
            image: item.image
                ? {
                    url: item.image.url,
                    alternativeText: item.image.alternativeText ?? "",
                }
                : undefined,
        })),
        total: json.meta.pagination.total,
    };
}
