import { notFound, redirect } from "next/navigation";
import BlogPostPageClient from "@/components/blog/BlogPostPageClient";
import { getAllBlogs, getBlogById, getRelatedBlogs } from "@/data/blogs";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type BlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getSlugFromBlogPath(path: string, fallbackId: string): string {
  const cleanPath = path.trim().replace(/\/+$/, "");

  if (cleanPath.startsWith("/blog/")) {
    const slug = cleanPath.replace(/^\/blog\//, "").trim();
    if (slug) return slug;
  }

  return fallbackId;
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();

  return blogs.map((blog) => ({
    id: getSlugFromBlogPath(blog.path, blog.id),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return {
      title: "Post Not Found | Sarangi Dentistry",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title} | Sarangi Dentistry`,
    description: blog.excerpt,
    alternates: {
      canonical: blog.path,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const canonicalSlug = getSlugFromBlogPath(blog.path, blog.id);

  if (id !== canonicalSlug) {
    redirect(blog.path);
  }

  const relatedBlogs = await getRelatedBlogs(blog.id, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [
      blog.fullUrl || blog.cardUrl || blog.image
    ],
    "datePublished": blog.date || new Date().toISOString(),
    "author": [{
      "@type": "Person",
      "name": blog.author || "Dr. Sarangi",
      "url": "https://sarangidentistry.com/about"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Sarangi Dentistry",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sarangidentistry.com/favicon.ico"
      }
    },
    "description": blog.excerpt
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostPageClient blog={blog} relatedBlogs={relatedBlogs} />
    </>
  );
}
