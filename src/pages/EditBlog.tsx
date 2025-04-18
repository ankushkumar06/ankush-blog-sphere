
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";
import { useBlog, BlogPost } from "@/context/BlogContext";
import Layout from "@/components/Layout";
import BlogEditor from "@/components/BlogEditor";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getBlog, updateBlog } = useBlog();
  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    toast.error("You must be logged in to edit a blog post");
    return null;
  }

  useEffect(() => {
    if (id) {
      const blogData = getBlog(id);
      if (blogData) {
        // Check if user is the author
        if (user && blogData.author.id === user.id) {
          setBlog(blogData);
        } else {
          toast.error("You don't have permission to edit this blog post");
          navigate(`/blog/${id}`);
        }
      } else {
        toast.error("Blog post not found");
        navigate("/");
      }
      setIsLoading(false);
    }
  }, [id, getBlog, navigate, user]);

  const handleSubmit = async (data: {
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
  }) => {
    if (!id || !blog) return;
    
    try {
      setIsSubmitting(true);
      await updateBlog(id, {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
      });
      
      toast.success("Blog post updated successfully!");
      navigate(`/blog/${id}`);
    } catch (error) {
      toast.error("Failed to update blog post");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-3xl mx-auto px-4 py-12 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-12"></div>
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Blog post not found</h1>
          <p>The blog post you are trying to edit doesn't exist or you don't have permission.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold mb-8">Edit Blog Post</h1>
          <BlogEditor
            initialData={blog}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            buttonText="Update"
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditBlog;
