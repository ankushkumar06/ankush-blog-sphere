import { useState, useEffect } from "react";
import { BlogPost, useBlog } from "@/context/BlogContext";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 6;

const Index = () => {
  const { blogs, isLoading } = useBlog();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBlogs, setDisplayedBlogs] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const totalItems = blogs.length;
    const calculatedTotalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    setTotalPages(calculatedTotalPages || 1);

    if (currentPage > calculatedTotalPages) {
      setCurrentPage(calculatedTotalPages);
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedBlogs(blogs.slice(startIndex, endIndex));
  }, [blogs, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <section className="bg-accent py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ankush Blog
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 mb-8">
            Discover insightful articles, tutorials, and stories from our writers.
            Share your knowledge and connect with our community.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="font-playfair text-3xl font-semibold mb-8">Latest Posts</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="rounded-md border bg-card shadow-sm animate-pulse h-80"
              />
            ))}
          </div>
        ) : displayedBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No posts yet</h3>
            <p className="text-gray-600">
              Be the first to create a blog post!
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
