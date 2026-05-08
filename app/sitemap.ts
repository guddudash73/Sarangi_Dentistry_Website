import { MetadataRoute } from "next";
import { getAllBlogs } from "@/data/blogs";
import { getAllBooks } from "@/data/books";
import { getAllProcedures } from "@/data/procedures";

function joinUrl(baseUrl: string, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

function safeLastModified(value?: string | number | Date): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? new Date() : date;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed) {
      const date = new Date(trimmed);
      return Number.isNaN(date.getTime()) ? new Date() : date;
    }
  }

  return new Date();
}

function isValidPublicPath(
  path: string | undefined,
  prefix: "/blog/" | "/procedure/" | "/book/",
): path is string {
  return Boolean(
    path && path.startsWith(prefix) && !path.includes("undefined"),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sarangidentistry.com";

  const [blogs, books, procedures] = await Promise.all([
    getAllBlogs().catch(() => []),
    getAllBooks().catch(() => []),
    getAllProcedures().catch(() => []),
  ]);

  const blogRoutes = blogs
    .filter((blog) => isValidPublicPath(blog.path, "/blog/"))
    .map((blog) => ({
      url: joinUrl(baseUrl, blog.path),
      lastModified: safeLastModified(blog.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const bookRoutes = books
    .filter((book) => isValidPublicPath(book.path, "/book/"))
    .map((book) => ({
      url: joinUrl(baseUrl, book.path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const procedureRoutes = procedures
    .filter((proc) => isValidPublicPath(proc.path, "/procedure/"))
    .map((proc) => ({
      url: joinUrl(baseUrl, proc.path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/book",
    "/book-appointment",
    "/certification",
    "/contact",
    "/gallery",
    "/photography",
    "/procedure",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...bookRoutes, ...procedureRoutes];
}
