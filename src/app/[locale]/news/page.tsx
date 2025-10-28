"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePagination } from "@/shared/hooks/usePagination";
import { AuthUtil } from '@/features/auth/components';
import { Pagination, SearchInput } from "@/components/shared";
import { NewsDetails } from "@/features/news/components";
import { getNews } from "@/features/news/utils";
import { News } from "@/features/news/types";

export default function NewsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const [news, setNews] = useState<News[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedNews, setSelectedNews] = useState<News | null>(null);

    useEffect(() => {
        getNews()
            .then(setNews)
            .catch(console.error);
    }, []);


    const filtered = news.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { currentPage, setCurrentPage, totalPages, currentItems } = usePagination(filtered, 5);

    return (
        <div className="px-10 py-4 min-h-screen bg-gray-50">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-lg text-black font-bold">Latest News</h1>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-black/20 shadow-[0_4px_20px_0_rgba(0,0,0,0.25)]">
                <div className="mb-4 px-6 pt-4 flex items-center justify-between">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22] mb-2">All News</h2>
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search"
                        className="w-[200px]"
                    />
                </div>

                <div className="flex flex-col divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                    {currentItems.map((n, idx) => (
                        <div
                            key={n.id}
                            onClick={() => setSelectedNews(n)}
                            className={`${idx % 2 === 0 ? "bg-gray-100" : "bg-white"} w-full`}
                        >
                            <div className="flex gap-3 px-6 py-3">
                                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16">
                                    <img
                                        src={n.image?.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_PATH}${n.image.url}` : "/logo.png"}
                                        alt={n.image?.alternativeText || n.title}
                                        className="w-full h-full object-contain rounded-md bg-white"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[18px] font-[500] text-black truncate">{n.title}</h3>
                                    {n.date && (
                                        <span className="text-[14px] text-[#3399FF] block mt-0.5">
                                            {new Date(n.date).toLocaleString()}
                                        </span>
                                    )}
                                    <p className="text-xs sm:text-sm text-gray-700 mt-1 line-clamp-2">
                                        {n.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-6 px-8 py-4 text-sm text-black">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                    <div className="text-gray-600">
                        Showing{" "}
                        {Math.min((currentPage - 1) * 5 + 1, filtered.length)}–
                        {Math.min(currentPage * 5, filtered.length)} of {filtered.length} news
                    </div>
                </div>

                {selectedNews && (
                    <NewsDetails
                        news={selectedNews}
                        onClose={() => setSelectedNews(null)}
                    />
                )}
            </div>
        </div>
    );
}