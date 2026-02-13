export function getMediaUrl(imagePath: string | undefined): string {
    if (!imagePath) return "/portal/news_orange.png";
    return `/portal/api/strapi/media?url=${encodeURIComponent(imagePath)}`;
}