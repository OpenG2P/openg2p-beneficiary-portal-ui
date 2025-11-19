"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { AuthUtil } from "@/features/auth/components";
import { Pagination, SearchInput } from "@/components/shared";
import { NewsDetails } from "@/features/news/components";
import { getNews } from "@/features/news/utils";
import { News } from "@/features/news/types";

export default function NewsPage() {
    const lang = useLocale();
    AuthUtil({ failedRedirectUrl: `/${lang}/login` });

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [news, setNews] = useState<News[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedNews, setSelectedNews] = useState<News | null>(null);
    const [total, setTotal] = useState(0);

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_PATH;

    useEffect(() => {
        if (!strapiUrl) return;
        getNews(strapiUrl, currentPage, pageSize, searchQuery)
            .then(({ data, total }) => {
                setNews(data);
                setTotal(total);
            })
            .catch(console.error);
    }, [currentPage, searchQuery, strapiUrl]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="px-[50px] py-4 min-h-screen bg-white">
            <h1 className="text-[18px] font-[600] text-gray-800 mb-4">
                Latest News
            </h1>

            <div className="bg-white overflow-hidden rounded-[10px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                <div className="mb-4 px-6 pt-4 flex items-center justify-between">
                    <h2 className="text-[20px] font-[600] text-[#ED7C22]">All News</h2>
                    <SearchInput
                        onSearch={(val) => {
                            setCurrentPage(1);
                            setSearchQuery(val);
                        }}
                        placeholder="Search"
                        className="w-[200px]"
                    />
                </div>

                <div className="flex flex-col divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                    {news.map((n, idx) => (
                        <div
                            key={n.id}
                            onClick={() => setSelectedNews(n)}
                            className={`${idx % 2 === 0 ? "bg-gray-100" : "bg-white"} cursor-pointer`}
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
                                    <p className="text-xs sm:text-sm text-gray-700 mt-1 line-clamp-1">
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
                        Showing {(currentPage - 1) * pageSize + 1}–
                        {Math.min(currentPage * pageSize, total)} of {total} news
                    </div>
                </div>
            </div>
            {selectedNews && (
                <NewsDetails news={selectedNews} onClose={() => setSelectedNews(null)} />
            )}
        </div>
    );
}