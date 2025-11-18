"use client";

import { useEffect, useState } from "react";
import { getNews } from "@/features/news/utils";
import { News } from "@/features/news/types";

export function useNews(page = 1, limit = 3, search = "") {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchNews() {
        try {
            setLoading(true);
            setError(null);

            const { data } = await getNews(page, limit, search);

            setNews(data);
        } catch (err) {
            console.error("Failed to load news:", err);
            setError("Failed to load news");
            setNews([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNews();
    }, [page, limit]);

    return {
        news,
        loading,
        error,
        refetch: fetchNews
    };
}
