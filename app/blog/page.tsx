import BlogPageClient from "@/components/blog/BlogPageClient";
import { getAllBlogs, getFeaturedBlog } from "@/data/blogs";

export const metadata = {
  title: "Blog | Sarangi Dentistry",
  description:
    "Read Sarangi Dentistry articles on oral health, restorative care, orthodontics, and modern patient-first dental guidance.",
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  const featuredBlog = await getFeaturedBlog();

  return <BlogPageClient blogs={blogs} featuredBlog={featuredBlog} />;
}
