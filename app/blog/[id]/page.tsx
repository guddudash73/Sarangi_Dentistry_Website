import { notFound } from "next/navigation";
import BlogPostPageClient from "@/components/blog/BlogPostPageClient";
import { getAllBlogs, getBlogById, getRelatedBlogs } from "@/data/blogs";

type BlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const blogs = await getAllBlogs();

  return blogs.map((blog) => ({
    id: blog.id,
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
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.id, 2);

  return <BlogPostPageClient blog={blog} relatedBlogs={relatedBlogs} />;
}
