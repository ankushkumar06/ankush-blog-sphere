
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";
import { useBlog } from "@/context/BlogContext";
import Layout from "@/components/Layout";
import BlogEditor from "@/components/BlogEditor";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createBlog } = useBlog();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    toast.error("You must be logged in to create a blog post");
    return null;
  }

  const handleSubmit = async (data: {
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
  }) => {
    if (!user) return;
    
    try {
      setIsSubmitting(true);
      const newBlog = await createBlog({
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        author: {
          id: user.id,
          name: user.name,
        },
      });
      
      toast.success("Blog post created successfully!");
      navigate(`/blog/${newBlog.id}`);
    } catch (error) {
      toast.error("Failed to create blog post");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold mb-8">Create New Blog Post</h1>
          <BlogEditor
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            buttonText="Publish"
          />
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlog;
