import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const defaultGithubPagesBasePath =
  isGithubPages && repositoryName && !repositoryName.endsWith(".github.io")
    ? `/${repositoryName}`
    : "";
const pagesBasePath = process.env.PAGES_BASE_PATH ?? defaultGithubPagesBasePath;

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(isGithubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: pagesBasePath || undefined,
        assetPrefix: pagesBasePath ? `${pagesBasePath}/` : undefined,
      }
    : {}),
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
