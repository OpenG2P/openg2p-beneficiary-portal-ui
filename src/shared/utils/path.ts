export function prefixBasePath(path: string) {
    return (process.env.NEXT_PUBLIC_BASE_PATH || "") + path;
}

export function prefixBaseApiPath(path: string) {
    return (process.env.NEXT_PUBLIC_BASE_API_PATH || "/api/portal") + path;
}

export function removePrefixBasePath(path: string) {
    const basePath = process.env.NEXT_PUBLIC_BASE_API_PATH || "/api/portal";
    return path.replace(basePath, "/");
}