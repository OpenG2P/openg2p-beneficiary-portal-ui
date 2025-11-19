"use client";

import { useEffect, useState } from "react";
import { getNews } from "@/features/news/utils";
import { News } from "@/features/news/types";

export function useNews(page = 1, limit = 3, search = "") {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_PATH;

    async function fetchNews(baseUrl: string) {
        try {
            setLoading(true);
            setError(null);

            const { data } = await getNews(baseUrl, page, limit, search);
            setNews(data);
        } catch (err) {
            setError("Failed to load news");
            setNews([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!strapiUrl) return;

        fetchNews(strapiUrl);
    }, [page, limit, search, strapiUrl]);

    return {
        news,
        loading,
        error,
    };
}
