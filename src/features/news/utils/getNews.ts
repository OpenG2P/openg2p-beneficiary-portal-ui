import qs from "qs";
import { News } from "@/features/news/types";

export async function getNews(): Promise<News[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
    const path = "/api/allnews";

    const url = new URL(path, baseUrl);

    url.search = qs.stringify(
        {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
            },
        },
        { encodeValuesOnly: true }
    );

    const res = await fetch(url.toString(), { cache: "no-cache" });

    if (!res.ok) throw new Error("Failed to fetch notifications");

    const json = await res.json();

    return json.data.map((item: any) => ({
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
    }));
}
