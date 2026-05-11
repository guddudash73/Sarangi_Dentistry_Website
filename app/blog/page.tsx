import BlogPageClient from "@/components/blog/BlogPageClient";
import { getAllBlogs, getFeaturedBlog } from "@/data/blogs";

export const metadata = {
  title: "Blog | Sarangi Dentistry",
  description:
    "Read Sarangi Dentistry articles on oral health, restorative care, orthodontics, and modern patient-first dental guidance.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Sarangi Dentistry",
    description: "Read Sarangi Dentistry articles on oral health, restorative care, orthodontics, and modern patient-first dental guidance.",
    url: "/blog",
    images: [{ url: "/assets/seat_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Sarangi Dentistry",
    description: "Read Sarangi Dentistry articles on oral health, restorative care, orthodontics, and modern patient-first dental guidance.",
    images: ["/assets/seat_1.jpg"],
  },
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  const featuredBlog = await getFeaturedBlog();

  return <BlogPageClient blogs={blogs} featuredBlog={featuredBlog} />;
}
